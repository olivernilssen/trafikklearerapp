import React, { useState, useEffect } from 'react';
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
import {
    BottomMenuAnimated,
    Header,
    MainView,
} from '../components/reusableComponents/';
import { Colors } from '../styles';
import RoadSignModal from '../components/roadSignComponents/RoadSignModal';
import RoadSignMenuContent from '../components/roadSignComponents/RoadSignMenuContent';
// import signSource from '../components/roadSignComponents/signPath';
// import dangerSignDescription from '../assets/fareskiltBeskrivelse.js';
import {
    fareSkilt,
    // forbudsSkilt,
    // markeringsSkilt,
} from '../assets/sign_descriptions/';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const numColumns = 4;

/**
 * Screen component for sign screen
 * Langt fra ferdig!!!
 * @namespace RoadSignScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */

const RoadSignScreen = React.memo(({ navigation }) => {
    // const signObjectKeys = Object.keys(fareSkilt);
    const [modalVisible, setModalVisible] = useState(false);

    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const [signDescription, setSignDescription] = useState('');
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [signType, setSignType] = useState(fareSkilt);
    const [signObjectKeys, setSignObjectKeys] = useState(Object.keys(signType));
    const [selectedItem, setSelectedItem] = useState(signObjectKeys[0]);

    const handleModal = (item) => {
        setModalVisible(!modalVisible);
        setSelectedItem(item);
        // console.log(item);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // useEffect(() => {
    //     setSignObjectKeys(Object.keys(signType));
    // }, [signType]);

    // useEffect(() => {
    //     setSelectedItem(signObjectKeys[0]);
    // }, [signObjectKeys]);

    const handleSignType = (signTypeName) => {
        setSignType(signTypeName);
        setSelectedItem(Object.keys(signTypeName)[0]);
    };

    const handleDescription = (item) => {
        setSignDescription(item);
        setDescriptionVisible(!descriptionVisible);
    };

    const renderItem = ({ item, index }) => {
        // console.log({ item });
        return (
            <View>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        handleModal(item);
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            height: '100%',
                        }}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={signType[item].source}
                            resizeMode={'contain'}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <MainView>
            <TouchableWithoutFeedback onPress={() => closeModal()}>
                <View>
                    <RoadSignModal
                        closeModal={closeModal}
                        modalVisible={modalVisible}
                        handleDescription={handleDescription}
                        selectedSign={signType[selectedItem]}
                        signDescription={signDescription}
                        descriptionVisible={descriptionVisible}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Header name={'Skilt'} navigation={navigation} />
            </View>
            {/* <ScrollView>{imageMapper}</ScrollView> */}
            <FlatList
                data={Object.keys(signType)}
                extraData={signType}
                style={styles.imageContainer}
                keyExtractor={(item, index) => item + index.toString()}
                renderItem={renderItem}
                numColumns={4}></FlatList>
            <BottomMenuAnimated
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}>
                <RoadSignMenuContent handleSignType={handleSignType} />
            </BottomMenuAnimated>
        </MainView>
    );
});

const styles = StyleSheet.create({
    // container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageContainer: {
        flex: 1,
        marginVertical: 1,
        backgroundColor: Colors.sketchBackground,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width / numColumns - 3,
        margin: 1,
        height: Dimensions.get('screen').height / 7.5,
    },
    modalItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RoadSignScreen;
