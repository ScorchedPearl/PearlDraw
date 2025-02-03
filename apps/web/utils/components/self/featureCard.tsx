"use client";
import { useState } from "react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-black/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl 
      transition-all duration-300 group shadow-lg`}
      style={{
        boxShadow: isHovered
          ? "0 20px 40px rgba(0,0,0,0.2), 0 0 20px rgba(0, 210, 255, 0.3)"
          : "0 10px 30px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />


      <Icon className="w-12 h-12 text-cyan-400 mb-6 relative z-10" />


      <h3 className="text-2xl font-bold mb-3 text-white relative z-10">{title}</h3>

      <p className="text-gray-300 relative z-10">{description}</p>
    </div>
  );
}
