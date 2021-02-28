import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, TabBar } from 'react-native-ui-lib';

import Color from '../../styles/Colors';
import { useCallback } from 'react';
import BottomMenuContent from './BottomMenuContent';

const BottomMenuAnimated = React.memo((props) => {
    const {
        roadType,
        setImage,
        // roadTypesNames,
        // imgSource,
        extensionType,
        bottomSheetHidden,
        setBottomSheetHidden,
    } = props;

    const [bounceValue, setBounceValue] = useState(new Animated.Value(0));
    const [hiddenViewButton, setHiddenViewButton] = useState('chevron-down');
    const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

    useEffect(() => {
        toggleSubview();
    }, [bottomSheetHidden]);

    // Show or hide the bottom sheet depending on hight and if it is showing or not
    const toggleSubview = useCallback(() => {
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
    }, [bottomSheetHidden]);

    const onHiddenViewChange = useCallback(() => {
        setBottomSheetHidden(!bottomSheetHidden);
    });

    // Get the high of the view which is hidden
    const getLayout = (layout) => {
        const { x, y, width, height } = layout;
        setBottomSheetHeight(height);
    };

    // const onMenuButtonPressed = useCallback((key) => {
    //     //get img from imgSource
    //     const img = roadTypes[key];

    //     //set the selected img/roadType
    //     setSelectedRoadType([key, selectedRoad]);

    //     //send to parent
    //     onImageChange(img);
    //     onHiddenViewChange(!bottomSheetHidden);
    // });

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
                    color={Color.iconPrimary}
                />
            </TouchableOpacity>

            <View
                onLayout={(event) => {
                    getLayout(event.nativeEvent.layout);
                }}
                style={styles.bottomContainer}>
                <BottomMenuContent
                    roadType={roadType}
                    extensionType={extensionType}
                    setImage={setImage}
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
        width: '100%',
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

export default BottomMenuAnimated;
