import React, { useContext, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    ToastAndroid,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';
import { Buttons, Colors, Icons, Typography } from '../../styles/index';
import draggables from './draggableObjectPaths';
import { isSmallScreen, USER_KEYS } from '../helpers';

const numberOfColumns = isSmallScreen() ? 6 : 7;

/**
 * This component shows a modal where the user can choose which draggable objects
 * is to be available in the sketch screens.
 * @namespace OptionPicker
 * @category SettingsComponents
 * @prop {object} modalVisible Hook with boolean and functions for it
 *
 */
const OptionPicker = React.memo((props) => {
    const { modalVisible } = props;
    const appContext = useContext(AppContext);
    const allKeys = Object.keys(draggables);

    const [selectedImages, setSelectedImages] = useState(
        JSON.parse(appContext.draggableObjects)
    );
    const [warningShow, setWarningShow] = useState(false);
    const [imageButtonSize, setImageButtonSize] = useState(50);

    /**
     * Save the settings to asyncStorage
     * and make modal go away/invisible.
     * @memberof OptionPicker
     */
    const saveSelectedtDraggables = useCallback(() => {
        appContext.saveNewSettings(
            JSON.stringify(selectedImages),
            appContext.setDraggableObjects,
            USER_KEYS.DRAGGABLE_OBJECTS
        );

        ToastAndroid.show(
            'Valgte drabare elementer har blitt oppdatert',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );

        modalVisible.onToggle();
    });

    /**
     * Update which images that are selected in the modal view.
     * Can be selected or unselected.
     * @memberof OptionPicker
     * @param {string} newValue The source key of selected image
     */
    const updateSelectedImages = (newValue) => {
        if (warningShow) setWarningShow(false);

        if (selectedImages[newValue]) {
            const copyArray = { ...selectedImages };
            delete copyArray[newValue]; //delete an item from our object of paths
            setSelectedImages(copyArray);
        } else {
            if (Object.keys(selectedImages).length >= 15) {
                setWarningShow(true); //Show warning because  max limit is 15
            } else {
                const pair = {}; //make the keypair to put into a shallow copy array
                pair[newValue] = draggables[newValue];
                const copyArray = { ...selectedImages, ...pair };
                setSelectedImages(copyArray);
            }
        }
    };

    /**
     * Function to get the width and height of the modal.
     * Sets the width and height of the imageButtons in the modal so that they fit in the modal.
     * @memberof OptionPicker
     * @param {object} layout X-position, Y-position, width and height of the view
     */
    const onLayout = (layout) => {
        const { x, y, width, height } = layout;

        // Calculate the padding around the imageButtons
        const padding = width * 0.05;

        const imgSize = (width - padding) / numberOfColumns - 10;
        setImageButtonSize(imgSize);
    };

    /**
     * Close the modal and don't save the state of selected values.
     * @memberof OptionPicker
     */
    const closeModalWithoutSave = useCallback(() => {
        modalVisible.onToggle();
        setSelectedImages(JSON.parse(appContext.draggableObjects));
    });

    /**
     * This defines fhe clickable images of the draggable objects the user can choose between.
     * Is displayed in a flatlist in the modal.
     * @memberof OptionPicker
     * @returns A clickable image of the draggable
     */
    const renderItem = ({ item, index }) => {
        const selected = selectedImages[item] != null ? true : false;
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                style={[
                    selected ? styles.selectedImageButton : styles.imageButton,
                    {
                        height: imageButtonSize,
                        width: imageButtonSize,
                    },
                ]}
                onPress={() => updateSelectedImages(item)}>
                <Image
                    source={draggables[item].source}
                    style={styles.image}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
        );
    };

    const keyExtractor = (item, index) => item + index.toString();

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible.isOpen}
                onRequestClose={() => {
                    modalVisible.onToggle();
                }}>
                <TouchableWithoutFeedback
                    onPress={() => closeModalWithoutSave()}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View
                                style={styles.modalView}
                                onLayout={(event) =>
                                    onLayout(event.nativeEvent.layout)
                                }>
                                <View style={styles.modalTopView}>
                                    <Text style={styles.modalText}>
                                        Velg opptil 15 elementer som kan brukes
                                        på tegneskjermen
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.closeIcon}
                                        onPress={() => closeModalWithoutSave()}>
                                        <Icon
                                            name={'times'}
                                            size={Icons.medium}
                                            color={Colors.icons}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {warningShow && (
                                    <View style={styles.warningContainer}>
                                        <Text style={styles.warningText}>
                                            Du kan ikke velge mer enn 15 ikoner
                                            samtidig. Du kan trykke på valgte
                                            ikoner for å fjerne de.
                                        </Text>
                                    </View>
                                )}

                                <FlatList
                                    data={allKeys}
                                    style={styles.flatList}
                                    keyExtractor={keyExtractor}
                                    initialNumToRender={10}
                                    renderItem={renderItem}
                                    numColumns={numberOfColumns}
                                />

                                <View style={styles.buttonGroup}>
                                    <Pressable
                                        style={[
                                            styles.button,
                                            styles.buttonDeselect,
                                        ]}
                                        onPress={() => setSelectedImages({})}>
                                        <Text style={styles.buttonText}>
                                            Avmarker alt
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={[
                                            styles.button,
                                            styles.buttonSave,
                                        ]}
                                        onPress={() =>
                                            saveSelectedtDraggables()
                                        }>
                                        <Text style={styles.buttonText}>
                                            Lagre
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
});

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: '4%',
        justifyContent: 'space-evenly',
    },
    modalView: {
        backgroundColor: Colors.modalBg,
        padding: '2.5%',
        paddingVertical: '3%',
        alignItems: 'center',
        elevation: 10,
        borderRadius: 10,
    },
    modalTopView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: Colors.dividerPrimary,
    },
    modalText: {
        flex: 1,
        marginBottom: '3%',
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap',
        paddingHorizontal: '1%',
        color: Colors.modalText,
        ...Typography.section,
    },
    closeIcon: {
        paddingHorizontal: '1%',
    },
    warningContainer: {
        width: '85%',
        padding: '2%',
        backgroundColor: Colors.warning,
        textAlign: 'center',
        marginBottom: 15,
        ...Buttons.rounded,
    },
    warningText: {
        color: Colors.textPrimary,
        textAlign: 'center',
        ...Typography.body,
    },
    flatList: {
        marginVertical: '4%',
    },
    imageButton: {
        margin: 5,
        padding: '1.5%',
    },
    selectedImageButton: {
        margin: 5,
        padding: '1.5%',
        borderColor: Colors.selectedBorder,
        borderWidth: 5,
        borderRadius: 5,
        backgroundColor: Colors.selectedBorder,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        padding: 10,
        elevation: 2,
        width: isSmallScreen() ? '35%' : '30%',
        ...Buttons.rounded,
    },
    buttonText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        ...Typography.button,
    },
    buttonSave: {
        backgroundColor: Colors.modalButtonSave,
    },
    buttonDeselect: {
        backgroundColor: Colors.modalButtonDeselect,
    },
});

export default OptionPicker;
