/* eslint-disable prettier/prettier */
import React from 'react';
import Draggable from './Draggable';

/**
 * Helper function to map through all the draggables objects
 * then to display them in DraggableWithEverything
 */
const MappingDraggable = React.memo((props) => {
    //Get props
    const { draggables, onRemoveItem } = props;

    return (
        <>
            {draggables.map((itemInfo) => {
                return (
                    <Draggable
                        key={itemInfo.id}
                        id={itemInfo.id}
                        source={itemInfo.source}
                        onRemoveItem={onRemoveItem}
                        tintColor={null}
                    />
                );
            })}
        </>
    );
});

export default MappingDraggable;
