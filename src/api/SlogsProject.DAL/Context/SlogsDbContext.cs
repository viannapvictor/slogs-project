using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SlogsProject.Core.Entities.Identity;
using SlogsProject.Core.Entities.Organization;
using SlogsProject.Core.Security.Token;

namespace SlogsProject.DAL.Context;

public sealed class SlogsDbContext : IdentityDbContext<Account>
{
    public SlogsDbContext(DbContextOptions<SlogsDbContext> options): base(options)
    {
    }

    public DbSet<Organization> OrganizationAccounts { get; set; } = null!;

    public DbSet<User> UserAccounts { get; set; } = null!;

    public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;

    public DbSet<IncidentRecord> IncidentRecords { get; set; } = null!;

    public DbSet<IncidentImage> IncidentImages { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Organization>()
            .HasMany(x => x.Users)
            .WithOne(x => x.Organization).OnDelete(DeleteBehavior.NoAction);

        builder.Entity<User>()
            .HasOne(x => x.Organization)
            .WithMany(x => x.Users).OnDelete(DeleteBehavior.NoAction);
    }
}