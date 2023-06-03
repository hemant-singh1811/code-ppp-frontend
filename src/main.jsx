import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./stylesheet/index.css";
import { Provider } from "react-redux";
import { store } from "./store/app/store";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// @material-tailwind/react
import { ThemeProvider } from "@material-tailwind/react";
import RefreshPageModal from "./components/utilities/modal/RefreshPageModal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename={"/"}>
      <ThemeProvider>
        <ErrorBoundary fallback={<RefreshPageModal failed={true} />}>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
