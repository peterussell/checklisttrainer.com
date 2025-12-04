import { api } from './api';

export const site = new sst.aws.StaticSite("ct-web", {
  path: "web",
  build: {
    command: "npm run build",
    output: "dist"
  },
  environment: {
    VITE_API_URL: api.url
  }
})