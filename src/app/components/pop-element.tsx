import anime from "animejs";

interface props{
    element:React.ReactNode
}
const Pop:React.FC<props> = ({element}) => {
    return(
        <div className="flex justify-center items-center  rounded centered animate-fadeIn z-50">
            <div className="w-full h-full rounded">
            {element}
            </div>
        </div>
    );
}
export default Pop;