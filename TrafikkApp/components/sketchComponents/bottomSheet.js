import React, { useState } from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, TabBar } from 'react-native-ui-lib';

// import imgSource from './fileRegistry';
import Color from '../../styles/Colors';
// const labelsArray = [];

// //Get all the keys from our imgSource (høyre, lys etc for labels)
// const keys = Object.keys(imgSource);
// keys.map((keys) => {
//     labelsArray.push(keys);
// });

var isHidden = false;

const BottomSheet = ({ onImageChange, labelsArray, imgSource }) => {
    const [bounceValue, setBounceValue] = useState(new Animated.Value(0));
    const [hiddenViewButton, setHiddenViewButton] = useState('chevron-down');
    const [hiddenView, setHiddenView] = useState(true);
    const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
    const [selectedRoad, setSelectedRoad] = useState(labelsArray[0]);
    const [roadTypes, setRoadTypes] = useState(VeiKryss[labelsArray[0]]);
    const [selectedRoadType, setSelectedRoadType] = useState([
        Object.keys(VeiKryss[labelsArray[0]])[0],
        labelsArray[0],
    ]);

    useEffect(() => {
        toggleSubview();
    }, [hiddenView]);

    // Show or hide the bottom sheet depending on hight and if it is showing or not
    const toggleSubview = () => {
        setHiddenViewButton(!hiddenView ? 'ellipsis-h' : 'chevron-down');
        var toValue = bottomSheetHeight;

        if (hiddenView) {
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
        setHiddenView(!hiddenView);
    };

    // Get the high of the view which is hidden
    const getBottomSheetLayout = (layout) => {
        const { x, y, width, height } = layout;
        setBottomSheetHeight(height);
    };

    const tabPressed = (roadIndex) => {
        setSelectedRoad(roadIndex);
        setRoadTypes(VeiKryss[labelsArray[roadIndex]]);
    };

    const onImageSelect = (key) => {
        //get img from imgSource
        const img = roadTypes[key];

        //set the selected img/roadType
        setSelectedRoadType([key, selectedRoad]);

        //send to parent
        onImageChange(img);
        onHiddenViewChange();
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
                            <Text
                                style={
                                    isOnTabAndKey
                                        ? styles.buttonTextActive
                                        : styles.buttonTextInactive
                                }>
                                {key.toString()}
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
                    selectedIndex={0}
                    indicatorStyle={{
                        backgroundColor: Color.tabHeaderIndicator,
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
    },
    button: {
        paddingBottom: 10,
        // paddingHorizontal: 20,
    },
    bottomContainer: {
        backgroundColor: Color.bottomDrawerBg,
        padding: 10,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Color.borderColor,
    },
    tabBar: {
        borderBottomWidth: 2,
        borderBottomColor: Color.borderColor,
        // marginBottom: 5,
    },
    tabHeaderActive: {
        backgroundColor: Color.tabHeaderActiveBg,
    },
    tabHeaderInactive: {
        backgroundColor: Color.tabHeaderInactiveBg,
    },
    tabHeaderTextActive: {
        color: Color.tabHeaderTextActive,
        fontWeight: 'bold',
        fontSize: 16,
    },
    tabHeaderTextInactive: {
        color: Color.tabHeaderTextInactive,
    },
    tabView: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    activeButton: {
        backgroundColor: Color.tabButtonActive,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Color.tabButtonBorder,
        padding: 10,
    },
    inActiveButton: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Color.tabButtonBorder,
        padding: 10,
    },
    buttonTextActive: {
        color: Color.textPrimary,
        fontWeight: 'bold',
    },
    buttonTextInactive: {
        color: Color.textPrimary,
    },
});

export default BottomSheet;
