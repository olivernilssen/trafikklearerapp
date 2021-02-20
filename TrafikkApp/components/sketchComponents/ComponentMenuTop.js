import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Color from '../../styles/Colors';
import ComponentItems from './ComponentItems';

const ComponentMenuTop = (props) => {
    const { topMenuHidden } = props;

    const [yPosHidden, setYPosHidden] = useState(-100);
    const [bounceValue, setBounceValue] = useState(
        new Animated.Value(yPosHidden)
    );
    // const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        toggleView();
    }, [topMenuHidden]);

    const toggleView = () => {
        var toValue = 0;

        if (topMenuHidden) {
            toValue = yPosHidden;
        }
        if (!topMenuHidden) {
            Animated.spring(bounceValue, {
                toValue: toValue,
                bounciness: 2,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(bounceValue, {
                toValue: toValue,
                bounciness: 2,
                useNativeDriver: true,
            }).start();
        }
    };

    const getTopMenuLayout = (layout) => {
        const { x, y, width, height } = layout;
        setYPosHidden(-height);
        // setContainerHeight(0);
    };

    return (
        <Animated.View
            style={[
                styles.animatedView,
                {
                    transform: [{ translateY: bounceValue }],
                },
            ]}>
            <View
                style={styles.menuContent}
                onLayout={(event) => {
                    getTopMenuLayout(event.nativeEvent.layout);
                }}>
                <ComponentItems />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    animatedView: {
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    menuContent: {
        backgroundColor: Color.borderColor,
        elevation: 10,
        width: '100%',
        height: '100%',
    },
});

export default ComponentMenuTop;
