"use client"
import Hero from 'useCases/Layout/Hero';
import Footer from 'useCases/Layout/footer';
import AnimatedGradient from '@utils/components/self/animatedGradient';
import Navbar from 'useCases/Layout/navbar';



function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <AnimatedGradient />
      <Navbar></Navbar>
      <Hero></Hero>
      <Footer></Footer>
    </div>
  );
}

export default App;