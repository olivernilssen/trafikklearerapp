import React, { useState, useCallback, useEffect } from 'react';
import { Modal, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { DraggableMenu } from './draggableMenu';
import MappingDraggables from './MappingDraggables';
import { Colors, Typography } from '../../styles';
import { Divider } from '../reusableComponents';

/**
 * This components collects all the draggable components into one.
 * The components contains the list of draggables, the draggables object, the draggable menu
 * and the dropzone area.
 * @namespace DraggablesWithMenu
 * @category DraggableComponents
 * @prop {boolean} topMenuOpen If the topMenu is open or not in view
 * @prop {array[]} draggables list of all draggables in view
 * @prop {function} setDraggables Function to update the draggables array
 * @prop {array[]} actionList List of all actions taken (drawing or adding draggables)
 * @prop {function} setActionList Update the actionList (add or remove)
 * @prop {int} deletingItemId Integer to let the component know which draggable to delete
 * @prop {string} name Name of the drawing view ('veikryss'... etc)
 * @prop {string} extensionType Information about which extension is being used ("gangfelt", "sykkelfelt", etc)
 * @prop {function} setExtensionType Update the extension type used
 */
const DraggablesWithMenu = React.memo((props) => {
    //States from props
    const {
        topMenuOpen,
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
     * Adds a new draggable to the array draggables.
     * Also adds this value to the actionList to be used
     * when the user presses the undo button.
     * @memberof DraggablesWithMenu
     * @param {string} itemSrc Image source of the draggable to add
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
     * Function to remove an item from the list draggables.
     * Filters the list according to the provided itemID.
     * Also filteres the actionList the same way.
     * @memberof DraggablesWithMenu
     * @param {int} itemId The id of the draggable to be removed
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
                            Du kan ikke legge til flere enn 5 elementer på
                            skjermen samtidig.
                        </Text>
                        <Text style={styles.modalText}>
                            Hold inne på et element for å slette det eller slett
                            alt gjennom søppelkasse-ikonet i menyen.
                        </Text>

                        <Divider
                            borderColor={Colors.dividerPrimary}
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

            <MappingDraggables
                draggables={draggables}
                setDraggables={setDraggables}
                onRemoveItem={onRemoveItem}
            />

            <DraggableMenu
                topMenuOpen={topMenuOpen}
                onNewDraggable={onNewDraggable}
                extensionType={extensionType}
                setExtensionType={setExtensionType}
                name={name}
            />
        </>
    );
});

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalView: {
        backgroundColor: Colors.sketchBackground,
        borderRadius: 10,
        padding: '2%',
        justifyContent: 'space-between',
        elevation: 5,
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalTitle: {
        margin: 5,
        fontWeight: 'bold',
        color: Colors.icons,
        ...Typography.section,
    },
    modalText: {
        margin: 5,
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

export default DraggablesWithMenu;
