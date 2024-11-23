'use client'
import React, { CSSProperties, useEffect, useState } from "react";
import Icon from "./icons";
import { Span } from "next/dist/trace";

interface props{
    leading:any,
    text:string,
    trailing:() => void;
}

const ListTile:React.FC<props> = ({leading,text,trailing}) => {
    let count:number = 0;
    const shadow:string = '0 0.15rem 1.75rem 0 rgba(33 40 50 / 15%)';
    const [state, setState] = useState(false);
    const listStyle:CSSProperties = {
        display:'flex',
        padding:'5px',
        marginLeft:'30px'
    }
    const iconStyle:CSSProperties = {
        marginLeft:'10px',
        marginTop:'15px',
        opacity: state ? '1': '0.5',
        color: state ? 'blueviolet' : 'black'
    }
    const lead:CSSProperties = {
         marginLeft:'190px',
        marginTop:'15.5px'
    }
    const textStyle:CSSProperties = {
        marginLeft:'20px',
        fontSize:'12pt',
        cursor:'pointer',
        opacity: state ? '1': '0.5'
    }
    const trailing1 = () => {
        setState(preState => !preState);

        trailing();
    }
    useEffect(() => {},[state]);
    return <div>
        <div style={listStyle}>
            <span style={iconStyle}>{leading}</span>
            <span><p style={textStyle} onClick={() => trailing1()}>{text}</p></span>
        </div>
    </div>
}
export default ListTile