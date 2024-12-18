/* eslint-disable @next/next/no-img-element */
import { faAngleDown, faAngleLeft, faBars, faClose, faComputer, faHistory, faHouse, faPerson, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { div, element } from "three/webgpu";
import Toast from "./toast";
import { useRouter } from "next/navigation";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import { useFirebase } from "../hooks/firebase";

interface props{
sendLabName?: (message: string) => void;
model?: (name: string) => void;
className?: string;
}

const HoverSideBar:React.FC<props> = ({sendLabName,model, className = 'rounded w-64 h-4/5 bg-slate-700  fixed right-3 top-10 p-3 flex justify-center flex-col shadow-2xl z-50'}) => {
    const [modelOpen, setModelOpen] = useState(false);
    const [spaceOpen, setSpaceOpen] = useState(false);
    const [practicalOpen, SetPracticalOpen] = useState(false);
    const [name, setName] = useState('Nothing Selected');
    const [currentState, setState] = useState(true);
    const [modelName, setModelName] = useState<string>('');
    //const [bgName, setBgName] = useState('empty-room');

    
  const handleLabSelection = (labName: string) => {
    setName(labName); 
    if (sendLabName) {
      sendLabName(labName); 
    }
  };

  const handleModel = (name: string) => {
    if(model){
        model(modelName);
    }
  }
  
    const [isShown, setShown] = useState(false);
    const router = useRouter();
  const menu = (
    <div className="flex flex-col">
        <ul className="list-none relative -left-5">
            <li onClick={()=> {
                router.push('/pages/dashboard');
            }}>Back to Dashboard</li>
        </ul>
    </div>
);
    
      const [visible, setVisible] = useState(false); // visibility state for components
    return (
    <>
    <div className={className}>
    <div className="flex justify-between">
    <h2 className="text-white">Options</h2>
    <Tippy content={menu} placement="top" interactive={true}>
    <FontAwesomeIcon icon={faBars} className="text-white relative top-7 right-3"></FontAwesomeIcon>
    </Tippy>
    </div>
    <input className="p-2 rounded-2xl bg-black border-none text-white" type="search" placeholder="Search"></input>
    <div className="flex justify-between l-b-w  h-10 items-center relative -left-3 top-3">
        <div className="flex ml-4 gap-2">
        <FontAwesomeIcon icon={faPerson} className="text-white relative top-4"></FontAwesomeIcon>
        <h3 className="text-white text-sm">Models</h3>
        <div className={`h-80 w-60 bg-slate-700 rounded absolute -left-64 transition-all duration-300 grid grid-cols-2 gap-5 overflow-auto place-items-center p-1 eliminate-bar z-50  ${
            modelOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
            {/* Models */}
           
            <div className="w-20 h-20 rounded shadow p-1 bg-white hover:scale-75 transition-all" onClick={()=>{
                setModelName('Table 1');
                handleModel(modelName);
            }}>
                <img src="/misc/competition/practical/table-rec.png" alt="" className="w-20 h-20 object-cover rounded"></img>
            </div>
            <div className="w-20 h-20 rounded shadow p-1 bg-white hover:scale-75 transition-all" onClick={()=>{
                setModelName('Empty Beaker')
                handleModel(modelName);            
            }}>
                <img src="/misc/competition/practical/beaker.png" alt="" className="w-20 h-20 object-cover rounded"></img>
            </div>
            <div className="w-20 h-20 rounded shadow p-1 bg-white hover:scale-75 transition-all" onClick={()=>{
                setModelName('Table 2')
                handleModel(modelName);
            }}>
                <img src="/misc/competition/practical/table-v.png" alt="" className="w-20 h-20 object-cover rounded"></img>  
            </div>
            <div className="w-20 h-20 rounded shadow p-1 bg-white hover:scale-75 transition-all" onClick={()=>{
                setModelName('Retort Stand')
                handleModel(modelName);              
            }}>
                <img src="/misc/competition/practical/retort-stand.png" alt="" className="w-20 h-20 object-cover rounded"></img>
            </div>
            <div className="w-20 h-20 rounded shadow p-1 bg-white hover:scale-75 transition-all" onClick={()=>{
                setModelName('Iodine')
                handleModel(modelName);             
            }}>
               <img src="/misc/competition/practical/iodine.png" alt="" className="w-20 h-20 object-cover rounded"></img>
            </div>
            <div className="w-20 h-20 rounded shadow p-1 bg-white hover:scale-75 transition-all" onClick={()=>{
                setModelName('Skeleton')
                handleModel(modelName);
            }}>
                <img src="/misc/competition/practical/skeleton-1.png" alt="" className="w-20 h-20 object-cover rounded"></img>

            </div>
            <p className="text-black p-1 bg-white rounded w-auto h-auto">{modelName}</p>
            <button className="bg-black rounded animate-pulse border-none text-white p-2 cursor-pointer" onClick={()=>{
               
            }}>Confirm</button>
        </div>
        </div>
        <FontAwesomeIcon icon={!modelOpen ? faAngleDown : faClose} className="text-white cursor-pointer text-sm" onClick={()=>{
            setModelOpen(prev => !prev);
        }}></FontAwesomeIcon>
    </div>
    <div className="flex justify-between h-10 items-center relative -left-3 top-6">
    <div className="flex ml-4 gap-2">
        <FontAwesomeIcon icon={faHouse} className="text-white relative top-4"></FontAwesomeIcon>
        <h3 className="text-white text-sm">Spaces</h3>
        <div className={`h-80 w-60 bg-slate-700 rounded absolute -left-64 transition-all duration-300 grid grid-cols-2 gap-0 overflow-auto place-items-center p-1 ${
            spaceOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
            {/* Spaces */}
            <div className="w-20 h-20 rounded shadow p-1 bg-black hover:scale-75 transition-all" onClick={()=>{
                handleLabSelection('Lab 1');
                
            }}>
            <img src="/misc/competition/images/empty-room.jpg" alt="" className="w-20 h-20 object-cover rounded"></img>
            </div>
            <div className="w-20 h-20 rounded shadow p-1 bg-black hover:scale-75 transition-all" onClick={()=>{
                 handleLabSelection('Lab 2');
                 
            }}>
            <img src="/misc/competition/images/empty-3.jpg" alt="" className="w-20 h-20 object-cover rounded"></img>
            </div>
            <div className="w-20 h-20 rounded shadow p-1 bg-black hover:scale-75 transition-all" onClick={()=>{
                 handleLabSelection('Lab 3');
                
            }}>
            <img src="/misc/competition/images/empty-2.jpg" alt="" className="w-20 h-20 object-cover rounded"></img>
            </div>
            <div className="w-20 h-20 rounded shadow p-1 bg-black hover:scale-75 transition-all" onClick={()=>{
                 handleLabSelection('Lab 4');
                
            }}>
            <img src="" alt="" className="w-20 h-20 object-cover rounded"></img>
            </div>
            <p className="text-white">{name}</p>
            <button className="bg-black rounded animate-pulse border-none text-white p-2 cursor-pointer" onClick={()=>{
               setSpaceOpen(prev => !prev);
            }}>Confirm</button>
            
        </div>
        </div>
        <FontAwesomeIcon icon={!spaceOpen ? faAngleDown : faClose} className="text-white cursor-pointer text-sm" onClick={()=>{
            setSpaceOpen(prev => !prev);
        }}></FontAwesomeIcon>
    </div>
    <div className="flex justify-between h-10 items-center relative -left-3 top-8">
    <div className="flex ml-4 gap-2">
        <FontAwesomeIcon icon={faComputer} className="text-white relative top-4"></FontAwesomeIcon>
        <h3 className="text-white text-sm">Add practical</h3>
        <div className={`h-80 w-60 bg-slate-700 rounded absolute -left-64 transition-all duration-300 ${
            practicalOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
            {/* Add practical */}
        </div>
        </div>
        <FontAwesomeIcon icon={!practicalOpen ? faAngleDown : faClose} className="text-white cursor-pointer text-sm" onClick={()=>{
            SetPracticalOpen(prev => !prev);
        }}></FontAwesomeIcon>
    </div>
    <div className="flex justify-between h-10 items-center relative -left-3 top-10">
    <div className="flex ml-4 gap-2">
    <FontAwesomeIcon icon={faTrash} className="text-white relative text-sm opacity-75 cursor-pointer top-3" onClick={()=>{
            localStorage.clear();
            setShown(true);
            setTimeout(()=> {
                setShown(false);
            },3000);
        }}></FontAwesomeIcon>
        <h2 className="text-white text-sm cursor-pointer" onClick={()=>{
            localStorage.clear();
            setShown(true);
            setTimeout(()=> {
                setShown(false);
            },3000);
        }}>Reset Lab</h2>
    </div>
    </div>
    <div className="flex justify-center mt-16">
    <div className="rounded w-60 h-52 bg-slate-950 p-1">
        <div className="flex justify-between items-center">
        <h3 className="text-white animate-pulse opacity-75 relative left-4 text-sm">Recent Activities</h3>
        <FontAwesomeIcon icon={faHistory} className="text-white relative right-3 text-sm opacity-75"></FontAwesomeIcon>
        </div>
        {/* Recent activities */}
        <div className="p-2 w-60 h-53 overflow-auto">
         
        </div>
    </div>
    </div>
    {isShown && <Toast text="Cleared succesfully"></Toast>}
    </div>
    </>
    );
}
export default HoverSideBar;

