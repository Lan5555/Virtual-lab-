'use client';
import React, { Suspense, useEffect, useState } from "react";
import styles from "@/app/css/main.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "@/app/components/model";
import Background1 from "@/app/components/loadimage";
import { useRouter } from "next/navigation";
import Walkthrough from "@/app/components/guider";
import PageLayout from "@/app/page-layouts/full-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart, faBars, faBarsProgress, faBook, faClose, faClosedCaptioning, faComputer, faDoorClosed, faGear, faRemove, faSignOutAlt, faTachometerAlt, faWarning, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import HoverBar from "@/app/components/hover-bar";
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { faRemoveFormat } from "@fortawesome/free-solid-svg-icons/faRemoveFormat";
import AnimatedText from "@/app/components/movingtext";
import Wrap from "@/app/components/wrapper";
import PaymentCard from "@/app/components/payment-card";
import Card from "@/app/components/card";
import Toast from "@/app/components/toast";


const Lab: React.FC = () => {
    const [state, setState] = useState('chemInit.jpg');
    const [indexNumber, setIndexNumber]  = useState('Chemistry');
    const [noteindex, setNoteIndex] = useState<boolean>(false);
    const router = useRouter();
    const [isShown, setShown] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [subject, setSubject] = useState<string>('chemistry');
    const [isVisible, setVisible] = useState<boolean>(true);
    const [display, setDisplay] = useState(false);
    const [settingState, setSettingState] = useState('Change Subject');
    const [toast,setToast] = useState(false);

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
    const [mediaquery, setMediaQuery] = useState('desktop');
    const updateMediaQuery = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
          setMediaQuery('mobile');
        } else if (window.matchMedia('(min-width: 548px) and (max-width:1140px)').matches) {
          setMediaQuery('tablet');
        } else {
          setMediaQuery('desktop');
        }
      };
    
      useEffect(() => {
        updateMediaQuery();
        window.addEventListener('resize', updateMediaQuery);
        return () => window.removeEventListener('resize', updateMediaQuery);
      }, []);

      const showToast = () => {
        return (
            <Toast text={"Switched successfully"}></Toast>
        )
      }
    //   settings
    const labSettings = () => {
        return(
            <div className="w-full h-screen bg-slate-600 p-2 fixed top-0">
               <div className="w-60 h-full bg-slate-700"> 
                <header className="w-full h-32 flex justify-center items-center">
                    <Wrap color="black" content={
                    <AnimatedText text={'Virtual lab'} position={undefined} size={20} icon={undefined}></AnimatedText>
                    } classname="shadow-2xl">
                    </Wrap>
                </header>
                <ul className="list-none text-white absolute top-40 grid gap-7">
                <li className="cursor-pointer" onClick={()=> setSettingState('Change Subject')}><FontAwesomeIcon icon={faBook} className="text-white"></FontAwesomeIcon> Change Subject</li>
                <li className="cursor-pointer" onClick={()=> setSettingState('Change Practical')}><FontAwesomeIcon icon={faComputer} className="text-white"></FontAwesomeIcon> Switch Practical</li>
                <li className="cursor-pointer" onClick={()=> setSettingState('Progress')}><FontAwesomeIcon icon={faBarChart} className="text-white"></FontAwesomeIcon> Progress</li>
                <li className="cursor-pointer" onClick={()=> setDisplay(false)}><FontAwesomeIcon icon={faSignOutAlt} className="text-white"></FontAwesomeIcon></li>
                </ul>
                </div>

                {settingState == 'Change Subject' && (<div className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto"
                style={{
                    backgroundImage:'url(/misc/competition/images/biology.jpg)',
                    backgroundRepeat:'no-repeat',
                    
                }}
                >
                <div className="flex gap-2">
                <Card color="linear-gradient(to right,blueviolet,white,rgba(0,0,0,0.2))" header="Science" name="Chemistry" small="Virtual chemistry lab" onPressed={()=>{setIndexNumber('Chemistry')
                    setToast(true);
                    changePractical('Chemistry',0);
                    setTimeout(() => {
                     setToast(false);
                    },3000);
                }}></Card>
                <Card color="linear-gradient(to right,grey,white,rgba(0,0,0,0.2))" header="Science" name="Physics" small="Virtual Physics lab" onPressed={()=>{setIndexNumber('Physics')
                    setToast(true);
                    changePractical('Physics',1);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                </div>
                <div className="flex gap-2">
                <Card color="linear-gradient(to right,grey,white,rgba(0,0,0,0.2))" header="Science" name="Biology" small="Virtual Bio lab" onPressed={()=>{setIndexNumber('Biology')
                    setToast(true);
                    changePractical('Biology',2);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                <Card color="linear-gradient(to right,blueviolet,white,rgba(0,0,0,0.2))" header="Science" name="Mathematics" small="Virtual Math lab" onPressed={()=>{setIndexNumber('Maths')
                    setToast(true);
                    changePractical('Maths',3);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                </div>
                
                </div> )}
                 {/* Pacticals */}
                {settingState == 'Change Practical' && indexNumber == 'Chemistry' && (<div className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto"
                style={{
                    backgroundImage:'url(/misc/competition/images/biology.jpg)',
                    backgroundRepeat:'no-repeat',
                    
                }}>
                <Card color="linear-gradient(to right,grey,white,rgba(0,0,0,0.2))" header="Science" name="Test for purity" small="Virtual Physics lab" onPressed={()=>{
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                </div>)}
                {settingState == 'Change Practical' && indexNumber == 'Physics' && (<div className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto">
                <Card color="linear-gradient(to right,grey,white,rgba(0,0,0,0.2))" header="Science" name="Moment" small="Virtual Physics lab" onPressed={()=>{
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                </div>)}
                {settingState == 'Change Practical' && indexNumber == 'Biology' && (<div className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto">
                <Card color="linear-gradient(to right,grey,white,rgba(0,0,0,0.2))" header="Science" name="Inspection" small="Virtual Physics lab" onPressed={()=>{
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                </div>)}
                {settingState == 'Change Practical' && indexNumber == 'Maths' && (<div className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto">
                <Card color="linear-gradient(to right,grey,white,rgba(0,0,0,0.2))" header="Science" name="Cummulative Frequency" small="Virtual Physics lab" onPressed={()=>{
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                </div>)}       
                {settingState == 'Progress' && <div style={{
                    backgroundImage:'url(/misc/competition/images/biology.jpg)',
                    backgroundRepeat:'no-repeat',
                    
                }} className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto"></div>}
                {toast && showToast()}
            </div>
        );
    }
    return (
        <PageLayout>
            {mediaquery!='mobile' ? (<div className={ mediaquery == 'desktop' ? styles.container : mediaquery == 
                'tablet' ? styles.container : styles.container
            }>
                {mediaquery == 'desktop' ? (<div className={styles.header}>
                    <h1>Subjects:</h1>
                    {['Chemistry', 'Physics', 'Biology', 'Maths'].map((subject, index) => (
                        <div  key={subject} className={styles.box1} onClick={() => changePractical(subject,index)}  style={{
                            borderBottom: indexNumber === subject  ? '3px solid plum': 'none',
                            borderBottomLeftRadius:'2px',
                            borderBottomRightRadius:'2px',
                        }}>
                            <h2>{subject}</h2>
                        </div>
                    ))}
                    {selectedItem && <p>{selectedItem}</p>}
                </div>):null}
                {mediaquery == 'desktop' ? (<div className={styles.sideBar}>
                    <div className={styles.subject}></div>
                    <h4>Select practical</h4>
                    <select title="Available practicals">
                    {indexNumber == 'Chemistry' ?  <option value="">Test for purity</option> : indexNumber 
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
                ): null}
                {/* {mediaquery == 'tablet' ? (
                    <div className="w-16 h-5/6 absolute right-0 shadow-2xl p-2 flex mt-16 flex-col gap-10" >
                        <FontAwesomeIcon icon={faBook} style={{height:'35px', color:'lightblue',cursor:'pointer'}} title="Course"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faComputer} style={{height:'35px', color:'lightblue',cursor:'pointer'}} title="Practicals"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faBarsProgress} style={{height:'35px',color:'lightblue',cursor:'pointer'}} title="Progress"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faTachometerAlt} style={{height:'35px',color:'lightblue',cursor:'pointer'}} title="Zoom"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faGear} style={{height:'35px',color:'lightblue',cursor:'pointer'}} title="Mini settings"></FontAwesomeIcon>
                    </div>
                ):null} */}
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

                        {mediaquery != 'desktop' ? (
                           isVisible ? <HoverBar 
                            items={[faSignOutAlt,faTachometerAlt,faBook,faGear]}
                             iconClass="text-white hover:text-red-500"
                            runFunc1={()=> setVisible(false)}
                            runFunc2={()=> router.push('/pages/dashboard')}
                            runFunc3={()=> router.push('/pages/Quiz')}
                            runFunc4={() => setDisplay(true)}
                             >
                            </HoverBar> : <div className="fixed right-5 bottom-5 w-auto h-auto p-2 rounded bg-black opacity-50">
                                <FontAwesomeIcon icon={faBars} className="text-white" onClick={()=>setVisible(true)}></FontAwesomeIcon>
                                </div>
                        ):null}
                        { display && labSettings()}
                </div>
                {noteSpace()}
               {mediaquery == 'desktop' ? ( <div className={styles.bottomBar}>
                    <button className={styles.btn}>Walkthrough</button>
                    <button className={styles.btn}>Restart</button>
                    <button className={styles.btn} onClick={()=>{
                        router.push('/pages/Quiz');
                    }}>Quizzes</button>
                    <button className={styles.btn} onClick={() => {
                        router.push('/pages/dashboard');
                    }}>Dashboard</button>
                </div> ):null}
            </div> ): <div className="flex justify-center items-center h-screen bg-slate-200">
                    <div className="rounded-lg w-44 h-30 bg-slate-700 p-3 animate-pulse flex justify-center items-center flex-col">
                        <FontAwesomeIcon icon={faWarning} style={{color:'red'}}></FontAwesomeIcon>
                        <h2 className="text-center text-red-600 text-lg">Please rotate your device</h2>
                    </div>
            </div>}
        </PageLayout>
    );
};

export default Lab;


