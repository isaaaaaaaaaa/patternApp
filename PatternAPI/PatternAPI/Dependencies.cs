using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PatternsAPI.DAL.Context;

public static class Dependencies
    {
        public static void ConfigureServices(IConfiguration configuration, IServiceCollection services, bool isDev)
        {
            var cs = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContextPool<PatternsContext>(options => options.UseMySql(cs, ServerVersion.AutoDetect(cs)));


    }

}
