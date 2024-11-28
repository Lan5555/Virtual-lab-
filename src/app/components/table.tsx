import React, { CSSProperties, ReactElement, ReactNode } from "react";

interface TableProps {
    fields: string[];
    items: Record<string, any>[];
    onSelect: (item: Record<string, any>) => void;
    children: React.ReactNode;
}

const TablePane:React.FC<TableProps> = ({ fields, items, onSelect, children }) => {

    const tdStyles: CSSProperties = {
        cursor: "pointer",
        color: "darkblue",
    }
    
    // pass modifying slot element for a column
    const slotElement = (name: string) => (data: any) => {
        const child = React.Children.toArray(children).find(
            (el) => React.isValidElement(el) && el.props.slot === name
        );
        return child ? React.cloneElement(child as React.ReactElement, { children: data }) : null;
    }

    return (
        <div>
            <table className="w-full min-w-max table-auto text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                        { fields.map((it, index) => <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" key={`f${index}`}>{it}</th>)}
                    </tr>
                </thead>
                <tbody>
                    { 
                        items.map((obj, index) => (
                            <tr className="" key={`io${index}`}>
                                { Object.keys(obj).map((k, i) => (
                                    <td className="p-4 border-b border-blue-gray-50" style={tdStyles} onClick={ () => onSelect(obj[k]) } key={`i${i}`}>{ slotElement(k)(obj[k]) ?? obj[k] }</td>
                                ))}
                            </tr>
                        ))  
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default TablePane;