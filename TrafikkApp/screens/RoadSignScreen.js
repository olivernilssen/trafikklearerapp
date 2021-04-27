import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Text,
} from 'react-native';
import {
    BottomMenuAnimated,
    Header,
    MainView,
} from '../components/reusableComponents/';
import { Colors, Typography } from '../styles';
import RoadSignModal from '../components/roadSignComponents/RoadSignModal';
import RoadSignMenuContent from '../components/roadSignComponents/RoadSignMenuContent';
import { fareSkilt } from '../assets/sign_descriptions/';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [signType, setSignType] = useState(fareSkilt);
    const [signObjectKeys, setSignObjectKeys] = useState(Object.keys(signType));
    const [selectedItem, setSelectedItem] = useState(signObjectKeys[0]);
    const [activeTypeID, setActiveTypeID] = useState(0);
    const [activeSignTypeName, setActiveSignTypeName] = useState('Fareskilt');

    const handleModal = (item) => {
        setModalVisible(!modalVisible);
        setSelectedItem(item);
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

    const handleActiveButton = (value) => {
        setActiveTypeID(value);
    };

    const handleBottomSheet = (value) => {
        setBottomSheetHidden(value);
    };

    const handleHeaderName = (value) => {
        setActiveSignTypeName(value);
    };

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        handleModal(item);
                        handleBottomSheet(true);
                    }}>
                    <View
                        style={{
                            backgroundColor: Colors.sketchBackground,
                            width: '100%',
                            height: '100%',
                            borderWidth: 1,
                            borderColor: Colors.dividerPrimary,
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
                        selectedSign={signType[selectedItem]}
                        selectedSignCode={selectedItem}
                        handleBottomSheet={handleBottomSheet}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Header navigation={navigation} style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.siteHeading}>Trafikkskilt</Text>
                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>
                                {activeSignTypeName}
                            </Text>
                        </View>
                    </View>
                </Header>
            </View>
            <FlatList
                data={Object.keys(signType)}
                extraData={signType}
                style={styles.imageContainer}
                keyExtractor={(item, index) => item + index.toString()}
                renderItem={renderItem}
                numColumns={4}></FlatList>
            <BottomMenuAnimated
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}
                chevronColor={Colors.icons}>
                <RoadSignMenuContent
                    handleSignType={handleSignType}
                    setBottomSheetHidden={setBottomSheetHidden}
                    setActiveTypeID={setActiveTypeID}
                    activeTypeID={activeTypeID}
                    handleActiveButton={handleActiveButton}
                    handleHeaderName={handleHeaderName}
                />
            </BottomMenuAnimated>
        </MainView>
    );
});

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    headerContent: {
        // flex: 1,
        height: '100%',
        width: '93%',
        flexDirection: 'row',
    },
    imageContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: Colors.sketchBackground,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        width: Dimensions.get('screen').width / numColumns - 3,
        height: Dimensions.get('screen').height / 7.5,
    },
    mainHeading: {
        flex: 1,
        textAlignVertical: 'bottom',
        color: Colors.icons,
        ...Typography.heading,
    },
    modalItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    siteHeading: {
        flex: 1,
        color: Colors.icons,
        textAlignVertical: 'center',
        ...Typography.heading,
    },
    subHeading: {
        flex: 1,
        textAlignVertical: 'center',
        color: Colors.icons,
        opacity: 0.7,
        ...Typography.section,
    },
    // subHeadingContainer: {
    //     // flex: 1,
    //     alignItems: 'flex-end',
    // },
});

export default RoadSignScreen;
