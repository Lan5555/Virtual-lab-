import { CSSProperties } from "react";

interface PlanProps {
    id: number;
    title: string;
    amount: number;
    isCurrent: boolean;
    properties: string[];
    submitText: string;
    onClick: () => void;
}
export const Plan:React.FC<PlanProps> = ({ id, title, amount, isCurrent, properties, submitText, onClick }) => {
    const dotStyle: CSSProperties = {
        borderRadius: '50%',
        width: '1.2rem',
        height: '1.2rem',
        color: isCurrent ? 'darkgreen' : 'blueviolet',
    }
    const amountStyle: CSSProperties = {
        fontSize: '23pt',
        fontWeight: 'bold',
    }
    return (
        <div>
            <div className="mx-3">
                <span style={dotStyle}></span>  <h6>{ title }</h6>
            </div>
            
            <div>
                <span style={amountStyle}>{ amount }</span>
                <small>/ month</small>
            </div>

            <ul className="list-disc">
                { properties.map((it, index) => (
                    <li key={index}>{it}</li>
                ))}
            </ul>

            <button 
                type="button" 
                onClick={ onClick }
            >
                { submitText }
            </button>
        </div>
    );
}