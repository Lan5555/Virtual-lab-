'use client';
import { CSSProperties, useEffect, useState } from "react";
import Toast from "@/app/components/toast";
import FullLayout from "@/app/page-layouts/full-layout";
import { Register } from "./register";
import { SignIn } from "./signin";

const Login: React.FC = () => {
    const [isClicked, setClicked] = useState(false);
    const [isClicked1, setClicked1] = useState(false);
    const [viewport, setViewport] = useState('desktop');
    const [Invalid, setInvalid] = useState(false);
    const [view, setView] = useState('login');

    const updateMediaQuery = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
            setViewport('mobile');
        } else if (window.matchMedia('(max-width: 768px)').matches) {
            setViewport('tablet');
        } else {
            setViewport('desktop');
        }
    };

    const handleSetClicked = (val: boolean) => {
        setClicked(val);
    }

    const handleSetClicked1 = (val: boolean) => {
        setClicked1(val);
    }

    const handleSetView = (val: string) => {
        setView(val);
    }

    useEffect(() => {
        updateMediaQuery();
        window.addEventListener('resize', updateMediaQuery);
        return () => window.removeEventListener('resize', updateMediaQuery);
    }, []);

    const divStyle: CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '30px',
        boxShadow: '0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)',
        height: viewport === 'mobile' ? '70vh' : viewport === 'tablet' ? '65vh' : '63.5vh',
        width: viewport === 'mobile' ? '80%' : viewport === 'tablet' ? '65%' : '40%',
        padding: '10px',
        border:'1px solid rgba(255, 255, 255, 0.3)',
       backdropFilter:'blur(30px)'
        
    };

    return (
        <FullLayout>
            <div style={{
                width:'100wh',
                height:'100vh',
                //background:'linear-gradient(to right, blueviolet,lightblue,blueViolet)',
                backgroundImage:'url(/misc/competition/images/biology.jpg)',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'center',
            }}>
            <div style={divStyle}>
                {
                    view === 'login' 
                        ? <SignIn viewport={ viewport } isClicked={isClicked} isClicked1={isClicked1} handleSetClicked={handleSetClicked} handleSetClicked1={handleSetClicked1} handleSetView={handleSetView} /> 
                        : <Register viewport={ viewport } isClicked={isClicked} isClicked1={isClicked1} handleSetClicked={handleSetClicked} handleSetClicked1={handleSetClicked1} handleSetView={handleSetView} /> 
                    }
            </div>
        {Invalid && (<Toast text={'Invalid Credentials'} type="warning" textClass="text-red-500"></Toast>)}
            </div>
        </FullLayout>
    );
};

export default Login;

