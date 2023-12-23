namespace SlogsProject.Core.Security.Settings;

public sealed class TokenSettings
{
    public required string SecretKey { get; set; }

    public required string Audience { get; set; }

    public required string Issuer { get; set; }

    public required double RefreshTokenExpiryTimeInDays { get; set; }

    public required double AccessTokenExpiryTimeInMinutes { get; set; }

    public required bool ValidateLifetime { get; set; }
}