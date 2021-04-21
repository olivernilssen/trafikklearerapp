import React, { useState, useCallback, useEffect } from 'react';
import { Modal, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { DraggableComponentsMenu } from '../draggableComponentsMenu/';
import MappingDraggables from './MappingDraggables';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Typography, Icons } from '../../styles';
import { Divider } from '../reusableComponents';

/**
 * Collects all the draggable components into one.
 * Contains the list of draggables, the draggables object, the draggable menu
 * and the dropzone area.
 * @namespace DraggableWithEverything
 * @category Draggable
 * @prop {boolean} topMenuHidden If the topMenu is hidden or in view
 * @prop {array[]} draggables list of all draggables in view
 * @prop {function} setDraggables function to update draggables array
 * @prop {array[]} actionList list of all actions taken (drawing or adding draggables)
 * @prop {function} setActionList update the actionList (add or remove)
 * @prop {int} deletingItemId integer to let the component know which draggable to delete
 * @prop {string} name name of the drawing view ('veikryss'... etc)
 * @prop {string} extensionType information about which extension is being used ("gangfelt", "sykkelveit", etc)
 * @prop {function} setExtensionType update the extension type used
 */
const DraggableWithEverything = React.memo((props) => {
    //States from props
    const {
        topMenuHidden,
        draggables,
        setDraggables,
        actionList,
        setActionList,
        deletingItemId,
        name,
        extensionType,
        setExtensionType,
    } = props;

    const [modalVisible, setModalVisible] = useState(false);
    /**
     * useEffect that is triggered when deletingItemId is changed
     * Will delete according to this state's value
     */
    useEffect(() => {
        if (deletingItemId == null) return;
        onRemoveItem(deletingItemId);
    }, [deletingItemId]);

    //States and states from props
    const [counter, setCounter] = useState(0);

    /**
     * Adds a new draggable to the array draggables
     * also adds this value to the actionList to be used
     * when the user presses the undo button
     * @memberof DraggableWithEverything
     * @param {string} itemSrc image source of draggable to add
     */
    const onNewDraggable = useCallback((itemSrc) => {
        if (Object.keys(draggables).length >= 5) {
            setModalVisible(true);
        } else {
            const newDraggable = {
                id: counter,
                ...itemSrc,
            };

            setCounter(counter + 1);
            setDraggables([...draggables, newDraggable]);
            setActionList([...actionList, { id: counter, type: 'draggable' }]);
        }
    });

    /**
     * Function to remove an item from the list draggables
     * Filters the list according to the provided itemID
     * Also filteres the actionList the same way
     * @memberof DraggableWithEverything
     * @param {int} itemId
     */
    const onRemoveItem = (itemId) => {
        //Remove item from list of draggables
        const filtered = draggables.filter((item) => item.id !== itemId);
        setDraggables(filtered);

        //Remove this item also from the action list
        const filteredActionList = actionList.filter(
            (item) => item.id !== itemId
        );
        setActionList(filteredActionList);
    };

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.alertHeader}>
                            <Text style={styles.modalTitle}>Advarsel</Text>
                        </View>

                        <Text style={styles.modalText}>
                            Du kan ikke legge til flere enn 15 elementer på
                            skjermen samtidig. Hold inne på et element for å
                            slette det eller slett alt gjennom søppelkasse
                            ikonet på menyen.
                        </Text>

                        <Divider
                            borderColor={Colors.iconActive}
                            style={styles.divider}
                        />
                        <View style={styles.buttonsView}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                                activeOpacity={0.4}>
                                <Text style={styles.textStyle}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <DraggableComponentsMenu
                topMenuHidden={topMenuHidden}
                onNewDraggable={onNewDraggable}
                extensionType={extensionType}
                setExtensionType={setExtensionType}
                name={name}
            />

            <MappingDraggables
                draggables={draggables}
                setDraggables={setDraggables}
                onRemoveItem={onRemoveItem}
            />
        </>
    );
});

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalView: {
        maxWidth: 500,
        backgroundColor: Colors.sketchBackground,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
        elevation: 5,
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalTitle: {
        margin: 5,
        // textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.icons,
        ...Typography.section,
    },
    modalText: {
        margin: 5,
        // textAlign: 'center',
        color: Colors.icons,
        ...Typography.body,
    },
    checkboxContainer: {
        width: '50%',
        flexDirection: 'row',
        marginVertical: 5,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
        ...Typography.label,
    },
    divider: {
        marginVertical: 10,
        height: 1,
    },
    buttonsView: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 5,
    },
    textStyle: {
        color: Colors.alertButton,
        textAlign: 'center',
        ...Typography.button,
    },
});

export default DraggableWithEverything;
