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
import DraggableDropZone from '../components/draggable/DraggableDropzone';
import MappingDraggable from '../components/draggable/MappingDraggables';

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

    return (
        <MainView>
            <View style={styles.sketchArea}>
                <Header name={'Vei'} navigation={navigation} />

                <DraggableMenu addDraggable={onNewDraggable} />
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
                />
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
});

export default RoadScreen;
