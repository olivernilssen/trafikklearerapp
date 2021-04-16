import React, { useState, useContext, useEffect, useCallback } from 'react';
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
import { ButtonGroup, Divider } from '../reusableComponents/';
import OptionPicker from './OptionPicker';

/**
 * The view for the settings screen. It takes in data from
 * AppContext and has arrays for possible values for the different settings
 * @namespace SettingsView
 * @category SettingsComponents
 */
const SettingsView = React.memo((props) => {
    const { pickerVisible, setPickerVisible } = props;

    const myContext = useContext(AppContext);
    // const [pickerVisible, setPickerVisible] = useState(false);

    const onDelChangeValues = ['Ja', 'Nei'];
    const penColorValues = [
        '#20303C',
        '#3182C8',
        '#00AAAF',
        '#00A65F',
        '#E2902B',
        '#D9644A',
        '#CF262F',
        '#8B1079',
    ];
    const eraserSizeValues = ['50', '60', '70', '80', '90', '100'];
    const draggableColorValues = [
        '#000000',
        '#e09f3e',
        '#9e2a2b',
        '#284b63',
        '#3a5a40',
    ];
    const themeValues = ['Mørk', 'Lys'];

    /**
     * Function to handle changing a value in settings
     * it also launches a toast on the screen to let the user know
     * that the change has been saved
     * @memberof SettingsView
     * @param {string} type the name of the settings that is changed
     * @param {string} value the value to update the storage key to
     * @param {function} setValue the state set function associated with this value
     * @param {string} key the asyncStorage key for this value to update it
     */
    const onChangeValue = useCallback((type, value, setValue, key) => {
        myContext.saveNewSettings(value, setValue, key);
        ToastAndroid.show(
            type + 'har blitt endret til ' + value,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    });

    return (
        <View style={styles.view}>
            <OptionPicker
                modalVisible={pickerVisible}
                setModalVisible={setPickerVisible}
            />
            {/* CHANGE THEME COLORS */}
            <View style={styles.rowView}>
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
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
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
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
                    />
                </View>
            </View>
            <Divider borderColor={Colors.headerBg} />
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
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
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
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
                        isColorOptions={true}
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
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
                        isColorOptions={true}
                    />
                </View>
            </View>
            <Divider borderColor={Colors.headerBg} />
            {/* DRAGGABLE INITAL COLOR */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>
                    Drabare elementer velger (max 20):
                </Text>
                <View style={styles.rightColumn}>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setPickerVisible(!pickerVisible)}>
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
        ...Typography.body,
    },
    rightColumn: {
        flex: 0,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    modalButton: {
        backgroundColor: Colors.modalButtonSave,
        padding: 15,
        ...Buttons.rounded,
    },
    buttonText: {
        color: Colors.textSecondary,
        ...Typography.button,
    },
});

export default SettingsView;
