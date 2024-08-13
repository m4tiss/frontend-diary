import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./providers/UserProvider";
import reportWebVitals from "./reportWebVitals";
import { DarkModeProvider } from "./providers/DarkModeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <DarkModeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </DarkModeProvider>
  // </React.StrictMode>
);
reportWebVitals();
