import { useEffect, useState } from "react";
import DropDown from "../components/dropbar";
import LayoutHead from "./sections/layout-head";
import LayoutSide from "./sections/layout-side";
import styles from '@/app/css/dashboard.module.css';
import React from "react";
import { useFirebase } from "../hooks/firebase";
import { useRouter } from "next/navigation";


const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { getUser } = useFirebase();
    const [state, setState] = useState(false);
    const [name, setName] = useState('angleDown');
    const [search, setSearch] = useState('');
    const [open, setIsOpen] = useState(true);
    const [showBars, showSideBars] = useState(false);

    const user = getUser();


    const handleSetName = (name: string) => {
        setName(name == 'angleDown' ? 'close' : 'angleDown');
    }

    const handleSetSearch = (search: string) => {
      setSearch(search);
    }

    const toggleState = () => {
        setState(prevState => !prevState);
    }

    const handleSideIsOpen = (val: boolean) => {
      setIsOpen(val);
    }

    const handleShowBars = (val: boolean) => {
      showSideBars(val);
    }
    const router = useRouter();

    return (
      <div className="main-layout">
        {state ? <DropDown userName={`${user.first_name} ${user.last_name}`} category={'avatar'} src={'/misc/oct.jpg'} content='You are currently on a free plan'
                 onPressed1={()=>{ 
                  router.push('/pages/login');
                 }} onPressed2={()=>{
                toggleState();
                handleSetName(name);
                 }}/> : null} 
        <LayoutSide sideIsOpen={open} toggleShowBars={ handleShowBars } />
        <div className={styles.content}>
          <LayoutHead search={ search } dropdown={state} showBars={showBars} name={name} userName={`${user.first_name} ${user.last_name}`} setSearch={handleSetSearch} setName={handleSetName} setView={toggleState} toggleSideOpen={ handleSideIsOpen } />
            <div>
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(child)
                  : child
              )}
            </div>
        </div>
      </div>
    );
};
  
export default PageLayout;