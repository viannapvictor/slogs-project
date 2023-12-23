using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SlogsProject.API.Models.Auth;
using SlogsProject.API.Models.Incident;
using SlogsProject.API.Models.Organizations;
using SlogsProject.Core.Entities.Identity;
using SlogsProject.Core.Entities.Organization;
using SlogsProject.Core.Repositories;
using SlogsProject.Core.Response;
using SlogsProject.Core.Roles;
using System.Security.Claims;

namespace SlogsProject.API.Controllers;

[ApiController]
[Route("[controller]/[action]")]
[Authorize]
public sealed class OrganizationController : ControllerBase
{
    public OrganizationController(IIncidentRecordManager incidentRecordManager, UserManager<Account> accountManager, UserManager<User> userManager)
    {
        _incidentRecordManager = incidentRecordManager;
        _accountManager = accountManager;
        _userManager = userManager;
    }

    private readonly IIncidentRecordManager _incidentRecordManager;
    private readonly UserManager<Account> _accountManager;
    private readonly UserManager<User> _userManager;

    [HttpPost]
    public async Task<IActionResult> AddIncidentLog([FromForm] IncidentForm form)
    {
        if (!ModelState.IsValid || 
            !int.TryParse(form.Urgency, out int result) || 
            (result < 0 || result > 2)) return BadRequest(new ErrorResponse(ErrorType.InvalidForm));

        for (int i = 0; i < form.Images.Length; i++)
        {
            string extension = Path.GetExtension(form.Images[i].FileName);
            if (extension == ".jpg" || extension == ".jpge") continue;

            return BadRequest(new ErrorResponse(ErrorType.InvalidForm));
        }

        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null) return Unauthorized();

        var organizationId = await GetOrganizationId(accountId);
        var incidentRecord = new IncidentRecord
        {
            OrganizationId = organizationId,
            UserId = accountId,
            Title = form.Title,
            Description = form.Description,
            Urgency = (Urgency)result
        };

        for (int i = 0; i < form.Images.Length; i++)
        {
            using var ms = new MemoryStream();
            form.Images[i].CopyTo(ms);

            var image = new IncidentImage { Image = ms.ToArray() };
            incidentRecord.Images.Add(image);
        }
        await _incidentRecordManager.AddAsync(incidentRecord);
        incidentRecord.Images = Array.Empty<IncidentImage>();

        return CreatedAtAction(nameof(AddIncidentLog), new ResultResponse<IncidentRecord>(incidentRecord));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllIncidentLogs()
    {
        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        if (account.Role > (int)OrganizationRole.Moderator)
        {
            return Ok(new ResultResponse<IEnumerable<IncidentRecord>>(_incidentRecordManager.GetAllFromAccount(accountId)));
        }
        var organizationId = account.IsOrganization() ? accountId : await GetOrganizationId(accountId);
        return Ok(new ResultResponse<IEnumerable<IncidentRecord>>(_incidentRecordManager.GetAll(organizationId)));
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetIncidentLogById(Guid id)
    {
        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        var result = await _incidentRecordManager.FindByIdAsync(id);
        if (result == null) return NotFound();

        var organizationId = await GetOrganizationId(accountId);
        if (organizationId != result.OrganizationId || 
            (account.Role > (int)OrganizationRole.Moderator && result.UserId != accountId))
        {
            return Unauthorized(new ErrorResponse(ErrorType.InsufficientPermission));
        }
        return Ok(new ResultResponse<IncidentRecord>(result));
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> FindAccount(string id)
    {
        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        if (accountId == id)
        {
            return Ok(new ResultResponse<SimpleAccount>(SimpleAccount.Parse(account)));
        }
        if (account.Role > (int)OrganizationRole.Moderator)
        {
            return Unauthorized(new ErrorResponse(ErrorType.InsufficientPermission));
        }

        var secondAccount = await _accountManager.FindByIdAsync(id);
        if (secondAccount == null) return NotFound();

        var organizationId = account.IsOrganization() ? accountId : await GetOrganizationId(accountId);
        if (secondAccount.IsOrganization())
        {
            if (secondAccount.Id != organizationId) return Unauthorized(new ErrorResponse(ErrorType.InsufficientPermission));
            return Ok(new ResultResponse<SimpleAccount>(SimpleAccount.Parse(secondAccount)));
        }

        var userAccount = secondAccount as User;
        if (userAccount!.OrganizationId != organizationId)
        {
            return Unauthorized(new ErrorResponse(ErrorType.InsufficientPermission));
        }
        return Ok(new ResultResponse<SimpleAccount>(SimpleAccount.Parse(secondAccount)));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        if (account.Role > (int)OrganizationRole.Moderator) return Unauthorized();
        
        var organizationId = account.IsOrganization() ? accountId : await GetOrganizationId(accountId);
        var users = _userManager.Users.Where(x => x.OrganizationId == organizationId).OrderBy(x => x.UserName).AsEnumerable();
        var simpleAccounts = new SimpleAccount[users.Count()];

        for (int i = 0; i < simpleAccounts.Length; i++)
        {
            simpleAccounts[i] = SimpleAccount.Parse(users.ElementAt(i));
        }
        return Ok(new ResultResponse<IEnumerable<SimpleAccount>>(simpleAccounts));
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> UpdateUserRole(string id, [FromBody] EditUserForm form)
    {
        if (form.OrganizationRole < (int)OrganizationRole.Owner || form.OrganizationRole > (int)OrganizationRole.Member) return BadRequest();
        if (form.OrganizationRole == (int)OrganizationRole.Owner) return Unauthorized();

        var accountId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (accountId == null || id == accountId) return Unauthorized();

        var account = await _accountManager.FindByIdAsync(accountId);
        if (account == null) return Unauthorized();

        if (account.Role > (int)OrganizationRole.Administrator) return Unauthorized(new ErrorResponse(ErrorType.InsufficientPermission));
        if (account.Role >= form.OrganizationRole) return Unauthorized(new ErrorResponse(ErrorType.InsufficientPermission));

        var targetUser = await _userManager.FindByIdAsync(id);
        if (targetUser == null) return NotFound();
        if (targetUser.Role <= account.Role) return Unauthorized(new ErrorResponse(ErrorType.InsufficientPermission));

        var organizationId = account.IsOrganization() ? accountId : await GetOrganizationId(accountId);
        if (targetUser.OrganizationId != organizationId) return Unauthorized(new ErrorResponse(ErrorType.InsufficientPermission));

        if (targetUser.Role == form.OrganizationRole) return Ok();

        targetUser.Role = form.OrganizationRole;
        await _userManager.UpdateAsync(targetUser);

        return Ok();
    }

    private async Task<string> GetOrganizationId(string accountId)
    {
        var account = await _accountManager.FindByIdAsync(accountId);

        if (account!.IsOrganization()) return accountId;
        return (account as User)!.OrganizationId;
    }
}