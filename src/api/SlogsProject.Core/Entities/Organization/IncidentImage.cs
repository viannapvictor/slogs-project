using System.ComponentModel.DataAnnotations;

namespace SlogsProject.Core.Entities.Organization;

public sealed class IncidentImage
{
    [Key]
    public Guid Id { get; set; }

    public byte[] Image { get; set; } = Array.Empty<byte>();

    public Guid IncidentRecordId { get; set; }
}