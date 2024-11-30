import { CSSProperties } from "react"
import Icon from "./icons"
import styles from '../css/btn.module.css';

interface props{
    category:string,
    src:string,
    content:string,
    onPressed1:() => void;
    onPressed2:() => void;
}
const DropDown:React.FC<props> = ({category, src, content, onPressed1,onPressed2}) => {
    const divStyle:CSSProperties = {
        border:'none',
        boxShadow:'0 0.15rem 1.75rem 0 rgba(33 40 50 / 15%)',
        width:'30%',
        height:'50vh',
        borderRadius:'5px',
        padding:'15px',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        position:'absolute',
        top:'50px',
        right:'10px',
        backgroundColor:'white',
        zIndex:'1',
        userSelect:'none'
    }
    const imageHolder:CSSProperties = {
        borderRadius:'50%',
        height:'100px',
        width:'100px',
        border:'2px solid black',
         userSelect:'none'
    }
    const avatar:CSSProperties = {
        width:'100%',
        height:'100%',
        borderRadius:'50%',
        objectFit:'cover',
         userSelect:'none'
    }
    const checkCategory = () => {
        return category == 'avatar' ? <div style={imageHolder}>
        <img src={src} style={avatar} alt=""></img>
        </div> : null
    }
    const contentStyle:CSSProperties = {
        width:'85%',
        backgroundColor:'blueViolet',
        boxShadow:'0 0 1px black',
        opacity:'0.8',
         userSelect:'none',
        borderBottomLeftRadius:'10px',
        borderTopRightRadius:'10px'
    }
    const plan:CSSProperties = {
        boxShadow:'0 0.15rem 1.75rem 0 rgba(33 40 50 / 15%)',
        width:'50%', 
        borderRadius:'10px',
        userSelect:'none'
    }
    return <div>
        <div style={divStyle} className={styles.slideIn}>
          {checkCategory()}<br></br>
          <div style={contentStyle}>
            <h2 style={{textAlign:'center', color:'white', fontSize:'14pt'}}>Nicholas Johnson</h2>
          </div><br></br><br></br>
          <div style={plan}>
            <h2 style={{textAlign:'center', color:'black', fontSize:'11pt',}}>Free plan</h2>
          </div>
          <p>{content}</p>
          <button style={{position:'absolute', right:'10px',top:'85%', padding:'10px',
           backgroundColor:'blueviolet',borderRadius:'5px', border:'none', color:'white',
            fontSize:'9pt', opacity:'0.8',cursor:'pointer'}} onClick={onPressed1}>
                <Icon iconName={'tag'} size1={undefined} onPressed={function (): void {
                } } color={""}></Icon> Upgrade</button>
            <button style={{position:'absolute', left:'10px',top:'85%', padding:'10px',
             backgroundColor:'blueviolet',borderRadius:'5px', border:'none', color:'white',
              fontSize:'9pt', opacity:'0.8',cursor:'pointer',}} onClick={onPressed2}>
                <Icon iconName={'AngleLeft'} size1={undefined} onPressed={function (): void {
                } } color={""}></Icon> Back</button>
        </div>
    </div>
}
export default DropDown;