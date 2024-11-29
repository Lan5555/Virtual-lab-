import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  path: string;
  
}

const VideoBackground: React.FC<Props> = ({ path,}) => {
  const { scene } = useThree();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  useEffect(() => {
    // Create the video element if it doesn't exist
    if (!videoRef.current) {
      const video = document.createElement("video");
      video.src = path;
      video.loop = true;
      video.muted = true; // Ensures autoplay works
      video.play();
      videoRef.current = video;
    } else {
      // If the video already exists, just update the source
      videoRef.current.src = path;
      videoRef.current.play();
    }

    // Create the video texture
    if (!textureRef.current) {
      const videoTexture = new THREE.VideoTexture(videoRef.current as HTMLVideoElement);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBFormat;
      videoTexture.colorSpace = THREE.SRGBColorSpace; // Fix for correct color handling

      textureRef.current = videoTexture;
    } else {
      
      textureRef.current.needsUpdate = true;
    }

    // Set the scene background to the video texture
    scene.background = textureRef.current;

    // Cleanup on unmount or when the video path changes
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = ""; // Clear the video source
      }
      if (textureRef.current) {
        textureRef.current.dispose(); // Dispose of the video texture
      }
      scene.background = null; // Reset the scene background
    };
  }, [path, scene]);

  return null; // No visual elements are needed, the background is set directly
};

export default VideoBackground;
