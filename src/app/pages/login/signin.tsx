import Icon from "@/app/components/icons";
import { useFirebase } from "@/app/hooks/firebase";
import { faEye, faEyeSlash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGoogle as google} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface props {
    viewport: string;
    isClicked: boolean;
    isClicked1: boolean;
    handleSetClicked: (val: boolean) => void;
    handleSetClicked1: (val: boolean) => void;
    handleSetView: (val: string) => void;
}

export const SignIn:React.FC<props> = ({ viewport, isClicked, isClicked1, handleSetClicked, handleSetClicked1, handleSetView }) => {
    const { signIn, logActivity } = useFirebase();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [icon,setIcon] = useState<IconDefinition>(faEyeSlash);
    
    const router = useRouter();
    const googleIcon:any = faGoogle;

    return (
        <form 
        onSubmit={ async (event: any) => {
            event.preventDefault();
            const res = await signIn(email, password);
            if (res.success) {
                router.push('/pages/dashboard');
                logActivity(`${res.data.first_name} ${res.data.last_name} logged in`);
            } else {
                alert(res.message)
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
                    display: email === '' ? 'block' : 'none',
                }}>
                Email
            </label>
            <input 
                id='email' 
                type="text" 
                onFocus={() => handleSetClicked(true)} 
                onBlur={() => handleSetClicked(false)} 
                onChange={(e) => setEmail(e.target.value)} 
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
                    display: password === '' ? 'block' : 'none',
                }}>
                Password
            </label>
            <input 
                id='password' 
                type= {icon == faEyeSlash ? "password" : "text"}
                onFocus={() => handleSetClicked1(true)} 
                onBlur={() => handleSetClicked1(false)} 
                onChange={(e) => setPassword(e.target.value)} 
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
            <div onClick={ () => handleSetView('register') }><p style={{
                fontSize: '10pt',
                position: 'relative',
                top: '15px',
                textAlign: 'center',
            }}>{`Don't have an account?`}<a href="#" style={{ fontSize: '10pt',color:'white' }}>Register</a></p></div>
        </form>
    )
}