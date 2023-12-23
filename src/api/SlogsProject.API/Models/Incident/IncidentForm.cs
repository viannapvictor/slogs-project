using System.ComponentModel.DataAnnotations;

namespace SlogsProject.API.Models.Incident;

public sealed class IncidentForm
{
    [MaxLength(100)]
    [Required]
    public string Title { get; set; } = null!;

    [MaxLength(1000)]
    [Required]
    public string Description { get; set; } = null!;

    [Required]
    public string Urgency { get; set; } = null!;

    [MaxLength(4)]
    [DataType(DataType.Upload)]
    public IFormFile[] Images { get; set; } = Array.Empty<FormFile>();
}