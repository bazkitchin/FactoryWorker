import "./styles.css";
import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Box from "./components/box";
import StatusComponent from "./components/status";
import FullScreenComponent from "./components/fullscreen";
import FaultCard from "./components/faultCard";
import MachineDeck from "./components/machineInfo";

export default function App() {
  const CONTAINER: React.CSSProperties = {
    position: "absolute",
    left: 300,
  };
  const CANVAS: React.CSSProperties = {
    height: 500,
    width: 500,
    border: "2px solid rgba(0, 0, 0, 1)",
  };
  return (
    <Provider store={store}>
      <div>
        <h1 style={CONTAINER}>Box Drawing Example</h1>
        <canvas style={CANVAS}>
          <Box width={200} height={200} color="black" />
          <Box width={150} height={150} color="red" />
        </canvas>
        <StatusComponent />
      </div>
      <FaultCard />
      <MachineDeck />
    </Provider>
  );
}
