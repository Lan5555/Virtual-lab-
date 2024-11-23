import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";
import styles from '../css/btn.module.css';

interface Props {
    text?: string;
    className?: string;
    textClass?: string;
    type: 'info' | 'list';  // More type-safe `type`
    list?: string[];
    onClick?: () => void;  // Optional click handler for other interactions
    onListItemClick?: (item: string) => void;  // Callback function for handling list item clicks
}

const Walkthrough: React.FC<Props> = ({ text = '', className = '', textClass = '', list, type, onClick, onListItemClick }) => {
    const [textValue, setTextValue] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (text && index < text.length) {
            const intervalId = setInterval(() => {
                setTextValue((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 30);

            return () => clearInterval(intervalId);
        }
    }, [index, text]);

    const style: CSSProperties = {
        height: type === 'info' ? '300px' : 'auto',
        width: type === 'info' ? '40%' : '15%',
        padding: type === 'info' ? '10px' : '5px',
        border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: type === 'info' ? 'center' : 'start',
        alignItems: type === 'info' ? 'center' : 'start',
        flexDirection: 'column',
    };

    // Handle click on list item by calling the parent's callback function
    const handleListItemClick = (item: string) => {
        if (onListItemClick) {
            onListItemClick(item);
        }
    };

    const DisplayList = () => (
        <ul className="grid gap-5 w-full">
            {list?.map((element, index) => (
                <li
                    key={index}
                    className={styles.list}
                    onClick={() => handleListItemClick(element)}  // Trigger parent callback
                >
                    {element}
                </li>
            ))}
        </ul>
    );

    return (
        <div style={style} className={className}>
            <FontAwesomeIcon icon={faInfoCircle} className="text-center mb-2 animate-bounce text-green-400 text-5xl mt-3" />
            {type === 'info' ? (
                <p style={{ color: 'white', fontSize: '12pt' }} className={textClass}>
                    {textValue}
                </p>
            ) : (
                <div className="flex justify-between">{DisplayList()}</div>
            )}
        </div>
    );
};

export default Walkthrough;
