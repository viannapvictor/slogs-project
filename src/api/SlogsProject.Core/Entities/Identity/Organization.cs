using Microsoft.EntityFrameworkCore;
using SlogsProject.Core.Entities.Organization;
using SlogsProject.Core.Roles;

namespace SlogsProject.Core.Entities.Identity;

public sealed class Organization : Account
{
    public IList<User> Users { get; set; } = null!;

    [DeleteBehavior(DeleteBehavior.Cascade)]
    public IList<IncidentRecord> IncidentRecords { get; set; } = new List<IncidentRecord>();
}