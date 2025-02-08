"use client";
import { useGetCurrentUser } from "hooks/user";
import { Paintbrush2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const currentUser = useGetCurrentUser();
  console.log(currentUser.data);
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/50 backdrop-blur-xl shadow-lg border-b border-white/10 py-4"
          : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Paintbrush2 className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            PearlDraw
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            About Me
          </a>
          <a
            href="#gallery"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            Contact Us
          </a>
          {currentUser.user? (
            <a
              href="/canvas"
              className="bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 px-6 py-2 rounded-full font-medium text-black transition-all hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Canvas
            </a>
          ) : (
            <a
              className="bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 px-6 py-2 rounded-full font-medium text-black transition-all hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/50"
              href="/auth"
            >
              Start Creating
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
