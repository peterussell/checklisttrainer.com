import { StrictMode, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './mui-theme'

import './index.css'; // Loads tailwind

// Fonts
import "@fontsource/roboto-condensed/400.css";
import "@fontsource/roboto-condensed/700.css";
import "@fontsource/oxanium";

import { router } from './router';
import { queryClient } from './queryClient';
import apiClient from '../api/apiClient';

function InnerApp() {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  // Add Auth0 bearer token to outbound requests
  useEffect(() => {
    const interceptorId = apiClient.interceptors.request.use(async (config) => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (e) => {
      console.error('Error getting API token', e); // TODO: logger
      return Promise.reject(e);
    });

    return () => {
      apiClient.interceptors.request.eject(interceptorId);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isLoading,
          isAuthenticated,
          loginWithRedirect
      }}
    } />
  );
}

export function App() {
  return (
    <Auth0Provider
      domain="dev-sha0v78b1jbu5odf.us.auth0.com" // TODO: secrets
      clientId="1jXikjei6o8wKTtDKYPFfcI0IjAo1fk9" // TODO: secrets
      authorizationParams={{
        redirect_uri: window.location.origin, // TODO: should go to dashboard
        // audience: import.meta.env.VITE_API_URL
        audience: 'https://dev.api.checklisttrainer.com/'
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