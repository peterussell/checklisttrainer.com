import { aircraftBucket } from "./storage";

export const backend = new sst.aws.Function("ct-backend", {
  url: true,
  handler: "backend/src/index.handler",
  link: [aircraftBucket]
});
