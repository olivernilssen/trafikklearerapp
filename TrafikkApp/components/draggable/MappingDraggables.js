/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import Draggable from './Draggable';
import AppContext from '../../AppContext';
/**
 * Helper function to map through all the draggables objects
 * then to display them in DraggableWithEverything
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
                        source={itemInfo.source}
                        onRemoveItem={onRemoveItem}
                        tintColor={appContext.draggableColor}
                    />
                );
            })}
        </>
    );
});

export default MappingDraggable;
