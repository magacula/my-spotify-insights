import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/LoginPage";
import { GlobalStyles } from "./styles/GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <LoginPage />
  </React.StrictMode>,
  document.getElementById("root")
);
