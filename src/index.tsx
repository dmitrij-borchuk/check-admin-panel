import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { OrganizationProvider } from "./organizations/organizationContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OrganizationProvider>
      <App />
    </OrganizationProvider>
  </React.StrictMode>
);
