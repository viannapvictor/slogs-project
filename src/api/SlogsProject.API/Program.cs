namespace SlogsProject.API;

public sealed class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var startup = new Startup(builder.Configuration);
        
        startup.ConfigureServices(builder.Services);
        startup.ConfigureHost(builder.Host);
        
        var app = builder.Build();
        startup.ConfigureApp(app);
    }
}