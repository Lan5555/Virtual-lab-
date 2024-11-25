import Icon from '@/app/components/icons';
import styles from '@/app/css/dashboard.module.css';
import react, { useEffect, useState } from 'react';

interface HeaderProps {
    search: string;
    dropdown: boolean;
    name: string;
    setView:(val: boolean) => void;
    setName:(val: string) => void;
}

const LayoutHead:React.FC<HeaderProps> = ({ search, dropdown, name, setView, setName }) => {

    return (
        <div className={styles.header}>
            <input type='search' placeholder='Search...'></input>
            <div className={styles.Avatar1}>
                <Icon iconName={'bell'} size1={'14pt'} onPressed={() => { } } color={''}/>
                <div className={styles.Avatar}>
                    <img src='/misc/oct.jpg' alt=''></img>
                </div>
                <p>Nicholas johnson</p>
                <Icon iconName={`${name}`} size1={'15px'} onPressed={() => {
                    setView(!dropdown);
                    setName(name == 'angleDown' ? 'close' : 'angleDown');
                } } color={''}></Icon>
            </div>
        </div>
    )
}

export default LayoutHead;