import { GetAllChatsQuery, GetAllChatsQueryVariables } from "gql/graphql";
import { getAllChatsQuery } from "graphql/query/user";
import { useGetAllChats } from "hooks/user";
import { graphqlClient } from "useCases/Providersclients/api";
let brushStroke: { x: number; y: number }[] = [];
let history: Shape[][] = [];

type Shape ={
  type:"rect";
  x:number;
  y:number;
  width:number;
  height:number;
}|{
  type:"circle";
  x:number;
  y:number;
  radius:number;
}|{
  type:"line";
  x1:number;
  y1:number;
  x2:number;
  y2:number;
}|{
  type: "square";
  x: number;
  y: number;
  size: number;
}|{
  type: "triangle";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}| { 
  type: "brush"; 
  points: { x: number; y: number }[] 
};
const getCanvasCoords = (e: MouseEvent, canvas: HTMLCanvasElement): { x: number; y: number } => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};

export async function drawInit(context: CanvasRenderingContext2D,canvas: HTMLCanvasElement,roomId:string,socket:WebSocket){
 clearCanvas([],context,canvas);
  let existingShapes:Shape[] = await getExistingShapes(roomId);
  console.log(existingShapes);
  const saveState = () => {
    history.push([...existingShapes]); 
  };
  const undo = () => {
    if (history.length > 0) {
      const previousState = history.pop()!;
      const deletedShape = existingShapes[existingShapes.length - 1];
      existingShapes = previousState;
      clearCanvas(existingShapes, context, canvas);
      if (deletedShape) {
        socket.send(
          JSON.stringify({
            type: "undo",
            message: JSON.stringify(deletedShape),
            room: roomId,
          })
        );
      }
    }
  };
  const deleteLastShape = () => {
    if (existingShapes.length > 0) {
      saveState(); 
      existingShapes.pop();
      clearCanvas(existingShapes, context, canvas);
    }
  };
  saveState();
  let clicked = false;
  let startX=0;
  let startY=0;
  
  socket.onmessage = (event) => {
    console.log("WebSocket message received:", event.data);
    try {
      const data = JSON.parse(event.data);
      console.log("Parsed WebSocket data:", data);
      if (data.type === "chat") {
        const newShape = JSON.parse(data.message);
        console.log("New shape received:", newShape);
        saveState();
        existingShapes.push(newShape);
        clearCanvas(existingShapes, context, canvas);
      }else if (data.type === "undo") {
        const shapeToRemove = JSON.parse(data.message);
        saveState();
        existingShapes = existingShapes.filter(shape => JSON.stringify(shape) !== JSON.stringify(shapeToRemove));
        clearCanvas(existingShapes, context, canvas);
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle="black";
  context.fillRect(0,0,canvas.width,canvas.height);
  clearCanvas(existingShapes,context,canvas);
 const handleMouseDown = (e: MouseEvent) => {
  clicked = true;
  const coords: { x: number; y: number } = getCanvasCoords(e, canvas);
  startX = coords.x;
  startY = coords.y;
 };
  const handleKeydown=(e:KeyboardEvent)=>{
    console.log(e.key);
    if (e.key === "z" && e.ctrlKey) {
      e.preventDefault();
      undo();
    } else if (e.key === "Delete") {
      e.preventDefault();
      deleteLastShape();
    }
  }
 const handleMouseUp = (e: MouseEvent) => {
  console.log("Mouse Up", e);
  clicked = false;
  const coords = getCanvasCoords(e, canvas);
  
  const shapeToDraw = localStorage.getItem('PearlShape');
  console.log(shapeToDraw);
  if (shapeToDraw === "rectangle") {
    const width = coords.x - startX;
    const height = coords.y - startY;
    const rect: Shape = { type: "rect", x: startX, y: startY, width, height };
    saveState();
    existingShapes.push(rect);
    socket.send(JSON.stringify({ type: "shape", message: JSON.stringify(rect), room: roomId }));
  } else if (shapeToDraw === "circle") {
    const radius = Math.sqrt((coords.x - startX) ** 2 + (coords.y - startY) ** 2);
    const circle: Shape = { type: "circle", x: startX, y: startY, radius };
    saveState();
    existingShapes.push(circle);
    socket.send(JSON.stringify({ type: "shape", message: JSON.stringify(circle), room: roomId }));
  } else if (shapeToDraw === "line") {
    const line: Shape = { type: "line", x1: startX, y1: startY, x2: coords.x, y2: coords.y };
    saveState();
    existingShapes.push(line);
    socket.send(JSON.stringify({ type: "shape", message: JSON.stringify(line), room: roomId }));
  }else if (shapeToDraw === "square") {
    const size = Math.abs(coords.x - startX);
    const square: Shape = { type: "square", x: startX, y: startY, size };
    saveState();
    existingShapes.push(square);
    socket.send(JSON.stringify({ type: "shape", message: JSON.stringify(square), room: roomId }));
  } else if (shapeToDraw === "triangle") {
    const baseMidX = (startX + coords.x) / 2;
    const height = Math.abs(coords.y - startY);
    context.beginPath();
    context.moveTo(startX, coords.y);
    context.lineTo(coords.x, coords.y); 
    context.lineTo(baseMidX, startY - height); 
    context.closePath();
    context.stroke();

    const triangle: Shape = {
        type: "triangle",
        x1: startX, y1: coords.y, 
        x2: coords.x, y2: coords.y,
        x3: baseMidX, y3: startY-height, 
    };
    saveState();
    existingShapes.push(triangle);
    socket.send(JSON.stringify({ type: "shape", message: JSON.stringify(triangle), room: roomId }));
  }  else if (shapeToDraw === "brush" && brushStroke.length > 1) {
    const brushShape: Shape = { type: "brush", points: brushStroke };
    saveState();
    existingShapes.push(brushShape);
    socket.send(JSON.stringify({ type: "shape", message: JSON.stringify(brushShape), room: roomId }));
  }
  brushStroke = [];
  clearCanvas(existingShapes, context, canvas);
};


const handleMouseMove = (e: MouseEvent) => {
  if (!clicked) return;
  clearCanvas(existingShapes, context, canvas);
  context.strokeStyle = "white";

  const coords = getCanvasCoords(e, canvas);
  const shapeToDraw = localStorage.getItem('PearlShape');

  if (shapeToDraw === "rectangle") {
    const width = coords.x - startX;
    const height = coords.y - startY;
    context.beginPath();
    context.rect(startX, startY, width, height);
    context.stroke();
  } 
  else if (shapeToDraw === "circle") {
    const radius = Math.sqrt((coords.x - startX) ** 2 + (coords.y - startY) ** 2);
    context.beginPath();
    context.arc(startX, startY, radius, 0, 2 * Math.PI);
    context.stroke();
  } 
  else if (shapeToDraw === "line") {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(coords.x, coords.y);
    context.stroke();
  }else if (shapeToDraw === "square") {
    const side = Math.max(Math.abs(coords.x - startX), Math.abs(coords.y - startY));
    context.beginPath();
    context.rect(startX, startY, side, side);
    context.stroke();
  }
  else if (shapeToDraw === "triangle") {
    const baseMidX = (startX + coords.x) / 2;
    const height = Math.abs(coords.y - startY);
    context.beginPath();
    context.moveTo(startX, coords.y);
    context.lineTo(coords.x, coords.y); 
    context.lineTo(baseMidX, startY - height); 
    context.closePath();
    context.stroke();
  }else if (shapeToDraw === "brush") {
    brushStroke.push(coords);
  context.strokeStyle = "white";
  context.lineWidth = 2;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.beginPath();
  for (let i = 1; i < brushStroke.length; i++) {
    const prev = brushStroke[i - 1];
    const curr = brushStroke[i];
    if (prev&&curr) {
      context.moveTo(prev.x, prev.y);
      context.lineTo(curr.x, curr.y);
    }
  }
  context.stroke();
  } 
};


  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("keydown",handleKeydown);
   return () => {
  canvas.removeEventListener("mousedown", handleMouseDown);
  canvas.removeEventListener("mouseup", handleMouseUp);
  canvas.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("keydown",handleKeydown);
 };
}
function clearCanvas(existingShapes:Shape[],context: CanvasRenderingContext2D,canvas: HTMLCanvasElement){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillStyle="black";
  context.fillRect(0,0,canvas.width,canvas.height);
  existingShapes.forEach(shape=>{
    if(shape.type==="rect"){
      context.strokeStyle="white";
      context.beginPath();
      context.rect(shape.x, shape.y, shape.width, shape.height);
      context.stroke();
    }
    else if(shape.type==="circle"){
      context.strokeStyle="white";
      context.beginPath();
      context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      context.stroke();
    }
    else if(shape.type==="line"){
      context.strokeStyle="white";
      context.beginPath();
      context.moveTo(shape.x1, shape.y1);
      context.lineTo(shape.x2, shape.y2);
      context.stroke();
    }else if (shape.type === "square") {
      context.strokeStyle="white";
      context.beginPath();
      context.rect(shape.x, shape.y, shape.size, shape.size);
      context.stroke();
    } else if (shape.type === "triangle") {
      context.strokeStyle="white";
      context.beginPath();
      context.moveTo(shape.x1, shape.y1);
      context.lineTo(shape.x2, shape.y2); 
      context.lineTo(shape.x3, shape.y3); 
      context.closePath();
      context.stroke();
    }else if (shape.type === "brush") {
      context.strokeStyle = "white";
      context.lineWidth = 2;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();
      
      for (let i = 1; i < shape.points.length; i++) {
        const prev = shape.points[i - 1];
        const curr = shape.points[i];
        if (prev && curr) {
          context.moveTo(prev.x, prev.y);
          context.lineTo(curr.x, curr.y);
        }
      }
      context.stroke();
    } 
  }
  )
}


async function getExistingShapes(roomId:string){
  const query=await graphqlClient.request<GetAllChatsQuery,GetAllChatsQueryVariables>(getAllChatsQuery,{room:roomId})
  const data=query.getAllChats;
  console.log(data);
  if (!data) {
    return [];
  }
  interface Message {
    message: string;
  }

  type ParsedMessage = Shape;

  const messages: ParsedMessage[] = data.map((message: Message | null) => {
    if (message) {
      const messagedata: ParsedMessage = JSON.parse(message.message);
      console.log(messagedata);
      return messagedata;
    }
    return null;
  }).filter((message: ParsedMessage | null): message is ParsedMessage => message !== null);
   const shapes = messages;
   console.log(shapes);
   return shapes;
   
}