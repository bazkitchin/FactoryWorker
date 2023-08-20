import "./styles.css";
import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Box from "./components/box";
import StatusComponent from "./components/status";
import FullScreenComponent from "./components/fullscreen";
import FaultCard from "./components/faultCard";
import MachineDeck from "./components/machineInfo";
import CanvasHelper from "./components/canvasHelper";

export default function App() {
  // const height: number = window.innerHeight - 32;
  // const width: number = window.innerWidth - 20;

  // const CANVAS: React.CSSProperties = {
  //   height: height,
  //   width: width,
  //   border: "2px solid rgba(0, 0, 0, 1)",
  // };

  return (
    <Provider store={store}>
      <div>
        <CanvasHelper />
      </div>
    </Provider>
  );
}
