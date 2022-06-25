import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Application";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>

//  <Modal></Modal>
);
