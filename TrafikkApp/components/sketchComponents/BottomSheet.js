import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, TabBar } from 'react-native-ui-lib';

import BottomSheetTabs from './BottomSheetTabs';

import Color from '../../styles/Colors';

const BottomSheet = React.memo((props) => {
    const {
        onImageChange,
        labelsArray,
        imgSource,
        bottomSheetHidden,
        setBottomSheetHidden,
    } = props;

    const [bounceValue, setBounceValue] = useState(new Animated.Value(0));
    const [hiddenViewButton, setHiddenViewButton] = useState('chevron-down');
    const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
    const [selectedRoad, setSelectedRoad] = useState(labelsArray[0]);
    const [roadTypes, setRoadTypes] = useState(imgSource[labelsArray[0]]);
    const [selectedRoadType, setSelectedRoadType] = useState([
        Object.keys(imgSource[labelsArray[0]])[0],
        labelsArray[0],
    ]);

    useEffect(() => {
        toggleSubview();
    }, [bottomSheetHidden]);

    // Show or hide the bottom sheet depending on hight and if it is showing or not
    const toggleSubview = () => {
        setHiddenViewButton(bottomSheetHidden ? 'ellipsis-h' : 'chevron-down');
        var toValue = bottomSheetHeight;

        if (!bottomSheetHidden) {
            toValue = 0;
        }

        Animated.spring(bounceValue, {
            useNativeDriver: true,
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
        }).start();
    };

    const onHiddenViewChange = () => {
        setBottomSheetHidden(!bottomSheetHidden);
    };

    // Get the high of the view which is hidden
    const getBottomSheetLayout = (layout) => {
        const { x, y, width, height } = layout;
        setBottomSheetHeight(height);
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
        onHiddenViewChange(!bottomSheetHidden);
    };

    return (
        <Animated.View
            style={[
                styles.subView,
                { transform: [{ translateY: bounceValue }] },
            ]}>
            <TouchableOpacity
                style={styles.button}
                onPress={onHiddenViewChange}>
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
                    backgroundColor={Color.tabHeaderInactiveBg}
                    selectedIndex={0}
                    indicatorStyle={{
                        backgroundColor: Color.tabHeaderIndicator,
                        width: '70%',
                        alignSelf: 'center',
                    }}>
                    {labelsArray.map((label, i) => {
                        const activeTab = selectedRoad == i;
                        return (
                            <TabBar.Item
                                key={i}
                                label={label}
                                labelStyle={styles.tabHeaderTextInactive}
                                selectedLabelStyle={styles.tabHeaderTextActive}
                                style={
                                    activeTab
                                        ? styles.tabHeaderActive
                                        : styles.tabHeaderInactive
                                }
                                onPress={() => tabPressed(i)}
                            />
                        );
                    })}
                </TabBar>
                <BottomSheetTabs
                    roadTypes={roadTypes}
                    onImageSelect={onImageSelect}
                    selectedRoadType={selectedRoadType}
                    selectedRoad={selectedRoad}
                />
            </View>
        </Animated.View>
    );
});

var styles = StyleSheet.create({
    subView: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    button: {
        paddingBottom: 10,
    },
    bottomContainer: {
        backgroundColor: Color.bottomDrawerBg,
        paddingBottom: 10,
        alignItems: 'center',
        elevation: 20,
    },
    tabBar: {},
    tabHeaderActive: {
        backgroundColor: Color.tabHeaderActiveBg,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: Color.tabHeaderActiveBg,
    },
    tabHeaderInactive: {
        backgroundColor: Color.tabHeaderInactiveBg,
    },
    tabHeaderTextActive: {
        color: Color.textPrimary,
        fontSize: 16,
    },
    tabHeaderTextInactive: {
        color: Color.tabHeaderTextInactive,
    },
});

export default BottomSheet;
