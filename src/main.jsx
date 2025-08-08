import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@/i18n/index";
import ThemeProvider from '@/theme/ThemeProvider'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>
);
