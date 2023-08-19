// src/components/StatusComponent.tsx

import React from "react";
import { useSelector } from "react-redux";

const StatusComponent: React.FC = () => {
  const isButton1Pressed = useSelector((state: any) => state.isButton1Pressed);
  const isButton2Pressed = useSelector((state: any) => state.isButton2Pressed);

  return (
    <div>
      {isButton1Pressed && isButton2Pressed
        ? "Both Button has been pressed"
        : "Button has not been pressed"}
    </div>
  );
};

export default StatusComponent;
