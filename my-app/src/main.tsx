import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { AppSettingsProvider } from "./context/ThemeContext"

const domain = "dev-58sohelnfhto52xa.us.auth0.com";
const clientId = "lC2PpO357H0isxvlhRff3DCxofUGPdiM";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
             redirect_uri: `${window.location.origin}/Movie-app`,
            scope: "openid profile email",
          }}
        >
          <AppSettingsProvider>
            <App />
          </AppSettingsProvider>
        </Auth0Provider>
      </HashRouter>
    </Provider>
  </StrictMode>
);
