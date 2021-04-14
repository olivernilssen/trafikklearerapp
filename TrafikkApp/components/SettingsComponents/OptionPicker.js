import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import USER_KEYS from '../helpers/storageKeys';
import AppContext from '../../AppContext';
import { Buttons, Colors, Icons, Typography } from '../../styles/index';
import draggables from './draggableObjectPaths';

/**
 * The view modal picker. This shows so the user can select
 * which traggable images they want visible in the drawing
 * board.
 * @namespace OptionPicker
 * @category SettingsComponents
 * @prop {boolean} modalVisible bool to determine if the modal is showing or not
 * @prop {function} setModalVisible function to set the value of the modal boolean
 *
 */
const OptionPicker = (props) => {
    const { modalVisible, setModalVisible } = props;
    const appContext = useContext(AppContext);
    const allKeys = Object.keys(draggables);

    const [selectedImages, setSelectedImages] = useState(
        JSON.parse(appContext.draggableObjects)
    );
    const [warningShow, setWarningShow] = useState(false);

    /**
     * Save the settings to asyncStorage
     * and make modal go away/invisible
     * @memberof OptionPicker
     */
    const saveSelectedtDraggables = () => {
        appContext.saveNewSettings(
            JSON.stringify(selectedImages),
            appContext.setDraggableObjects,
            USER_KEYS.DRAGGABLE_OBJECTS
        );

        setModalVisible(!modalVisible);
    };

    /**
     * Update which images that are selected in the modal view
     * can be selected or unselected
     * @memberof OptionPicker
     * @param {string} newValue the source key of selected image
     */
    const updateSelectedImages = (newValue) => {
        if (warningShow) setWarningShow(false);

        if (selectedImages[newValue]) {
            const copyArray = { ...selectedImages };
            delete copyArray[newValue]; //delete an item from our object of paths
            setSelectedImages(copyArray);
        } else {
            if (Object.keys(selectedImages).length >= 20) {
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
     * Close the modal and don't save the state of selected values
     * @memberof OptionPicker
     */
    const closeModalWithoutSave = () => {
        setModalVisible(!modalVisible);
        setSelectedImages(JSON.parse(appContext.draggableObjects));
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                {/* <TouchableWithoutFeedback
                    onPress={() => setModalVisible(!modalVisible)}> */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalTopView}>
                            <Text style={styles.modalText}>
                                Velg opp til 20 elementer som kan brukes på
                                tegneskjermen
                            </Text>
                            <TouchableOpacity
                                onPress={() => closeModalWithoutSave()}>
                                <Icon
                                    name={'times'}
                                    size={Icons.medium}
                                    color={Colors.textSecondary}
                                />
                            </TouchableOpacity>
                        </View>
                        {warningShow && (
                            <View style={styles.warningContainer}>
                                <Text style={styles.warningText}>
                                    Du kan ikke velge mer enn 20 ikoner
                                    samtidig. Du kan trykke på valgte ikoner for
                                    å fjerne de om du vil.
                                </Text>
                            </View>
                        )}
                        <View style={styles.containerView}>
                            {allKeys.map((source, i) => {
                                const selected =
                                    selectedImages[source] != null
                                        ? true
                                        : false;
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        activeOpacity={0.4}
                                        style={
                                            selected
                                                ? styles.selectedImageButton
                                                : styles.imageButton
                                        }
                                        onPress={() =>
                                            updateSelectedImages(source)
                                        }>
                                        <Image
                                            source={draggables[source].source}
                                            style={styles.image}
                                            resizeMode={'contain'}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <View style={styles.buttonGroup}>
                            <Pressable
                                style={[styles.button, styles.buttonDeselect]}
                                onPress={() => setSelectedImages({})}>
                                <Text style={styles.buttonText}>
                                    Avmarker alt
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonSave]}
                                onPress={() => saveSelectedtDraggables()}>
                                <Text style={styles.buttonText}>Lagre</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                {/* </TouchableWithoutFeedback> */}
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        flexDirection: 'column',
        // height: '100%',
        // width: '100%',
        padding: 30,
        justifyContent: 'space-evenly',
    },
    modalView: {
        backgroundColor: Colors.modalBg,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        elevation: 10,
        borderRadius: 20,
    },
    modalTopView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    modalText: {
        flex: 1,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap',
        color: Colors.modalText,
        ...Typography.section,
    },
    warningContainer: {
        width: '90%',
        padding: 20,
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
    containerView: {
        // flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 25,
        borderRadius: 20,
    },
    imageButton: {
        height: 75,
        width: 75,
        margin: 5,
        padding: 10,
    },
    selectedImageButton: {
        height: 75,
        width: 75,
        margin: 5,
        padding: 10,
        borderColor: Colors.selectedBorder,
        borderWidth: 5,
        borderRadius: 5,
        // backgroundColor: Colors.selectedBorder,
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
        width: '30%',
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
