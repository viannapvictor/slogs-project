using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace SlogsProject.DAL.Context;

public sealed class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<SlogsDbContext>
{
    public SlogsDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(Directory.GetCurrentDirectory() + @"\..\SlogsProject.API\appsettings.json")
            .Build();

        var builder = new DbContextOptionsBuilder<SlogsDbContext>();
        var connectionString = configuration.GetConnectionString("SqlConnection");

        builder.UseSqlServer(connectionString);
        return new SlogsDbContext(builder.Options);
    }
}