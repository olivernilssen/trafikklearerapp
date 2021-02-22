/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import ComponentMenuTop from '../sketchComponents/ComponentMenuTop';
import DraggableDropZone from './DraggableDropzone';
import MappingDraggable from './MappingDraggables';

const DraggableWithEverything = (props) => {
    //States from props
    const { topMenuHidden, setTopMenuHidden } = props;

    //States and states from props
    const [draggables, setDraggables] = useState([]);
    const [dropZoneValues, setDropZoneValues] = useState(0);
    const [counter, setCounter] = useState(0);
    const [trashHover, setTrashHover] = useState(false);

    const onNewDraggable = (itemSrc) => {
        const newDraggable = { id: counter, source: itemSrc };
        setCounter(counter + 1);
        setDraggables([...draggables, newDraggable]);
    };

    return (
        <>
            <ComponentMenuTop
                topMenuHidden={topMenuHidden}
                onNewDraggable={onNewDraggable}
            />

            <MappingDraggable
                draggables={draggables}
                setDraggables={setDraggables}
                setTrashHover={setTrashHover}
                dropZoneValues={dropZoneValues}
            />

            <DraggableDropZone
                setDropZoneValues={setDropZoneValues}
                iconSize={60}
                trashHover={trashHover}
            />
        </>
    );
};

export default DraggableWithEverything;
