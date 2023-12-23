using System.ComponentModel.DataAnnotations;

namespace SlogsProject.API.Models.Organizations;

public sealed class EditUserForm
{
    [Required]
    public int OrganizationRole { get; set; }
}