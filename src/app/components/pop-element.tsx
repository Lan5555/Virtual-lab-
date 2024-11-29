import anime from "animejs";

interface props{
    element:React.ReactNode
}
const Pop:React.FC<props> = ({element}) => {
    anime({
        targets:'.box',
        duration:2000,
        opacity:[0,1],
        easing:'easeInOutQuad',
        rotate:'1turn'
    })
    return(
        <div className="flex justify-center items-center box fixed w-auto h-auto top-0 z-10  rounded">
            <div className="w-10/12 h-3/5 rounded">
            {element}
            </div>
        </div>
    );
}
export default Pop;