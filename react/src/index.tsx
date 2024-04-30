import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import "./assets/styles/fonts.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "./context/auth-context";
import App from "./App";
import "./libs/axios";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
