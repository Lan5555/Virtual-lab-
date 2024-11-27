import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface props{
    header?:string;
    price?:number;
    limit?:string;
    features?:string[];
    currencySymbol?: string;
    onPressed?:() => void;
}
const PaymentCard:React.FC<props> = ({header,price,limit,features, currencySymbol, onPressed}) => {
    const symbol = currencySymbol ? currencySymbol : "₦";
    return (
        <div className="p-4 my-2 mr-5 flex justify-start flex-col shadow-2xl gap-0 w-52 rounded-xl bg-white hover:shadow-slate-400">
            <div className="flex gap-2 relative top-8">
                    <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500"></FontAwesomeIcon>
                    <h6 className="relative -top-5 text-blue-700 animate-pulse">{header}</h6>
                </div>
            <div className="flex gap-3">
                <h2 className="relative ml-2">{`${symbol}${price}`}</h2>
                <p className="text-xxs relative top-5 opacity-50">{`/${limit}`}</p>
            </div>
            <div>
                <ul className="relative -left-4 marker:text-yellow-400">
                    {features?.map((element,index) => (
                        <li key={index} className="text-xs font-bold my-2">{element}</li>
                    ))}
                </ul>
            </div>
            <br></br>
            <button  className="p-3 w-full text-center bg-green-700 text-white rounded-lg border-none hover:bg-gray-500 shadow-sm cursor-pointer" onClick={onPressed}>
                Get Plan
            </button>
        </div>
    );
}
export default PaymentCard;