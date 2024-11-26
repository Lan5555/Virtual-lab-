"use client";
import React, { CSSProperties, useEffect} from "react";
import styles from '@/app/css/page.module.css'
import Router from "next/router";
import { useRouter } from "next/navigation";

const Intro:React.FC = () => {

    const router = useRouter();
        
    useEffect(() => {
        setTimeout(() => {
            router.push('/pages/login');
        }, 4000);
    },[router]);
    
    return (
        <div>
            <div className={styles.entrance}>
                <h1 className={styles.head}>Virtual Lab</h1>
            </div>
        </div>
    );
}
export default Intro;