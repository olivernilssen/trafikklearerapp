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
    [draggables, setDraggables] = useState([]);
    [dropZoneValues, setDropZoneValues] = useState(0);

    onNewDraggable = (itemSrc) => {
        setDraggables([...draggables, itemSrc]);
        // console.log(draggables);
    };

    onRemoveItem = (index) => {
        console.log('should delete ' + index);
        const filtered = [...draggables];

        filtered.splice(index, 1);
        setDraggables(filtered);
    };

    // Get the high of the view which is hidden
    getIconLayout = (layout) => {
        const { x, y, width, height } = layout;
        setDropZoneValues(layout);
    };

    return (
        <MainView>
            <View style={styles.sketchArea}>
                <Header name={'Vei'} navigation={navigation} />
                <View styles={styles.dragArea}></View>

                <DraggableMenu addDraggable={onNewDraggable} />
                <Icon
                    onLayout={(event) => {
                        getIconLayout(event.nativeEvent.layout);
                    }}
                    style={styles.icon}
                    name="trash"
                    size={60}
                />

                {draggables.map((itemInfo, i) => {
                    return (
                        <Draggable
                            key={i}
                            index={i}
                            source={itemInfo}
                            removeItem={onRemoveItem}
                            dropZoneValues={dropZoneValues}
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
    },
    dragArea: {
        flex: 1,
        height: '100%',
        backgroundColor: Colors.background,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 30,
    },
});

export default RoadScreen;
