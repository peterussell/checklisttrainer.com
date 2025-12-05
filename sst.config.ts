/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "checklisttrainer",
      home: "aws",
      providers: {
        aws: {
          profile: input.stage === "prod" ? "checklisttrainer-prod" : "checklisttrainer-dev"
        } 
      },
      removal: input?.stage === "prod" ? "retain" : "remove",
      protect: ["prod"].includes(input?.stage),
    };
  },
  async run() {
    const web = await import("./infra/web");
    const backend = await import ("./infra/backend");
    const api = await import ("./infra/api");
  },
});
