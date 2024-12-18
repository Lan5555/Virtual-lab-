/* eslint-disable @next/next/no-img-element */
'use client';
import React, { Suspense, useEffect, useRef, useState } from "react";
import styles from "@/app/css/main.module.css";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Text } from "@react-three/drei";
import Model from "@/app/components/model";
import Background1 from "@/app/components/loadimage";
import { useRouter } from "next/navigation";
import Walkthrough from "@/app/components/guider";
import PageLayout from "@/app/page-layouts/full-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart, faBars, faBarsProgress, faBook, faClose,
     faClosedCaptioning, faComputer, faDoorClosed, faGear,
     faRemove, faSignInAlt, faSignOutAlt, faTachometerAlt,
      faWarning, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import HoverBar from "@/app/components/hover-bar";
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { faRemoveFormat } from "@fortawesome/free-solid-svg-icons/faRemoveFormat";
import AnimatedText from "@/app/components/movingtext";
import Wrap from "@/app/components/wrapper";
import PaymentCard from "@/app/components/payment-card";
import Card from "@/app/components/card";
import Toast from "@/app/components/toast";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js';
import VideoBackground from "@/app/components/load-video";
import Sound from "@/app/components/play-audio";
import anime, { remove } from "animejs";
import Pop from "@/app/components/pop-element";
import { Tippy as Tip } from "tippy.js";
import 'tippy.js/dist/tippy.css';
import Tippy from "@tippyjs/react";
import Tile from "@/app/components/border-div";
import Avatar from "@/app/components/attendee";
import Model2 from "@/app/components/attendee";
import { VRButton } from "three/examples/jsm/Addons.js";
  // Register required Chart.js components
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
import *as THREE from "three";
import { XRButton } from "three/examples/jsm/Addons.js";
import { createXRStore, XR } from "@react-three/xr";
import { createStore } from "@react-three/fiber/dist/declarations/src/core/store";
import { Controller } from "three/examples/jsm/libs/lil-gui.module.min.js";
import Notebook from "@/app/components/note-book";
import Spinner from "@/app/components/loader";

const Lab: React.FC = () => {
    const [state, setState] = useState('chem-1.jpg');
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
    const [isOutside, goOutside] = useState(false);
    const [environment,setEnvironment] = useState('forest.gif')
    const [skeleton, showSkeleton] = useState(false);

    const changePractical = (subject: string, index: number) => {
        const newImagePath = ['chem-1.jpg', 'physics.jpg', 'bio-1.jpg', 'chemInit.jpg'][index];
        setState(newImagePath)
        setIndexNumber(subject);
        setSubject(subject);
    };

    useEffect(() => {}, [state]);
    const noteData = (
        <div className="flex flex-col">
            <ul className="list-none relative -left-5">
                <li>Take notes</li>
            </ul>
        </div>
    )
    const noteSpace = () => {
            const notes = [
                {
                    practical1: "This experiment is often carried out to study redox reactions or the formation of potassium manganate (KMnO\u2084) in an alkaline environment.\n\n### Materials Needed:\n- Potassium manganate (KMnO\u2084) (usually in solid form or a concentrated solution)\n- Sodium hydroxide (NaOH), also known as caustic soda (solid or aqueous solution)\n- Distilled water\n- Magnetic stirrer and stir bar\n- Beaker (usually 250-500 mL)\n- Glass rod (optional, for manual stirring)\n- Gloves and safety goggles (for safety)\n\n### Procedure:\n\n#### 1. **Preparation:**\n- **Safety First:** Wear gloves and safety goggles throughout the experiment, as both potassium manganate and sodium hydroxide are hazardous.\n- **Prepare the Solutions:**\n  - If you have solid potassium manganate (KMnO\u2084), dissolve it in a small amount of distilled water to prepare a concentrated solution.\n  - Prepare a sodium hydroxide (NaOH) solution by dissolving solid caustic soda in distilled water. The concentration of NaOH can be adjusted based on the required molarity for the experiment (commonly 1 M to 2 M NaOH).\n\n#### 2. **Set Up the Apparatus:**\n- **Place the Beaker on the Magnetic Stirrer:** Place a clean 250 mL or 500 mL beaker on the magnetic stirrer base. Make sure it is centered on the stirrer plate.\n- **Add Stir Bar:** Place a magnetic stir bar into the beaker to help mix the solutions during the experiment.\n\n#### 3. **Mixing the Solutions:**\n- **Add Potassium Manganate Solution:** Slowly pour the potassium manganate (KMnO\u2084) solution into the beaker. The volume will depend on the concentration and the reaction you intend to carry out. A typical volume might be 50-100 mL for a small-scale experiment.\n- **Add Sodium Hydroxide Solution:** Next, slowly add the sodium hydroxide (NaOH) solution to the beaker. Stir continuously. The reaction between KMnO\u2084 and NaOH in an alkaline medium can lead to the formation of potassium manganate (K\u2082MnO\u2084) and potassium permanganate (KMnO\u2084) under different conditions.\n\n#### 4. **Start the Magnetic Stirrer:**\n- **Turn on the Magnetic Stirrer:** Turn on the magnetic stirrer at a low to moderate speed. This will ensure that the potassium manganate and sodium hydroxide mix thoroughly.\n- **Observe the Reaction:** As the NaOH is added to the KMnO\u2084 solution, you may notice a color change. Potassium manganate (KMnO\u2084) is purple, and when mixed with caustic soda, it can form green potassium manganate (K\u2082MnO\u2084) in an alkaline environment.\n\n#### 5. **Monitor the Reaction:**\n- **Observe Changes:** Monitor the color of the solution as it may shift from purple to green. The green color indicates the formation of potassium manganate (K\u2082MnO\u2084), which is formed when the MnO\u2084\u207b ions from potassium manganate (KMnO\u2084) react with the hydroxide ions (OH\u207b) from sodium hydroxide.\n- **Stir Continuously:** Continue stirring for several minutes to ensure the reaction goes to completion. The exact time will depend on the reaction conditions (concentration, temperature, etc.).\n\n#### 6. **End the Reaction:**\n- After sufficient stirring and observation, you can stop the reaction by turning off the magnetic stirrer.\n- The resulting solution should be a green color if potassium manganate (K\u2082MnO\u2084) has been successfully formed. If the solution has not reached the desired result, you can add more sodium hydroxide (NaOH) to ensure the reaction proceeds under alkaline conditions.\n\n#### 7. **Clean Up:**\n- **Dispose of Chemicals Properly:** Once you have finished the experiment, carefully dispose of the chemicals according to your laboratory’s guidelines.\n- **Clean the Equipment:** Clean the beaker, stir bar, and any other equipment used thoroughly with water.\n\n### Key Reactions to Expect:\n\n- Potassium manganate (KMnO\u2084) dissolves in water to give a purple solution:\n  [\n  KMnO\u2084 (s) -> MnO\u2084\u00b2\u207b (aq)\n  ]\n\n- In an alkaline medium, potassium manganate (KMnO\u2084) reacts with sodium hydroxide (NaOH) to form potassium manganate (K\u2082MnO\u2084), which is green:\n  [\n  2 KMnO\u2084 + 2 NaOH → K\u2082MnO\u2084 + Na\u2082O + H\u2082O\n  ]\n\nThis reaction produces the green-colored potassium manganate (K\u2082MnO\u2084), as the manganate ion (MnO\u2084\u00b2\u207b) forms in a strongly alkaline solution.\n\n### Notes:\n- The exact results can vary depending on concentration, temperature, and the specific conditions of the experiment.\n- The solution’s color change is a strong indicator of the progress of the reaction, with purple indicating potassium permanganate and green indicating potassium manganate.\n\nBy following these steps, you should successfully mix potassium manganate with caustic soda and observe the resulting reactions in the presence of a magnetic stirrer."
                },
                {
                    practical2: "" // You can add another practical or leave it empty.
                }
            ];
        
        return (
            
           !noteindex ? null :
           
            <div className={styles.note}>
            <Notebook text={notes[0].practical1} />
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
            <div className="w-full h-screen bg-slate-600 p-2 fixed top-0 z-10">
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
                {settingState == 'Change Practical' && indexNumber == 'Physics' && (<div className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto" style={{
                    backgroundImage:'url(/misc/competition/images/biology.jpg)',
                    backgroundRepeat:'no-repeat',
                    
                }}>
                <Card color="linear-gradient(to right,grey,white,rgba(0,0,0,0.2))" header="Science" name="Moment" small="Virtual Physics lab" onPressed={()=>{
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                </div>)}
                {settingState == 'Change Practical' && indexNumber == 'Biology' && (<div className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto" style={{
                    backgroundImage:'url(/misc/competition/images/biology.jpg)',
                    backgroundRepeat:'no-repeat',
                    
                }}>
                <Card color="linear-gradient(to right,grey,white,rgba(0,0,0,0.2))" header="Science" name="Inspection" small="Virtual Physics lab" onPressed={()=>{
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                       },3000);
                }}></Card>
                </div>)}
                {settingState == 'Change Practical' && indexNumber == 'Maths' && (<div className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto" style={{
                    backgroundImage:'url(/misc/competition/images/biology.jpg)',
                    backgroundRepeat:'no-repeat',
                    
                }}>
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
                    
                }} className="absolute left-64 w-8/12 h-full top-0 p-1 flex justify-center items-center flex-col overflow-auto">
                    <Line data={data} options={options} />
                    </div>}
                {toast && showToast()}
            </div>
        );
    }
    
    const data = {
        labels: ['Chemistry','Physics','Biology','Maths'], // X-axis labels
        datasets: [
          {
            label: 'Progress',
            data: [65, 19, 80, 81], // Y-axis data points
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color under the line
            tension: 0.4, // Smoothness of the curve (0: sharp lines, 1: very smooth)
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of the points
            pointBorderColor: '#fff', // Border color of the points
            pointHoverRadius: 5, // Size of the points when hovered
          },
        ],
      };
    
      // Chart options
      const options:any = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Hide vertical grid lines
            },
          },
          y: {
            beginAtZero: true, // Start the Y-axis at 0
          },
        },
      };
      const GoBack = () => {
        goOutside(true);
        return(
            <HoverBar title="Go back" items={[faSignOutAlt]} iconClass="text-white" runFunc1={()=> goOutside(false)}></HoverBar>
        )
      }
      useEffect(() => {
        anime({
           targets:'image',
           duration:2000,
           easing:'easeInOut',
           opacity:[0,1]
        })
      });

      const viewSkeleton = () => {
        return (
            <Pop element={<img src="/misc/competition/practical/skeleton.jpg" className="w-full h-full object-cover rounded"
            alt="photo"
            ></img>}>
            </Pop>
        )
      }
      const sandMenu = (
        <div className="flex flex-col gap-0">
            <ul className="list-none relative -left-5">
                <li onClick={()=>{setDishState(true)
                     setLabState(true)}}>Fetch some sand</li>
                <li onClick={()=>{setDishState(false);setDish('empty.png')}}>Dispose</li>
            </ul>
        </div>
      );
      //practical hooks
      const [dishState, setDishState] = useState(false);
      const [dish,setDish] = useState('empty.png');
      const [lab1, setLabState] = useState(true);
      const [activeDish, enableDish] = useState(true);
      const [dishLocation, setDisLocation] = useState('');
      const [soilState,setSoilState] = useState(false);
      const [isTime,setTime] = useState<boolean>(false);
      const [dishMenu, setDishContent] = useState((
        (<div className="flex flex-col">
            <ul className="list-none relative -left-5">
                <li onClick={()=>{
                    
                    setDishContent(
                        <div className="flex flex-col">
                            <p className="text-white text-center">What lab?</p>
                            <ul className="list-none relative -left-5">
                                <li onClick={()=>{
                                    setLabState(false);
                                    setDisLocation('Chemistry');
                                }}>Chemistry</li>
                                <li onClick={()=>{
                                    setLabState(false);
                                    setDisLocation('Physics');
                                }}>Physics</li>
                                <li onClick={()=>{
                                    setLabState(false);
                                    setDisLocation('Biology');
                                }}>Biology</li>
                                <li onClick={()=>{
                                    setLabState(false);
                                    setDisLocation('Maths');
                                }}>Maths</li>
                                <li onClick={()=>{
                                    enableDish(false);
                                }}>Back</li>
                            </ul>
                        </div>
                    )
                }}>Take to lab</li>
                <li onClick={()=>{enableDish(false)}}>Back</li>
            </ul>
        </div>)
      ));
      const ShowDish = () => {
        setTimeout(() => {
            setDish('dish.png');
        },2000);
        
        return (
            lab1 && <Tippy content={activeDish ? dishMenu : null} interactive={true} placement="top">
            <img src={`/misc/competition/practical/${dish}`}
             alt=""
             className="h-20 w-20 absolute bottom-8 left-64 brightness-50 animate-pulse box2" onMouseEnter={()=>enableDish(true)}>
             </img> 
             </Tippy>
        );
      }

      const lookInMicroscope = () => {
        return(
        mediaquery == 'desktop' && !isOutside && indexNumber=='Biology'?  (<img src={`/misc/competition/practical/dish.png`}
        alt=""
        className="h-10 w-16 absolute bottom-64 right-72 brightness-50 opacity-90 z-10" onMouseEnter={()=>enableDish(true)}>
        </img> ) : mediaquery == 'tablet' && !isOutside && indexNumber=='Biology' ? (<img src={`/misc/competition/practical/dish.png`}
        alt=""
        className="h-10 w-16 absolute bottom-72 right-44 brightness-50 opacity-90 z-10" onMouseEnter={()=>enableDish(true)}>
        </img> ) : null
        );
      }
      const microscope = (
        <div className="flex flex-col gap-0">
            <ul className="list-none relative -left-5">
                <li onClick={()=>{
                        setSoilState(true);
                }}>Look</li>
            </ul>
        </div>
      )
      const showSoil = () => {
        const menu = (
            <div className="flex flex-col">
                <ul className="list-none relative -left-5">
                    <li onClick={()=>{setSoilState(false)}}>Close</li>
                </ul>
            </div>
        )
       return(
        
        <Pop element={
            <Tippy content={menu} interactive={true} placement="top">
            <img src="/misc/competition/practical/soil.gif" className="w-full h-full object-cover rounded cursor-pointer"
            alt="photo"
            ></img>
            </Tippy>
            }
            >
            </Pop> 
       );
      }

      //chemistry
      const [beakerState,setBeakerState] = useState('empty-beaker.png');
      const [track,setTrack] = useState(false);
      useEffect(()=>{
        anime({
            targets:'.box2',
            translateY:'-100',
            easing:'easeOutElastic(1,0.3)',
            duration:1000
            });

            anime({
                targets:'.box3',
                translateY:[-100,0],
                easing:'easeOutElastic(1,0.3)',
                duration:1000
                
            });
      })
      const showBeacker = () => {
        
        return(
            <img src={`/misc/competition/practical/${beakerState}`} alt="beaker"
             className={beakerState == "empty-beaker.png" && mediaquery == "desktop" && isTime  ? "absolute bottom-64 right-96 h-28 w-32 cursor-pointer" :
                mediaquery == "tablet" && beakerState == "empty-beaker.png" && isTime  ? "absolute bottom-52 right-72 h-20 w-20   cursor-pointer"
                : mediaquery == "desktop" && beakerState == "full-beaker.png" ? "absolute bottom-68 right-98 h-28 w-24  cursor-pointer box3":
                mediaquery == "tablet" && beakerState == "full-beaker.png" ? "absolute bottom-56 right-72 h-20 w-20  cursor-pointer box3" : ''
            }
                 title={beakerState == "empty-beaker.png"? 'Mixture of sugar and caustic soda solution':'Result'}></img>
        )
      }
      const [mixtureState,setMixtureState] = useState(true);
      const [showMix,setShowMix] = useState(false);
      const Potassium = (
        <div className="flex flex-col">
            <ul className="list-none relative -left-5">
                <li onClick={()=>{
                    setTrack(true)
                    setShowMix(true);
                    setMixtureState(true);
                }}>Pour into beaker</li>
            </ul>
        </div>
      )
      const showMixture = () => {
        setTimeout(() => {
            setMixtureState(false);
            setShowMix(false);
            setBeakerState('full-beaker.png')
        },7000);
        const menu = (
            <div className="flex flex-col">
                <ul className="list-none relative -left-5">
                    <li onClick={()=>{
                        setBeakerState('full-beaker.png')
                        setMixtureState(false);
                    }}>Close</li>
                </ul>
            </div>
        )
        return(
            mixtureState && <Tippy content={menu} interactive={true} placement="top">
            <Pop element={<img src="/misc/competition/practical/mixture.gif" alt="" className="box2 z-20"></img>}></Pop>
            </Tippy>
        )
      }
      const menu2 = (
        <div className="flex flex-col">
            <ul className="list-none relative -left-5">
                <li onClick={()=>{
                    setBeakerState('empty-beaker.png')
                }}>Dispose</li>
            </ul>
        </div>
    )
    const [isMoving,setMoving] = useState('/misc/competition/ley/animations/idle/attendee_idle.glb');
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(()=>{
        const renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.xr.enabled = true;
        const vrButton:any = VRButton.createButton(renderer);
        //document.body.appendChild(vrButton);
        if(ref.current){
            ref.current.appendChild(vrButton);
        }
    },[]);
    const store = createXRStore();
    
    const setTimeToDisplay = () => {
        setTimeout(()=>{
        setTime(true);
        },1000);
    }
    useEffect(()=>{
        setTimeToDisplay();
    },[]);
    const FallBack = () => {
        return(
            <Html center>
                <Spinner></Spinner>
            </Html>
        )
    }
    return (
        <PageLayout>
            {mediaquery!='mobile' ? (<div className={ mediaquery == 'desktop' ? styles.container : mediaquery == 
                'tablet' ? styles.container : styles.container
            }>
                {mediaquery == 'desktop' ? (<div className={styles.header}>
                    <h1>Subjects:</h1>
                    {['Chemistry', 'Physics', 'Biology', 'Maths'].map((subject, index) => (
                        <div  key={subject} className={styles.box1} onClick={() => {changePractical(subject,index)
                           
                        }
                        }  style={{
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
                    <div className={styles.subject}>

                        {indexNumber == 'Chemistry' ? (<img className="w-full h-full object-cover rounded" alt="" src={`/misc/competition/practical/iodine.png`}></img>
                        ):
                        indexNumber == 'Biology' ? (<img className="w-full h-full object-cover rounded" alt="" src={`/misc/competition/practical/bio-logy.png`}></img>):
                        indexNumber == 'Physics' ? (<img className="w-full h-full object-cover rounded" alt="" src={`/misc/competition/practical/iodine.png`}></img>):
                        indexNumber == 'Math' ? (<img className="w-full h-full object-cover rounded" alt="" src={`/misc/competition/practical/bio-logy.png`}></img>):null}
                        {indexNumber == "Chemistry" && <p className="p-1 bg-black animate-pulse text-white text-center absolute top-40 rounded">Chemistry</p>}
                    </div>
                    <h4>Select practical</h4>
                    <select title="Available practicals">
                    {indexNumber == 'Chemistry' ?  <option value="">Mixture</option> : indexNumber 
                    == 'Physics' ? <option>Moment</option> : indexNumber
                    == 'Biology' ? <option>Inspection</option> : indexNumber == 
                    'Maths' ? <option>Cummulative frequency</option> : null
                    }
                    
                    </select>
                    <h4>Statistics</h4>
                    <Line data={data} options={options}></Line>
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
                    <button onClick={()=> store.enterVR()} className="p-2 bg-black animate-pulse rounded shadow text-white cursor-pointer absolute top-5 z-30 border-none">Enter VR</button>
                    <Canvas>
                       <XR store={store}>
                        <Suspense fallback={<FallBack/>}>
                            {!isOutside ? (<Background1 imageUrl={`/misc/competition/images/${state}`} />) : 
                            (<VideoBackground path="/misc/competition/practical/forest-3463.mp4"></VideoBackground>)}
                            {isOutside && (<Sound path="/misc/competition/practical/forest.mp3"/>)}
                            {!isOutside && (
                                <Model modelPath='/misc/competition/models/exercise_book/book.glb'
                                position={[-5.5, -2, 0]}
                                scale={[0.3, 0.2, 0.7]}
                                rotation={[1, 1, 1]}
                                onClick={()=> checkNote()}
                            />)}
                           
                            {!isOutside && indexNumber === "Chemistry" && mediaquery === 'desktop'  ? (<Model2 url={'/misc/competition/ley/animations/idle/attendee_idle.glb'}
                             scale={0.03}
                             rotation={[0,0.85,0]}
                             position={[-1.65,-1.3,0]}
                             ></Model2>):!isOutside && indexNumber === "Chemistry" && mediaquery === 'tablet' ? (<Model2 url={'/misc/competition/ley/animations/idle/attendee_idle.glb'}
                                scale={0.03}
                                rotation={[0,0.85,0]}
                                position={[-1.1,-1.4,0]}
                                ></Model2>):null }
                            <OrbitControls enableRotate={false} enableZoom={false} />
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                        </Suspense>
                        
                        </XR>
                    </Canvas>
                    
                    {info("How are you doing boss this is the virtual lab where practicals can be performed in real time please stay tuned")}

                    {/* items */}
                    <div className="relative h-36 w-72 -top-3/4 left-20" onClick={()=>{
                        setShown(prev => !prev);
                       
                        }}></div>
                    {mediaquery == 'desktop' ? (
                        dishLocation == 'Biology' ? (<Tippy content={microscope} interactive={true} placement="left">
                        <div className="w-40 h-48 absolute top-60 right-44 cursor-pointer" onClick={()=>{
                            indexNumber == 'Biology' ? alert('microscope') : null

                            }}> 
                        </div>
                        </Tippy>) : (<div className="w-40 h-48 absolute top-60 right-44 cursor-pointer" onClick={()=>{
                            indexNumber == 'Biology' ? alert('microscope') : null
                            }}> </div>)
                    ):mediaquery == 'tablet' ? (
                        dishLocation == 'Biology' && indexNumber == "Biology" ? (<Tippy content={microscope} interactive={true} placement="top">
                        <div className="w-28 h-48 absolute top-72 right-28 cursor-pointer" onClick={()=>{
                        indexNumber == 'Biology' ? alert('microscope') : null
                        }}> </div>
                        </Tippy>):null
                        ):null}

                        <HoverBar items={[!isOutside ? faSignOutAlt : faSignInAlt]} iconClass="text-white cursor-pointer"
                         className="absolute top-56 right-10 w-auto h-auto p-3 bg-black flex gap-3 flex-grow justify-center  animate-pulse rounded-lg shadow-xl"
                          runFunc1={()=>
                            goOutside(prev => !prev)
                        } title= {isOutside ? "Go back" : "Go outside"}></HoverBar>

                        {mediaquery== "desktop" ? (<div className="w-24 h-72 absolute top-28 left-64 cursor-pointer"
                        onClick={()=>{indexNumber == 'Biology' ? showSkeleton(prev => !prev):null}}
                        title="Skeleton"></div>):mediaquery == "tablet" ? (<div className="w-20 h-72 absolute top-40 left-44 cursor-pointer"
                            onClick={()=>{indexNumber == 'Biology' ? showSkeleton(prev => !prev):null}}
                            title="Skeleton"></div>):null}

                        {skeleton && indexNumber == "Biology" && viewSkeleton()}
                        {soilState && !isOutside && indexNumber == "Biology" && showSoil()}
                        
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
                        { display && mediaquery != 'desktop' && labSettings()}

                        {isOutside && !display && (<Tippy content={sandMenu} interactive={true} placement="right">
                         <img src="/misc/competition/practical/bag.png" alt="sand"
                         className="absolute bottom-2 left-10 h-60 brightness-75 cursor-grab">
                        </img>
                        </Tippy>
                        )}
                        {dishState && ShowDish()}

                        {/* Chemistry */}

                        {indexNumber == "Chemistry" && !isOutside && mediaquery == "desktop" && isTime ? (<Tippy content={menu2} placement="left" interactive={true}> 
                        <img src="/misc/competition/practical/stirrer.png" alt="stir"
                         className="absolute bottom-44 right-96 h-32 w-32 brightness-75 cursor-pointer" title="Magnetic stirrer"></img></Tippy>)
                        :indexNumber == "Chemistry" && !isOutside && mediaquery == "tablet" && isTime ? (<Tippy content={menu2} placement="left" interactive={true}> 
                            <img src="/misc/competition/practical/stirrer.png" alt="stir"
                             className="absolute bottom-40 right-72 h-20 w-20 brightness-75 cursor-pointer" title="Magnetic stirrer"></img></Tippy>)
                             : null
                        }

                         {indexNumber == "Chemistry" && !isOutside && showBeacker()}
                         {indexNumber == "Chemistry" && mediaquery == "desktop" && !isOutside && isTime  ? (<Tippy content={Potassium} interactive={true} placement="top">
                         <img src="/misc/competition/practical/manganate.png" alt="manganate"
                         className="absolute bottom-40 left-80 h-24 w-24 brightness-50 cursor-pointer"
                         title="Potassium manganate"></img>
                         </Tippy>):indexNumber == "Chemistry" && mediaquery == "tablet" && !isOutside && isTime  ?
                         (<Tippy content={Potassium} interactive={true} placement="top">
                            <img src="/misc/competition/practical/manganate.png" alt="manganate"
                            className="absolute bottom-48 right-32 h-24 w-24 brightness-50 cursor-pointer"
                            title="Potassium manganate"></img>
                            </Tippy>):null}
                         {indexNumber == "Chemistry" && showMix && showMixture()}
                        {/* Physics */}

                        {/* biology */}
                        {dishLocation == 'Biology' && mediaquery == 'desktop' ? lookInMicroscope(): 
                            dishLocation == 'Biology' && mediaquery == 'tablet' ? lookInMicroscope()
                            : null
                        }
                        
                        {/* Mathematics */}
                </div>
                {/* Items */}
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
            <div className={mediaquery == 'tablet' ? "fixed right-20 h-auto w-auto":
                mediaquery == 'desktop' ? "fixed bottom-10 left-44 h-auto w-auto": ''}
                ref={ref}>
            </div>
        </PageLayout>
    );
};

export default Lab;


