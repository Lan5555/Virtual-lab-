import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";
import *as THREE from 'three';

type PlaneProps = {
    position: [number, number, number];
    size: [number, number];
    src: string
  };
const Plane: React.FC<PlaneProps> = ({ position, size,src }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = new TextureLoader().load(`/misc/competition/practical/${src}.png`); // Ensure image supports transparency
  
    // // Set up a smooth transition for the plane's position
    // useFrame(() => {
    //   if (meshRef.current) {
    //     // Transition the position and rotation over time
    //     meshRef.current.position.y = Math.sin(Date.now() * 0.002) * 2; // Sine wave transition for smooth up/down movement
    //     //meshRef.current.rotation.z += 0.01; // Rotate the plane smoothly
    //   }
    // });
  
    return (
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={size} />
        <meshBasicMaterial
          map={texture}
          transparent={true}  // Enable transparency
          alphaTest={0.1}      // Remove fully transparent pixels
        />
      </mesh>
    );
  };
  export default Plane;