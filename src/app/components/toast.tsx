import React, { CSSProperties, useEffect, useState } from "react";
import styles from "../css/btn.module.css";

interface ToastProps {
    background: string;
    color: string;
    duration: number;
    text: string;
    header: string;
}

const Toast: React.FC<ToastProps> = ({ background, color, duration, text, header }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Show the toast when the component mounts
        setShow(true);

        // Hide the toast after the specified duration
        const timer = setTimeout(() => {
            setShow(false);
        }, duration);

        // Clean up the timer on unmount
        return () => clearTimeout(timer);
    }, [duration]);

    const containerStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        right: 0,
        boxShadow: '0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)',
        backgroundColor: background,
        color: color,
        padding: '5px',
        width: '30%',
        height: '80px',
        display: show ? 'block' : 'none'
    };

    const headerStyle: CSSProperties = {
        textAlign: 'center',
        fontSize: '14pt',
        color: color,
    };

    const paragraphStyle: CSSProperties = {
        textAlign: 'center',
        fontSize: '10pt',
        color: color,
    };

    return (
        <div>
            {show && (
                <div className={styles.fadeIn} style={containerStyle}>
                    <h1 style={headerStyle}>{header}</h1>
                    <p style={paragraphStyle}>{text}</p>
                </div>
            )}
        </div>
    );
};

export default Toast;
