import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import { store } from "./store";
const domain="dev-58sohelnfhto52xa.us.auth0.com";

const clientId = "lC2PpO357H0isxvlhRff3DCxofUGPdiM";  

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: window.location.origin,
            scope: "openid profile email" 
          }}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
