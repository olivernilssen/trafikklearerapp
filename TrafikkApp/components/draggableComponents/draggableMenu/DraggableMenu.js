import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';

import { Divider, ButtonGroup } from '../../reusableComponents';
import Carousel from './Carousel';
import { Colors, Typography } from '../../../styles';
import AppContext from '../../../AppContext';
import { RUtils } from 'react-native-responsive-component';

const extensionTypes = ['Gangfelt', '-', 'Sykkelfelt'];

/**
 * Component that shows a top menu on the screens where the SketchArea component is used.
 * Displayes the Carousel containing the objects that can be turned into draggables.
 * Also displays the extension types (pedestrian crossing, bicycle lanes) for the traffic designs
 * on IntersectionScreen and RounaboutScreen.
 * @namespace DraggableMenu
 * @category DraggableComponents
 * @subcategory DraggableMenu
 * @prop {boolean} topMenuOpen Boolean to represent if the top menu is hidden or not
 * @prop {function} onNewDraggable Function to add a new draggable
 * @prop {string} name Name of the screen
 * @prop {function} setExtensionType Function to set the extension type for this view
 */
const DraggableMenu = React.memo(
    ({ topMenuOpen, onNewDraggable, name, setExtensionType }) => {
        // The position and animation value of the top menu
        const [yPosHidden, setYPosHidden] = useState(-200);
        const [bounceValue, setBounceValue] = useState(
            new Animated.Value(yPosHidden)
        );

        const [buttonValue, setButtonValue] = useState('-');
        const buttonGroupWidth = RUtils.isSmallScreen() ? 200 : 230;
        const buttonGroupHeight = RUtils.isSmallScreen() ? 40 : 45;

        // Maps through the draggables to be displayed, saves this to an array objectKeys
        const appContext = useContext(AppContext);
        const objects = JSON.parse(appContext.draggableObjects);
        const objectKeys = Object.keys(objects);

        /**
         * @memberof DraggableMenu
         * @typedef {function} useEffect
         * @description useEffect that is triggered when topMenuOpen is changed.
         * Will toggle and animate the the top menu in and out of view.
         */
        useEffect(() => {
            var toValue = 0;

            if (!topMenuOpen.isOpen) {
                toValue = yPosHidden;
            }

            Animated.timing(bounceValue, {
                toValue: toValue,
                useNativeDriver: true,
            }).start();
        }, [topMenuOpen.isOpen]);

        /**
         * Gets the layout of the top menu view.
         * This is so we know how far down the object needs to
         * "slide" to be fully in view for the user.
         * @memberof DraggableMenu
         * @param {dictionary} layout Dictionary with information about the view layout
         */
        const getTopMenuLayout = (layout) => {
            const { x, y, width, height } = layout;
            setYPosHidden(-height);
        };

        /**
         * Triggered when the buttons in the button group on the topmenu is
         * changed or clicked. Will set the selected button of the button group
         * aswell as the extensiontype used to change backgroundImage of the sketch area.
         * @memberof DraggableMenu
         * @param {String} value Extenstiontype value
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

export default DraggableMenu;
