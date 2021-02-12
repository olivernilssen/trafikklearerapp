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
                                {key.toString()}-utforming
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
                <Icon
                    name={hiddenViewButton}
                    size={40}
                    color={Color.iconPrimary}></Icon>
            </TouchableOpacity>
            <View
                onLayout={(event) => {
                    getBottomSheetLayout(event.nativeEvent.layout);
                }}
                style={styles.bottomContainer}>
                <TabBar
                    style={styles.tabBar}
                    selectedIndex={0}
                    indicatorStyle={{ backgroundColor: 'red', color: 'red' }}>
                    {labelsArray.map((label, i) => {
                        const activeTab = selectedRoad == i;
                        return (
                            <TabBar.Item
                                key={i}
                                label={label}
                                labelStyle={styles.tabHeaderText}
                                selectedLabelStyle={styles.tabHeaderTextActive}
                                style={
                                    activeTab
                                        ? styles.tabHeader
                                        : styles.tabHeaderInactive
                                }
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
    subView: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        // elevation: 10,
    },
    button: {
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    bottomContainer: {
        backgroundColor: Color.bottomDrawerBg,
        // backgroundColor: 'red',
        padding: 10,
        // width: '100%',
        alignItems: 'center',
        // flexDirection: 'row',
        elevation: 10,
    },
    buttonText: {
        // fontSize: 17,
        // color: '#007AFF',
        // color: 'red',
    },

    tabBar: {
        // margin: 10,
        // backgroundColor: Color.tabBarBg,
        // backgroundColor: 'red',
        // flexDirection: 'row',
        // width: '50%',
        elevation: 3,
        marginBottom: 5,
    },
    tabHeader: {
        backgroundColor: Color.tabBarHeader,
    },
    tabHeaderinactive: {
        backgroundColor: Color.tabBarHeaderInactive,
    },
    activeTabHeader: {
        backgroundColor: Color.tabBarHeader,
        // borderBottomWidth: 5,
        // borderBottomColor: 'black',
        // width: 50,
        // backgroundColor: 'red',
        // margin: 10,
    },

    tabHeaderTextInactive: {
        // color: Color.tabButtonInactive,
        color: Color.tabHeaderText,
    },
    tabHeaderText: {
        color: Color.tabHeaderText,
        // color: 'red',
        // fontWeight: 'bold',
        // textTransform: 'capitalize',
    },
    tabHeaderTextActive: {
        color: Color.tabHeaderActive,
        fontWeight: 'bold',
        fontSize: 16,
    },

    tabView: {
        // flex: 1,
        // backgroundColor: Color.drawerBg,
        // backgroundColor: 'yellow',
        // backgroundColor: Color.tabViewBg,
        width: '100%',
        // borderRadius: 10,
        alignItems: 'center',
        // elevation: 10,
        // padding: 5,
        // marginTop: 5,
        // borderWidth: 2,
        // borderColor: Color.tabViewBorder,
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // elevation: 5,
    },
    activeButton: {
        backgroundColor: Color.tabButtonActive,
        padding: 10,
        // borderRadius: 10,
        // elevation: 5,
    },
    inActiveButton: {
        // backgroundColor: Color.tabButton,
        // borderWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 2,
        borderColor: Color.tabButtonInactive,
        padding: 10,
    },
    buttonText: {
        color: Color.textPrimary,
        // fontSize: 15,
        // fontWeight: 'bold',
    },
});

export default BottomSheet;
