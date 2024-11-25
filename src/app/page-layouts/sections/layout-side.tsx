import AnimatedText from "@/app/components/movingtext";
import styles from '@/app/css/dashboard.module.css';
import ListTile from "@/app/components/listtile";
import Icon from "@/app/components/icons";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faGear, faHome, faTachometer, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

interface SidebarProps {
    dropdown: boolean;
}
const LayoutSide:React.FC<SidebarProps> = ({ dropdown }) => {
    const router = useRouter();
    const [mediaquery, setMediaQuery] = useState('desktop');

    const checkScreen = () => {
        const desktop = window.matchMedia('(min-width:1242px)');
        const tablet = window.matchMedia('(min-width:542px)');
        const mobile = window.matchMedia('(max-width:600px)');
  
        if (desktop.matches) {
            setMediaQuery('desktop');
        } else if (tablet.matches) {
            setMediaQuery('tablet');
        } else if (mobile.matches) {
            setMediaQuery('mobile');
        } else {
            setMediaQuery('desktop');
        }
    };

    useEffect(() => {
        checkScreen();
        const handleResize = () => checkScreen();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[dropdown]);

    return (
        <div className={styles.sidebar}>
            <AnimatedText position={'center'} size={'18pt'} text={'Virtual Lab'} icon={undefined} />
        {/* {mediaquery == 'desktop' ? (<div className={styles.wrapper}>
            <h1>Dashboard</h1>
            </div>
        ): null} */}
            {/* <br></br> */}

            {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Home'} onPressed={() => { } } color={''}/>} text={'Dashboard'} trailing={() => {
                router.push('/pages/dashboard');
            }}/>
            ):<FontAwesomeIcon icon={faHome} className='p-5text-center ml-5 text-gray-400 hover:text-black' style={{height:'35px'}} title='Home'></FontAwesomeIcon>}
            {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'dashboard'} onPressed={() => { } } color={''}/>} text={'Activities'} trailing={() => {
                router.push('/pages/activities');
            }}/>
            ):<FontAwesomeIcon icon={faTachometer} className='p-5text-center ml-5 mt-10  text-gray-400  hover:text-black' style={{height:'35px'}} title='Dashboard'></FontAwesomeIcon>}
            {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'wallet'} onPressed={() => { } } color={''}/>} text={'Subscription'} trailing={() => { 
                router.push('/pages/subscription'); 
            }}/>
            ): <FontAwesomeIcon icon={faWallet} className='p-5text-center ml-5 mt-10  text-gray-400  hover:text-black' style={{height:'35px'}} title='Subscription'></FontAwesomeIcon>}
            {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Computer'} onPressed={() => { } } color={''}/>} text={'Lab'} trailing={ ()=>{ 
                router.push('/pages/lab');
             }}/>
            ):<FontAwesomeIcon icon={faComputer} className='p-5text-center ml-5 mt-10  text-gray-400  hover:text-black' style={{height:'35px'}} title='Lab' onClick={() => {}}></FontAwesomeIcon>}
            <br></br>
            {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Gear'} onPressed={() => { } } color={''}/>} text={'Settings'} trailing={() => {
                router.push('/pages/settings');
            }}/>
            ): <FontAwesomeIcon icon={faGear} className='p-5text-center ml-5 mt-20  text-gray-400  hover:text-black' style={{height:'35px'}} title='Settings'></FontAwesomeIcon>}
            {mediaquery == 'desktop' ? (
            <div className={styles.advert}>
                <img src='/misc/oct.jpg'></img>
                <h2>Octopath traveler</h2>
            <p>Play now</p>
            </div>
            ):null}
        </div>
    )
}

export default LayoutSide;