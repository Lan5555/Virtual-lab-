'use client';
import React, { CSSProperties, Suspense, useEffect, useRef, useState } from "react";
import styles from "/pcss/main.module.css";
import { Canvas, MeshProps } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "@/app/components/model";
import Background1 from "@/app/components/loadimage";
//import { Mesh, MeshStandardMaterial, string } from "three/webgpu";
import { useRouter } from "next/navigation";
import Walkthrough from "@/app/components/guider";
import *as THREE from 'three';
import { Mesh } from "three";
import FloatingDiv from "@/app/components/box";


const Lab: React.FC = () => {
    
    const [state, setState] = useState('chemInit.jpg');
    const [indexNumber, setIndexNumber]  = useState('Chemistry');
    const [noteindex, setNoteIndex] = useState<boolean>(false);
    const router = useRouter();
    const [isShown, setShown] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [subject,setSubject] = useState<string>('chemistry');

    const changePractical = (subject: string, index: number) => {
        const newImagePath = ['chemInit.jpg', 'physics.jpg', 'biology.jpg', 'chemInit.jpg'][index];
        setState(newImagePath);
        setIndexNumber(subject);
        setSubject(subject);
    };

    useEffect(() => {}, [state]);
    
    const noteSpace = () => {
        return (
           !noteindex ? null : <div className={styles.note}>
            <button className={styles.back} onClick={() => checkNote()}>Back</button>
            </div>
        );
    }
    const checkNote = () => {
        setNoteIndex(prevChecknote => !prevChecknote);
    }
    const list = ['Guide','Dashboard','Settings'];

    const handleClick = (item:string) => {
        setSelectedItem(item);
        
    }
    const info = (text:string) => {
        return isShown && indexNumber == 'Chemistry' ? <Walkthrough className="absolute top-24 right-48 rotate-2 bg-slate-700
        shadow-2xl rounded-xl opacity-70 p-4"
        textClass="text-white ml-4"
        text= {text}
        type="list"
        list={list}
        onListItemClick={handleClick}
        
        /> : null;
    }
    const timer = () => {
       const time = setTimeout(() => {
            setShown(true);
        },2000);
        clearInterval(time);
    }
   
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Subjects:</h1>
                {['Chemistry', 'Physics', 'Biology', 'Maths'].map((subject, index) => (
                    <div  key={subject} className={styles.box1} onClick={() => changePractical(subject,index)}  style={{
                        borderBottom: indexNumber === subject  ? '3px solid blue': 'none',
                        borderBottomLeftRadius:'2px',
                        borderBottomRightRadius:'2px',
                    }}>
                        <h2>{subject}</h2>
                    </div>
                ))}
                {selectedItem && <p>{selectedItem}</p>}
            </div>
            <div className={styles.sideBar}>
                <div className={styles.subject}></div>
                <h4>Select practical</h4>
                <select title="Available practicals">
                  {indexNumber == 'Chemistry' ?  <option value="">Titration</option> : indexNumber 
                  == 'Physics' ? <option>Moment</option> : indexNumber
                  == 'Biology' ? <option>Inspection</option> : indexNumber == 
                  'Maths' ? <option>Cummulative frequency</option> : null
                  }
                  
                </select>
                <h4>Zoom</h4>
                <input type="range" min="1" max="100" />
                <h4>Progress</h4>
                {['Biology', 'Chemistry', 'Physics', 'Maths'].map((subject, index) => (
                    <span key={subject}>
                        {subject} <div className={styles[`progressBar${index}`]}></div>
                        <span style={{ position: "absolute", right: '10px' }}>20%</span>
                        <br />
                    </span>
                ))}
            </div>
            <div className={styles.mainLab}>
                <Canvas>
                    <Suspense fallback={null}>
                        <Background1 imageUrl={`/misc/competition/images/${state}`} />
                       
                        <Model modelPath='/misc/competition/models/exercise_book/book.glb'
                            position={[-5.5, -1, 0]}
                            scale={[0.5, 0.5, 1]}
                            rotation={[1, 1, 1]}
                            onClick={()=> checkNote()}
                        />
                        <OrbitControls enableRotate={false} enableZoom={false} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                    </Suspense>
                </Canvas>
                {info("How are you doing boss this is the virtual lab where practicals can be performed in real time please stay tuned")}
                {/* items */}
                <div className="relative h-36 w-72 -top-3/4 left-20" onClick={()=>{
                    setShown(prev => !prev);
                    }}></div>
                  <div className="w-40 h-48 absolute top-60 right-16" onClick={()=>{
                        indexNumber == 'Biology' ? alert('microscope clicked') : null
                    }}> 
                    </div>
                    <div className="w-20 h-48 absolute top-48 right-60"
                    onClick={()=>{indexNumber == 'Biology' ? alert('Skeleton clicked'):null}}
                    ></div>

                    {/* {items} */}
            </div>
            {noteSpace()}
            
            <div className={styles.bottomBar}>
                <button className={styles.btn}>Walkthrough</button>
                <button className={styles.btn}>Restart</button>
                <button className={styles.btn}>Quizzes</button>
                <button className={styles.btn} onClick={() => {
                    router.push('/pages/dashboard');
                }}>Dashboard</button>
            </div>
        </div>
    );
};

export default Lab;


