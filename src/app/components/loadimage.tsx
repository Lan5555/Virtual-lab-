import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { SRGBColorSpace } from "three";
import React from "react";

interface props{
    imageUrl:string
}
function Background1({imageUrl}:props){
    const {scene} = useThree();
    const texture = useTexture(imageUrl, (tex) => {
        tex.colorSpace = SRGBColorSpace;
    });
    useEffect(() => {
        scene.background = texture;
        

    },[scene,texture]);
    return null;
}
export default Background1;