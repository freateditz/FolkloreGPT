import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Import and initialize ResizeObserver fix
import initializeResizeObserverFix from "./lib/resizeObserverFix";

// Initialize the ResizeObserver error fix
initializeResizeObserverFix();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);