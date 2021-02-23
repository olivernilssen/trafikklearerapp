/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';

import ComponentMenuTop from '../sketchComponents/ComponentMenuTop';
import DraggableDropZone from './DraggableDropzone';
import MappingDraggable from './MappingDraggables';

const DraggableWithEverything = React.memo((props) => {
    //States from props
    const {
        topMenuHidden,
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

    const onNewDraggable = useCallback((itemSrc) => {
        const newDraggable = {
            id: counter,
            source: itemSrc,
        };

        setCounter(counter + 1);
        setDraggables([...draggables, newDraggable]);
        setActionList([...actionList, { ...newDraggable, type: 'draggable' }]);
    });

    const onRemoveItem = (itemId) => {
        //Remove item from list of draggables
        const filtered = draggables.filter((item) => item.id !== itemId);
        setDraggables(filtered);

        //Remove this item also from the action list
        const filteredActionList = actionList.filter(
            (item) => item.id !== itemId
        );
        setActionList(filteredActionList);
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
});

export default DraggableWithEverything;
