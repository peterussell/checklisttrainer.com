using Pulumi;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Web;

namespace checklisttrainer.Services;

internal class WebService : IService
{
    Config _config;

    public WebService(Config config)
    {
        _config = config;
    }

    public void Build()
    {
        var rg = createResourceGroup("ct-web-001");
        createWebApp("ct-react-app", rg.Name);
    }

    private ResourceGroup createResourceGroup(string name)
    {
        var args = new ResourceGroupArgs
        {
            Location = _config.Get("location") ?? "centralus"
        };

        return new ResourceGroup(name, args);
    }

    private WebApp createWebApp(string name, Input<string> resourceGroupName)
    {
        var args = new WebAppArgs
        {
            Kind = "app",
            ResourceGroupName = resourceGroupName,
            Location = _config.Get("location") ?? "centralus",
            HttpsOnly = true
        };

        return new WebApp(name, args);
    }
}
