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
    setView:(val: boolean) => void;
    setName:(val: string) => void;
    setSearch:(val: string) => void;
    toggleSideOpen: (val: boolean) => void;
}

const LayoutHead:React.FC<HeaderProps> = ({ search, dropdown, showBars, name, toggleSideOpen, setView, setSearch, setName }) => {
    const [mediaquery, setMediaQuery] = useState('desktop');
    const updateMediaQuery = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
          setMediaQuery('mobile');
        } else if (window.matchMedia('(min-width: 548px) and (max-width:1140px)').matches) {
          setMediaQuery('tablet');
        } else {
          setMediaQuery('desktop');
        }
      };
    
      useEffect(() => {
        updateMediaQuery();
        window.addEventListener('resize', updateMediaQuery);
        return () => window.removeEventListener('resize', updateMediaQuery);
      }, []);
    return (
        <div className={styles.header}>
            { showBars ? (<FontAwesomeIcon icon={faBars} className='mr-1 my-4 ml-3' style={{ height: '25px' }} title='Open' onClick={ () => toggleSideOpen(true) }></FontAwesomeIcon>) : (<span></span>) }
            <input type='search' placeholder='Search...' onInput={(e: any) => setSearch(e.target.value)}></input>
            {mediaquery != 'mobile' && <div className={styles.Avatar1}>
                <Icon iconName={'bell'} size1={'14pt'} onPressed={() => { } } color={''}/>
                {mediaquery != 'mobile' && <div className={styles.Avatar}>
                    <img src='/misc/oct.jpg' alt=''></img>
                </div>}
                {mediaquery != 'mobile' && <p>Nicholas johnson</p>}
                <Icon iconName={`${name}`} size1={'15px'} onPressed={() => {
                    setView(!dropdown);
                    setName(name == 'angleDown' ? 'close' : 'angleDown');
                } } color={''}></Icon>
            </div>}
        </div>
    )
}

export default LayoutHead;