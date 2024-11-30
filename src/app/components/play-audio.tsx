import { useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import * as THREE from "three";
interface props{
    path:string
}
const Sound:React.FC<props> = ({path}) => {
    const {scene,camera} = useThree();
    const ref = useRef<THREE.AudioListener | null>(null);
    useEffect(()=>{
        const listener = new THREE.AudioListener();
        camera.add(listener);
        const sound = new THREE.Audio(listener);

        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(path,(buffer) => {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });
        ref.current = listener;
        return () => {
            sound.stop();
            sound.disconnect();
            ref.current && camera.remove(ref.current);
        };
    },[camera, path]);
    return null;
}
export default Sound;