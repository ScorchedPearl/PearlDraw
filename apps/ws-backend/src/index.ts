import { WebSocketServer } from "ws";
import JWTService from "./services/jwtService";

const wss = new WebSocketServer({ port:8080 });

wss.on("connection", (ws,request) => {
  const url =request.url;
  if(!url){
    return;
  }
  const queryParams=new URLSearchParams(url.split("?")[1]);
  const token=queryParams.get("token");
  const user=JWTService.decodeToken(token||"");
  if(!user){
    ws.close();
    return;
  }
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.send("Hello! Message from server!");
}
);