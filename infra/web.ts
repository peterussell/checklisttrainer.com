import { api } from './api';

// URL
let DOMAIN = '';
if ($dev) {
  DOMAIN = 'localhost:5173';
} else {
  DOMAIN = $app.stage === "prod" ? "checklisttrainer.com" : "dev.checklisttrainer.com";
}

export const site = new sst.aws.StaticSite("ct-web", {
  path: "web",
  domain: 'checklisttrainer.com',
  build: {
    command: "npm run build",
    output: "dist"
  },
  environment: {
    VITE_API_URL: api.url,
    VITE_WEB_URL: `${$dev ? 'http://' : 'https://'}${DOMAIN}`
  }
});
