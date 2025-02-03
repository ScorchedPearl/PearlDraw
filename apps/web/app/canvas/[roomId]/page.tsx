"use client"
import { drawRect } from "@utils/lib/draw";
import { useEffect, useRef } from "react"

export default function Page() {
 const canvasRef = useRef<HTMLCanvasElement>(null);

 useEffect(() => {
 if (!canvasRef.current) return;
 const canvas = canvasRef.current;
 const context = canvas.getContext("2d");
 if (!context) return;
  drawRect(context,canvas)

 // return () => {
 //  canvas.removeEventListener("mousedown", handleMouseDown);
 //  canvas.removeEventListener("mouseup", handleMouseUp);
 //  canvas.addEventListener("mousemove", handleMouseMove);
 // };
 }, [canvasRef]);

 return (
 <div className="h-screen w-screen">
  <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} className="w-full h-full"/>
 </div>
 );
}