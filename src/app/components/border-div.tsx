interface props{
    element:React.ReactNode
}
const Tile:React.FC<props> = ({element}) => {
    return(
        <div className="border-b-2 border-b-cyan-50 p-1 w-auto h-auto cursor-pointer">
            {element}
        </div>
    )
}
export default Tile;