import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { router } from "./routes/AppRoutes";
import GlobalProvider from "./context/GlobalProvider";
import App from "./App";
import Loader from "./components/common/Loader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <App>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </App>
    </GlobalProvider>
  </StrictMode>,
);
