import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { router } from "./routes/AppRoutes";
import GlobalProvider from "./context/GlobalProvider";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </GlobalProvider>
  </StrictMode>,
);
