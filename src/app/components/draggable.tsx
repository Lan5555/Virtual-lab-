/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

// Interface for the component's props
interface DraggableImageProps {
  id: string;
  src: string;
  initialX: number;
  initialY: number;
}

const DraggableImage = React.forwardRef<HTMLDivElement, DraggableImageProps>((props, ref) => {
  const { id, src, initialX, initialY } = props;
  
  // State to store the position of each image
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  // Define the drag behavior
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'IMAGE',  // Dragging type
    item: { id },  // Item data, here just the id
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),  // Collect dragging state
    }),
  }));

  // Define the drop behavior
  const [, drop] = useDrop(() => ({
    accept: 'IMAGE',  // Specify which type of item can be dropped
    drop: (item: any, monitor: DropTargetMonitor) => {
      const clientOffset = monitor.getClientOffset();  // Get position of the drop
      setPosition({
        x: clientOffset ? clientOffset.x : position.x,
        y: clientOffset ? clientOffset.y : position.y,
      });
    },
  }));

  // Combine drag and drop refs
  const dragDropRef = (node: HTMLDivElement | null) => {
    drag(node);
    drop(node);

    // If a ref is passed, set it as well
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }
  };

  return (
    <div
      ref={dragDropRef}  // Apply the combined ref
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        opacity: isDragging ? 0.5 : 1,  // Change opacity when dragging
        cursor: 'move',
      }}
    >
      <img
        src={src}
        alt={`Draggable ${id}`}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
});

// Set a display name to avoid the eslint warning
DraggableImage.displayName = 'DraggableImage';

export default DraggableImage;
