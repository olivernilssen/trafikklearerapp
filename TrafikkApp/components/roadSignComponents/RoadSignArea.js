import React, { useState, useEffect, useRef } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { useOpen } from '../helpers/useOpen';
import { BottomMenuAnimated, Header, Overlay } from '../reusableComponents';
import { Colors, Typography } from '../../styles';
import RoadSignModal from './RoadSignModal';
import RoadSignMenuContent from './RoadSignMenuContent';
import { fareskiltData } from '../../assets/sign_descriptions';

const numColumns = 4;

/**
 * This is the component that contains all the components that are visible on the RoadSignScreen
 * @namespace RoadSignArea
 * @category RoadSignComponents
 * @prop {function} toggleDrawer Used for to toggle the drawer between the different screens
 */

const RoadSignArea = React.memo((props) => {
    const { toggleDrawer } = props;
    const modalVisible = useOpen(false);

    const bottomSheetHidden = useOpen(false);
    const [signType, setSignType] = useState(fareskiltData);
    const [signObjectKeys, setSignObjectKeys] = useState(Object.keys(signType));
    const [selectedItem, setSelectedItem] = useState(signObjectKeys[0]);
    const [activeSignTypeName, setActiveSignTypeName] = useState('Fareskilt');

    const flatListRef = useRef();
    /**
     * Handles the state of the modal, and sets the selectedSign state to the sign that has been presse.
     *@memberof RoadSignArea
     * @param {string} item signcode used for identifying the sign
     */
    const handleModal = (item) => {
        modalVisible.onOpen();
        setSelectedItem(item);
    };

    /**
     * Handles the change from one signtype to another
     * @memberof RoadSignArea
     * @param {object} signTypeName Object that contains sign- name, description and image source
     */
    const handleSignType = (signTypeName) => {
        setSignType(signTypeName);
        setSelectedItem(Object.keys(signTypeName)[0]);
    };

    /**
     * Handles the state of activeSignTypeName, is used for displaying the name of the chosen sign type
     * @memberof RoadSignArea
     * @param {string} headerName The name of the chosen signtype
     */
    const handleHeaderName = (headerName) => {
        setActiveSignTypeName(headerName);
    };

    /**
     * Uses the flatlist reference to scrol to top when chaning sign
     * @memberof RoadSignArea
     */
    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    };

    /** Key extractor for flastlist */
    const keyExtractor = (item, index) => item + index.toString();

    /**
     * Function to set the lenghth and offset of an item in the flatlist
     * @param {*} index index in the flatlist
     * @memberof RoadSignArea
     * @returns
     */
    const getItemLayout = (data, index) => ({
        length: Dimensions.get('screen').height / 7.5,
        offset: (Dimensions.get('screen').height / 7.5) * index,
        index,
    });

    /**
     * Used as a template for Flattlist, every item in the data it receives is passed on to this method
     * @memberof RoadSignArea
     * @param {string} item the sign code (example: 100_1)
     * @returns an image that will open a modal when pressed
     */
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        handleModal(item);
                        bottomSheetHidden.onOpen();
                    }}>
                    <View style={styles.modalImage}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={signType[item].thumbnail}
                            resizeMode={'contain'}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <Overlay showOverlay={bottomSheetHidden} />
            {/* <View style={styles.mainView}> */}
            <TouchableWithoutFeedback onPress={() => modalVisible.onClose()}>
                <RoadSignModal
                    modalVisible={modalVisible}
                    selectedSign={signType[selectedItem]}
                    selectedSignCode={selectedItem}
                />
            </TouchableWithoutFeedback>
            <View style={{ zIndex: 5, width: '100%' }}>
                <Header toggleDrawer={toggleDrawer} style={styles.header}>
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
            <View style={styles.flatlistContainer}>
                {/* LIST WITH ALL THE SIGNS */}
                <FlatList
                    ref={flatListRef}
                    data={Object.keys(signType)}
                    extraData={signType}
                    // style={styles.imageContainer}
                    contentContainerStyle={styles.flatlist}
                    keyExtractor={keyExtractor}
                    // maxToRenderPerBatch={10}
                    initialNumToRender={20}
                    renderItem={renderItem}
                    getItemLayout={getItemLayout}
                    numColumns={4}
                    persistentScrollbar={true}
                />
            </View>
            {/* </View> */}

            {/* BOTTOM MENU */}
            <BottomMenuAnimated
                bottomSheetHidden={bottomSheetHidden}
                chevronColor={Colors.icons}>
                <RoadSignMenuContent
                    handleSignType={handleSignType}
                    openBottomSheet={() => bottomSheetHidden.onOpen()}
                    handleHeaderName={handleHeaderName}
                    scrollToTop={scrollToTop}
                />
            </BottomMenuAnimated>
        </>
    );
});

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    headerContent: {
        height: '100%',
        width: '93%',
        flexDirection: 'row',
    },
    flatlistContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Colors.sketchBackground,
    },
    flatlist: {
        paddingBottom: '9%',
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
    modalImage: {
        backgroundColor: Colors.sketchBackground,
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: Colors.dividerPrimary,
    },
});

export default RoadSignArea;