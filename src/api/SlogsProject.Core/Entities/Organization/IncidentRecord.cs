using SlogsProject.Core.Entities.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SlogsProject.Core.Entities.Organization;

public sealed class IncidentRecord
{
    [Key]
    public Guid Id { get; set; }

    public string OrganizationId { get; set; } = null!;

    [JsonIgnore]
    public Identity.Organization Organization { get; set; } = null!;

    public string? UserId { get; set; }

    [JsonIgnore]
    public User? User { get; set; }

    [MaxLength(100)]
    [Required]
    public string Title { get; set; } = null!;

    [MaxLength(1000)]
    [Required]
    public string Description { get; set; } = null!;

    [Required]
    public Urgency Urgency { get; set; }

    [MaxLength(4)]
    public IList<IncidentImage> Images { get; set; } = new List<IncidentImage>();

    [Required]
    public DateTime CreatedDateTime { get; set; } = DateTime.UtcNow;
}