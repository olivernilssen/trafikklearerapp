import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SectionList,
    Dimensions,
    Modal,
} from 'react-native';
import ImagePopup from './ImagePopup';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// import RoadSignModal from '../components/roadSignComponents/RoadSignModal';
// // import signSource from '../components/roadSignComponents/signPath';
// // import dangerSignDescription from '../assets/fareskiltBeskrivelse.js';
const numColumns = 4;

const RoadSignModal = ({ props }) => {
    const { closeModal, modalVisible, selectedItem } = props;
    console.log(closeModal);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                closeModal();
            }}>
            <View style={styles.modal}>
                <TouchableOpacity
                    // style={styles.modalItem}
                    onPress={() => closeModal()}>
                    {/* <Image
                        key={index}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                        source={fareSkilt[selectedItem].source}
                    /> */}
                    <ImagePopup selectedItem={selectedItem} />
                </TouchableOpacity>
            </View>
        </Modal>
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
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    modalItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RoadSignModal;
