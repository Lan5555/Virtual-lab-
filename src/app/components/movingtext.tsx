import { CSSProperties } from "react";
import styles from '../css/btn.module.css'
interface  props{
    position:any,
    size:any,
    text:any,
    icon:any
}
const AnimatedText:React.FC<props> = ({position,size,text,icon}) => {
    const style:CSSProperties ={
        textAlign:position,
        fontSize:size,
    }
    return (
        <h2 style={style} className={styles.move}>{icon} {text}</h2>
    )
}
export default AnimatedText;