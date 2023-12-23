using SlogsProject.Core.Entities.Identity;

namespace SlogsProject.API.Models.Auth;

public sealed class SimpleOrganization
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public static SimpleOrganization Parse(Organization organization)
    {
        return new SimpleOrganization
        {
            Id = organization.Id,
            Name = organization.UserName!
        };
    }
}