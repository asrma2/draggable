import React from 'react';
import Draggable from 'react-draggable';

const DragBox = ({ position, size, boxId, onDrag, children }) => (
    <Draggable
        bounds="parent"
        handle="strong"
        position={position}
        onStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}
        onDrag={(e, position) => {
            e.preventDefault();
            e.stopPropagation();
            onDrag(boxId, position);
        }}
    >
        <div className="box no-cursor" style={{ width: `${size.x}px`, height: `${size.y}px` }}>
            <div>
                <strong className="cursor"> Box {boxId} </strong>
            </div>
            {children}
        </div>
    </Draggable>
);

export default DragBox;
