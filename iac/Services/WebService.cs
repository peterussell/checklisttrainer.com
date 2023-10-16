using Pulumi.AzureNative.Resources;

namespace checklisttrainer.Services;

internal class WebService : IService
{
    public void Build()
    {
        createWebResourceGroup("ct-web-001");
    }

    private ResourceGroup createWebResourceGroup(string name) => new ResourceGroup(name);
}

