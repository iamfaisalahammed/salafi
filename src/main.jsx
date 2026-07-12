import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import Root from "./Root/Root";




registerSW();




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
     <Root></Root>
    </BrowserRouter>
  </StrictMode>
);