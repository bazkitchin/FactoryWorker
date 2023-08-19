import React from "react";
import { useDispatch } from "react-redux";

interface BoxProps {
  width: number;
  height: number;
  color: string;
}

const Box: React.FC<BoxProps> = ({ width, height, color }) => {
  const dispatch = useDispatch();
  const boxStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    border: "1px solid black",
  };

  const handleClick = () => {
    dispatch({ type: "BUTTON_PRESSED_" + color });
    console.log("Mouse clicked");
  };

  return (
    <button style={boxStyle} onClick={handleClick}>
      Click me
    </button>
  );

  //return <div style={boxStyle}></div>;
};

export default Box;
