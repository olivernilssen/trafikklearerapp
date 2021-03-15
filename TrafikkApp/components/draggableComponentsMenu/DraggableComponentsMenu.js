import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    TouchableOpacity,
    Text,
} from 'react-native';

import { Colors, Typography, Buttons } from '../../styles';
import DraggableComponents from './DraggableComponents';
import Divider from '../reusableComponents/Divider';

const extensionTypes = ['Gangfelt', 'Sykkelfelt'];

/**
 * Component for the draggable top menu, which displayes objects
 * that can be turned into draggables.
 */
const DraggableComponentsMenu = React.memo(
    ({
        topMenuHidden,
        onNewDraggable,
        name,
        extensionType,
        setExtensionType,
    }) => {
        const [yPosHidden, setYPosHidden] = useState(-200);
        const [bounceValue, setBounceValue] = useState(
            new Animated.Value(yPosHidden)
        );

        /**
         * useEffect that is triggered when topMenuHidden
         * is changed. Will toggle the view of the top menu
         */
        useEffect(() => {
            toggleView();
        }, [topMenuHidden]);

        /**
         * Animates the topmenu in and out of view
         */
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

        /**
         * Get's the layout of the topmenu view
         * This is so we know how far down the object needs to
         * "slide" to be fully in view for the user
         * @param {dictionary} layout
         */
        const getTopMenuLayout = (layout) => {
            const { x, y, width, height } = layout;
            setYPosHidden(-height);
        };

        /**
         * Triggered when the radiobuttons on the topmenu is
         * changed or clicked. Will set the value of the radiobutton
         * aswell as the extensiontype and to change backgroundImage
         * @param {String} value
         */
        const extensionTypeChange = (value) => {
            if (extensionType != value) {
                setExtensionType(value);
            } else {
                setExtensionType('Vanlig');
            }
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
                    {(name == 'Veikryss' || name == 'Rundkjoring') && (
                        <View style={styles.extensionTypeContainer}>
                            <View style={styles.extensionTypeBtnsgroup}>
                                {extensionTypes.map((name, i) => {
                                    const activeBtn = name === extensionType;

                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            activeOpacity={0.6}
                                            onPress={() =>
                                                extensionTypeChange(name)
                                            }
                                            style={[
                                                styles.extensionTypeButton,
                                                activeBtn
                                                    ? {
                                                          backgroundColor:
                                                              Colors.componentMenuButtons,
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              Colors.componentMenu,
                                                      },
                                            ]}
                                            color={Colors.bottomMenyButtons}>
                                            <Text
                                                style={[
                                                    styles.extensionBtnText,
                                                    activeBtn
                                                        ? {
                                                              color:
                                                                  Colors.textLight,
                                                          }
                                                        : {
                                                              color:
                                                                  Colors.icons,
                                                          },
                                                ]}>
                                                {name}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            <Divider
                                style={styles.divider}
                                borderColor={Colors.componentMenuButtons}
                            />
                        </View>
                    )}

                    <DraggableComponents onNewDraggable={onNewDraggable} />
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
        flexDirection: 'row',
        backgroundColor: Colors.componentMenu,
        elevation: 10,
        width: '90%',
        height: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    extensionTypeContainer: {
        flexDirection: 'row',
    },
    extensionTypeBtnsgroup: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    extensionTypeButton: {
        borderWidth: 1,
        borderColor: Colors.componentMenuButtons,
        padding: 5,
        elevation: 5,
        ...Buttons.medium,
    },
    extensionBtnText: {
        padding: 3,
        textAlign: 'center',
        ...Typography.medium,
    },
    divider: {
        padding: 10,
        paddingLeft: 5,
        marginBottom: 10,
        marginLeft: 10,
    },
});

export default DraggableComponentsMenu;
