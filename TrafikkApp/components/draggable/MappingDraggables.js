/* eslint-disable prettier/prettier */
import React from 'react';
import Draggable from './Draggable';

const MappingDraggable = (props) => {
    //Get props
    const { draggables, setDraggables, setTrashHover, dropZoneValues } = props;

    const onRemoveItem = (itemId) => {
        const filtered = draggables.filter((item) => item.id !== itemId);
        setDraggables(filtered);
    };

    return (
        <>
            {draggables.map((itemInfo) => {
                return (
                    <Draggable
                        key={itemInfo.id}
                        onTrashHover={setTrashHover}
                        id={itemInfo.id}
                        source={itemInfo.source}
                        removeItem={onRemoveItem}
                        dropZoneValues={dropZoneValues}
                        tintColor={null}
                    />
                );
            })}
        </>
    );
};

export default MappingDraggable;
