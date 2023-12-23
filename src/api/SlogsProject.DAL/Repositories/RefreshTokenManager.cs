using Microsoft.EntityFrameworkCore;
using SlogsProject.Core.Repositories;
using SlogsProject.Core.Security.Token;
using SlogsProject.DAL.Context;

namespace SlogsProject.DAL.Repositories;

public sealed class RefreshTokenManager : GenericManager<RefreshToken>, IRefreshTokenManager
{
    public RefreshTokenManager(SlogsDbContext context): base(context)
    {  
    }

    public async Task<RefreshToken?> Find(string accountId, string value)
    {
        return await Context.RefreshTokens
            .Where(t => t.AccountId == accountId && t.Value == value)
            .FirstOrDefaultAsync();
    }

    public async Task RemoveAllFromUser(string userId)
    {
        var tokens = Context.RefreshTokens.Where(t => t.AccountId == userId);
        Context.RefreshTokens.RemoveRange(tokens);
        
        await Context.SaveChangesAsync();
    }
}