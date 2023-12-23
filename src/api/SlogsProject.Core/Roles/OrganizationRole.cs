using SlogsProject.Core.Roles.Organization;

namespace SlogsProject.Core.Roles;

public abstract class OrganizationRole
{
    private static OrganizationRole[] _roles = Array.Empty<OrganizationRole>();

    public static readonly OrganizationRole Owner = new Owner();
    public static readonly OrganizationRole Administrator = new Administrator();
    public static readonly OrganizationRole Moderator = new Moderator();
    public static readonly OrganizationRole Member = new Member();

    protected OrganizationRole()
    {
        Value = _roles.Length;
        
        Array.Resize(ref _roles, _roles.Length + 1);
        _roles[^1] = this;
    }

    private int Value { get; }

    public static explicit operator OrganizationRole(int value) => _roles[value];
    public static explicit operator int(OrganizationRole value) => value.Value;
}