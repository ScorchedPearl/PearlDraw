import { prismaClient } from "@repo/db/client";
import { users } from "..";
import { WebSocket } from "ws";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://jdcsdpqehrtehutppdts.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkY3NkcHFlaHJ0ZWh1dHBwZHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NzAyNzksImV4cCI6MjA1NDI0NjI3OX0.gSvFckIr7q86tSrbg0NC04WMqmdxlvq0wLcbxVWgVS8');
class RoomService {
  public static async joinRoom(room: string, password: string, ws: WebSocket) {
    const roominDb = await prismaClient.room.findUnique({
      where: {
        slug: room,
      },
    });
    if (!roominDb) {
      ws.send("Room not found");
      return;
    }
    if (roominDb.password !== password) {
      ws.send("Password Incorrect");
      return;
    }
    const user = users.find((u) => u.ws === ws);
    if (!user) {
      ws.send("User not found");
      ws.close();
      return;
    }
    user.rooms.push(room);
  }
  public static async leaveRoom(room: string, ws: WebSocket) {
    const user = users.find((u) => u.ws === ws);
    if (!user) {
      ws.send("User not found");
      ws.close();
      return;
    }
    const index = user.rooms.indexOf(room);
    if (index === -1) {
      ws.send("Room not found");
      return;
    }
    user.rooms.splice(index, 1);
  }
  public static async chatInRoom(room: string, ws: WebSocket, message: string) {
    if(message.length>500){
      ws.send("Message too long");
      return;
    } 
    console.log("chatInRoom", room, ws, message);
    await prismaClient.chat.create({
      data: {
        roomId: room,
        message: message,
        userId: users.find((u) => u.ws === ws)?.userid as string,
      },
    });
    users.forEach((u) => { 
      if (u.rooms.includes(room)) {
        u.ws.send(JSON.stringify({
         type:"chat",
         message:message,
         room:room,
        })); 
       }
     });
  }
  public static async drawingArea(room: string, ws: WebSocket, message: string,width:number,height:number){
    console.log(room);
    const imgData = new ImageData(Uint8ClampedArray.from(message),width,height);
    const uniqueFileName = `drawing_${room}_${Date.now()}.png`;
    const imageUrl = await this.uploadImage(imgData, uniqueFileName);
    if (imageUrl) {
      console.log('Image uploaded successfully:', imageUrl);
    } else {
      console.error('Image upload failed');
    }
    // await prismaClient.drawingArea.create({
    //   data:{
    //     roomId:room,
    //     area:imageUrl?.data as string,
    //     userId:users.find((u)=>u.ws===ws)?.userid as string
    //   },
    // });
    users.forEach((u)=>{
      if(u.rooms.includes(room)){
        u.ws.send(JSON.stringify({
          type:"shape",
          message:message,
          room:room,
        }));
      }
    });
  }
  public static async uploadImage(imageData: ImageData, fileName: string) {
    const blob = new Blob([imageData.data.buffer], { type: 'image/png' });
    const file = new File([blob], fileName, { type: 'image/png' });

    const { data, error } = await supabase
      .storage
      .from('PearlDrawBucket')
      .upload(`images/${file.name}`, file);
  
    if (error) {
      console.error('Upload failed:', error.message);
      return null;
    }
  
    return supabase.storage.from('PearlDrawBucket').getPublicUrl(data.path);
  }
}
export default RoomService;
