import React, { useContext } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import USER_KEYS from '../helpers/storageKeys';
import AppContext from '../../AppContext';
import { Colors } from '../../styles/index';
import ButtonGroup from '../reusableComponents/ButtonGroup';

/**
 * The view for the settings screen. It takes in data from
 * AppContext and has arrays for possible values for the different settings
 * @namespace SettingsComponents
 * @memberof SettingsView
 */
const SettingsView = () => {
    const myContext = useContext(AppContext);
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
     * @memberof SettingsComponents.SettingsView
     * @param {string} type the name of the settings that is changed
     * @param {string} value the value to update the storage key to
     * @param {function} setValue the state set function associated with this value
     * @param {string} key the asyncStorage key for this value to update it
     */
    const onChangeValue = (type, value, setValue, key) => {
        myContext.saveNewSettings(value, setValue, key);
        ToastAndroid.show(
            type + 'har blitt endret til ' + value,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    };

    return (
        <View style={styles.view}>
            {/* CHANGE THEME COLORS */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>Tema farger:</Text>
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

            {/* STANDARD SIZE OF ERASER */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>Viskelær størrelse: </Text>
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

            {/* PEN INITAL COLOR */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>Innledende farge på pen:</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 30,
        borderColor: 'black',
        justifyContent: 'space-evenly',
    },
    rowView: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: 'gray',
        color: 'white',
        fontSize: 25,
        width: '100%',
    },
    leftColumn: {
        color: Colors.textPrimary,
        justifyContent: 'flex-start',
        flex: 1,
        fontSize: 25,
        fontWeight: '300',
    },
    rightColumn: {
        flex: 0,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
});

export default SettingsView;
