"use client"
import { Canvas } from "@react-three/fiber";
export default function SigninCanvas() {
  return (
    <div>
    <Canvas
    camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
    </div> 
  );
}