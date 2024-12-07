import { CSSProperties } from "react"
import styles from '../css/btn.module.css';
const Spinner:React.FC = () => {
   return(
    <div className="flex justify-center items-center">
        <span className="loader inline-block w-4 h-4 mr-2 spin rounded-full animate-spin bg-transparent spin-top"></span>
    </div>
   );
}
export default Spinner;