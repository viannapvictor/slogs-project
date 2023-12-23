using SlogsProject.Core.Entities.Identity;

namespace SlogsProject.API.Models.Auth;

public sealed class SimpleAccount
{
    public string Id { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int Role { get; set; }

    public static SimpleAccount Parse(Account account)
    {
        return new SimpleAccount
        {
            Id = account.Id,
            Email = account.Email!,
            Name = account.UserName!,
            Role = account.Role
        };
    }
}