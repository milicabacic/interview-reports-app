import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Modal from "./components/Modal/Modal";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>

//  <Modal></Modal>
);
