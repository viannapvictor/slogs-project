using SlogsProject.Core.Security.Token;

namespace SlogsProject.Core.Repositories;

public interface IRefreshTokenManager : IGenericManager<RefreshToken>
{
    public Task<RefreshToken?> Find(string accountId, string value);

    public Task RemoveAllFromUser(string userId);
}