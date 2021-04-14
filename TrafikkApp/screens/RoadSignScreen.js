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
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header, MainView } from '../components/reusableComponents/';
import { Colors } from '../styles';
import RoadSignModal from '../components/roadSignComponents/RoadSignModal';
// import signSource from '../components/roadSignComponents/signPath';
// import dangerSignDescription from '../assets/fareskiltBeskrivelse.js';
import { fareSkilt, forbudsSkilt } from '../assets/sign_descriptions/';

const numColumns = 4;
const signObjectKeys = Object.keys(fareSkilt);
/**
 * Screen component for sign screen
 * Langt fra ferdig!!!
 * @namespace RoadSignScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */

const RoadSignScreen = ({ navigation }) => {
    // const signObjectKeys = Object.keys(fareSkilt);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState('100_1');

    const handleModal = (item) => {
        setModalVisible(!modalVisible);
        setSelectedItem(item);
        console.log(item);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // const onPressItem = (item) => {
    //     showModal(item);
    // };

    // const handleDescription = () => {
    //     setDescriptionVisible(!descriptionVisible);
    //     console.log('description');
    // };

    // const imagePopup = () => {
    //     if (selectedItem !== null) {
    //         return (
    //             <Image
    //                 key={index}
    //                 style={{
    //                     width: '100%',
    //                     height: '100%',
    //                     resizeMode: 'contain',
    //                 }}
    //                 source={fareSkilt[selectedItem].source}
    //             />
    //         );
    //     }
    // };

    // const signModal = ({ item, index }) => {
    //     console.log(index);
    //     return (
    //         <Modal
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //             onRequestClose={() => {
    //                 closeModal();
    //             }}>
    //             <View style={styles.modal}>
    //                 <TouchableOpacity
    //                     // style={styles.modalItem}
    //                     onPress={() => closeModal()}>
    //                     <Image
    //                         key={index}
    //                         style={{
    //                             width: '100%',
    //                             height: '100%',
    //                             resizeMode: 'contain',
    //                         }}
    //                         source={fareSkilt[selectedItem].source}
    //                     />
    //                     {imagePopup({ index })}
    //                 </TouchableOpacity>
    //             </View>
    //         </Modal>
    //     );
    // };

    const renderItem = ({ item, index }) => {
        console.log({ item });
        return (
            <View>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleModal(item)}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={fareSkilt[item].source}
                        resizeMode={'contain'}></Image>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <MainView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    closeModal();
                }}>
                <View style={styles.modal}>
                    <TouchableOpacity
                        // style={styles.modalItem}
                        onPress={() => closeModal()}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                            source={fareSkilt[selectedItem].source}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
            <View>
                <Header name={'Skilt'} navigation={navigation} />
            </View>
            {/* <ScrollView>{imageMapper}</ScrollView> */}
            <FlatList
                data={signObjectKeys}
                style={styles.imageContainer}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={4}></FlatList>
        </MainView>
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

export default RoadSignScreen;
