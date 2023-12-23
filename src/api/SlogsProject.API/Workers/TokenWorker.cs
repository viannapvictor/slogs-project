using SlogsProject.Core.Repositories;

namespace SlogsProject.API.Workers;

public sealed class TokenWorker : BackgroundService
{
    public TokenWorker(IServiceProvider serviceProvider, ILogger<TokenWorker> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<TokenWorker> _logger;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await CleanExpiredTokens(stoppingToken);
            await Task.Delay(TimeSpan.FromHours(12), stoppingToken);
        }
    }

    private async Task CleanExpiredTokens(CancellationToken stoppingToken)
    {
        using IServiceScope scope = _serviceProvider.CreateScope();
        var refreshTokenRepository = scope.ServiceProvider.GetRequiredService<IRefreshTokenManager>();

        int deletedCount = 0;
        var refreshTokens = refreshTokenRepository.GetAllAsync();

        await foreach (var refreshToken in refreshTokens)
        {
            if (refreshToken.Expiration > DateTime.UtcNow) continue;

            await refreshTokenRepository.RemoveAsync(refreshToken, stoppingToken);
            deletedCount++;
        }
        _logger.LogInformation("Removed {DeletedCount} expired tokens from database.", deletedCount);
    }
}