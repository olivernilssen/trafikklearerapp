import React, { useState } from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Button, TabBar } from 'react-native-ui-lib';

import imgSource from './fileRegistry';
import Color from '../../styles/Colors';
const labelsArray = [];

//Get all the keys from our imgSource (høyre, lys etc for labels)
const keys = Object.keys(imgSource);
keys.map((keys) => {
    labelsArray.push(keys);
});

var isHidden = false;

const BottomSheet = ({ onImageChange }) => {
    const [bounceValue, setBoundValue] = useState(new Animated.Value(0));
    const [hiddenViewButton, setHiddeViewButton] = useState('chevron-down');
    const [bottomSheetHeigh, setBottomSheetHeigh] = useState(0);
    const [selectedRoad, setSelectedRoad] = useState(labelsArray[0]);
    const [roadTypes, setRoadTypes] = useState(imgSource[labelsArray[0]]);
    const [selectedRoadType, setSelectedRoadType] = useState([
        Object.keys(imgSource[labelsArray[0]])[0],
        labelsArray[0],
    ]);

    // Show or hide the bottom sheet depending on hight and if it is showing or not
    const toggleSubview = () => {
        setHiddeViewButton(!isHidden ? 'ellipsis-h' : 'chevron-down');
        var toValue = bottomSheetHeigh;

        if (isHidden) {
            toValue = 0;
        }

        Animated.spring(bounceValue, {
            useNativeDriver: true,
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
        }).start();

        isHidden = !isHidden;
    };

    // Get the high of the view which is hidden
    const getBottomSheetLayout = (layout) => {
        const { x, y, width, height } = layout;
        setBottomSheetHeigh(height);
    };

    const tabPressed = (roadIndex) => {
        setSelectedRoad(roadIndex);
        setRoadTypes(imgSource[labelsArray[roadIndex]]);
    };

    const onImageSelect = (key) => {
        //get img from imgSource
        const img = roadTypes[key];

        //set the selected img/roadType
        setSelectedRoadType([key, selectedRoad]);

        //send to parent
        onImageChange(img);
        // toggleSubview();
    };

    const bottomTabRender = (roadType) => {
        const keys = Object.keys(roadTypes);

        return (
            <View style={styles.tabView}>
                {keys.map((key, i) => {
                    const isOnTabAndKey =
                        selectedRoadType[0] == key &&
                        selectedRoadType[1] == roadType;
                    return (
                        <TouchableOpacity
                            key={i}
                            style={
                                isOnTabAndKey
                                    ? styles.activeButton
                                    : styles.inActiveButton
                            }
                            onPress={() => onImageSelect(key)}>
                            <Text style={styles.buttonText}>
                                {key.toString()}-Kryss
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <Animated.View
            style={[
                styles.subView,
                { transform: [{ translateY: bounceValue }] },
            ]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => toggleSubview()}>
                <Icon name={hiddenViewButton} size={40} color={'black'}></Icon>
            </TouchableOpacity>
            <View
                onLayout={(event) => {
                    getBottomSheetLayout(event.nativeEvent.layout);
                }}
                style={styles.bottomContainer}>
                <TabBar style={styles.tabbar} selectedIndex={0} enableShadow>
                    {labelsArray.map((label, i) => {
                        return (
                            <TabBar.Item
                                key={i}
                                label={label}
                                labelStyle={styles.labelText}
                                onPress={() => tabPressed(i)}
                            />
                        );
                    })}
                </TabBar>

                {bottomTabRender(selectedRoad)}
            </View>
        </Animated.View>
    );
};

var styles = StyleSheet.create({
    bottomContainer: {
        backgroundColor: Color.drawerBg,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 17,
        color: '#007AFF',
    },
    subView: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    tabbar: {
        margin: 10,
    },
    tabView: {
        backgroundColor: Color.drawerBg,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    activeButton: {
        backgroundColor: Color.buttonPrimActive,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
    },
    inActiveButton: {
        padding: 10,
    },
    buttonText: {
        color: Color.textPrimary,
        fontSize: 15,
        fontWeight: 'bold',
    },
    labelText: {
        color: Color.headerText,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
});

export default BottomSheet;
