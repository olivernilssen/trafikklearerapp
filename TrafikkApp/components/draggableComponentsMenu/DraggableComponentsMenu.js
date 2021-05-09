import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';

import { Divider, ButtonGroup } from '../reusableComponents/';
import Carousel from './Carousel';
import { Colors, Typography } from '../../styles';
import AppContext from '../../AppContext';
import { RUtils } from 'react-native-responsive-component';

const extensionTypes = ['Gangfelt', '-', 'Sykkelfelt'];

/**
 * Component that shows a top menu on the screens using the SketchArea component.
 * Displayes objects that can be turned into draggables, and extension types
 * (pedestrian crossing, bicycle lanes) for the traffic designs.
 * @namespace DraggableComponentsMenu
 * @category DraggableComponentsMenu
 * @prop {boolean} topMenuHidden Bool to represent if the top menu is hidden or not
 * @prop {function} onNewDraggable Function to add new draggable
 * @prop {string} name Name of the screen
 * @prop {function} setExtensionType Function to set the extension type for this view
 */
const DraggableComponentsMenu = React.memo(
    ({ topMenuHidden, onNewDraggable, name, setExtensionType }) => {
        const [yPosHidden, setYPosHidden] = useState(-200);
        const [bounceValue, setBounceValue] = useState(
            new Animated.Value(yPosHidden)
        );
        const [buttonValue, setButtonValue] = useState('-');
        const buttonGroupWidth = RUtils.isSmallScreen() ? 200 : 230;
        const buttonGroupHeight = RUtils.isSmallScreen() ? 40 : 45;

        const appContext = useContext(AppContext);
        const objects = JSON.parse(appContext.draggableObjects);
        const objectKeys = Object.keys(objects);

        /**
         * useEffect that is triggered when topMenuHidden
         * is changed. Will toggle the view of the top menu
         */
        useEffect(() => {
            toggleView();
        }, [topMenuHidden]);

        /**
         * Function that is triggered when the state topMenuHidden is changed.
         * Will animate the top menu in and out of view.
         * @memberof DraggableComponentsMenu
         */
        const toggleView = useCallback(() => {
            var toValue = 0;

            if (topMenuHidden) {
                toValue = yPosHidden;
            }
            if (!topMenuHidden) {
                Animated.timing(bounceValue, {
                    toValue: toValue,
                    useNativeDriver: true,
                }).start();
            } else {
                Animated.timing(bounceValue, {
                    toValue: toValue,
                    useNativeDriver: true,
                }).start();
            }
        });

        /**
         * Gets the layout of the topmenu view.
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
         * Triggered when the buttons in the button group on the topmenu is
         * changed or clicked. Will set the selected button of the button group
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
                                        width={buttonGroupWidth}
                                        height={buttonGroupHeight}
                                        highlightBackgroundColor={
                                            Colors.componentMenuButtons
                                        }
                                        highlightTextColor={Colors.icons}
                                        inactiveBackgroundColor={
                                            Colors.componentMenuSection
                                        }
                                    />
                                </View>
                            </View>
                            <Divider
                                style={styles.divider}
                                borderColor={Colors.componentMenuButtons}
                            />
                        </View>
                    )}

                    <Carousel
                        onNewDraggable={onNewDraggable}
                        objects={objects}
                        objectKeys={objectKeys}
                    />
                </View>
            </Animated.View>
        );
    }
);

const styles = StyleSheet.create({
    animatedView: {
        position: 'absolute',
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
        padding: '2%',
        marginLeft: '1%',
    },
    extensionText: {
        color: Colors.icons,
        opacity: 0.6,
        textAlignVertical: 'center',
        paddingLeft: 15,
        ...Typography.label,
    },
    divider: {
        height: '95%',
        paddingLeft: 5,
        paddingBottom: 5,
    },
});

export default DraggableComponentsMenu;
