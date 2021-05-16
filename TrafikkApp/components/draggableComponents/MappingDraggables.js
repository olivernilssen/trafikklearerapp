import React, { useContext } from 'react';
import Draggable from './Draggable';
import AppContext from '../../AppContext';

/**
 * This component maps through all the draggables objects, making a Draggable from
 * each of them. This is used to display them in the big component containing all the
 * components related to the draggable function - DraggablesWithMenu.
 * @namespace MappingDraggable
 * @category DraggableComponents
 * @prop {array[]} draggables list of all draggables in view
 * @prop {function} onRemoveItem Function to remove an item from the draggables list
 */
const MappingDraggable = React.memo((props) => {
    //Get props
    const { draggables, onRemoveItem } = props;
    const appContext = useContext(AppContext);

    return (
        <>
            {draggables.map((itemInfo) => {
                return (
                    <Draggable
                        key={itemInfo.id}
                        id={itemInfo.id}
                        imgInfo={itemInfo}
                        onRemoveItem={onRemoveItem}
                        tintColor={
                            itemInfo.hasTint === false
                                ? appContext.draggableColor
                                : null
                        }
                    />
                );
            })}
        </>
    );
});

export default MappingDraggable;
