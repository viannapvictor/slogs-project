using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using SlogsProject.API.Workers;
using SlogsProject.Core.Entities.Identity;
using SlogsProject.Core.Repositories;
using SlogsProject.Core.Security.Settings;
using SlogsProject.Core.Security.Token;
using SlogsProject.DAL.Authentication;
using SlogsProject.DAL.Context;
using SlogsProject.DAL.Repositories;
using System.Text;

namespace SlogsProject.API;

public sealed class Startup
{
    public Startup(IConfigurationRoot configuration)
    {
        _configuration = configuration;
    }

    private readonly IConfigurationRoot _configuration;

    public void ConfigureServices(IServiceCollection services)
    {
        var sqlConnection = _configuration.GetConnectionString("SqlConnection");
        var tokenSettingsSection = _configuration.GetSection("TokenSettings");
        
        IdentityBuilder builder = services.AddIdentityCore<Account>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.User.AllowedUserNameCharacters = string.Empty;
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequiredLength = 6;
        });

        services.AddDbContext<SlogsDbContext>(options => options.UseSqlServer(sqlConnection));
        services.AddIdentity<Account, IdentityRole>().AddEntityFrameworkStores<SlogsDbContext>();
        services.AddIdentityCore<User>().AddEntityFrameworkStores<SlogsDbContext>();
        services.AddIdentityCore<Organization>().AddEntityFrameworkStores<SlogsDbContext>();
        services.Configure<TokenSettings>(tokenSettingsSection);

        var tokenSettings = tokenSettingsSection.Get<TokenSettings>()!;
        var key = Encoding.ASCII.GetBytes(tokenSettings.SecretKey);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidIssuer = tokenSettings.Issuer,
                ValidAudience = tokenSettings.Audience,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = tokenSettings.ValidateLifetime,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero,
            };
            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    context.Token = context.Request.Cookies["auth-token"];
                    return Task.CompletedTask;
                }
            };
        });

        services.AddCors();
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddScoped<IJwtProvider, JwtProvider>();
        services.AddScoped<IRefreshTokenManager, RefreshTokenManager>();
        services.AddScoped<IIncidentRecordManager, IncidentRecordManager>();
        services.AddHostedService<TokenWorker>();
    }

    public void ConfigureHost(IHostBuilder host)
    {
        host.UseSerilog((context, loggerConfiguration) =>
        {
            loggerConfiguration.WriteTo.Console();
            loggerConfiguration.ReadFrom.Configuration(context.Configuration);
        });
    }

    public void ConfigureApp(WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            
            CreateDatabase(app);
        }

        //app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseCors(options =>
        {
            options.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
            options.AllowAnyHeader();
            options.AllowCredentials();
            options.AllowAnyMethod();
        });

        app.MapControllers();
        app.Run();
    }

    public void CreateDatabase(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>()?.CreateScope();

        var context = serviceScope?.ServiceProvider.GetRequiredService<SlogsDbContext>();
        context?.Database.Migrate();
    }
}