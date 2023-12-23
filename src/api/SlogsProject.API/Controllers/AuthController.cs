using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SlogsProject.API.Models.Auth;
using SlogsProject.Core.Entities.Identity;
using SlogsProject.Core.Repositories;
using SlogsProject.Core.Response;
using SlogsProject.Core.Roles;
using SlogsProject.Core.Security.Token;
using System.Security.Claims;

namespace SlogsProject.API.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public sealed class AuthController : ControllerBase
{
    public AuthController(UserManager<Account> accountManager, UserManager<User> userManager, IJwtProvider jwtProvider, IRefreshTokenManager refreshTokenManager, IIncidentRecordManager incidentRecordManager)
    {
        _accountManager = accountManager;
        _userManager = userManager;
        _jwtProvider = jwtProvider;
        _refreshTokenManager = refreshTokenManager;
        _incidentRecordManager = incidentRecordManager;
    }

    private readonly UserManager<Account> _accountManager;
    private readonly UserManager<User> _userManager;
    private readonly IJwtProvider _jwtProvider;
    private readonly IRefreshTokenManager _refreshTokenManager;
    private readonly IIncidentRecordManager _incidentRecordManager;

    [HttpPost]
    public async Task<IActionResult> RegisterOrganization([FromBody] OrganizationForm form)
    {
        if (!ModelState.IsValid) return BadRequest(new ErrorResponse(ErrorType.InvalidForm));
        
        var organization = new Organization { UserName = form.Name, Email = form.Email, PhoneNumber = form.Phone, Role = (int)OrganizationRole.Owner };
        var result = await _accountManager.CreateAsync(organization, form.Password);

        if (result.Succeeded) return Ok();
        return BadRequest(new
        {
            error = result.Errors.First().Code
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> RegisterUser([FromBody] UserForm form)
    {
        if (!ModelState.IsValid) return BadRequest(new ErrorResponse(ErrorType.InvalidForm));

        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        if (account.Role > (int)OrganizationRole.Administrator) return Unauthorized();
        
        var organizationId = account.IsOrganization() ? accountId : await GetOrganizationId(accountId);

        var user = new User { UserName = form.Name, Email = form.Email, OrganizationId = organizationId, Role = (int)OrganizationRole.Member };
        var result = await _accountManager.CreateAsync(user, form.Password);

        if (result.Succeeded) return Ok();
        return BadRequest(new
        {
            error = result.Errors.First().Code
        });
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginForm form)
    {
        if (!ModelState.IsValid) return BadRequest(new ErrorResponse(ErrorType.InvalidForm));

        var account = await _accountManager.FindByEmailAsync(form.Email);
        if (account == null) return Unauthorized(new ErrorResponse(ErrorType.IncorrectEmailOrPassword));

        var result = await _accountManager.CheckPasswordAsync(account, form.Password);
        if (!result) return Unauthorized(new ErrorResponse(ErrorType.IncorrectEmailOrPassword));

        string accessToken = _jwtProvider.GenerateAccessToken(account);
        string refreshToken = _jwtProvider.GenerateRefreshToken();

        DateTime? cookieExpiration = form.Remember ? DateTime.UtcNow.AddDays(7) : null;
        var newRefreshToken = new RefreshToken
        {
            AccountId = account.Id,
            Expiration = cookieExpiration ?? DateTime.UtcNow.AddHours(6),
            Value = refreshToken,
            Remember = form.Remember
        };
        await _refreshTokenManager.AddAsync(newRefreshToken);

        Response.Cookies.Append("auth-token", accessToken, GetCookieOptions(cookieExpiration));
        Response.Cookies.Append("refresh-token", refreshToken, GetCookieOptions(cookieExpiration));

        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshTokenCookie = Request.Cookies["refresh-token"];
        var accessTokenCookie = Request.Cookies["auth-token"];
        if (refreshTokenCookie == null || accessTokenCookie == null) return Unauthorized();

        string? accountId = _jwtProvider.ReadToken(accessTokenCookie).Claims.Where(x => x.Type == "nameid").Select(x => x.Value).FirstOrDefault();
        if (accountId == null) return Unauthorized();

        var storedRefreshToken = await _refreshTokenManager.Find(accountId, refreshTokenCookie);
        if (storedRefreshToken == null || storedRefreshToken.Expiration < DateTime.UtcNow) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        string accessToken = _jwtProvider.GenerateAccessToken(account);
        string refreshToken = _jwtProvider.GenerateRefreshToken();

        DateTime? cookieExpiration = storedRefreshToken.Remember ? DateTime.UtcNow.AddDays(7) : null;
        
        storedRefreshToken.Expiration = cookieExpiration ?? DateTime.UtcNow.AddHours(6);
        storedRefreshToken.Value = refreshToken;

        await _refreshTokenManager.UpdateAsync(storedRefreshToken);

        Response.Cookies.Append("auth-token", accessToken, GetCookieOptions(cookieExpiration));
        Response.Cookies.Append("refresh-token", refreshToken, GetCookieOptions(cookieExpiration));

        return Ok();
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) Unauthorized();

        var refreshTokenCookie = Request.Cookies["refresh-token"];
        if (refreshTokenCookie != null)
        {
            var storedRefreshToken = await _refreshTokenManager.Find(userId!, refreshTokenCookie);
            if (storedRefreshToken != null) await _refreshTokenManager.RemoveAsync(storedRefreshToken);
        }
        Response.Cookies.Delete("auth-token");
        Response.Cookies.Delete("refresh-token");
        return Ok();
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeleteAccount()
    {
        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        if (account.IsOrganization())
        {
            IAsyncEnumerable<User> users = _userManager.Users.Where(x => x.OrganizationId == account.Id).AsAsyncEnumerable();
            await foreach (var user in users)
            {
                await _refreshTokenManager.RemoveAllFromUser(user.Id);
                await _incidentRecordManager.RemoveAllAsync(user.Id);
                await _userManager.DeleteAsync(user);
            }
        }

        await _incidentRecordManager.RemoveAllAsync(account.Id);
        var result = await _accountManager.DeleteAsync(account);
        if (!result.Succeeded) return Unauthorized();

        Response.Cookies.Delete("auth-token");
        Response.Cookies.Delete("refresh-token");
        return Ok();
    }

    [HttpGet]
    [Authorize]
    public IActionResult IsAuthorized() => Ok();

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetCurrentAccount()
    {
        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        return Ok(new ResultResponse<SimpleAccount>(SimpleAccount.Parse(account)));
    }

    private static CookieOptions GetCookieOptions(DateTime? expires)
    {
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Expires = expires,
            SameSite = SameSiteMode.Strict,
        };
    }

    private async Task<string> GetOrganizationId(string accountId)
    {
        var account = await _accountManager.FindByIdAsync(accountId);

        if (account!.IsOrganization()) return accountId;
        return (account as User)!.OrganizationId;
    }
}