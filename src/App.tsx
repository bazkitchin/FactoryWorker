import "./styles.css";
import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Box from "./components/box";
import StatusComponent from "./components/status";
import FullScreenComponent from "./components/fullscreen";
import FaultCard from "./components/faultCard";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Box Drawing Example</h1>
        <Box width={200} height={200} color="black" />
        <Box width={150} height={150} color="red" />
        <StatusComponent />
      </div>
      <FaultCard />
    </Provider>
  );
}
