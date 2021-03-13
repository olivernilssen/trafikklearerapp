/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';

import DraggableComponentsMenu from '../draggableComponentsMenu/DraggableComponentsMenu';
import DraggableDropZone from './DraggableDropzone';
import MappingDraggable from './MappingDraggables';

/**
 * Collects all the draggable components into one
 * the list of draggables, the draggables object, draggable menu
 * and the dropzone area
 */
const DraggableWithEverything = React.memo((props) => {
    //States from props
    const {
        topMenuHidden,
        draggables,
        setDraggables,
        actionList,
        setActionList,
        deletingItemId,
        name,
        extensionType,
        setExtensionType,
    } = props;

    /**
     * useEffect that is triggered when deletingItemId is changed
     * Will delete according to this state's value
     */
    useEffect(() => {
        if (deletingItemId == null) return;
        onRemoveItem(deletingItemId);
    }, [deletingItemId]);

    //States and states from props
    const [dropZoneValues, setDropZoneValues] = useState(0);
    const [counter, setCounter] = useState(0);
    const [trashHover, setTrashHover] = useState(false);
    const [draggableMoving, setDraggableMoving] = useState(false);

    /**
     * Adds a new draggable to the array draggables
     * also adds this value to the actionList to be used
     * when the user presses the undo button
     */
    const onNewDraggable = useCallback((itemSrc) => {
        const newDraggable = {
            id: counter,
            source: itemSrc,
        };

        setCounter(counter + 1);
        setDraggables([...draggables, newDraggable]);
        setActionList([...actionList, { ...newDraggable, type: 'draggable' }]);
    });

    /**
     * Function to remove an item from the list draggables
     * Filters the list according to the provided itemID
     * Also filteres the actionList the same way
     * @param {int} itemId
     */
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
            <DraggableComponentsMenu
                topMenuHidden={topMenuHidden}
                onNewDraggable={onNewDraggable}
                extensionType={extensionType}
                setExtensionType={setExtensionType}
                name={name}
            />

            {draggableMoving && (
                <DraggableDropZone
                    setDropZoneValues={setDropZoneValues}
                    iconSize={60}
                    trashHover={trashHover}
                />
            )}

            <MappingDraggable
                draggables={draggables}
                setDraggables={setDraggables}
                setTrashHover={setTrashHover}
                dropZoneValues={dropZoneValues}
                onRemoveItem={onRemoveItem}
                setDraggableMoving={setDraggableMoving}
            />
        </>
    );
});

export default DraggableWithEverything;
