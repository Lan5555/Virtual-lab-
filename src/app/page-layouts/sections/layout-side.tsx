import AnimatedText from "@/app/components/movingtext";
import styles from '@/app/css/dashboard.module.css';
import ListTile from "@/app/components/listtile";
import Icon from "@/app/components/icons";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faGear, faHome, faTachometer, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

interface SidebarProps {
    sideIsOpen: boolean;
    toggleShowBars: (val: boolean) => void;
}
const LayoutSide:React.FC<SidebarProps> = ({ sideIsOpen, toggleShowBars }) => {
    const router = useRouter();
    const [mediaquery, setMediaQuery] = useState('desktop');

    const checkScreen = () => {
        const desktop = window.matchMedia('(min-width:768px)');
        const tablet = window.matchMedia('(min-width:542px)');
        const mobile = window.matchMedia('(max-width:600px)');
  
        if (desktop.matches) {
            setMediaQuery('desktop');
            toggleShowBars(false)
        } else if (tablet.matches) {
            setMediaQuery('tablet');
            toggleShowBars(false)
        } else if (mobile.matches) {
            setMediaQuery('mobile');
            toggleShowBars(true)
        } else {
            setMediaQuery('desktop');
            toggleShowBars(false)
        }
    };

    useEffect(() => {
        checkScreen();
        const handleResize = () => checkScreen();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <div>
            {sideIsOpen ? (<div className={styles.sidebar}>
                {mediaquery == 'desktop' ? (<AnimatedText position={'center'} size={'18pt'} text={'Virtual Lab'} icon={undefined} />) : (<div className='text-center my-3 mx-auto text-gray-400 hover:text-black'>VL</div>)}
                <br></br>

                {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Home'} onPressed={() => { } } color={''}/>} text={'Dashboard'} trailing={() => {
                    router.push('/pages/dashboard');
                }}/>
                ):<><FontAwesomeIcon icon={faHome} className='text-center my-2 ml-2 text-gray-400 hover:text-black' style={{ height: '30px' }} title='Home' onClick={() => { router.push('/pages/dashboard'); } }></FontAwesomeIcon><br /></>}
                {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'dashboard'} onPressed={() => { } } color={''}/>} text={'Activities'} trailing={() => {
                    router.push('/pages/activities');
                }}/>
                ):<><FontAwesomeIcon icon={faTachometer} className='text-center my-2 ml-2  text-gray-400  hover:text-black' style={{ height: '30px' }} title='Dashboard' onClick={() => { router.push('/pages/activities'); } }></FontAwesomeIcon><br /></>}
                {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'wallet'} onPressed={() => { } } color={''}/>} text={'Subscription'} trailing={() => { 
                    router.push('/pages/subscription'); 
                }}/>
                ): <><FontAwesomeIcon icon={faWallet} className='text-center my-2 ml-2  text-gray-400  hover:text-black' style={{ height: '30px' }} title='Subscription' onClick={() => { router.push('/pages/subscription'); } }></FontAwesomeIcon><br /></>}
                {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Computer'} onPressed={() => { } } color={''}/>} text={'Lab'} trailing={ ()=>{ 
                    router.push('/pages/lab');
                }}/>
                ):<><FontAwesomeIcon icon={faComputer} className='text-center my-2 ml-2  text-gray-400  hover:text-black' style={{ height: '30px', width: '32px' }} title='Lab' onClick={() => { router.push('/pages/lab'); } }></FontAwesomeIcon><br /></>}
                <br></br>
                {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Gear'} onPressed={() => { } } color={''}/>} text={'Settings'} trailing={() => {
                    router.push('/pages/settings');
                }}/>
                ): <><FontAwesomeIcon icon={faGear} className='text-center my-4 ml-2 text-gray-400  hover:text-black' style={{ height: '30px' }} title='Settings' onClick={() => { router.push('/pages/settings'); } }></FontAwesomeIcon><br /></>}
                {mediaquery == 'desktop' ? (
                <div className={styles.advert}>
                    <img src='/misc/oct.jpg' alt=""></img>
                    <h2>Octopath traveler</h2>
                <p>Play now</p>
                </div>
                ):<div></div>}
            </div>) : (<div className={styles.smallSidebar}>
                <AnimatedText position={'center'} size={'18pt'} text={'Virtual Lab'} icon={undefined} />
                <br></br>

                <ListTile leading={<Icon size1={''} iconName={'Home'} onPressed={() => { } } color={''}/>} text={'Dashboard'} trailing={() => {
                    router.push('/pages/dashboard');
                }}/>
                
                <ListTile leading={<Icon size1={''} iconName={'dashboard'} onPressed={() => { } } color={''}/>} text={'Activities'} trailing={() => {
                    router.push('/pages/activities');
                }}/>
                <ListTile leading={<Icon size1={''} iconName={'wallet'} onPressed={() => { } } color={''}/>} text={'Subscription'} trailing={() => { 
                    router.push('/pages/subscription'); 
                }}/>
                <ListTile leading={<Icon size1={''} iconName={'Computer'} onPressed={() => { } } color={''}/>} text={'Lab'} trailing={ ()=>{ 
                    router.push('/pages/lab');
                }}/>
                <br></br>
                <ListTile leading={<Icon size1={''} iconName={'Gear'} onPressed={() => { } } color={''}/>} text={'Settings'} trailing={() => {
                    router.push('/pages/settings');
                }}/>
                
                <div className={styles.advert}>
                    <img src='/misc/oct.jpg'></img>
                    <h2>Octopath traveler</h2>
                    <p>Play now</p>
                </div>
            </div>)}
        </div>
    )
}

export default LayoutSide;