import React from "react";

interface BoxProps {
  width: number;
  height: number;
  color: string;
}

const Box: React.FC<BoxProps> = ({ width, height, color }) => {
  const boxStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    border: "1px solid black",
  };

  const handleClick = () => {
    console.log('Mouse clicked');
  };

  return <button style={boxStyle} onClick={handleClick}>Click me</button>;

  //return <div style={boxStyle}></div>;
};

export default Box;
