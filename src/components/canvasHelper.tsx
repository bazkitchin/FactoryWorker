import React, { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import "./styles/canvasStyle.css";
import * as machine from "./machineInfo";
import { shuffleArray } from "./helperFunctions";
import * as player from "./playerInfo";
import * as fault from "./faultCard";

const CanvasHelper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const windowRef = useRef<HTMLCanvasElement | null>(null);
  const [paragraphContent, setParagraphContent] =
    useState<string>("Initial content");
  const contextRef = useRef(null);

  // game related
  let newGame: boolean = true;
  let numberOfPlayers: number = 4;
  let players: player.player[] = [];
  let spannerDeckGame: player.spanner[];
  let faultDeckGame: fault.faultCard[] = [];
  let faultDeckGameDiscard: fault.faultCard[] = [];
  let currentPlayerNum: number = 0;
  let currentPlayer: player.player;
  let gameEvents: string = "";
  let faultCardsDrawn: number = 2;

  //interface related
  const scale = 2;
  let selectedFloor: number = 1;
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

  const drawText = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    text: string,
    colour: string,
    positionX: number,
    positionY: number
  ) => {
    let scaledPosX = Math.round((canvas.width * positionX) / scale);
    let scaledPosY = Math.round((canvas.height * positionY) / scale);
    context.fillText(text, scaledPosX, scaledPosY);
  };

  const drawRect = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    colour: string,
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    clickable: boolean = true
  ): boolean => {
    let scaledPosX = Math.round((canvas.width * positionX) / scale);
    let scaledPosY = Math.round((canvas.height * positionY) / scale);
    let scaledWidth = Math.round((canvas.width * width) / scale);
    let scaledHeight = Math.round((canvas.height * height) / scale);
    context.fillStyle = colour;
    context.fillRect(scaledPosX, scaledPosY, scaledWidth, scaledHeight);
    if (!clickable) {
      context.strokeStyle = "black";
      context.strokeRect(scaledPosX, scaledPosY, scaledWidth, scaledHeight);
      return false;
    }
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
    let newMachine = machine.machineList[id];
    if (newMachine) {
      let scaledPosX = Math.round((canvas.width * newMachine.x) / scale);
      let scaledPosY = Math.round((canvas.height * newMachine.y) / scale);
      let scaledWidth = Math.round((canvas.width * 0.1) / scale);
      let scaledHeight = Math.round((canvas.height * 0.1) / scale);
      if (
        drawRect(
          canvas,
          context,
          newMachine.type.colour,
          newMachine.x,
          newMachine.y,
          0.1,
          0.1
        )
      ) {
        clickedMachine = id;
      }
      if (newMachine.computer) {
        let faultPosX = newMachine.x;
        let faultPosY = newMachine.y;
        let faultSizeX = 0.033; // * 0.33;
        let faultSizeY = 0.033; // * 0.33;
        drawRect(
          canvas,
          context,
          "darkgrey",
          faultPosX,
          faultPosY,
          faultSizeX,
          faultSizeY,
          false
        );
      }
      if (newMachine.toolbox) {
        let faultPosX = newMachine.x + 0.066;
        let faultPosY = newMachine.y;
        let faultSizeX = 0.033; // * 0.33;
        let faultSizeY = 0.033; // * 0.33;
        drawRect(
          canvas,
          context,
          "DarkRed",
          faultPosX,
          faultPosY,
          faultSizeX,
          faultSizeY,
          false
        );
      }
      for (let i = 0; i < newMachine.faults; i++) {
        let faultPosX = newMachine.x + 0.1 * 0.33 * i;
        let faultPosY = newMachine.y + 0.1 * 0.66;
        let faultSizeX = 0.033; // * 0.33;
        let faultSizeY = 0.033; // * 0.33;
        drawRect(
          canvas,
          context,
          newMachine.type.faultColour,
          faultPosX,
          faultPosY,
          faultSizeX,
          faultSizeY,
          false
        );
      }
      context.fillStyle = newMachine.type.colour;
      context.font = "10px Arial";
      context.fillText(newMachine.name, scaledPosX, scaledPosY - 5);
    }
  };

  const drawLine = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    colour: string,
    startId: number,
    endId: machine.machine
  ) => {
    context.beginPath();
    let newMachine = machine.machineList[startId];
    if (newMachine) {
      let scaledPosX = Math.round((canvas.width * newMachine.x) / scale);
      let scaledPosY = Math.round((canvas.height * newMachine.y) / scale);
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

  const drawPlayers = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => {
    for (let i = 0; i < players.length; i++) {
      let top = 0.15 + 0.2 * i;
      let col = players[i].colour;
      drawRect(canvas, context, col, 0, top, 0.05, 0.15);
      if (players[i] && players[i].spanners) {
        for (let j = 0; j < players[i].spanners.length; j++) {
          let newTop = top + 0.02 * j;
          let col = players[i].spanners[j].type.colour;
          drawRect(canvas, context, col, 0.05, newTop, 0.02, 0.01, false);
        }
      }
    }
  };

  function givePlayerSpanner() {
    for (let i = 0; i < 2; i++) {
      if (spannerDeckGame.length <= 0) {
        gameEvents = "Ran out of spanners!";
        newGame = true;
      }
      let newSpanner = spannerDeckGame.pop();
      if (newSpanner?.type == machine.type6) {
        gameEvents = "Player " + (currentPlayerNum + 1) + " draw a JAM!";
      } else {
        if (newSpanner) currentPlayer.spanners.push(newSpanner);
      }
    }
  }

  function setupPlayers() {
    players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      let newPlayer: player.player = {
        name: "Player " + i,
        colour: "blue",
        location: machine.machineList[7],
        spanners: [],
      };
      for (let j = 0; j < 2; j++) {
        let newSpanner = spannerDeckGame.pop();
        if (newSpanner) newPlayer.spanners.push(newSpanner);
      }
      players.push(newPlayer);
    }
  }

  function drawFaultCards(num: number, faults: number = 1) {
    for (let i = 0; i < num; i++) getFaultCard(faults);
  }

  function getFaultCard(num: number = 1) {
    let newFault = faultDeckGame.pop();
    if (!newFault) return;
    giveFaultsToMachine(newFault.machineRef, num);
    faultDeckGameDiscard.push(newFault);
  }

  function giveFaultsToMachine(machine: machine.machine, num: number) {
    if (num === 3) {
      machine.faults = 3;
      return;
    }
    machine.faults += num;
    if (machine.faults >= 4) {
      machine.faults = 4;
      gameEvents = machine.name + " is now on FIRE!";
    }
    return;
  }

  const redrawAll = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // --------------------------------------- start of new game
        if (newGame) {
          newGame = false;
          machine.handleLinks();
          player.makeSpannerDeck();
          fault.buildFaultCards();
          spannerDeckGame = shuffleArray<player.spanner>(player.spannerDeck);
          faultDeckGameDiscard = [];
          faultDeckGame = shuffleArray<fault.faultCard>(fault.faultDeck);
          setupPlayers();
          player.addJamSpanners(spannerDeckGame);
          spannerDeckGame = shuffleArray<player.spanner>(spannerDeckGame);
          currentPlayer = players[0];
          currentPlayerNum = 0;
          drawFaultCards(3, 3);
          drawFaultCards(3, 2);
          drawFaultCards(3, 1);
        }
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

        // draw machines
        for (let i = 0; i < machine.machineList.length; i++) {
          if (machine.machineList[i].floor === selectedFloor) {
            let colour = "white";
            // if (i === clickedMachine) colour = "green";
            for (let j = 0; j < machine.machineList[i].links.length; j++) {
              drawLine(
                canvas,
                context,
                colour,
                i,
                machine.machineList[i].links[j]
              );
            }
          }
        }
        context.lineWidth = 1;
        for (let i = 0; i < machine.machineList.length; i++) {
          if (machine.machineList[i].floor === selectedFloor) {
            drawMachines(canvas, context, i);
          }
        }

        // --------------------------------------- end players turn
        if (drawRect(canvas, context, "red", 0.75, 0.0, 0.15, 0.1)) {
          givePlayerSpanner();
          drawFaultCards(2, 1);
          currentPlayerNum = currentPlayerNum + 1;
          if (currentPlayerNum >= players.length) {
            currentPlayerNum = 0;
          }
          currentPlayer = players[currentPlayerNum];
        }
        context.fillStyle = "black";
        context.font = "16px Arial";
        drawText(canvas, context, "End Turn", "black", 0.77, 0.09);

        drawPlayers(canvas, context);

        // debug information
        context.fillStyle = "black";
        context.font = "20px Arial";
        context.fillText(" " + gameEvents, 0, 20);
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
