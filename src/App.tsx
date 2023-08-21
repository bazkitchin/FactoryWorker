import "./styles.css";
import * as React from "react";
import { Provider } from "react-redux";
import store from "./store";
import CanvasHelper from "./components/canvasHelper";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <CanvasHelper />
      </div>
    </Provider>
  );
}
