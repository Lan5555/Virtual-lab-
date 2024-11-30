import React from "react";

interface props {
    items: { name: string; comment: string }[]
}

export const Feedback:React.FC<props> = ({ items }) => {
    return (
        <div>
            <h6>Feedback</h6>
            <div className="flex flex-col p-1">
                {
                    items.map((obj, index) => (
                        <div className="border-b-cyan-50 bg-white mb-2" key={index}>
                            <span className="text-blue-700">{obj.name}</span><br />
                            <small>{obj.comment}</small>
                        </div>
                    ))
                }
            </div>
        </div>
        
    )
}