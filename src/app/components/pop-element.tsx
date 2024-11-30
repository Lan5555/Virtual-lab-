import anime from "animejs";

interface props{
    element:React.ReactNode
}
const Pop:React.FC<props> = ({element}) => {
    return(
        <div className="flex justify-center items-center  fixed rounded centered animate-fadeIn">
            <div className="w-10/12 h-3/5 rounded">
            {element}
            </div>
        </div>
    );
}
export default Pop;