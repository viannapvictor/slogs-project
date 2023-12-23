using SlogsProject.Core.Entities.Identity;
using System.ComponentModel.DataAnnotations;

namespace SlogsProject.Core.Security.Token;

public sealed class RefreshToken
{
    [Key]
    public Guid Id { get; set; }

    public Account Account { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public string Value { get; set; } = null!;

    public bool Remember { get; set; }

    public DateTime Expiration { get; set; }
}