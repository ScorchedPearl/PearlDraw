"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@utils/components/ui/button";
import { Input } from "@utils/components/ui/input";
import { Label } from "@utils/components/ui/label";
import { Card } from "@utils/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { graphqlClient } from "useCases/Providersclients/api";
import {useGoogleLogin,TokenResponse} from "@react-oauth/google";
import { createCredentialsTokenMutation, verifyGoogleTokenMutation } from "graphql/mutation/user";
import { redirect } from "next/navigation";
import { verifyCredentialsTokenQuery } from "graphql/query/user";

interface AuthFormProps {
  initialMode: "signin" | "signup";
}
interface TokenDiffResponse {
 createCredentialsToken: string;
}
interface TokendiffResponse {
 verifyCredentialsToken: string;
}
export default function AuthForm({ initialMode }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
    if(!data.isSignUp){
     const payload={
      name:data.name,
      email:data.emailOrName,
      password:data.password,
     }
     console.log(payload);
     const token = await graphqlClient.request<TokenDiffResponse>(createCredentialsTokenMutation, payload);
     window.localStorage.setItem("__Pearl_Token", token.createCredentialsToken);
    }
    else{
     
     const payload={
      email:data.emailOrName,
      password:data.password,
     }
     console.log(payload);
     const token = await graphqlClient.request<TokendiffResponse>(verifyCredentialsTokenQuery, payload);
     window.localStorage.setItem("__Pearl_Token", token.     verifyCredentialsToken as string);
    reset();
    }
    reset();
    redirect('/');
  };
  const googlelogin = useGoogleLogin({
   onSuccess: (cred:TokenResponse) => {
     console.log(cred);
     handleLoginGoogle(cred);
   },
   onError: () => console.log('Login Failed'),
   scope: 'openid profile email',
 });
 const handleLoginGoogle=useCallback(async (cred:TokenResponse)=>{
   const googleToken=cred.access_token
   if(googleToken){
     const response: { verifyGoogleToken: string } = await graphqlClient.request(verifyGoogleTokenMutation,{token:googleToken});
     const { verifyGoogleToken } = response;
     console.log(verifyGoogleToken);
     if(verifyGoogleToken){
       window.localStorage.setItem("__Varuna_Token",verifyGoogleToken);
       redirect("/");
     }
   }
 },[])
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Card className="w-[400px] bg-black/50 backdrop-blur-xl border border-white/10 shadow-xl rounded-lg">
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-gray-400">
              {isSignUp ? "Sign up for an amazing experience" : "Sign in to continue your journey"}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-2 rounded-lg"
            onClick={() => googlelogin()}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          <div className="relative flex justify-center items-center">
            <div className="w-full border-t border-white/10" />
            <span className="absolute bg-black px-2 text-gray-400 text-xs uppercase">Or continue with email</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("isSignUp")} value={isSignUp.toString()} />

            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-sm text-gray-300">
                    Name
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input id="name" {...register("name")} className="pl-10 bg-white/5 border border-white/10 text-white py-2 rounded-lg" required />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-300">
                {isSignUp ? "Email" : "Email or Name"}
              </Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input id="email" {...register("emailOrName")} type="text" className="pl-10 bg-white/5 border border-white/10 text-white py-2 rounded-lg" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-300">
                Password
              </Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input id="password" {...register("password")} type="password" className="pl-10 bg-white/5 border border-white/10 text-white py-2 rounded-lg" required />
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 text-black font-semibold hover:opacity-90 transition-opacity rounded-lg py-2">
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <Button variant="link" className="w-full text-gray-400 hover:text-white transition-colors" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
