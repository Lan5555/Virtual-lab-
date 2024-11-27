import { CSSProperties } from "react"

interface props{
    content?:React.ReactNode
    color:string
    classname?:string
}
const Wrap:React.FC<props> = ({content,color,classname}) => {
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
        borderTopRightRadius:'10px',
        width:'100px'
    }
    return(
        <div style={style} className={classname}>
            {content}
        </div>
    )
}
export default Wrap;