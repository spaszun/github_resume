import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import theme from "./config/theme";
import { ThemeProvider } from "styled-components";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
