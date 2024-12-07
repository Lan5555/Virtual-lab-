import Icon from "@/app/components/icons";
import { useFirebase } from "@/app/hooks/firebase";
import { faEye, faEyeSlash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
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

export const Register:React.FC<props> = ({ viewport, isClicked, isClicked1, handleSetClicked, handleSetClicked1, handleSetView }) => {
    const router = useRouter();
    const { createUser, addUserInfo } = useFirebase();


    const [icon, setIcon] = useState<IconDefinition>(faEyeSlash);
    const [data, setData] = useState({
        email: "",
        password: "",
        phone: "",
        first_name: "",
        last_name: "",
    });

    return (
        <form 
        onSubmit={ async (event:any)=>{
            event.preventDefault();
            const res = await createUser(data.email, data.password);
            if (res.success) {
                addUserInfo(data.first_name, data.last_name, data.phone, res?.data.user);
                router.push('/pages/dashboard');
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
                <Icon iconName='signIn' color="black" size1={undefined} onPressed={() => {}} /> Register
            </h2>
            <label 
                htmlFor='email' 
                style={{
                    top: '130px',
                    left: viewport === 'mobile' ? '48px' : '63px',
                    transition: 'all 0.3s ease-in-out',
                    transform: isClicked ? 'translateY(-24px)' : '',
                    display: data.email === '' ? 'block' : 'none',
                }}>
                Email
            </label>
            <input 
                id='email' 
                type="email" 
                onFocus={() => handleSetClicked(true)} 
                onBlur={() => handleSetClicked(false)} 
                onChange={(e) => setData({ ...data, email: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '30px',
                    border: 'none',
                    borderBottom: '0.2px solid grey',
                    outlineColor: 'blueviolet',
                    backgroundColor:'transparent'
                }} 
                required 
            />
            <br />
            <label 
                htmlFor='first_name' 
                style={{
                    top: '130px',
                    left: viewport === 'mobile' ? '48px' : '63px',
                    transition: 'all 0.3s ease-in-out',
                    transform: isClicked ? 'translateY(-24px)' : '',
                    display: data.first_name === '' ? 'block' : 'none',
                }}>
                First Name
            </label>
            <input 
                id='first_name' 
                type="text" 
                onFocus={() => handleSetClicked(true)} 
                onBlur={() => handleSetClicked(false)} 
                onChange={(e) => setData({ ...data, first_name: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '30px',
                    border: 'none',
                    borderBottom: '0.2px solid grey',
                    outlineColor: 'blueviolet',
                    backgroundColor:'transparent'
                }} 
                required 
            />
            <br />
            <label 
                htmlFor='last_name' 
                style={{
                    top: '130px',
                    left: viewport === 'mobile' ? '48px' : '63px',
                    transition: 'all 0.3s ease-in-out',
                    transform: isClicked ? 'translateY(-24px)' : '',
                    display: data.last_name === '' ? 'block' : 'none',
                }}>
                Last Name
            </label>
            <input 
                id='last_name' 
                type="text" 
                onFocus={() => handleSetClicked(true)} 
                onBlur={() => handleSetClicked(false)} 
                onChange={(e) => setData({ ...data, last_name: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '30px',
                    border: 'none',
                    borderBottom: '0.2px solid grey',
                    outlineColor: 'blueviolet',
                    backgroundColor:'transparent'
                }} 
                required 
            />
            <br />
            <label 
                htmlFor='phone' 
                style={{
                    top: '130px',
                    left: viewport === 'mobile' ? '48px' : '63px',
                    transition: 'all 0.3s ease-in-out',
                    transform: isClicked ? 'translateY(-24px)' : '',
                    display: data.phone === '' ? 'block' : 'none',
                }}>
                Phone Number
            </label>
            <input 
                id='phone' 
                type="text" 
                onFocus={() => handleSetClicked(true)} 
                onBlur={() => handleSetClicked(false)} 
                onChange={(e) => setData({ ...data, phone: e.target.value })} 
                style={{
                    width: '80%',
                    padding: '8px',
                    position: 'relative',
                    top: '30px',
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
                    top: '198px',
                    left: viewport === 'mobile' ? '48px' : '63px',
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
                    top: '45px',
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
            }}  >Create User</button>
            
            <div onClick={ () => handleSetView('login') }><p style={{
                fontSize: '10pt',
                position: 'relative',
                top: '15px',
                textAlign: 'center',
            }}>{`Already have an account?`}<a href="#" style={{ fontSize: '10pt',color:'white' }}>Sign in</a></p></div>
        </form>
    )
}