import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TablePane from "./table";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface props {
    fields: { label: string; key: string, render?: string }[];
    items: Record<string, any>[];
    onSelected: (e: Record<string, any>) => void;
}

export const UsersCard:React.FC<props> = ({ fields, items, onSelected }) => {
    return (
        <div className="p-1 m-1 bg-white text-black">
            <h6>Users</h6>
            <TablePane 
                fields={fields} 
                items={items} 
                onSelect={onSelected} 
                render={
                    (data, key, render) => render === 'view' ? <FontAwesomeIcon icon={faEye} className='text-center text-gray-400  hover:text-black' style={{ height: '20px', width: '20px' }} title='View' onClick={(e) => {
                        alert(data.first_name); 
                        e.stopPropagation();
                    }} /> : null
                } 
            />
        </div>
    );
}