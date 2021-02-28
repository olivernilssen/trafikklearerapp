import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-ui-lib';

import Color from '../../styles/Colors';
import ComponentItems from './ComponentItems';

const extensionTypes = ['vanlig', 'gangfelt', 'busslomme', 'pil'];

const ComponentMenuTop = React.memo(
    ({ topMenuHidden, onNewDraggable, setExtensionType }) => {
        const [radioBtn, setRadioBtn] = useState(extensionTypes[0]);
        const [yPosHidden, setYPosHidden] = useState(-200);
        const [bounceValue, setBounceValue] = useState(
            new Animated.Value(yPosHidden)
        );

        useEffect(() => {
            toggleView();
        }, [topMenuHidden]);

        const toggleView = useCallback(() => {
            var toValue = 0;

            if (topMenuHidden) {
                toValue = yPosHidden;
            }
            if (!topMenuHidden) {
                Animated.spring(bounceValue, {
                    toValue: toValue,
                    bounciness: 1,
                    speed: 4,
                    useNativeDriver: true,
                }).start();
            } else {
                Animated.spring(bounceValue, {
                    toValue: toValue,
                    bounciness: 1,
                    speed: 4,
                    useNativeDriver: true,
                }).start();
            }
        });

        const getTopMenuLayout = (layout) => {
            const { x, y, width, height } = layout;
            setYPosHidden(-height);
        };

        const radioButtonChange = (value) => {
            setRadioBtn(value);
            setExtensionType(value);
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
                    <View style={styles.radioView}>
                        <RadioGroup
                            initialValue={radioBtn}
                            onValueChange={(value) => radioButtonChange(value)}
                            style={styles.buttonGroup}>
                            {extensionTypes.map((name, i) => {
                                return (
                                    <RadioButton
                                        key={i}
                                        label={name}
                                        value={name}
                                        size={25}
                                        labelStyle={{ fontSize: 20 }}
                                        style={styles.radioBtn}
                                        color={Color.buttonSecActive}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </View>
                    <ComponentItems onNewDraggable={onNewDraggable} />
                </View>
            </Animated.View>
        );
    }
);

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
        flexDirection: 'column',
        backgroundColor: Color.borderColor,
        elevation: 10,
        width: '100%',
        height: '100%',
        borderTopWidth: 3,
        borderTopColor: Color.borderColor,
    },
    radioView: {
        padding: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // padding: 5,
    },
    radioBtn: {},
});

export default ComponentMenuTop;
