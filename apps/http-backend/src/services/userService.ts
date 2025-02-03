import axios from "axios";
import { prismaClient } from "@repo/db/client";
import { GoogleTokenResult } from "./interfaces.js"
import JWTService from "./jwtService.js";
import { CreateCredentialsTokenType, CreateRoomType, VerifyCredentialsTokenType } from "../app/user/types.js";
import { CreateRoomSchema, SignInSchema } from "@repo/common/types";
class UserService {
 public static async verifyGoogleAuthToken(token: string){
  const googletoken = token;
  const googleoauthurl = new URL('https://www.googleapis.com/oauth2/v3/userinfo')
  const { data } = await axios.get<GoogleTokenResult>
   (googleoauthurl.toString(), {
    headers: {
     Authorization: `Bearer ${googletoken}`,
    },
    responseType: "json"
   });
  const user = await prismaClient.user.findUnique({
   where:{email:data.email}
  })
  if (!user) {
   await prismaClient.user.create({
    data: {
     email: data.email,
     name: data.given_name,
     profilePhotoURL: data.picture,
    },
   });
  }
  const userInDb = await prismaClient.user.findUnique({
   where: { email: data.email },
  })
  if (!userInDb) throw Error("User.email not found")
  const session = await JWTService.generateTokenForUser(userInDb);
  return session;
 }
 public static async verifyCredentialsToken(payload: VerifyCredentialsTokenType){
  const data={
   email:payload.email as string,
   password:payload.password as string,
  }
  const d=SignInSchema.safeParse(data);
  if(!d.success){
   throw new Error("Invalid Data");
  }
  const email = payload.email as string;
  const password=payload.password as string;
  const user=await prismaClient.user.findUnique({
   where:{
    email:email,
   }
  })
  if(!user){
   throw new Error("User not found. Redirect to signup page.");
  }
  if(user.password!==password){
   throw new Error("Password Incorrect");
  } 
  const session = await JWTService.generateTokenForUser(user);
  return session;
 }
 public static async createCredentialsToken(payload: CreateCredentialsTokenType){
  const email=payload.email as string;
  const password=payload.password as string;
  const name=payload.name as string;
  const user=await prismaClient.user.findUnique({
   where:{
    email:email,
   }
  })
  if(user){
   throw new Error("User Already Exists. Redirect to signin page.");
  }
  const userInDb=await prismaClient.user.create({
   data:{
    email:email,
    password:password,
    name:name,
   }
  })
  const session=await JWTService.generateTokenForUser(userInDb);
  return session
 }
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
 public static async getCurrentUser(id:string){
  const user=await prismaClient.user.findUnique({
   where:{
    id:id,
   }
  })
  if(!user){
   throw new Error("User not found");
  }
  return user;
 }
}
export default UserService;