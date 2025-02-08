import { GraphqlContext } from "../../interfaces";
import RoomService from "../../services/roomService";
import UserService from "../../services/userService";
import { CheckRoomPasswordType, CreateCredentialsTokenType, CreateRoomType, VerifyCredentialsTokenType } from "./types";
const queries={
 verifyCredentialsToken:async(parent:any,payload:VerifyCredentialsTokenType)=>{
  const session=UserService.verifyCredentialsToken(payload);
  return session;
 },
 getAllChats:async(parent:any,{room}:{room:string},ctx:GraphqlContext)=>{
  const id=ctx.user?.id;
  if(!id){
   throw new Error("Unauthorized");
  }
  const chats=await RoomService.getAllChats(room);
  return chats;
 },
 getCurrentUser:async(parent:any,args:any,ctx:GraphqlContext)=>{
  const id=ctx.user?.id;
  if(!id){
   throw new Error("Unauthorized");
  }
  const user=await UserService.getCurrentUser(id);
  return user;
 },
 getAllRooms:async(parent:any,args:any,ctx:GraphqlContext)=>{
  const id=ctx.user?.id;
  if(!id){
   throw new Error("Unauthorized");
  }
  const rooms=await RoomService.getAllRooms();
  return rooms;
 },
 checkRoomPassword:async(parent:any,payload:CheckRoomPasswordType,ctx:GraphqlContext)=>{
  const id=ctx.user?.id
  if(!id){
   throw new Error("Unauthorized");
  }
  const isAllowed=await RoomService.checkRoomPassword(payload);
  return isAllowed;
 },
 getAllDrawingAreas:async(parent:any,{room}:{room:string},ctx:GraphqlContext)=>{
  const id=ctx.user?.id;
  if(!id){
   throw new Error("Unauthorized");
  }
  const areas=await RoomService.getAllDrawingAreas(room);
  return areas;
 },
 sendOtpEmail:async(parent:any,{email,otp}:{email:string,otp:string})=>{
  const sent= UserService.sendOtpEmail(email,otp);
  return sent;
 }
}
const mutations={
 createCredentialsToken:async(parent:any,payload:CreateCredentialsTokenType)=>{
  const session=UserService.createCredentialsToken(payload);
  return session;
 },
 verifyGoogleToken:async(parent:any,{token}:{token:string})=>{
  const session=UserService.verifyGoogleAuthToken(token);
  return session;
 },
 createRoom:async(parent:any,payload:CreateRoomType,ctx:GraphqlContext)=>{
  const id=ctx.user?.id;
  if(!id){
   throw new Error("Unauthorized");
  }
  const room=await RoomService.createRoom(payload,id);
  return room;
 },
 changePassword:async(parent:any,{email,newPassword}:{email:string,newPassword:string})=>{
  const success=await UserService.changePassword(email,newPassword);
  return success;
 }
}
export const resolvers={queries,mutations};