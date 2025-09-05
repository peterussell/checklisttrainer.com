import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './mui-theme'

import './index.css'; // Loads tailwind

// Fonts
import "@fontsource/roboto-condensed/400.css";
import "@fontsource/roboto-condensed/700.css";

import { router } from './router';

function InnerApp() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  return <RouterProvider router={router} context={{ auth: { isLoading, isAuthenticated, loginWithRedirect }}} />
}

const queryClient = new QueryClient();

export function App() {
  return (
    <Auth0Provider
      domain="dev-sha0v78b1jbu5odf.us.auth0.com"
      clientId="1jXikjei6o8wKTtDKYPFfcI0IjAo1fk9"
      authorizationParams={{
        redirect_uri: window.location.origin // TODO: should go to dashboard
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <InnerApp />
        </ThemeProvider>
      </QueryClientProvider>
    </Auth0Provider>
  )
}


// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
        <StyledEngineProvider enableCssLayer>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <App />
        </StyledEngineProvider>
    </StrictMode>,
  )
}