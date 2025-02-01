import Navbar from "../useCases/Layout/navbar"
export default function Page(){
  return (
    <>
    <div className="inset-0 min-h-screen flex flex-col items-center">
    <Navbar/>
    <div className="inset-0 text-center min-h-screen flex items-center justify-center ">
      
      <h1 className="text-4xl font-bold text-gray-800">Welcome to PearlDraw</h1>
    </div>
    </div>
    </>
  )
} 