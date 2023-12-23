namespace SlogsProject.API.Models.Auth;

public sealed class OrganizationForm : AccountForm
{
    public string Name { get; set; } = null!;

    public string Phone { get; set; } = null!;
}