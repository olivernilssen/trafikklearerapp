import React, { useContext } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import USER_KEYS from '../helpers/storageKeys';
import AppContext from '../../AppContext';
import { Colors } from '../../styles/index';

/**
 * The view for the settings screen. It takes in data from
 * AppContext and has arrays for possible values for the different settings
 * @namespace SettingsComponents
 * @memberof SettingsView
 * @props {boolean} modalVisible bool to determine if the modal is showing or not
 *
 */
const OptionPicker = (props) => {
    const { modalVisible, setModalVisible } = props;
    // const myContext = useContext(AppContext);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 30,
        borderColor: 'black',
        justifyContent: 'space-evenly',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default OptionPicker;
