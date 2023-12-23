using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace SlogsProject.Core.Security.Token;

public interface IJwtProvider
{
    public string GenerateAccessToken(IdentityUser user);

    public string GenerateRefreshToken();

    public JwtSecurityToken ReadToken(string accessToken);
}