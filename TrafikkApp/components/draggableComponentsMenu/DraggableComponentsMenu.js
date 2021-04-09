import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';

import { Divider, ButtonGroup } from '../reusableComponents/';
import { DraggableComponents } from '.';
import { Colors, Typography } from '../../styles';

const extensionTypes = ['Gangfelt', 'O', 'Sykkelfelt'];

/**
 * Component for the draggable top menu, which displayes objects
 * that can be turned into draggables.
 * @namespace DraggableComponentsMenu
 * @category DraggableComponentsMenu
 * @prop {boolean} topMenuHidden bool to represent if top menu is hidden or not
 * @prop {function} onNewDraggable function to add new draggable
 * @prop {string} name Name of the view site
 * @prop {function} setExtensionType function to set the extension type for this view
 */
const DraggableComponentsMenu = React.memo(
    ({ topMenuHidden, onNewDraggable, name, setExtensionType }) => {
        const [yPosHidden, setYPosHidden] = useState(-200);
        const [bounceValue, setBounceValue] = useState(
            new Animated.Value(yPosHidden)
        );
        const [buttonValue, setButtonValue] = useState('O');

        /**
         * useEffect that is triggered when topMenuHidden
         * is changed. Will toggle the view of the top menu
         * @memberof DraggableComponentsMenu
         */
        useEffect(() => {
            toggleView();
        }, [topMenuHidden]);

        /**
         * Animates the topmenu in and out of view
         * @memberof DraggableComponentsMenu
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
                    speed: 6,
                    useNativeDriver: true,
                }).start();
            } else {
                Animated.spring(bounceValue, {
                    toValue: toValue,
                    bounciness: 1,
                    speed: 6,
                    useNativeDriver: true,
                }).start();
            }
        });

        /**
         * Get's the layout of the topmenu view
         * This is so we know how far down the object needs to
         * "slide" to be fully in view for the user
         * @memberof DraggableComponentsMenu
         * @param {dictionary} layout dictionary with information about the view layout
         */
        const getTopMenuLayout = (layout) => {
            const { x, y, width, height } = layout;
            setYPosHidden(-height);
        };

        /**
         * Triggered when the radiobuttons on the topmenu is
         * changed or clicked. Will set the value of the radiobutton
         * aswell as the extensiontype and to change backgroundImage
         * @memberof DraggableComponentsMenu
         * @param {String} value extenstiontype value
         */
        const extensionTypeChange = (value) => {
            if (value != 'Gangfelt' && value != 'Sykkelfelt') {
                setExtensionType('Vanlig');
                setButtonValue(value);
            } else {
                setExtensionType(value);
                setButtonValue(value);
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
                        <View style={styles.extensionSection}>
                            <View>
                                <Text style={styles.extensionText}>
                                    Tilvalg:
                                </Text>
                                <View style={styles.extensionButtonGroup}>
                                    <ButtonGroup
                                        selectedValue={buttonValue}
                                        values={extensionTypes}
                                        onSelect={(newValue) =>
                                            extensionTypeChange(newValue)
                                        }
                                        groupWidth={260}
                                        height={45}
                                        highlightBackgroundColor={
                                            Colors.componentMenuButtons
                                        }
                                        highlightTextColor={Colors.icons}
                                        inactiveBackgroundColor={
                                            Colors.componentMenuSection
                                        }
                                        inactiveTextColor={
                                            Colors.slideTextInactive
                                        }
                                        textSize={17}
                                    />
                                </View>
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
        width: '97%',
        height: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    extensionSection: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    extensionButtonGroup: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 5,
        marginLeft: 5,
    },
    extensionText: {
        color: Colors.icons,
        opacity: 0.6,
        textAlignVertical: 'center',
        paddingLeft: 15,
        ...Typography.label,
    },
    divider: {
        height: '100%',
        // padding: 10,
        paddingLeft: 5,
        paddingBottom: 5,
        marginBottom: 10,
        // marginLeft: 10,
    },
});

export default DraggableComponentsMenu;
