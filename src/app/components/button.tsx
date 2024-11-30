import React from "react";
import styles from "../css/btn.module.css"
interface props{
   onPressed:(event:React.MouseEvent<HTMLButtonElement>) => void;
   children:React.ReactNode;
   className?:string;
}

const ElevatedButton:React.FC<props> = ({children,onPressed}) => {
    return <button onClick={onPressed} className={styles.btn}>
        {children}
    </button>
}
export default ElevatedButton;