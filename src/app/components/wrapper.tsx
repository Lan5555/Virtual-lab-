import { CSSProperties } from "react"

interface props{
    content:any
    color:string
}
const Wrap:React.FC<props> = ({content,color}) => {
    const style:CSSProperties = {
        padding:'9px',
        backgroundColor:color,
        boxShadow:'0px 4px 8px rgba(0,0,0,0.1)',
        height:'20px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20px',
        opacity:'0.7',
        borderBottomLeftRadius:'10px',
        borderTopRightRadius:'10px'
    }
    return(
        <div style={style}>
            {content}
        </div>
    )
}
export default Wrap;