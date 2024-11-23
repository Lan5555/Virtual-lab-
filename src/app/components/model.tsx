import React, {Suspense, useEffect, useRef, useState} from "react";
import {Canvas, useFrame} from '@react-three/fiber';
import { OrbitControls, useGLTF } from "@react-three/drei";
import *as THREE from 'three';


interface GLBLoaderProps {
    modelPath:string;
    position: [number, number, number];
    scale: [number, number, number];
    rotation: [number, number, number];
    onClick: (event:React.MouseEvent<HTMLElement>) => void;
}

const Model:React.FC<GLBLoaderProps> = ({modelPath, position=[0,0,0], scale, rotation, onClick}) =>{
    const {scene} = useGLTF(modelPath);
    const modelRef:any = useRef<THREE.Group>();
    const cameraRef = useRef();
    const [position1, setPosition1] = useState(position);

    const movement = (event:KeyboardEvent) => {
        setPosition1((prev) => {
            switch(event.key){
                case 'ArrowUp':
                    return [prev[0], prev[1] + 0.1, prev[2]];
                case 'ArrowDown':
                    return [prev[0], prev[1] - 0.1, prev[2]];
                case 'ArrowLeft':
                    return [prev[0]- 0.1, prev[1], prev[2]];    
                case 'ArrowRight':
                    return [prev[0] + 0.1, prev[1], prev[2]];  
                default:
                return prev;      

            }
        });
    }
    useEffect(() => {
        window.addEventListener('keydown', movement);
        return () => {
            window.addEventListener('keydown', movement);
        }
    },[]);
    useFrame(({camera}) => {
    if(modelRef.current){
       modelRef.current.rotation.z += 0.03;
       //modelRef.current.lookAt(camera.position);
    }
    });
    
    return <primitive 
    ref={modelRef}
    object={scene}
    position={position1} 
    scale={scale}
    rotation={rotation}
    onClick={onClick}/>
}
export default Model;


