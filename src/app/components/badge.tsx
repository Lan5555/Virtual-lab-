import React, { ReactNode } from "react";

interface BadgeProps {
  text: string;
  color?: string; 
  children?: ReactNode; 
  position?:string[];
}

const Badge: React.FC<BadgeProps> = ({ text, color = "gray", children, position = [10,5] }) => {
  return (
    <div className={`badge-container absolute mb-${position[0]} mr-${position[1]} ml-${position[2]} mt-${position[3]}`}>
      {children}
      <h6
        className="text-xxs text-white p-[2px] rounded-3xl"
        style={{ backgroundColor: color }}
      >
        {text}
      </h6>
    </div>
  );
};

export default Badge;
