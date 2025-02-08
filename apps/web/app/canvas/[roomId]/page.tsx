"use client"
import { IconBrush, IconCircle, IconEraser, IconLine, IconLineDashed, IconPointer, IconPointerBolt, IconRectangle, IconSquare, IconTriangle } from "@tabler/icons-react";
import Canvas from "@utils/components/self/canvas";
import Canvas2 from "@utils/components/self/canvas2";
import { FloatingDock } from "@utils/components/self/floatingDock";
import BlockSwapLoader from "app/loading";
import { useSocket } from "hooks/useSockets";
import { ArrowBigDown, ArrowRightLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Page() {
 const links = [
  {
   title: "Brush",
   icon: (
    <IconBrush className="h-full w-full text-neutral-500 dark:text-neutral-300" />
   ),
   shape: "freehand",
  },
  {
   title: "Pointer",
   icon: (
    <IconPointerBolt className="h-full w-full text-neutral-500 dark:text-neutral-300" />
   ),
   shape: "Pointer",
  },
  {
   title: "Rectangle",
   icon: (
    <IconRectangle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
   ),
   shape: "rectangle",
  },
  {
   title: "Circle",
   icon: (
    <IconCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
   ),
   shape: "circle",
  },
  {
   title: "Square",
   icon: (
    <IconSquare className="h-full w-full text-neutral-500 dark:text-neutral-300" />
   ),
   shape: "square",
  },
  {
   title: "Triangle",
   icon: (
    <IconTriangle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
   ),
   shape: "Triangle",
  },
  {
   title: "Arrow",
   icon: (
    <ArrowRightLeft className="h-full w-full text-neutral-500 dark:text-neutral-300" />
   ),
   shape: "arrow",
  },
  {
    title:"Line",
    icon:(
      <IconLine className="h-full w-full text-neutral-500 dark:text-neutral-300"></IconLine>
    ),
    shape:"line"
  },
  {
    title:"Eraser",
    icon:(
      <IconEraser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    shape:"eraser"
  },

 ];
 const pathname=usePathname();
 const roomId=pathname.split("/")[2] as string;
 const url = window.location.href;
 const queryParams = new URLSearchParams(url.split("?")[1]);
 const password = queryParams.get('password') as string;
 console.log(password);
 const {loading,socket}=useSocket(roomId,password);
 type Shape = 'rectangle' | 'circle' | 'line' | 'freehand' | 'square' | 'arrow' | 'eraser';
 const [currentShape, setCurrentShape] = useState<Shape>('freehand');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);

 if(loading||!socket) return <div><BlockSwapLoader></BlockSwapLoader></div>
 return (
 <div className="h-screen w-screen">
  <Canvas2 currentShape={currentShape} color={color} lineWidth={lineWidth} room={roomId} socket={socket}></Canvas2>
   {/* <Canvas socket={socket}></Canvas> */}
  <FloatingDock desktopClassName="absolute bottom-4 left-4"
        items={links}
        lineWidth={lineWidth} color={color}
      setCurrentShape={setCurrentShape} setColor={setColor} setLineWidth={setLineWidth} />
 </div>
 );
}