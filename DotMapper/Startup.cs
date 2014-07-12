using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DotMapper.Startup))]
namespace DotMapper
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
