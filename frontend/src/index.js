import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// Suppress React dev error overlay for R3F prop injection errors
// These are caused by the dev environment injecting debug attributes (x-line-number)
// into JSX elements, which R3F tries to set on Three.js objects.
// Our ErrorBoundary handles them gracefully — the overlay is just noise.
const suppressR3FErrors = (event) => {
  if (event.message && event.message.includes("R3F")) {
    event.stopImmediatePropagation();
  }
};
window.addEventListener("error", suppressR3FErrors);
window.addEventListener("unhandledrejection", suppressR3FErrors);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
