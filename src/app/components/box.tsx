import React from 'react';
import { Box,Text } from '@react-three/drei'; // optional: for basic geometry helpers

const BoxComponent = () => {
  return (
    <mesh rotation={[Math.PI / 10,-Math.PI/10,0]}  castShadow>
      <boxGeometry args={[4, 4, 0.1]}  />
      <meshBasicMaterial color="lightblue" />
            {/* <Text 
              position={[0, 0, 0.6]}
              fontSize={0.2}
              color='black'
              anchorX='center'
              anchorY="middle" children={
                <p>Hello world</p>
              }    ></Text> */}
         </mesh>
  );
};

const FloatingDiv = () => {
  return (
      <BoxComponent />
  );
};

export default FloatingDiv;
