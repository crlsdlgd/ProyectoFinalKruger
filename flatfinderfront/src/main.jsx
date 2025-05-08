import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "@heroui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Este ToastProvider permite que el toast se muestre en la parte superior derecha de la pantalla */}
    <ToastProvider placement="top-right" toastOffset={30} />
    <App />
  </StrictMode>
);
