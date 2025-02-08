import { useEffect,useState } from "react";
import { WS_URL } from "useCases/Providersclients/config";

export function useSocket(roomId:string,password:string){
  const [loading,setLoading] = useState(true);
  const [socket,setSocket] = useState<WebSocket>();

  useEffect(() => {
   const ws=new WebSocket(WS_URL);
   ws.onopen=()=>{
     setLoading(false);
     setSocket(ws);
     ws.send(JSON.stringify({type:"join_room",room:roomId,password:password}));
   }
  },[]);
  return {loading,socket};
}