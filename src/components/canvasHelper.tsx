import React, { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import "./styles/canvasStyle.css";
import { machineList, machine, handleLinks } from "./machineInfo";

const CanvasHelper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const windowRef = useRef<HTMLCanvasElement | null>(null);
  const [paragraphContent, setParagraphContent] =
    useState<string>("Initial content");

  let selectedFloor: number = 1;

  const contextRef = useRef(null);
  const scale = 2;
  let mouseUp = false;
  let mouseX = -1;
  let mouseY = -1;
  let mouseOffsetX = -1;
  let mouseOffsetY = -1;
  let clickedMachine = -1;

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
          const canvasOffSet = canvas.getBoundingClientRect();
          mouseOffsetX = canvasOffSet.left;
          mouseOffsetY = canvasOffSet.top;
          redrawAll();
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

  const drawRect = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    colour: string,
    positionX: number,
    positionY: number,
    width: number,
    height: number
  ): boolean => {
    let scaledPosX = Math.round((canvas.width * positionX) / scale);
    let scaledPosY = Math.round((canvas.height * positionY) / scale);
    let scaledWidth = Math.round((canvas.width * width) / scale);
    let scaledHeight = Math.round((canvas.height * height) / scale);
    context.fillStyle = colour;
    context.fillRect(scaledPosX, scaledPosY, scaledWidth, scaledHeight);
    let clicked = false;
    if (
      mouseUp &&
      mouseX >= scaledPosX &&
      mouseY >= scaledPosY &&
      mouseX < scaledPosX + scaledWidth &&
      mouseY < scaledPosY + scaledHeight
    ) {
      context.strokeStyle = "white";
      context.fillStyle = "white";
      mouseUp = false; // register first mouse "hit"
      clicked = true;
    } else {
      context.strokeStyle = "black";
      context.fillStyle = "black";
      clicked = false;
    }
    context.strokeRect(scaledPosX, scaledPosY, scaledWidth, scaledHeight);
    return clicked;
  };

  const drawMachines = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    id: number
  ) => {
    let machine = machineList[id];
    if (machine) {
      let scaledPosX = Math.round((canvas.width * machine.x) / scale);
      let scaledPosY = Math.round((canvas.height * machine.y) / scale);
      let scaledWidth = Math.round((canvas.width * 0.1) / scale);
      let scaledHeight = Math.round((canvas.height * 0.1) / scale);
      if (
        drawRect(
          canvas,
          context,
          machine.type.colour,
          machine.x,
          machine.y,
          0.1,
          0.1
        )
      )
        clickedMachine = id;
      context.fillStyle = machine.type.colour;
      context.font = "10px Arial";
      context.fillText(machine.name, scaledPosX, scaledPosY - 5);
    }
  };

  const drawLine = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    colour: string,
    startId: number,
    endId: machine
  ) => {
    context.beginPath();
    let machine = machineList[startId];
    if (machine) {
      let scaledPosX = Math.round((canvas.width * machine.x) / scale);
      let scaledPosY = Math.round((canvas.height * machine.y) / scale);
      let scaledWidth = Math.round((canvas.width * 0.1) / (scale * 2));
      let scaledHeight = Math.round((canvas.height * 0.1) / (scale * 2));
      context.moveTo(scaledPosX + scaledWidth, scaledPosY + scaledHeight);
    }
    if (endId) {
      let scaledPosX = Math.round((canvas.width * endId.x) / scale);
      let scaledPosY = Math.round((canvas.height * endId.y) / scale);
      let scaledWidth = Math.round((canvas.width * 0.1) / (scale * 2));
      let scaledHeight = Math.round((canvas.height * 0.1) / (scale * 2));
      context.lineTo(scaledPosX + scaledWidth, scaledPosY + scaledHeight);
    }
    context.strokeStyle = colour;
    context.lineWidth = 3;
    context.stroke();
  };

  const redrawAll = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
        // clear cavnas
        context.fillStyle = "lightgrey";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // draw floor marks
        if (drawRect(canvas, context, "royalblue", 0.95, 0.15, 0.05, 0.15))
          selectedFloor = 3;
        if (drawRect(canvas, context, "seagreen", 0.95, 0.45, 0.05, 0.15))
          selectedFloor = 2;
        if (drawRect(canvas, context, "slategrey", 0.95, 0.75, 0.05, 0.15))
          selectedFloor = 1;
        handleLinks();
        // draw machines
        for (let i = 0; i < machineList.length; i++) {
          if (machineList[i].floor === selectedFloor) {
            let colour = "white";
            // if (i === clickedMachine) colour = "green";
            for (let j = 0; j < machineList[i].links.length; j++) {
              drawLine(canvas, context, colour, i, machineList[i].links[j]);
            }
            context.lineWidth = 1;
            drawMachines(canvas, context, i);
          }
        }

        context.fillStyle = "black";
        context.font = "20px Arial";
        // context.fillText(canvas.width + "x" + canvas.height, 0, 20);
        // context.fillText(mouseX + "x" + mouseY, 0, 20);

        if (mouseUp === true) {
          context.fillStyle = "red";
        } else {
          context.fillStyle = "black";
        }
        context.font = "20px Arial";

        // context.fillText(canvas.width + "x" + canvas.height, 0, 20);
        if (machineList[clickedMachine] && !mouseUp) {
          context.fillText(" " + machineList[clickedMachine].name, 0, 20);
        }
        //context.fillText(mouseX + "x" + mouseY, 0, 20);
      }
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
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
    </div>
  );
};

export default CanvasHelper;
