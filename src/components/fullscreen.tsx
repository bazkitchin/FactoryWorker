import React from "react";

const FullScreenComponent: React.FC = () => {
  // const handle = useFullScreenHandle();
  const enterFullscreen = () => {
    // document.documentElement.webkitRequestFullScreen();
  };
  const exitFullscreen = () => {};

  return (
    <div>
      <h1>Fullscreen Example</h1>
      <button onClick={enterFullscreen}>Go Fullscreen</button>
      <button onClick={exitFullscreen}>Exit Fullscreen</button>
    </div>
  );
};

export default FullScreenComponent;
