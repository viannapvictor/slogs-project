using Microsoft.EntityFrameworkCore;
using SlogsProject.Core.Entities.Organization;
using SlogsProject.Core.Repositories;
using SlogsProject.DAL.Context;

namespace SlogsProject.DAL.Repositories;

public sealed class IncidentRecordManager : GenericManager<IncidentRecord>, IIncidentRecordManager
{
    public IncidentRecordManager(SlogsDbContext context): base(context)
    {
    }

    public async Task<IncidentRecord?> FindByIdAsync(Guid id)
    {
        return await Context.IncidentRecords.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
    }

    public async IAsyncEnumerable<IncidentRecord> GetAllAsync(string organizationId)
    {
        var items = Context.IncidentRecords.Where(x => x.OrganizationId == organizationId)
            .OrderByDescending(x => x.CreatedDateTime)
            .AsAsyncEnumerable();

        await foreach (var item in items)
        {
            yield return item;
        }
    }

    public IEnumerable<IncidentRecord> GetAll(string organizationId)
    {
        var items = Context.IncidentRecords.Where(x => x.OrganizationId == organizationId)
            .OrderByDescending(x => x.CreatedDateTime)
            .AsEnumerable();

        foreach (var item in items)
        {
            yield return item;
        }
    }

    public IEnumerable<IncidentRecord> GetAllFromAccount(string accountId)
    {
        var items = Context.IncidentRecords.Where(x => x.UserId == accountId)
            .OrderByDescending(x => x.CreatedDateTime)
            .AsEnumerable();

        foreach (var item in items)
        {
            yield return item;
        }
    }

    public async IAsyncEnumerable<IncidentRecord> GetAllFromAccountAsync(string accountId)
    {
        var items = Context.IncidentRecords.Where(x => x.UserId == accountId)
            .OrderByDescending(x => x.CreatedDateTime)
            .AsAsyncEnumerable();

        await foreach (var item in items)
        {
            yield return item;
        }
    }

    public async Task RemoveAllAsync(string accountId)
    {
        var incidentLogs = Context.IncidentRecords.Where(x => x.UserId == accountId);
        Context.RemoveRange(incidentLogs);

        await Context.SaveChangesAsync();
    }
}