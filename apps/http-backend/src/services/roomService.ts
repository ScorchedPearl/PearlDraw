import { prismaClient } from "@repo/db/client";
import { CheckRoomPasswordType,CreateRoomType } from "../app/user/types.js";
import { CreateRoomSchema } from "@repo/common/types";
class RoomService {
 public static async createRoom(payload:CreateRoomType,adminId:string){
  const parsedData=CreateRoomSchema.safeParse(payload);
  if(!parsedData.success){
   throw new Error("Invalid Data");
  }
  const roominDb=await prismaClient.room.findUnique({
   where:{
    slug:payload.slug as string,
   }
  });
  if(roominDb){
   throw new Error("Room Already Exists");
  }
  const room=await prismaClient.room.create({
   data: {
    slug: payload.slug as string,
    password: payload.password as string,
    tags:payload.tags as string[],
    admin: {
     connect: {
      id: adminId,
     }
    }
   }
  })
  return room;
 }
 public static async getAllChats(room:string){
  const roomInDb=await prismaClient.room.findUnique({
   where:{
    slug:room,
   }
  })
  if(!roomInDb){
   throw new Error("Room not found");
  }
  const chats = await prismaClient.chat.findMany({
   where: {
   roomId: room,
   },
   include: {
   user: true,
   },
   orderBy: {
   createdAt: 'asc',
   },
   take: 50,
  })
  return chats;
 }
 public static async getAllRooms(){
  const rooms = await prismaClient.room.findMany({
    include:{
      admin: true
      }
    });
  return rooms;
 }
 public static async checkRoomPassword(payload:CheckRoomPasswordType){
  const currentRoom =await prismaClient.room.findUnique({
    where:{
      slug:payload.room as string,
    }
  })
  return currentRoom?.password===payload.password as string
 }
 public static async getAllDrawingAreas(room:string){
  const areas=await prismaClient.drawingArea.findMany({
    where:{
      roomId:room,
    },
    include:{
      user:true,
    }
  })
  return areas;
 }
}
export default RoomService;