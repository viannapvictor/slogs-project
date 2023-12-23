namespace SlogsProject.Core.Repositories;

public interface IGenericManager<T> where T : class
{
    public int Count { get; }

    public Task AddAsync(T item, CancellationToken cancellationToken = default);

    public Task UpdateAsync(T item, CancellationToken cancellationToken = default);

    public Task RemoveAsync(T item, CancellationToken cancellationToken = default);

    public IAsyncEnumerable<T> GetAllAsync();

    public IEnumerable<T> GetAll();
}