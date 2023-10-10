import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./store/context";
import "./index.css";

import { ThemeProvider } from "./store/themeContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <ThemeProvider>
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
  </ThemeProvider>
  </>
);
