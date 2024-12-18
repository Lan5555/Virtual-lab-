import React, { ReactNode } from "react";

interface BadgeProps {
  text: string;
  color?: string; 
  children?: ReactNode; 
  position?:number[];
}

const Badge: React.FC<BadgeProps> = ({ text, color = "gray", children, position = [4,null,null,null] }) => {
  return (
    <div className={`badge-container relative -top-${position[0]} bottom-${position[1]} left-${position[2]} right-${position[3]}`}>
      {children}
      <h6
        className="text-xxs text-white p-[2px] rounded-3xl"
        style={{ backgroundColor: color}}
      >
        {text}
      </h6>
    </div>
  );
};

export default Badge;
