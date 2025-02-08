"use client";
import { useGetAllDrawingArea } from "hooks/user";
import React, { useRef, useState, useEffect } from "react";

type Shape = "rectangle" | "circle" | "line" | "freehand" | "square" | "arrow" | "eraser";
type DrawingHistory = ImageData[];

function Canvas2({
  currentShape,
  lineWidth,
  color,
  room,
  socket,
}: {
  currentShape: Shape;
  lineWidth: number;
  color: string;
  room: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const { areas } = useGetAllDrawingArea(room);
  const areasArray = areas?.map((area) => ({
    ...JSON.parse(area?.area as string),
  }));
  const [history, setHistory] = useState<DrawingHistory>(areasArray || []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "shape") {
        const parsedImageData = JSON.parse(data.message);
        updateState(parsedImageData);
      }
    };

    const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialState]);

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "shape",
          message: JSON.stringify(Array.from(initialState.data)),
          room: room,
          width:canvas.width,
          height:canvas.height,
        })
      );
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "z") {
        undo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [history]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev, currentState]);

      socket.send(
        JSON.stringify({
          type: "shape",
          message: JSON.stringify(Array.from(currentState.data)),
          room: room,
          width:canvas.width,
          height:canvas.height, 
        })
      );
  
  };

  const updateState = (state: number[]) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const imgData = new ImageData(Uint8ClampedArray.from(state), canvas.width, canvas.height);
    ctx.putImageData(imgData, 0, 0);
    setHistory((prev) => [...prev, imgData]);
  };

  const undo = () => {
    if (history.length <= 1) return;

    const newHistory = [...history];
    newHistory.pop();
    const lastState = newHistory[newHistory.length - 1];

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.putImageData(lastState as ImageData, 0, 0);
    setHistory(newHistory);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x, y });

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.strokeStyle = currentShape === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const prevState = history[history.length - 1];
    ctx.putImageData(prevState as ImageData, 0, 0);
    
    ctx.strokeStyle = currentShape === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = lineWidth;

    

    switch (currentShape) {
      case "rectangle":
        ctx.beginPath();
        ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
        ctx.stroke();
        break;
      case "square":
        ctx.beginPath();
        const side = Math.max(Math.abs(x - startPos.x), Math.abs(y - startPos.y));
        ctx.rect(startPos.x, startPos.y, side, side);
        ctx.stroke();
        break;
      case "circle":
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case "line":
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      case "arrow":
        const angle = Math.atan2(y - startPos.y, x - startPos.x);
        const headLength = 10; // length of head in pixels
        const arrowX = x - headLength * Math.cos(angle - Math.PI / 6);
        const arrowY = y - headLength * Math.sin(angle - Math.PI / 6);
        const arrowX2 = x - headLength * Math.cos(angle + Math.PI / 6);
        const arrowY2 = y - headLength * Math.sin(angle + Math.PI / 6);

        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.moveTo(x, y);
        ctx.lineTo(arrowX, arrowY);
        ctx.moveTo(x, y);
        ctx.lineTo(arrowX2, arrowY2);
        ctx.stroke();
        break;
      case "freehand":
      case "eraser":
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      className="border border-gray-300 rounded-lg w-full cursor-crosshair"
    />
  );
}

export default Canvas2;
