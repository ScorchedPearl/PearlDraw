"use client"
import SigninCanvas from "./../../useCases/Three/SigninCanvas";
export default function Page(){
 return(
  <>
  <div className="grid grid-cols-5 gap-4 p-10">
   <div className="col-span-2">
    hlo

   </div>
   <div className="col-span-3">
     <SigninCanvas></SigninCanvas>
   </div>
  </div>
  </>
 )
}