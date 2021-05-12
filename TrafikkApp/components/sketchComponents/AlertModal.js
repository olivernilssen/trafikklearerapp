import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Typography, Icons } from '../../styles';
import { Divider } from '../reusableComponents';

/**
 * This is a component that pops up to alert the user that the drawing is set to be deleted.
 * @namespace AlertModal
 * @category SketchComponents
 * @prop {object} modalVisible If the modal is visible or not, plus functions to open, close it
 * @prop {boolean} alwaysHideAlert If the checkbox to never show alert again, is checked
 * @prop {function} setAlwaysHideAlert Changes the state alwaysHideAlert
 * @prop {function} onOK What to do when the 'OK' button in the Alert is triggered
 */
const AlertModal = React.memo(
    ({ modalVisible, alwaysHideAlert, setAlwaysHideAlert, onOK }) => {
        const navigation = useNavigation();
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible.isOpen}
                    onRequestClose={() => modalVisible.onToggle()}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.alertHeader}>
                                <Text style={styles.modalTitle}>Advarsel</Text>
                                <TouchableOpacity
                                    onPress={() => modalVisible.onToggle()}
                                    activeOpacity={0.4}>
                                    <Icon
                                        name="times"
                                        size={Icons.medium}
                                        color={Colors.alertButtonSecondary}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.modalText}>
                                Hvis du bytter bilde vil tegningen bli slettet.
                                Dette kan endres i innstillinger.
                            </Text>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                activeOpacity={0.4}
                                onPress={() =>
                                    setAlwaysHideAlert(!alwaysHideAlert)
                                }>
                                <CheckBox
                                    value={alwaysHideAlert}
                                    onValueChange={setAlwaysHideAlert}
                                    style={styles.checkbox}
                                    tintColors={
                                        alwaysHideAlert
                                            ? Colors.alertButton
                                            : Colors.alertButton
                                    }
                                />
                                <Text
                                    style={[
                                        styles.label,
                                        alwaysHideAlert
                                            ? { color: Colors.alertButton }
                                            : {
                                                  color:
                                                      Colors.alertButtonSecondary,
                                              },
                                    ]}>
                                    Ikke vis igjen
                                </Text>
                            </TouchableOpacity>
                            <Divider
                                borderColor={Colors.iconActive}
                                style={styles.divider}
                            />
                            <View style={styles.buttonsView}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        modalVisible.onToggle();
                                        navigation.navigate('SettingsScreen');
                                    }}
                                    activeOpacity={0.4}>
                                    <Text style={styles.textStyle}>
                                        Gå til innstillinger
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={onOK}
                                    activeOpacity={0.4}>
                                    <Text style={styles.textStyle}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
);

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

export default AlertModal;
