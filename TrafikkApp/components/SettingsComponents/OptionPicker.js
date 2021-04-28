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
import USER_KEYS from '../helpers/storageKeys';
import AppContext from '../../AppContext';
import { Buttons, Colors, Icons, Typography } from '../../styles/index';
import draggables from './draggableObjectPaths';
import { RUtils } from 'react-native-responsive-component';

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
const OptionPicker = React.memo((props) => {
    const { modalVisible, setModalVisible } = props;
    const appContext = useContext(AppContext);
    const allKeys = Object.keys(draggables);

    const [selectedImages, setSelectedImages] = useState(
        JSON.parse(appContext.draggableObjects)
    );
    const [warningShow, setWarningShow] = useState(false);

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

        setModalVisible(!modalVisible);
    });

    /**
     * Update which images that are selected in the modal view.
     * Can be selected or unselected.
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
     * Close the modal and don't save the state of selected values.
     * @memberof OptionPicker
     */
    const closeModalWithoutSave = useCallback(() => {
        setModalVisible(!modalVisible);
        setSelectedImages(JSON.parse(appContext.draggableObjects));
    });

    const renderItem = ({ item, index }) => {
        const selected = selectedImages[item] != null ? true : false;
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                style={
                    selected ? styles.selectedImageButton : styles.imageButton
                }
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
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback
                    onPress={() => closeModalWithoutSave()}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
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
                                    // maxToRenderPerBatch={10}
                                    initialNumToRender={10}
                                    renderItem={renderItem}
                                    initialNumToRender={6}
                                    numColumns={RUtils.isSmallScreen() ? 6 : 7}
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
        // flexDirection: 'column',
        // height: '100%',
        // width: '100%',
        padding: '4%',
        // backgroundColor: 'red',
        justifyContent: 'space-evenly',
    },
    modalView: {
        backgroundColor: Colors.modalBg,
        padding: '2.5%',
        paddingVertical: '3%',
        alignItems: 'center',
        elevation: 10,
        borderRadius: 15,
    },
    modalTopView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    modalText: {
        flex: 1,
        marginBottom: '3%',
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap',
        color: Colors.modalText,
        ...Typography.section,
    },
    closeIcon: {
        paddingHorizontal: '1%',
    },
    warningContainer: {
        width: '90%',
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
        height: RUtils.isSmallScreen() ? 45 : 90,
        width: RUtils.isSmallScreen() ? 45 : 90,
        margin: 5,
        padding: '1.5%',
    },
    selectedImageButton: {
        height: RUtils.isSmallScreen() ? 45 : 90,
        width: RUtils.isSmallScreen() ? 45 : 90,
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
        width: RUtils.isSmallScreen() ? '35%' : '30%',
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
