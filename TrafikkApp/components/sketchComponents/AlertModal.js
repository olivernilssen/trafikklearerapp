import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    CheckBox,
} from 'react-native';
import { Colors, Typography, Icons } from '../../styles';
import { Divider } from '../reusableComponents';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AlertModal = React.memo(
    ({
        navigation,
        modalVisible,
        setModalVisible,
        hideAlert,
        setHideAlert,
        onOK,
    }) => {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.alertHeader}>
                                <Text style={styles.modalTitle}>Advarsel</Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
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
                                onPress={() => setHideAlert(!hideAlert)}>
                                <CheckBox
                                    value={hideAlert}
                                    onValueChange={setHideAlert}
                                    style={styles.checkbox}
                                    tintColors={
                                        hideAlert
                                            ? Colors.alertButton
                                            : Colors.alertButton
                                    }
                                />
                                <Text
                                    style={[
                                        styles.label,
                                        hideAlert
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
                                        setModalVisible(!modalVisible);
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
