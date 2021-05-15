import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Typography, Icons } from '../../styles';
import { Divider } from '../reusableComponents';
import DeviceInfo from 'react-native-device-info';
import IntentLauncher from 'react-native-intent-launcher';

/**
 * This is a component that pops up to alert the user to give the app permission to
 * use location data, to be able to use the map function on the MapScreen.
 * @namespace AlertPermissionModal
 * @category MapComponent
 * @prop {object} modalVisible If the modal is visible or not, plus functions to open and close it
 * @prop {function} checkUserPermission Checks if the user has allowed the app to access location data
 */
const AlertPermissionModal = React.memo(
    ({ modalVisible, checkUserPermission }) => {
        const pkg = DeviceInfo.getBundleId();

        /**
         * This function opens up the settings for this app
         * in a new activity and then checks if permission has been changed.
         * @memberof AlertPermissionModal
         */
        const openAppSettings = () => {
            if (Platform.OS === 'android') {
                IntentLauncher.startActivity({
                    action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
                    data: 'package:' + pkg,
                }).then(() => {
                    checkUserPermission();
                });
            }
        };

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible.isToggled}
                onRequestClose={() => modalVisible.onToggleFalse()}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.alertHeader}>
                            <Text style={styles.modalTitle}>Advarsel</Text>
                            <TouchableOpacity
                                onPress={() => modalVisible.onToggleFalse()}
                                activeOpacity={0.4}>
                                <Icon
                                    name="times"
                                    size={Icons.medium}
                                    color={Colors.alertButtonSecondary}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalText}>
                            For å få tilgang til lokasjonsdata må du gi
                            Illustrafikk tillatelse til å bruke dem, samt slå på
                            lokasjonsdata på enheten din.
                        </Text>

                        <Divider
                            borderColor={Colors.dividerPrimary}
                            style={styles.divider}
                        />
                        <View style={styles.buttonsView}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    modalVisible.onToggleFalse();
                                    openAppSettings();
                                }}
                                activeOpacity={0.4}>
                                <Text style={styles.textStyle}>
                                    Gå til system innstillinger
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => modalVisible.onToggleFalse()}
                                activeOpacity={0.4}>
                                <Text style={styles.textStyle}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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

export default AlertPermissionModal;
