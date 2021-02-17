/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MainView from '../components/MainView';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import SketchArea from '../components/sketchComponents/SketchArea';
import Colors from '../styles/Colors';

import Header from '../components/Header';
import Draggable from '../components/draggable/Draggable';
import DraggableMenu from '../components/draggable/DraggableMenu';

const RoadScreen = ({ navigation }) => {
    //States
    const [draggables, setDraggables] = useState([]);
    const [dropZoneValues, setDropZoneValues] = useState(0);
    const [counter, setCounter] = useState(0);
    const [trashHover, setTrashHover] = useState(false);

    const onNewDraggable = (itemSrc) => {
        const newDraggable = { id: counter, source: itemSrc };
        setCounter(counter + 1);
        setDraggables([...draggables, newDraggable]);
    };

    const onRemoveItem = (itemId) => {
        const filtered = draggables.filter((item) => item.id !== itemId);
        setDraggables(filtered);
    };

    // Get the high of the view which is hidden
    const getIconLayout = (layout) => {
        setDropZoneValues(layout);
    };

    return (
        <MainView>
            <View style={styles.sketchArea}>
                <Header name={'Vei'} navigation={navigation} />

                <DraggableMenu addDraggable={onNewDraggable} />
                <Icon
                    onLayout={(event) => {
                        getIconLayout(event.nativeEvent.layout);
                    }}
                    style={styles.icon}
                    color={trashHover ? 'red' : 'black'}
                    name={trashHover ? 'trash-restore' : 'trash'}
                    size={60}
                />

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
            </View>
        </MainView>
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

export default RoadScreen;
