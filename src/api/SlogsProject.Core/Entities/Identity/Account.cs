using Microsoft.AspNetCore.Identity;
using SlogsProject.Core.Roles;
using SlogsProject.Core.Security.Token;
using System.ComponentModel.DataAnnotations;

namespace SlogsProject.Core.Entities.Identity;

public class Account : IdentityUser
{
    [Required]
    public int Role { get; set; }

    public IList<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public DateTime CreatedDateTime { get; set; } = DateTime.UtcNow;

    public bool IsOrganization() => (OrganizationRole)Role == OrganizationRole.Owner;
}