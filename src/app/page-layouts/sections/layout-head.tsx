import Icon from '@/app/components/icons';
import styles from '@/app/css/dashboard.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import react, { useEffect, useState } from 'react';

interface HeaderProps {
    search: string;
    dropdown: boolean;
    showBars: boolean;
    name: string;
    userName: string;
    setView:(val: boolean) => void;
    setName:(val: string) => void;
    setSearch:(val: string) => void;
    toggleSideOpen: (val: boolean) => void;
}

const LayoutHead:React.FC<HeaderProps> = ({ search, dropdown, showBars, name, userName, toggleSideOpen, setView, setSearch, setName }) => {

    return (
        <div className={styles.header}>
            { showBars ? (<FontAwesomeIcon icon={faBars} className='mr-1 my-4' style={{ height: '25px' }} title='Open' onClick={ () => toggleSideOpen(true) }></FontAwesomeIcon>) : (<span></span>) }
            <input type='search' placeholder='Search...' onInput={(e: any) => setSearch(e.target.value)}></input>
            <div className={styles.Avatar1}>
                <Icon iconName={'bell'} size1={'14pt'} onPressed={() => { } } color={''}/>
                <div className={styles.Avatar}>
                    <img src='/misc/oct.jpg' alt=''></img>
                </div>
                <p>{ userName }</p>
                <Icon iconName={`${name}`} size1={'15px'} onPressed={() => {
                    setView(!dropdown);
                    setName(name == 'angleDown' ? 'close' : 'angleDown');
                } } color={''}></Icon>
            </div>
        </div>
    )
}

export default LayoutHead;