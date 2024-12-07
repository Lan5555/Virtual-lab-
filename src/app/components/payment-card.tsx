import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface props{
    header?:string;
    price?:number;
    limit?:string;
    features?:string[];
    currencySymbol?: string;
    onPressed?:() => void;
    
}
const PaymentCard:React.FC<props> = ({header,price,limit,features, currencySymbol, onPressed}) => {
    const [mediaquery, setMediaQuery] = useState('desktop');
    const updateMediaQuery = () => {
        if (window.matchMedia('(max-width: 600px)').matches) {
          setMediaQuery('mobile');
        } else if (window.matchMedia('(min-width: 548px) and (max-width:1140px)').matches) {
          setMediaQuery('tablet');
        } else {
          setMediaQuery('desktop');
        }
      };
    
      useEffect(() => {
        updateMediaQuery();
        window.addEventListener('resize', updateMediaQuery);
        return () => window.removeEventListener('resize', updateMediaQuery);
      }, []);
      
    const symbol = currencySymbol ? currencySymbol : "₦";
    return (
        <div className={mediaquery == "desktop" ? "p-4 my-2 mr-5 flex justify-start flex-col shadow-2xl gap-0 w-52 rounded-xl bg-white hover:shadow-slate-400 flex-shrink-0"
            : mediaquery == "tablet" ? "p-3 my-2 mr-5 flex justify-start flex-col shadow-2xl gap-0 w-44 rounded-xl bg-white hover:shadow-slate-400 flex-shrink-0 relative -left-7" : 
            mediaquery == "mobile" ? "p-3 my-2 mr-5 flex flex-col shadow-2xl gap-0 w-28 h-36 rounded-xl bg-white hover:shadow-slate-400 flex-shrink-0 relative -left-7" : ''
        }>
            <div className={mediaquery == "desktop" || mediaquery == "tablet" ? "flex gap-2 relative top-8"
                : ""
            }>
                    
                    <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500"></FontAwesomeIcon>
                    <h6 className="relative -top-5 text-blue-700 animate-pulse">{header}</h6>
                </div>
            <div className="flex gap-3">
                <h2 className={
                    mediaquery == "desktop" || mediaquery == "tablet" ?
                    "relative ml-2": 'absolute top-9'
                }>{`${symbol}${price}`}</h2>
                <p className={
                     mediaquery == "desktop" || mediaquery == "tablet" ?
                    "text-xxs relative top-5 opacity-50":'text-xxs absolute top-20 opacity-50'
                    }>{`/${limit}`}</p>
            </div>
            { mediaquery == "desktop" || mediaquery == "tablet" ?(<div>
                <ul className="relative -left-4 marker:text-yellow-400">
                    {features?.map((element,index) => (
                        <li key={index} className="text-xs font-bold my-2">{element}</li>
                    ))}
                </ul>
            </div>):<FontAwesomeIcon icon={faInfoCircle} className="text-green animate-pulse absolute" title="Details"></FontAwesomeIcon>}
            <br></br>
            <button  className={
                 mediaquery == "desktop" || mediaquery == "tablet" ?
                "p-3 w-full text-center bg-black text-white rounded-lg border-none hover:bg-gray-500 shadow-sm cursor-pointer"
                : 'p-1 mt-1 border-none shadow rounded bg-black text-white'
            } onClick={onPressed}>
                Get Plan
            </button>
        </div>
    );
}
export default PaymentCard;