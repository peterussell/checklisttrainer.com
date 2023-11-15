﻿using checklisttrainer.Services;
using Pulumi;

return await Deployment.RunAsync(() =>
{
    var config = new Config();
    var webService = new WebService(config);

    var webApp = webService.CreateWebApp();
});