import { GraphqlContext } from "../../interfaces";
import UserService from "../../services/userService";
import { CreateCredentialsTokenType, CreateRoomType, VerifyCredentialsTokenType } from "./types";
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
  const chats=await UserService.getAllChats(room);
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
  const room=await UserService.createRoom(payload,id);
  return room;
 },
}
export const resolvers={queries,mutations};