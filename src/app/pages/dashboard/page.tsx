'use client'
import react, { useEffect, useState } from 'react';
import styles from '../pcss/dashboard.module.css';
import ListTile from '@/app/components/listtile';
import Icon from '@/app/components/icons';
import AnimatedText from '@/app/components/movingtext';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/loader';
import DropDown from '@/app/components/dropbar';
import Wrap from '@/app/components/wrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faGear, faHome, faTachometer, faWallet } from '@fortawesome/free-solid-svg-icons';

const dashboard:React.FC = () => {
    const router = useRouter();
    const [state, setState] = useState(false);
    const [name, setName] = useState('angleDown');
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

    },[state]);
return <div>
    <div className={styles.header}>
        <input type='search' placeholder='Search...'></input>
        <div className={styles.Avatar1}>
            <Icon iconName={'bell'} size1={'14pt'} onPressed={() => { } } color={''}/>
            <div className={styles.Avatar}>
            <img src='/misc/oct.jpg'></img>
            </div>
            <p>Nicholas johnson</p>
            <Icon iconName={`${name}`} size1={'15px'} onPressed={() => {
                setState(prevState => !prevState);
                setName(name == 'angleDown' ? 'close' : 'angleDown');
            } } color={''}></Icon>
        </div>
        </div>
                    {state ? <DropDown category={'avatar'} src={'/misc/oct.jpg'} content='You are currently on a free plan'
                 onPressed1={()=>{ }} onPressed2={()=>{
                setState(prevState => !prevState);
                setName(name == 'angleDown' ? 'close' : 'angleDown');
                 }}/> : null} 
    <div className={styles.sidebar}>
    <AnimatedText position={'center'} size={'18pt'} text={'Virtual Lab'} icon={undefined} />
   {mediaquery == 'desktop' ? (<div className={styles.wrapper}>
    <h1>Dashboard</h1>
    </div>
   ): null}
    <br></br>

    
    {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Home'} onPressed={() => { } } color={''}/>} text={'Home'} trailing={() => {}}/>
    ):<FontAwesomeIcon icon={faHome} className='p-5text-center ml-5 text-gray-400 hover:text-black' style={{height:'35px'}} title='Home'></FontAwesomeIcon>}
    {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'dashboard'} onPressed={() => { } } color={''}/>} text={'Activities'} trailing={() => {}}/>
    ):<FontAwesomeIcon icon={faTachometer} className='p-5text-center ml-5 mt-10  text-gray-400  hover:text-black' style={{height:'35px'}} title='Dashboard'></FontAwesomeIcon>}
    {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'wallet'} onPressed={() => { } } color={''}/>} text={'Subscription'} trailing={() => {}}/>
    ): <FontAwesomeIcon icon={faWallet} className='p-5text-center ml-5 mt-10  text-gray-400  hover:text-black' style={{height:'35px'}} title='Subscribtion'></FontAwesomeIcon>}
    {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Computer'} onPressed={() => { } } color={''}/>} text={'Lab'} trailing={ ()=>{ 
         router.push('/pages/lab');
    }}/>
    ):<FontAwesomeIcon icon={faComputer} className='p-5text-center ml-5 mt-10  text-gray-400  hover:text-black' style={{height:'35px'}} title='Lab' onClick={() => {
        router.push('/pages/lab');
    }}></FontAwesomeIcon>}
    <br></br>
    {mediaquery == 'desktop' ? (<ListTile leading={<Icon size1={''} iconName={'Gear'} onPressed={() => { } } color={''}/>} text={'Settings'} trailing={() => {
        router.push('/pages/login');
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
<div className={styles.content}>
    <div className={styles.barContainer}>
        <div className={styles.bars}>
           <Wrap color='white' content={<h3 style={{fontSize:'13pt'}}><Icon size1={''}
              iconName={'wallet'}
               onPressed={() => { } }
                color={'grey'} /> Points earned</h3>}
                />
            <p style={{textAlign:'center',fontSize:'11pt'}}><Icon iconName={'tag'} size1={undefined} onPressed={function (): void {
                } } color={'rgba(23,5,51,0.2)'}/> 15.0pt</p>
        </div>
        <div className={styles.bars}></div>
        <div className={styles.bars}></div>
        <div className={styles.bars}></div>
    </div>
    <div className={styles.secContainer}>
        <div className={styles.item1}></div>
        <div className={styles.item2}></div>
    </div>
    <div className={styles.thirdContainer}>
        <div className={styles.box1}></div>
        <div className={styles.box2}></div>
        <div className={styles.box3}></div>
    </div>
</div>
</div>
}

export default dashboard;