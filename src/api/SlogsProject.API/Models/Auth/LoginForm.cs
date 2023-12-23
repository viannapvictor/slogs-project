namespace SlogsProject.API.Models.Auth;

public sealed class LoginForm : AccountForm
{
    public bool Remember { get; set; }
}