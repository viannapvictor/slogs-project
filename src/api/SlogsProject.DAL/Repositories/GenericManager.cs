using SlogsProject.Core.Repositories;
using SlogsProject.DAL.Context;

namespace SlogsProject.DAL.Repositories;

public class GenericManager<T> : IGenericManager<T> where T : class
{
    protected GenericManager(SlogsDbContext context)
    {
        Context = context;
    }

    protected SlogsDbContext Context { get; }

    public int Count => Context.Set<T>().Count();

    public async Task AddAsync(T item, CancellationToken cancellationToken = default)
    {
        await Context.Set<T>().AddAsync(item, cancellationToken);
        await Context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(T item, CancellationToken cancellationToken = default)
    {
        Context.Set<T>().Update(item);
        await Context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveAsync(T item, CancellationToken cancellationToken = default)
    {
        Context.Set<T>().Remove(item);
        await Context.SaveChangesAsync(cancellationToken);
    }

    public async IAsyncEnumerable<T> GetAllAsync()
    {
        var items = Context.Set<T>().AsAsyncEnumerable();
        await foreach (var item in items)
        {
            yield return item;
        }
    }

    public IEnumerable<T> GetAll()
    {
        var items = Context.Set<T>().AsEnumerable();
        return items;
    }
}