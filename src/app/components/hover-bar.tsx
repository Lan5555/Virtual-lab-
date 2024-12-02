import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  items?: IconDefinition[];
  className?: string;
  iconClass?: string;
  title?:string
  runFunc1?: () => void;
  runFunc2?: () => void;
  runFunc3?: () => void;
  runFunc4?: () => void;

}

const HoverBar: React.FC<Props> = ({
  items,
  className = "w-auto h-auto p-3 bg-black flex gap-3 flex-grow justify-center absolute bottom-10 animate-pulse rounded-lg shadow-xl",
  iconClass,
  runFunc1,
  runFunc2,
  runFunc3,
  runFunc4,
  title
}) => {
  const handlePressed = (index: number) => {
    if (index === 0 && runFunc1) {
      runFunc1();
    } else if (index === 1 && runFunc2) {
      runFunc2();
    } else if (index === 2 && runFunc3) {
      runFunc3();
    } else if (index === 3 && runFunc4) {
      runFunc4();
    }
  };

  return (
    <div className="flex justify-center">
      <div className={className}>
        {items?.map((element: any, index: number) => (
          <FontAwesomeIcon
            key={`${element}${index}`}
            icon={element}
            className={iconClass}
            onClick={() => handlePressed(index)}
            title={title}
          />
        ))}
      </div>
    </div>
  );
};

export default HoverBar;
