using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SlogsProject.Core.Security.Settings;
using SlogsProject.Core.Security.Token;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SlogsProject.DAL.Authentication;

public sealed class JwtProvider : IJwtProvider
{
    public JwtProvider(IOptions<TokenSettings> tokenSettings)
    {
        _tokenSettings = tokenSettings.Value;
    }

    private readonly JwtSecurityTokenHandler _tokenHandler = new();
    private readonly TokenSettings _tokenSettings;

    public string GenerateAccessToken(IdentityUser user)
    {
        var key = Encoding.ASCII.GetBytes(_tokenSettings.SecretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName!)
            }),
            Expires = DateTime.UtcNow.AddMinutes(_tokenSettings.AccessTokenExpiryTimeInMinutes),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Audience = _tokenSettings.Audience,
            Issuer = _tokenSettings.Issuer,
        };
        var token = _tokenHandler.CreateToken(tokenDescriptor);
        return _tokenHandler.WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        Span<byte> tokenBytes = stackalloc byte[32];
        using (var numberGenerator = RandomNumberGenerator.Create())
        {
            numberGenerator.GetBytes(tokenBytes);
        }
        return Convert.ToBase64String(tokenBytes);
    }

    public JwtSecurityToken ReadToken(string accessToken)
    {
        var securityToken = _tokenHandler.ReadJwtToken(accessToken);
        return securityToken;
    }
}