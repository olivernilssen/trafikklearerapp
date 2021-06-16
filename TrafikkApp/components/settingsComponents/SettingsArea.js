import React, { useContext, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import USER_KEYS from '../helpers/storageKeys';
import AppContext from '../../AppContext';
import { Buttons, Colors, Typography } from '../../styles/index';
import { ButtonGroup, Divider } from '../reusableComponents';
import OptionPicker from './OptionPicker';
import { isSmallScreen } from '../helpers';

/**
 * The area component for the SettingsScreen. This component contains all the components
 * related to the settings screen. This is the view for the settings screen, and it also takes in data from
 * AppContext and has arrays for possible values for the different settings.
 * @namespace SettingsArea
 * @category SettingsComponents
 */
const SettingsArea = React.memo((props) => {
    const { pickerVisible } = props;

    // Width of buttonGroups
    const buttonGroupWidth = isSmallScreen() ? 170 : 300;
    const buttonGroupHeight = isSmallScreen() ? 40 : 45;
    const myContext = useContext(AppContext);

    const onDelChangeValues = ['Ja', 'Nei'];
    const penColorValues = [
        '#20303c', // dark blue
        '#0040ff', // blue
        '#00f5ff', // light blue
        '#00ff92', // green
        '#ffeb00', // yellow
        '#ff9200', // orange
        '#ff676d', // red
        '#ff4ce4', // purple
    ];
    const eraserSizeValues = ['50', '60', '70', '80', '90', '100'];
    const draggableColorValues = [
        '#000000', // black
        '#ffe525', // yellow
        '#ffffff', // white
        '#00f5ff', // blue
        '#1dff4e', // green
    ];
    // const themeValues = ['Mørk', 'Lys'];

    /**
     * Function to handle changing of a value in settings.
     * It also launches a toast on the screen to let the user know
     * that the change has been saved.
     *
     * @memberof SettingsArea
     * @function
     * @param {string} type The name of the settings that is changed
     * @param {string} value The value to update the storage key to
     * @param {function} setValue The state set function associated with this value
     * @param {string} key The asyncStorage key for this value to update it
     */
    const onChangeValue = useCallback((type, value, setValue, key) => {
        myContext.saveNewSettings(value, setValue, key);
        ToastAndroid.show(
            type + ' har blitt endret til ' + value,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    });

    return (
        <View style={styles.view}>
            {/* MODAL */}
            <OptionPicker modalVisible={pickerVisible} />

            {/* CHANGE THEME COLORS */}
            {/* <View style={styles.rowView}>
                <Text style={styles.leftColumn}>Fargetema:</Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.theme}
                        values={themeValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                'Temafarge',
                                newValue,
                                myContext.setTheme,
                                USER_KEYS.THEME_KEY
                            )
                        }
                        width={buttonGroupWidth}
                        height={buttonGroupHeight}
                    />
                </View>
            </View> */}
            {/* <Divider borderColor={Colors.headerBg} /> */}

            {/* DELETE EVERYTHING ON ILLUSTRASTION CHANGE */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>
                    Slette alt ved illustrasjonsbytte:
                </Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.deleteOnChange}
                        values={onDelChangeValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                'Slett illustrasjon',
                                newValue,
                                myContext.setDeleteOnChange,
                                USER_KEYS.DELETE_KEY
                            )
                        }
                        width={buttonGroupWidth}
                        height={buttonGroupHeight}
                    />
                </View>
            </View>
            <Divider borderColor={Colors.headerBg} />

            {/* PEN INITAL COLOR */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>Innledende farge på penn:</Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.penColor}
                        values={penColorValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                'Innledende pennfarge',
                                newValue,
                                myContext.setPenColor,
                                USER_KEYS.PEN_COLOR_KEY
                            )
                        }
                        width={buttonGroupWidth}
                        height={buttonGroupHeight}
                        isColorOption={true}
                    />
                </View>
            </View>
            <Divider borderColor={Colors.headerBg} />

            {/* DRAGGABLE INITAL COLOR */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>
                    Innledende farge på drabare elementer:
                </Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.draggableColor}
                        values={draggableColorValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                'Innledende drabarfarge',
                                newValue,
                                myContext.setDraggableColor,
                                USER_KEYS.DRAGGABLE_COLOR_KEY
                            )
                        }
                        width={buttonGroupWidth}
                        height={buttonGroupHeight}
                        isColorOption={true}
                    />
                </View>
            </View>
            <Divider borderColor={Colors.headerBg} />

            {/* STANDARD SIZE OF ERASER */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>Viskelærstørrelse: </Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.eraserSize}
                        values={eraserSizeValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                'Viskelær størrelse',
                                newValue,
                                myContext.setEraserSize,
                                USER_KEYS.ERASER_SIZE_KEY
                            )
                        }
                        width={buttonGroupWidth}
                        height={buttonGroupHeight}
                    />
                </View>
            </View>
            <Divider borderColor={Colors.headerBg} />

            {/* DRAGGABLES ELEMENTS SELECTION */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>
                    Drabare elementer velger (max 15):
                </Text>
                <View style={styles.rightColumn}>
                    <TouchableOpacity
                        style={styles.modalButton}
                        activeOpacity={0.6}
                        onPress={() => pickerVisible.onToggle()}>
                        <Text style={styles.buttonText}>Åpne velger</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 30,
        justifyContent: 'space-evenly',
    },
    rowView: {
        width: '100%',
        flexDirection: 'row',
    },
    leftColumn: {
        color: Colors.textPrimary,
        justifyContent: 'flex-start',
        flex: 1,
        textAlignVertical: 'center',
        paddingRight: 10,
        ...Typography.body,
    },
    rightColumn: {
        flex: 0,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    modalButton: {
        backgroundColor: Colors.modalButton,
        padding: '6%',
        ...Buttons.rounded,
    },
    buttonText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        ...Typography.button,
    },
});

export default SettingsArea;
