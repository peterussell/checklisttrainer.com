export const site = new sst.aws.StaticSite("ChecklistTrainer", {
  path: "web",
  build: {
    command: "npm run build",
    output: "dist"
  }
})