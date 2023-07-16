import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "./theme";
import ResetCSS from "./theme/ResetCSS";
import NotesContextProvider from "./context/NotesContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider>
    <ResetCSS />
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </ThemeProvider>
);
