import Icon from "./icons";
import { CSSProperties } from "react";

interface props {
    title: string;
    items: {
        icon?: string;
        text: string;
        subtext?: string;
        value: number;
    }[];
}

const ActivityCard:React.FC<props> = ({ title, items }) => {
    const roundStyle: CSSProperties = {
        borderRadius: "50%",
        width: "1.5rem",
        height: "1.5rem",
        border: "1px solid gray",
        padding: "0.5rem",
    }
    return (
        <div className="max-w-sm p-4 rounded overflow-hidden shadow-lg">
            <div>
                <h4> { title }</h4>
            </div>

            {/* list */}
            { items.map((obj, index) => (
                <div className="flex justify-between" key={index}>
                    <div className="flex items-center">
                        <Icon iconName={obj.icon || obj.icon != "" ? obj.icon : 'bell'} size1={'14pt'} onPressed={() => { } } color={''}/>
                        <div className="ml-3 text-sm">
                            <p className="text-gray-900 leading-none">{ obj.text }</p>
                            <p className="text-gray-600">{ obj.subtext }</p>
                        </div>
                    </div>

                    <div className="my-auto">{ obj.value }</div>
                </div>
            ))}
        </div>
    );
}

export default ActivityCard;