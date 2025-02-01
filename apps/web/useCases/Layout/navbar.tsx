import Image from "next/image";
export default function Navbar(){
 return(
  <>
  <div className="bg-transparent fixed top-0 left-0 w-full text-center items-center justify-center pt-5">
   <div className="h-12 w-3/4 mx-auto flex justify-between items-center p-4 rounded-3xl shadow-slate-700 shadow-md bg-2 bg-slate-300/50">
   <div className="flex items-center">
    <Image src="next.svg" width={60} height={70} alt="Logo" className="text-zinc-500"></Image>
    <h1 className="text-2xl font-bold text-gray-800 p-4">PearlDraw</h1>
   </div>
   <div className="flex items-center">
    <a href="/signin" className="mx-2 text-gray-800 hover:text-orange-300">Login</a>
    <a href="/signup" className="mx-2 text-gray-800 hover:text-orange-300">Register</a>
   </div>
   </div>
  </div>
  </>
 );
}