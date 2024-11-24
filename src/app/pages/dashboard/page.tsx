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

const dashboard:React.FC = () => {
    const router = useRouter();
    const [state, setState] = useState(false);
    const [name, setName] = useState('angleDown');
    useEffect(() => {},[state]);
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
    <div className={styles.wrapper}>
    <h1>Dashboard</h1>
    </div>
    <br></br>
    <ListTile leading={<Icon size1={''} iconName={'Home'} onPressed={() => { } } color={''}/>} text={'Home'} trailing={() => {}}/>
    <ListTile leading={<Icon size1={''} iconName={'dashboard'} onPressed={() => { } } color={''}/>} text={'Activities'} trailing={() => {}}/>
    <ListTile leading={<Icon size1={''} iconName={'wallet'} onPressed={() => { } } color={''}/>} text={'Subscription'} trailing={() => {}}/>
    <ListTile leading={<Icon size1={''} iconName={'Computer'} onPressed={() => { } } color={''}/>} text={'Lab'} trailing={ ()=>{ 
        router.push('/pages/lab');
        <Spinner/>
    }}/>
    <br></br>
    <ListTile leading={<Icon size1={''} iconName={'Gear'} onPressed={() => { } } color={''}/>} text={'Settings'} trailing={() => {
        router.push('/pages/login');
    }}/>
    <div className={styles.advert}>
        <img src='/misc/oct.jpg'></img>
        <h2>Octopath traveler</h2>
    <p>Play now</p>
    </div>
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