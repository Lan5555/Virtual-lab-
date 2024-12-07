import React, { CSSProperties, ReactElement, ReactNode } from "react";

interface TableProps {
    fields: { label: string; key: string, render?: string }[];
    items: Record<string, any>[];
    onSelect: (item: Record<string, any>) => void;
    render?: (item: Record<string, any>, key: string, render?: string) => React.ReactNode;
}

const TablePane:React.FC<TableProps> = ({ fields, items, onSelect, render }) => {

    const tdStyles: CSSProperties = {
        cursor: "pointer",
        color: "darkblue",
    }

    return (
        <div>
            <table className="w-full min-w-max table-auto text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                        { fields.map((it) => <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2" key={it.key}>{it.label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    { 
                        items.map((obj, index) => (
                            <tr className="" key={`io${index}`} onClick={ () => onSelect(obj) } >
                                { Object.keys(obj).map((k, i) => (
                                    <td className="p-2 border-b border-blue-gray-50" style={tdStyles} key={`i${i}`}>{ render && fields[i] && fields[i].render === k && render(obj, k, fields[i].render) ? render(obj, k, fields[i].render) : obj[k] }</td>
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