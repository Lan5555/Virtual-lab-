import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import *as Icons from '@fortawesome/free-solid-svg-icons';
import { iconName } from "@fortawesome/free-solid-svg-icons/fa0";
import { CSSProperties } from "react";

interface IconProps{
    iconName:any;
    size1:any;
    color:string
    onPressed:() => void;
}
const Icon = ({iconName, size1, onPressed,color}:IconProps) => {
    const iconKey = `fa${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`;
    const icon = (Icons as any)[iconKey] as IconProp | undefined;
    const style:CSSProperties = {
        fontSize:size1,
        cursor:'pointer',
        color:color
    }
    if(!icon){
        return <p>Icon "{iconName} not found</p>
    }
    return <FontAwesomeIcon icon={icon} style={style} onClick={onPressed}/>
}
export default Icon;