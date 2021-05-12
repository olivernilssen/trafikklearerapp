import React, { useContext } from 'react';
import Draggable from './Draggable';
import AppContext from '../../AppContext';

/**
 * Helper function to map through all the draggables objects
 * then to display them in DraggableWithEverything
 * @namespace MappingDraggable
 * @category DraggableComponents
 * @prop {array[]} draggables list of all draggables in view
 * @prop {function} onRemoveItem function to remove item from draggables list
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
