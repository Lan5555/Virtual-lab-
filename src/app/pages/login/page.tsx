'use client';
import Icon from "@/app/components/icons";
import { faEye, faEyeSlash, faGolfBall, IconDefinition, IconPrefix } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGoogle as google} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { relative } from "path";
import { CSSProperties, useEffect, useState } from "react";
import Toast from "@/app/components/toast";
import FullLayout from "@/app/page-layouts/full-layout";


const Login: React.FC = () => {
    const [isClicked, setClicked] = useState(false);
    const [isClicked1, setClicked1] = useState(false);
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [viewport, setViewport] = useState('desktop');
    const [icon,setIcon] = useState<IconDefinition>(faEyeSlash);
    const [Invalid, setInvalid] = useState(false);
    const router = useRouter();
    const googleIcon:any = faGoogle;
    const updateMediaQuery = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
            setViewport('mobile');
        } else if (window.matchMedia('(max-width: 768px)').matches) {
            setViewport('tablet');
        } else {
            setViewport('desktop');
        }
    };

    useEffect(() => {
        updateMediaQuery();
        window.addEventListener('resize', updateMediaQuery);
        return () => window.removeEventListener('resize', updateMediaQuery);
    }, []);

    const showToast = () => {
        return(
        <Toast text="Invalid Credentials"></Toast>
        );
    }
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
        border:'1px solid rgba(0,0,0,0.1)',
       backdropFilter:'blur(30px)'
        
    };

    return (
        <FullLayout>
            <div style={{
                width:'100wh',
                height:'100vh',
                background:'linear-gradient(to right, blueviolet,lightblue,blueViolet)',
                backgroundImage:'url(/misc/competition/images/biology.jpg)',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'center',
                
                
            }}>
            <div style={divStyle}>
                <form 
                onSubmit={(event:any)=>{
                    event.preventDefault();
                    if(value == 'lan' && value1 == '6984'){
                        
                        router.push('/pages/dashboard');
                    }else{
                        setInvalid(true);
                        setTimeout(() => setInvalid(false),3000);
                    }
                }}
                style={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center',flexDirection:'column'}}>
                    <h2 style={{ textAlign: 'center',
                        fontSize:'30px'
                    }}>
                        <Icon iconName='signIn' color="black" size1={undefined} onPressed={() => {}} /> Login
                    </h2>
                    <label 
                        htmlFor='email' 
                        style={{
                            position: 'absolute',
                            top: '130px',
                            left: viewport === 'mobile' ? '48px' : '63px',
                            zIndex: 1,
                            transition: 'all 0.3s ease-in-out',
                            transform: isClicked ? 'translateY(-24px)' : '',
                            display: value === '' ? 'block' : 'none',
                        }}>
                        Email
                    </label>
                    <input 
                        id='email' 
                        type="text" 
                        onFocus={() => setClicked(true)} 
                        onBlur={() => setClicked(false)} 
                        onChange={(e) => setValue(e.target.value)} 
                        style={{
                            width: '80%',
                            padding: '8px',
                            position: 'relative',
                            top: '30px',
                        // left: viewport === 'mobile' ? '38px' : '50px',
                            border: 'none',
                            borderBottom: '0.2px solid grey',
                            outlineColor: 'blueviolet',
                            backgroundColor:'transparent'
                        }} 
                        required 
                    />
                    <br />
                    <label 
                        htmlFor='password' 
                        style={{
                            position: 'absolute',
                            top: '198px',
                            left: viewport === 'mobile' ? '48px' : '63px',
                            zIndex: 1,
                            transition: 'all 0.3s ease-in-out',
                            transform: isClicked1 ? 'translateY(-26px)' : '',
                            display: value1 === '' ? 'block' : 'none',
                        }}>
                        Password
                    </label>
                    <input 
                        id='password' 
                        type= {icon == faEyeSlash ? "password" : "text"}
                        onFocus={() => setClicked1(true)} 
                        onBlur={() => setClicked1(false)} 
                        onChange={(e) => setValue1(e.target.value)} 
                        style={{
                            width: '80%',
                            padding: '8px',
                            position: 'relative',
                            top: '45px',
                            //left: viewport === 'mobile' ? '38px' : '50px',
                            border: 'none',
                            borderBottom: '0.2px solid grey',
                            outlineColor: 'blueviolet',
                            backgroundColor:'transparent'
                        }} 
                        required 
                    />
                    <FontAwesomeIcon icon={icon} style={{position:"relative", left:'38%', bottom:'-22px'}}
                    onClick={()=>{
                        setIcon(icon == faEyeSlash ? faEye : faEyeSlash);
                    }}
                    ></FontAwesomeIcon>
                    
                    <button type="submit" style={{
                        width: '80%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '10px',
                        background:'linear-gradient(to right, black,white,rgba(0,0,0,0.1))',
                        position: 'relative',
                        top: '90px',
                        boxShadow:'0px 4px 8px rgba(0,0,0,0.1)',
                        color:'black',
                        fontWeight:'bold',
                        cursor:'pointer'
                        //left: viewport === 'mobile' ? '45px' : '55px',
                    }}  >Log in</button>

                    <p style={{
                        fontSize: '10pt',
                        position: 'relative',
                        top: '135px',
                        textAlign: 'center',
                    }}>Or</p>
                    <div style={{
                        display:'flex',
                        gap:'5px'
                    }}>
                    <p style={{
                        fontSize: '10pt',
                        position: 'relative',
                        top: '130px',
                        textAlign: 'center',
                    }}>Sign in with</p>
                    <p style={{
                        fontSize: '10pt',
                        position: 'relative',
                        top: '125px',
                        textAlign: 'center',
                    }}>
                        <FontAwesomeIcon icon={googleIcon} style={{height:'20px', color:'white'}} onClick={()=>{}}></FontAwesomeIcon>
                        
                    </p>
                    </div>
                    <p style={{
                        fontSize: '10pt',
                        position: 'relative',
                        top: '15px',
                        textAlign: 'center',
                    }}>Don&apos;t have an account? <a href="#" style={{ fontSize: '10pt',color:'white' }}>Register</a></p>
                </form>
            </div>
        {Invalid && (<Toast text={'Invalid Credentials'} type="warning" textClass="text-red-500"></Toast>)}
            </div>
        </FullLayout>
    );
};

export default Login;

