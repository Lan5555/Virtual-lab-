
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faInfoCircle, faMarsStrokeUp, faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import styles from '../css/btn.module.css';

interface props{
    className?:string;
    text:string;
    textClass?:string;
    duration?:number;
    type?:'warning' | 'info' | 'success';
}

const Toast:React.FC<props> = ({className="fixed top-10 right-2 w-72 h-24 p-2 shadow-2xl rounded bg-white  border-none flex justify-center items-center flex-col animate-slidex z-30", text="Hello world"
    , textClass="text-elipsis", duration=300,
    type= 'info'
}) => {
    const [width,setWidth] = useState(100);
    const [visible,toggleVisible] = useState(true);
   
    useEffect(() => {
        const interval = setInterval(() => {
           setWidth((prev) => {
            if(prev <= 0){
                clearInterval(interval)
                return 0;
            }
            return prev - 1;
           })
        },30);

        return () => clearInterval(interval);
    },[]); 
    useEffect(() => {
        const timeout = setTimeout(() => {
            toggleVisible(false);
        },duration);
        return () => clearTimeout(timeout);
    })
    
    return (
        <div>
        {visible && (<div className={className}>
            <FontAwesomeIcon icon={type =='success' ? 
                faMarsStrokeUp :
                type == 'warning' ? faWarning :
                faInfoCircle
            } className="absolute left-5 top-4 text-gray-700 animate-pulse" style={{height:'20px',
                color: type == 'warning' ? 'red' : 
                type == 'success' ? 'green' : 'yellowgreen'
            }}></FontAwesomeIcon>
            <h3 className={textClass}>{text}</h3>
            <div className="absolute bottom-0 w-full h-1">
                <div className="h-1 bg-slate-950" style={{
                    width:`${width}%`
                }}></div>
            </div>
        </div>) }
        </div>
    )
}
export default Toast
