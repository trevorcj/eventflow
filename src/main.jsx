import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sileo";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster theme="light" position="top-center" offset={{ top: 60 }} />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
