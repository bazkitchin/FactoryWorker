// src/store/index.ts

import { createStore } from "redux";

interface AppState {
  isButton1Pressed: boolean;
  isButton2Pressed: boolean;
}

const initialState: AppState = {
  isButton1Pressed: false,
  isButton2Pressed: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "BUTTON_PRESSED_black":
      return { ...state, isButton1Pressed: true };
    case "BUTTON_PRESSED_red":
      return { ...state, isButton2Pressed: true };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
