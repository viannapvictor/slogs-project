using System.ComponentModel.DataAnnotations;

namespace SlogsProject.API.Models.Auth;

public class AccountForm
{
    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}