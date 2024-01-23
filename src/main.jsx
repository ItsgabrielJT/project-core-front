import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme"

const theme = createTheme({
  direction: 'rtl'
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
