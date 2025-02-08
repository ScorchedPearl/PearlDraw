import axios from "axios";
import { prismaClient } from "@repo/db/client";
import { GoogleTokenResult } from "./interfaces.js"
import JWTService from "./jwtService.js";
import { CreateCredentialsTokenType, VerifyCredentialsTokenType } from "../app/user/types.js";
import { SignInSchema } from "@repo/common/types";
import nodemailer from "nodemailer";
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
 public static async sendOtpEmail(email:string,otp:string){
   try {
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       secure: true,
       port: 465,
       auth: {
         user: "pearlautherizer@gmail.com",
         pass: "egjvzollbsxedjni",
       }
     });
 
     const mailOptions = {
       from: "pearlautherizer@gmail.com",
       to: email,
       subject: 'Email Verification OTP',
       text: `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`,
     };  
     await transporter.sendMail(mailOptions);
     return true;
   } catch (error) {
     console.error('Error sending OTP email:', error);
     return false;
   }
 }
 public static async changePassword(email:string,newPassword:string){
  const user=await prismaClient.user.findUnique({
   where:{
    email:email,
   }
  })
  if(!user){
   throw new Error("User not found");
  }
  await prismaClient.user.update({
   where:{
    email:email,
   },
   data:{
    password:newPassword,
   }
  })
  return true;
 }
}
export default UserService;