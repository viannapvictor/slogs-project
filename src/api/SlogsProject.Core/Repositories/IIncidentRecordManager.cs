using SlogsProject.Core.Entities.Organization;

namespace SlogsProject.Core.Repositories;

public interface IIncidentRecordManager : IGenericManager<IncidentRecord>
{
    public IAsyncEnumerable<IncidentRecord> GetAllAsync(string organizationId);
    public IEnumerable<IncidentRecord> GetAll(string organizationId);
    public IEnumerable<IncidentRecord> GetAllFromAccount(string accountId);
    public IAsyncEnumerable<IncidentRecord> GetAllFromAccountAsync(string accountId);
    public Task<IncidentRecord?> FindByIdAsync(Guid id);
    public Task RemoveAllAsync(string accountId);
}