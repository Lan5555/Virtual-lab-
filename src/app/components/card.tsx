import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface props{
    header?:string;
    name?:string;
    small?:string;
    features?:string[];
    color?:string;
    textColor?:string
    onPressed?:() => void;
}
const Card:React.FC<props> = ({header,small,features,name, onPressed,color,textColor}) => {
    
    return (
        <div className="p-3 my-2 mr-5 flex justify-start flex-col shadow-2xl gap-0 w-44 rounded-xl bg-white hover:shadow-slate-400 h-44"
        style={{
            background:color
        }}
        >
            <div className="flex gap-1 relative top-4">
                    <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500"></FontAwesomeIcon>
                    <h6 className="relative -top-5 text-blue-700 animate-pulse"
                    >{header}</h6>
                </div>
            <div className="flex flex-col gap-0">
                <h2 className="relative ml-2  -top-6"
                style={{
                    color: textColor
                }}
                >{`${name}`}</h2>
                <p className="text-xxs relative ml-2 opacity-50 -top-10"
                style={{
                    color: textColor
                }}
                >{`${small}`}</p>
            </div>
            <div>
                <ul className="relative -left-4 marker:text-yellow-400 -top-6">
                    {features?.map((element,index) => (
                        <li key={index} className="text-xs font-bold my-2"
                        style={{
                            color: textColor
                        }}
                        >{element}</li>
                    ))}
                </ul>
            </div>
            <br></br>
            <button  className="p-2 w-auto text-center bg-slate-900 text-white rounded-lg border-none hover:bg-gray-500 shadow-sm cursor-pointer relative -top-14" onClick={onPressed}
            style={{
                color: textColor
            }}
            >
                Confirm
            </button>
        </div>
    );
}
export default Card;