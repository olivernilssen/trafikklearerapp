import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Modal,
} from 'react-native';
import { Colors } from '../../styles';
import { Divider } from '../reusableComponents';
const numColumns = 4;

const RoadSignModal = (props) => {
    const {
        closeModal,
        modalVisible,
        selectedSign,
        handleDescription,
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
                        <Divider
                            style={{
                                width: '95%',
                                alignSelf: 'center',
                                padding: 10,
                            }}
                            borderColor={Colors.dividerSecondary}></Divider>
                        <Text style={styles.textStyle}>Ingen beskrivelse</Text>
                    </>
                );
            } else {
                return (
                    <View onStartShouldSetResponder={() => true}>
                        <ScrollView>
                            <Text style={styles.textStyle}>
                                {selectedSign.navn}
                            </Text>
                            <Divider
                                style={{
                                    width: '95%',
                                    alignSelf: 'center',
                                    padding: 10,
                                }}
                                borderColor={Colors.dividerSecondary}></Divider>
                            <Text style={styles.textStyle}>
                                {selectedSign.beskrivelse}
                            </Text>
                        </ScrollView>
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
                        <View style={styles.modalView}>
                            <View
                                style={{
                                    top: '15%',
                                    width: '80%',
                                    height: '46%',
                                    alignSelf: 'center',
                                }}>
                                <TouchableWithoutFeedback
                                    style={{ backgroundColor: 'white' }}
                                    onPress={() =>
                                        handleDescription(
                                            selectedSign.textDescription
                                        )
                                    }>
                                    <View
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}>
                                        {imageHandler()}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <View
                                    style={{
                                        top: '16%',
                                        width: '80%',
                                        alignSelf: 'center',
                                        maxHeight: '30%',
                                        backgroundColor:
                                            Colors.sketchBackground,
                                    }}>
                                    {textDescription()}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        marginVertical: 1,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width / numColumns - 3,
        margin: 1,
        height: Dimensions.get('screen').height / 7.5,
    },
    modal: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalView: {
        height: '80%',
        width: '80%',
        borderWidth: 5,
        borderColor: 'black',
        justifyContent: 'flex-start',
        backgroundColor: Colors.sketchBackground,
        borderRadius: 10,
    },
    modalItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: Colors.textPrimary,
        // fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
    },
});

export default RoadSignModal;
