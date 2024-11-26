import { useEffect, useState } from "react";
import DropDown from "../components/dropbar";
import LayoutHead from "./sections/layout-head";
import LayoutSide from "./sections/layout-side";
import styles from '@/app/css/dashboard.module.css';


const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState(false);
    const [name, setName] = useState('angleDown');

    const handleSetName = (name: string) => {
        setName(name == 'angleDown' ? 'close' : 'angleDown');
    }

    const toggleState = () => {
        setState(prevState => !prevState);
    }

    return (
      <div className="main-layout">
        <LayoutHead search="" dropdown={state} name={name} setName={handleSetName} setView={toggleState} />
        {state ? <DropDown category={'avatar'} src={'/misc/oct.jpg'} content='You are currently on a free plan'
                 onPressed1={()=>{ }} onPressed2={()=>{
                toggleState();
                handleSetName(name);
                 }}/> : null} 
        <LayoutSide dropdown={state} />
        <div className={styles.content}>{children}</div>
      </div>
    );
};
  
export default PageLayout;