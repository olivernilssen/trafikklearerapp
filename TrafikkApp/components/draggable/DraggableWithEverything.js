import React, { useState, useCallback, useEffect } from 'react';
import { DraggableComponentsMenu } from '../draggableComponentsMenu/';
import MappingDraggables from './MappingDraggables';

/**
 * Collects all the draggable components into one
 * the list of draggables, the draggables object, draggable menu
 * and the dropzone area
 * @namespace DraggableWithEverything
 * @category Draggable
 * @prop {boolean} topMenuHidden If the topMenu is hidden or in view
 * @prop {array[]} draggables list of all draggables in view
 * @prop {function} setDraggables function to update draggables array
 * @prop {array[]} actionList list of all actions taken (drawing or adding draggables)
 * @prop {function} setActionList update the actionList (add or remove)
 * @prop {int} deletingItemId integer to let the component know which draggable to delete
 * @prop {string} name name of the drawing view ('veikryss'... etc)
 * @prop {string} extensionType information about which extension is being used ("gangfelt", "sykkelveit", etc)
 * @prop {function} setExtensionType update the extension type used
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
    const [counter, setCounter] = useState(0);

    /**
     * Adds a new draggable to the array draggables
     * also adds this value to the actionList to be used
     * when the user presses the undo button
     * @memberof DraggableWithEverything
     * @param {string} itemSrc image source of draggable to add
     */
    const onNewDraggable = useCallback((itemSrc) => {
        const newDraggable = {
            id: counter,
            ...itemSrc,
        };

        setCounter(counter + 1);
        setDraggables([...draggables, newDraggable]);
        setActionList([...actionList, { id: counter, type: 'draggable' }]);
    });

    /**
     * Function to remove an item from the list draggables
     * Filters the list according to the provided itemID
     * Also filteres the actionList the same way
     * @memberof DraggableWithEverything
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

            <MappingDraggables
                draggables={draggables}
                setDraggables={setDraggables}
                onRemoveItem={onRemoveItem}
            />
        </>
    );
});

export default DraggableWithEverything;
