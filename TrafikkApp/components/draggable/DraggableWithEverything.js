/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useEffect } from 'react';

import ComponentMenuTop from '../sketchComponents/ComponentMenuTop';
import DraggableDropZone from './DraggableDropzone';
import MappingDraggable from './MappingDraggables';

const DraggableWithEverything = (props) => {
    //States from props
    const {
        topMenuHidden,
        setTopMenuHidden,
        draggables,
        setDraggables,
        actionList,
        setActionList,
        deletingItemId,
    } = props;

    useEffect(() => {
        if (deletingItemId == null) return;
        onRemoveItem(deletingItemId);
    }, [deletingItemId]);

    //States and states from props
    const [dropZoneValues, setDropZoneValues] = useState(0);
    const [counter, setCounter] = useState(0);
    const [trashHover, setTrashHover] = useState(false);

    const onNewDraggable = (itemSrc) => {
        const newDraggable = {
            id: counter,
            source: itemSrc,
            type: 'draggable',
        };
        setCounter(counter + 1);
        setDraggables([...draggables, newDraggable]);
        setActionList([...actionList, newDraggable]);
    };

    const onRemoveItem = (itemId) => {
        const filtered = draggables.filter((item) => item.id !== itemId);
        setDraggables(filtered);
    };

    return (
        <>
            <ComponentMenuTop
                topMenuHidden={topMenuHidden}
                onNewDraggable={onNewDraggable}
            />

            <DraggableDropZone
                setDropZoneValues={setDropZoneValues}
                iconSize={60}
                trashHover={trashHover}
            />

            <MappingDraggable
                draggables={draggables}
                setDraggables={setDraggables}
                setTrashHover={setTrashHover}
                dropZoneValues={dropZoneValues}
                onRemoveItem={onRemoveItem}
            />
        </>
    );
};

export default DraggableWithEverything;
