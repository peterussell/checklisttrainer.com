/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "checklisttrainer",
      home: "aws",
      providers: {
        aws: {
          profile: input.stage === "production" ? "checklisttrainer-prod" : "checklisttrainer-dev"
        }
      },
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
    };
  },
  async run() {
    const web = await import("./infra/web");
  },
});
