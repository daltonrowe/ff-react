import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App/App";
import "./index.css";
import { GameStore } from "./store/game";

const { updateTurnOrder } = GameStore.getState();
updateTurnOrder();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
