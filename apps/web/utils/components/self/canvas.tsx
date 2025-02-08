"use client"

import { drawInit } from "@utils/lib/draw";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Canvas(socket:{
 socket:WebSocket
}) {
 const pathname=usePathname();
 const roomId=pathname.split("/")[2] as string;
 const canvasRef = useRef<HTMLCanvasElement>(null);
 useEffect(() => {
  if (!canvasRef.current) return;
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  if (!context) return;
   drawInit(context,canvas,roomId,socket.socket);
  }, [canvasRef]);
  return<>
  <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} className="w-full h-full"/>
  </>
}