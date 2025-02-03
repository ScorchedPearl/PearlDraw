"use client";
import { useEffect, useState } from "react";

export default function AnimatedGradient() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setPosition({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 opacity-25 md:opacity-40 transition-opacity duration-500"
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, 
          rgba(0, 210, 255, 0.4), 
          rgba(0, 190, 180, 0.3), 
          rgba(15, 23, 42, 0.8))`,
        filter: "blur(100px)",
        transition: "background 0.2s ease-out",
      }}
    />
  );
}
