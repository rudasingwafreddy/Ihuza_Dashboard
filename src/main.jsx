import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app.jsx";
import { ThemeProvider } from "./contexts/theme-context";
import { AuthProvider } from "./contexts/auth-context";
import { DataProvider } from "./contexts/data-context";
import { Toaster } from "./components/base/toast.jsx";
import { ErrorBoundary } from "./components/error-boundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <DataProvider>
              <App />
              <Toaster />
            </DataProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
