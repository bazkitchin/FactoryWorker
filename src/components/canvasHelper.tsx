import React, { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import "./styles/canvasStyle.css";

const CanvasHelper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const windowRef = useRef<HTMLCanvasElement | null>(null);
  const [paragraphContent, setParagraphContent] =
    useState<string>("Initial content");

  const contextRef = useRef(null);
  const scale = 2;
  let mouseUp = false;
  let mouseX = -1;
  let mouseY = -1;
  let mouseOffsetX = -1;
  let mouseOffsetY = -1;

  useEffect(() => {
    const debounce = (func: () => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
      };
    };

    const handleResize = () => {
      console.log("Window has been resized");
      const canvas = canvasRef.current;
      const window = windowRef.current;
      let windowWidth: number = 0;
      let windowHeight: number = 0;

      if (canvas && window) {
        const windowContext = window.getContext("2d");
        if (windowContext) {
          const canvasOffSet = window.getBoundingClientRect();
          windowWidth = canvasOffSet.right - canvasOffSet.left;
          windowHeight = canvasOffSet.bottom - canvasOffSet.top;
        }
        const context = canvas.getContext("2d");

        canvas.width = windowWidth * scale;
        canvas.height = windowHeight * scale;
        canvas.style.width = windowWidth + "px";
        canvas.style.height = windowHeight + "px";
        if (context) {
          context.scale(scale, scale);
          redrawAll();
          const canvasOffSet = canvas.getBoundingClientRect();
          mouseOffsetX = canvasOffSet.left;
          mouseOffsetY = canvasOffSet.top;
          //   const sizeString: string =
          //     "Canvas = T:" +
          //     canvasOffSet.top +
          //     ", B:" +
          //     canvasOffSet.bottom +
          //     ", L:" +
          //     canvasOffSet.right +
          //     ", R:" +
          //     canvasOffSet.left;
          //   setParagraphContent(sizeString);

          //   context.fillText(sizeString, 0, 20);
          //   context.fillText(canvas.width + "x" + canvas.height, 0, 20);
          //   context.fillRect(100, 100, 100, 100);
        }
      }
    };
    // Run initially
    handleResize();

    // Create a debounced version of handleResize
    const debouncedResize = debounce(handleResize, 300); // Adjust the delay as needed

    // Add a resize event listener with the debounced handler
    window.addEventListener("resize", debouncedResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  const redrawAll = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
        //
        context.font = "20px Arial";
        context.fillText(mouseX + "x" + mouseY, 0, 20);
        if (mouseUp === true) {
          context.fillStyle = "red";
          mouseUp = false;
        } else {
          context.fillStyle = "blue";
        }
        context.fillRect(100, 100, 100, 100);
      }
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    // const canvas = canvasRef.current;
    // if (canvas) {
    //   const context = canvas.getContext("2d");
    //   if (context) {
    //     context.fillStyle = "red";
    //     redrawAll();
    //   }
    // }
    mouseUp = true;
    mouseX = event.clientX - mouseOffsetX;
    mouseY = event.clientY - mouseOffsetY;
    redrawAll();
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas className="canvas-container-rect" ref={windowRef}></canvas>
      <canvas
        className="canvas-absolute-position"
        ref={canvasRef}
        onMouseUp={handleMouseUp}
      ></canvas>
      {/* <h1>{paragraphContent}</h1> */}
    </div>
  );
};

export default CanvasHelper;
