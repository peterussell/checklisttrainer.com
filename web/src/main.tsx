import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import './index.css'; // Loads tailwindcss
import { router } from './router';

function InnerApp() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  return <RouterProvider router={router} context={{ auth: { isLoading, isAuthenticated, loginWithRedirect }}} />
}

export function App() {
  return (
    <Auth0Provider
        domain="dev-sha0v78b1jbu5odf.us.auth0.com"
        clientId="1jXikjei6o8wKTtDKYPFfcI0IjAo1fk9"
        authorizationParams={{
          redirect_uri: window.location.origin // TODO: should go to dashboard
        }}
      >
      <InnerApp />
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