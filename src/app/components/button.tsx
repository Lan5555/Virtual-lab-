import React from "react";
import styles from "../css/btn.module.css"
interface props{
   onpressed:(event:React.MouseEvent<HTMLButtonElement>) => void;
   children:React.ReactNode;
   className?:string;
}

const ElevatedButton:React.FC<props> = ({children,onpressed}) => {
    return <button onClick={onpressed} className={styles.btn}>
        {children}
    </button>
}
export default ElevatedButton;