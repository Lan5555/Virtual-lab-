import Icon from "@/app/components/icons";
import Spinner from "@/app/components/loader";
import Toast from "@/app/components/toast";
import { useFirebase } from "@/app/hooks/firebase";
import { faEye, faEyeSlash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface props {
    viewport: string;
    isClicked: boolean;
    isClicked1: boolean;
    handleSetClicked: (val: boolean) => void;
    handleSetClicked1: (val: boolean) => void;
    handleSetView: (val: string) => void;
}

export const Register:React.FC<props> = ({ viewport, isClicked, isClicked1, handleSetClicked, handleSetClicked1, handleSetView }) => {
    const router = useRouter();
    const { createUser, addUserInfo } = useFirebase();
    const [emailIsClicked,handleEmailClick] = useState<boolean>(false);
    const [nameIsClicked,handleNameClick] = useState<boolean>(false);
    const [surNameIsClicked,handleSurnameClick] = useState<boolean>(false);
    const [phoneIsClicked,handlePhoneClick] = useState<boolean>(false);
    const [created,setCreated] = useState(false);
    const [icon, setIcon] = useState<IconDefinition>(faEyeSlash);
    const [loading,isLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        phone: "",
        first_name: "",
        last_name: "",
    });
    useEffect(() => {},[created]);
    return (
        <form 
        onSubmit={ async (event:any)=>{
            event.preventDefault();
            isLoading(true);
            const res = await createUser(data.email, data.password);
            if (res.success) {
                addUserInfo(data.first_name, data.last_name, data.phone, res?.data.user);
                setCreated(true);
                isLoading(false);
                setTimeout(()=>{
                    setCreated(false);
                },3000);
                router.push('/pages/dashboard');
            } else {
                alert(res.message)
                isLoading(false);
            }
        }}
        className="flex justify-center items-center flex-col">
            <h2 className="text-2xl sm:text-lg animate-pulse">
                <Icon iconName='signIn' color="black" size1={undefined} onPressed={() => {}} /> Register
            </h2>
            {created && <Toast text="Account successfully created" duration={3000}></Toast>}
            <label 
                htmlFor='email' 
                style={{
                    position:'absolute',
                    top:  viewport == "mobile" ? '120px' :'108px',
                    left: viewport === 'mobile' ? '48px' : '68px',
                    transition: 'all 0.3s ease-in-out',
                    transform: emailIsClicked ? 'translateY(-24px)' : '',
                    display: data.email === '' ? 'block' : 'none',
                }}>
                Email
            </label>
            <input 
                id='email' 
                type="email" 
                onFocus={() => handleEmailClick(true)} 
                onBlur={() => handleEmailClick(false)} 
                onChange={(e) => setData({ ...data, email: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '30px',
                    border: 'none',
                    borderBottom: '0.2px solid grey',
                    outlineColor: 'blueviolet',
                    backgroundColor:'transparent',
                     outline:'none'
                }} 
                required 
                className="rounded shadow"/>
            <br />
            <label 
                htmlFor='first_name' 
                style={{
                    position:'absolute',
                    top: viewport == "mobile" ? '173px' : '158px',
                    left: viewport === 'mobile' ? '48px' : '68px',
                    transition: 'all 0.3s ease-in-out',
                    transform: nameIsClicked ? 'translateY(-24px)' : '',
                    display: data.first_name === '' ? 'block' : 'none',
                }}>
                First Name
            </label>
            <input 
                id='first_name' 
                type="text" 
                onFocus={() => handleNameClick(true)} 
                onBlur={() => handleNameClick(false)} 
                onChange={(e) => setData({ ...data, first_name: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '30px',
                    border: 'none',
                    borderBottom: '0.2px solid grey',
                    outlineColor: 'blueviolet',
                    backgroundColor:'transparent',
                     outline:'none'
                }} 
                required 
                className="rounded shadow"/>
            <br />
            <label 
                htmlFor='last_name' 
                style={{
                    position:'absolute',
                    top: viewport == "mobile" ? '225px' : '210px',
                    left: viewport === 'mobile' ? '48px' : '68px',
                    transition: 'all 0.3s ease-in-out',
                    transform: surNameIsClicked ? 'translateY(-24px)' : '',
                    display: data.last_name === '' ? 'block' : 'none',
                }}>
                Last Name
            </label>
            <input 
                id='last_name' 
                type="text" 
                onFocus={() => handleSurnameClick(true)} 
                onBlur={() => handleSurnameClick(false)} 
                onChange={(e) => setData({ ...data, last_name: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '30px',
                    border: 'none',
                    borderBottom: '0.2px solid grey',
                    outlineColor: 'blueviolet',
                    backgroundColor:'transparent',
                     outline:'none'
                }} 
                required 
                className="rounded shadow"/>
            <br />
            <label 
                htmlFor='phone' 
                style={{
                    position:'absolute',
                    top: viewport == "mobile" ? '275px' : '260px',
                    left: viewport === 'mobile' ? '48px' : '68px',
                    transition: 'all 0.3s ease-in-out',
                    transform: phoneIsClicked ? 'translateY(-24px)' : '',
                    display: data.phone === '' ? 'block' : 'none',
                }}>
                Phone Number
            </label>
            <input 
                id='phone' 
                type="text" 
                onFocus={() => handlePhoneClick(true)} 
                onBlur={() => handlePhoneClick(false)} 
                onChange={(e) => setData({ ...data, phone: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '30px',
                    border: 'none',
                    borderBottom: '0.2px solid grey',
                    outlineColor: 'blueviolet',
                    backgroundColor:'transparent',
                     outline:'none'
                }} 
                required 
                className="rounded shadow"/>
            <br />
            <label 
                htmlFor='password' 
                style={{
                    position:'absolute',
                    top:  viewport == "mobile" ? '330px' : '318px',
                    left: viewport === 'mobile' ? '48px' : '68px',
                    transition: 'all 0.3s ease-in-out',
                    transform: isClicked1 ? 'translateY(-26px)' : '',
                    display: data.password === '' ? 'block' : 'none',
                }}>
                Password
            </label>
            <input 
                id='password' 
                type= {icon == faEyeSlash ? "password" : "text"}
                onFocus={() => handleSetClicked1(true)} 
                onBlur={() => handleSetClicked1(false)} 
                onChange={(e) => setData({ ...data, password: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '35px',
                    border: 'none',
                    borderBottom: '0.2px solid grey',
                    outlineColor: 'blueviolet',
                    backgroundColor:'transparent',
                    outline:'none'
                }} 
                required 
             className="rounded shadow"/>
            <FontAwesomeIcon icon={icon} style={{position:"relative", left:'38%', bottom:'-10px'}}
            onClick={()=>{
                setIcon(icon == faEyeSlash ? faEye : faEyeSlash);
            }}
            ></FontAwesomeIcon>
            
            <button type="submit" style={{
                width: '80%',
                padding: '10px',
                border: 'none',
                borderRadius: '10px',
                //background:'linear-gradient(to right, black,white,rgba(0,0,0,0.1))',
                position: 'relative',
                top: '40px',
               // boxShadow:'0px 4px 8px rgba(0,0,0,0.1)',
                color:'white',
                fontWeight:'bold',
                cursor:'pointer'
            }} className="bg-gray-600 hover:bg-slate-700" >{loading ? (<Spinner></Spinner>) : "Create User"}</button>
            
            <div onClick={ () => handleSetView('login') }><p style={{
                fontSize: '10pt',
                position: 'relative',
                top: '48px',
                textAlign: 'center',
            }}>{`Already have an account?`}<a href="#" style={{ fontSize: '10pt',color:'white' }}>Sign in</a></p></div>
        </form>
        
    )
}