import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    SectionList,
    Dimensions,
    Modal,
} from 'react-native';
import ImagePopup from './ImagePopup';
import BottomMenuAnimated from '../reusableComponents/BottomMenuAnimated';
const numColumns = 4;

const RoadSignModal = (props) => {
    const {
        closeModal,
        modalVisible,
        selectedSign,
        handleDescription,
        signDescription,
        descriptionVisible,
    } = props;
    console.log(selectedSign.beskrivelse);

    const textDescription = () => {
        if (descriptionVisible) {
            if (selectedSign.beskrivelse === '') {
                return (
                    <>
                        <Text style={styles.textStyle}>
                            {selectedSign.navn}
                        </Text>
                        <Text style={styles.textStyle}>Ingen beskrivelse</Text>
                    </>
                );
            } else {
                return (
                    <View>
                        <Text style={styles.textStyle}>
                            {selectedSign.navn}
                        </Text>
                        <Text style={styles.textStyle}>
                            {selectedSign.beskrivelse}
                        </Text>
                    </View>
                );
            }
        }
    };

    const imageHandler = () => {
        return (
            <>
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        resizeMode: 'contain',
                        top: '0%',
                    }}
                    source={selectedSign.source}
                />
            </>
        );
    };

    return (
        <View>
            <Modal
                style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    closeModal();
                }}>
                <TouchableWithoutFeedback onPress={() => closeModal()}>
                    <View style={styles.modal}>
                        <View
                            style={{
                                width: '80%',
                                height: '46%',
                                // justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                            <TouchableWithoutFeedback
                                style={{ backgroundColor: 'white' }}
                                // style={styles.modalItem}
                                onPress={() =>
                                    handleDescription(
                                        selectedSign.textDescription
                                    )
                                }>
                                <View style={{ backgroundColor: 'white' }}>
                                    {imageHandler()}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: '80%',
                                alignSelf: 'center',
                                justifyContent: 'flex-start',
                            }}>
                            {textDescription()}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    // container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageContainer: {
        flex: 1,
        marginVertical: 1,
        backgroundColor: 'grey',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width / numColumns - 3,
        margin: 1,
        height: Dimensions.get('screen').height / 7.5,
    },
    modal: {
        top: '7%',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        // backgroundColor: 'yellow',
    },
    modalItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
    },
});

export default RoadSignModal;
