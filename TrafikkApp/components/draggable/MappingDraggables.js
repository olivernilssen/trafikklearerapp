/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
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

const styles = StyleSheet.create({
    sketchArea: {
        flex: 1,
        width: '100%',
        height: '100%',

        backgroundColor: Colors.textPrimary,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 30,
    },
});

export default MappingDraggable;
