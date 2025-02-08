import { GetAllChatsQuery, GetAllChatsQueryVariables } from "gql/graphql";
import { getAllChatsQuery } from "graphql/query/user";
import { useGetAllChats } from "hooks/user";
import { graphqlClient } from "useCases/Providersclients/api";

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
}
export async function drawInit(context: CanvasRenderingContext2D,canvas: HTMLCanvasElement,roomId:string,socket:WebSocket){
 clearCanvas([],context,canvas);
  let existingShapes:Shape[] = await getExistingShapes(roomId);
  console.log(existingShapes);
  
  let clicked = false;
  let startX=0;
  let startY=0;
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    if (data.type === "shape") {
      existingShapes.push(JSON.parse(data.message));
      clearCanvas(existingShapes,context,canvas);
    }
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle="black";
  context.fillRect(0,0,canvas.width,canvas.height);
  clearCanvas(existingShapes,context,canvas);
 const handleMouseDown = (e: MouseEvent) => {
  clicked = true;
  startX = e.clientX;
  startY = e.clientY;
 };

  const handleMouseUp = (e: MouseEvent) => {
   clicked = false;
   const width= e.clientX - startX;
   const height= e.clientY - startY;
   
   existingShapes.push({type:"rect",x:startX,y:startY,width,height});
   socket.send(JSON.stringify({type:"shape",message:JSON.stringify({type:"rect",x:startX,y:startY,width,height}), room: roomId}));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if(clicked){
      const width= e.clientX - startX;
      const height= e.clientY - startY;
      clearCanvas(existingShapes,context,canvas);
      context.strokeStyle="white";
      const shapeToDraw=localStorage.getItem('PearlShape');
      if(shapeToDraw==="Rectangle"){
        context.beginPath();
        context.rect(startX, startY, width, height);
        context.stroke();
      }
      

    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);
   return () => {
  canvas.removeEventListener("mousedown", handleMouseDown);
  canvas.removeEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);
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
  const messages = data.map((message) => {
    if (message) {
      const messagedata = JSON.parse(message.message);
      console.log(messagedata)
      return messagedata;
    }
    return null;
   }).filter((message) => message !== null);
   const shapes = messages;
   console.log(shapes);
   return shapes;
   
}