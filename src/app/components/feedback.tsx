import React from "react";
import Wrap from "./wrapper";

interface props {
    items: { name: string; comment: string }[]
}

export const Feedback:React.FC<props> = ({ items }) => {
    return (
        <div className="shadow-2xl ml-2">
            <Wrap content={<h6 className="text-white">Feedback</h6>} color="black"></Wrap>
            <div className="flex flex-col p-1">
                {
                    items.map((obj, index) => (
                        <div className="border-b-cyan-50 bg-white mb-2 p-2" key={index}>
                            <span className="text-blue-700">{obj.name}</span><br />
                            <small>{obj.comment}</small>
                        </div>
                    ))
                }
            </div>
        </div>
        
    )
}