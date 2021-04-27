import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

import { Colors, Typography, Buttons, Icons } from '../../styles';

const { Popover } = renderers;

/**
 * A button for clearing the sketch screen, drops down a button for confirmation.
 * @namespace DeleteButtonPopover
 * @category SketchHeaderComponents
 * @prop {object} propsStyle StyleSheet
 * @prop {function} clearCanvas Clears the canvas
 */

const DeleteButtonPopover = React.memo((props) => {
    const [isOpened, setOpened] = useState(false);

    const { propsStyle, clearCanvas } = props;

    /**
     * Clear canvas and close the "popover" modal.
     * @memberof DeleteButtonPopover
     */
    const clearButtonPressed = () => {
        clearCanvas();
        setOpened(false);
    };

    return (
        <View style={propsStyle}>
            <Menu
                renderer={Popover}
                rendererProps={{
                    preferredPlacement: 'bottom',
                    anchorStyle: {
                        backgroundColor: Colors.colorPaletteMenu,
                    },
                }}
                opened={isOpened}
                onBackdropPress={() => {
                    setOpened(false);
                }}>
                <MenuTrigger>
                    <TouchableOpacity
                        style={[
                            styles.buttonSize,
                            isOpened
                                ? styles.buttonActive
                                : styles.buttonInactive,
                        ]}
                        onPress={() => {
                            setOpened(true);
                        }}>
                        <Icon
                            name={'trash'}
                            size={Icons.medium}
                            solid
                            color={Colors.icons}
                        />
                    </TouchableOpacity>
                </MenuTrigger>

                <MenuOptions optionsContainerStyle={styles.menuOptions}>
                    <View style={styles.menuOptionsContainer}>
                        <TouchableOpacity
                            style={styles.deleteAllButton}
                            onPress={clearButtonPressed}>
                            <Text style={styles.deleteAllButtonText}>
                                Slett
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MenuOptions>
            </Menu>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 16,
        // paddingHorizontal: 16,
        marginHorizontal: '2%',
        ...Buttons.sketchHeaderButton,
    },
    buttonActive: {
        backgroundColor: Colors.deleteButtonActive,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: Colors.headerBg,
    },
    menuOptions: {
        height: 80,
        width: 100,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colors.colorPaletteMenu,
    },
    menuOptionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    deleteAllButton: {
        backgroundColor: Colors.deleteButtonActive,
        padding: 10,
        borderRadius: 10,
    },

    deleteAllButtonText: {
        color: Colors.textPrimary,
        ...Typography.button,
    },
});

export default DeleteButtonPopover;
