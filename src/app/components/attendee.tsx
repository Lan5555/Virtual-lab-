import { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls, Stats } from '@react-three/drei';
import * as THREE from 'three';
import anime from 'animejs';

interface ModelProps {
  url: string;
  scale?: number;  // Optional scale prop to control model size
  position?: [number, number, number];  // Optional position prop (x, y, z)
  rotation?: [number, number, number];  // Optional rotation prop (x, y, z)
}

const Model2: React.FC<ModelProps> = ({ url, scale = 0.1, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const [isWalking, setIsWalking] = useState(false);
  const gltf = useLoader(GLTFLoader, isWalking ? '/misc/competition/ley-walk/animations/walk/attendee_walk.glb' : url);
  const [animations, setAnimations] = useState<THREE.AnimationClip[]>([]);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);  // Reference to the model for animation

  useEffect(() => {
    if (gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }
  }, [gltf]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  const onPressed = () => {
    setIsWalking(true);
    anime({
        targets:modelRef.current!.position,
        x: 2,
      easing: 'easeInOutQuad',
      duration: 2000,
      update: () => {
        // Ensure that the model updates during the animation
        if (modelRef.current) {
          modelRef.current.position.x = modelRef.current.position.x 
        }
      },
    })
   
  }
  // Apply scale, position, and rotation to the model after it is loaded
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(...position);
  gltf.scene.rotation.set(...rotation);

  return <primitive object={gltf.scene} 
  ref={modelRef}
  onClick={onPressed}
  />;
};

export default Model2;
