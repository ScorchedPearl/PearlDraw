import { GraphqlContext } from "../../interfaces";
import UserService from "../../services/userService";
import { CreateCredentialsTokenType, VerifyCredentialsTokenType } from "./types";
const queries={
 verifyCredentialsToken:async(parent:any,payload:VerifyCredentialsTokenType)=>{
  const session=UserService.verifyCredentialsToken(payload);
  return session;
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
 createRoom:async(parent:any,{slug}:{slug:string},ctx:GraphqlContext)=>{
  const id=ctx.user?.id;
  if(!id){
   throw new Error("Unauthorized");
  }
  const room=await UserService.createRoom(slug,id);
  return room;
 },
}
export const resolvers={queries,mutations};