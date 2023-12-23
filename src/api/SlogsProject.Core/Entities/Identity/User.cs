using Microsoft.EntityFrameworkCore;
using SlogsProject.Core.Entities.Organization;

namespace SlogsProject.Core.Entities.Identity;

public sealed class User : Account
{
    public string OrganizationId { get; set; } = null!;

    public Organization Organization { get; set; } = null!;

    [DeleteBehavior(DeleteBehavior.Cascade)]
    public IList<IncidentRecord> IncidentRecords { get; set; } = new List<IncidentRecord>();
}