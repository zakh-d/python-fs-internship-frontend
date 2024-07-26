import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './Store/store.ts'
import { Auth0Provider } from '@auth0/auth0-react'
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './Config/config.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
     domain={AUTH0_DOMAIN}
     clientId={AUTH0_CLIENT_ID}
     authorizationParams={{
      redirect_uri: window.location.origin + '/login',
      audience: AUTH0_AUDIENCE,
     }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
)
