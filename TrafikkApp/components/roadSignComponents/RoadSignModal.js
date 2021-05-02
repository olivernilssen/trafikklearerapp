import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Animated,
    Modal,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Typography, Icons, Buttons } from '../../styles';
import { Divider } from '../reusableComponents';
import { RUtils } from 'react-native-responsive-component';

/**
 * @namespace RoadSignModal
 * @category RoadSignComponents
 * @prop {method} closeModal Method used for closing the modal
 * @prop {boolean} modalVisible State used for toggeling modal visability
 * @prop {object} selectedSign Contains name, description and image source of the chosen sign
 * @prop {string} selectedSignCode The sign code of the selected sign (example: 100_1)
 */
const RoadSignModal = React.memo((props) => {
    const { closeModal, modalVisible, selectedSign, selectedSignCode } = props;

    const [viewHeight, setViewHeight] = useState(new Animated.Value(300));
    const [showDescript, setShowDescript] = useState(false);
    const [imgHeight, setImgHeight] = useState(400);
    const [descriptionHeight, setDescriptionHeight] = useState(0);
    const [animationDone, setAnimationDone] = useState(false);
    const [maxHeightScroll, setMaxHeightScroll] = useState(250);

    /**
     * UseEffect that runs when modal pops up or goes away
     * sets the height of the modal to the image heigh
     * @memberof RoadSignModal
     */
    useEffect(() => {
        Animated.spring(viewHeight, {
            toValue: imgHeight + 100,
            useNativeDriver: false,
        }).start();

        setShowDescript(false);
    }, [modalVisible]);

    /**
     * UseEffect that runs when either image height, description height or show description changes
     * Changes the height of the modal
     * @memberof RoadSignModal
     */
    useEffect(() => {
        const heightModal = RUtils.isSmallScreen()
            ? imgHeight + 50
            : imgHeight + 100;

        Animated.spring(viewHeight, {
            toValue: showDescript
                ? descriptionHeight + heightModal
                : heightModal,
            useNativeDriver: false,
        }).start();

        setAnimationDone(!animationDone);
    }, [imgHeight, descriptionHeight, showDescript]);

    /**
     * SetLayout will run when the view of the modal is mounted
     * to get the correct size of the modal on the screen
     * @memberof RoadSignModal
     */
    const setLayout = useCallback((layout, type) => {
        const { height } = layout;
        if (type == 'image') {
            if (Math.floor(height) !== imgHeight) {
                if (height < 150) {
                    setMaxHeightScroll(400);
                } else {
                    setMaxHeightScroll(250);
                }
                setImgHeight(Math.floor(height));
            }
        } else if (type == 'description') {
            if (Math.floor(height) !== descriptionHeight)
                setDescriptionHeight(Math.floor(height));
        }
    });

    /**
     * @memberof RoadSignModal
     * @returns the title and description of the sign
     */
    const textDescription = () => {
        if (showDescript) {
            return (
                <View
                    onLayout={(event) => {
                        setLayout(event.nativeEvent.layout, 'description');
                    }}>
                    <Text style={styles.textStyle}>
                        {selectedSignCode.replace('_', '.')} {selectedSign.navn}
                    </Text>
                    <Divider
                        style={{
                            width: '95%',
                            alignSelf: 'center',
                            padding: '4%',
                        }}
                        borderColor={Colors.dividerPrimary}></Divider>
                    {selectedSign.beskrivelse != '' && (
                        <ScrollView>
                            <Text style={styles.textStyle}>
                                {selectedSign.beskrivelse}
                            </Text>
                        </ScrollView>
                    )}
                </View>
            );
        }
    };

    /**
     * An animated style constant that takes the height of the modal
     * @memberof RoadSignModal
     */
    const animatedStyle = {
        height: viewHeight,
    };

    return (
        <>
            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => closeModal()}>
                <TouchableWithoutFeedback onPress={() => closeModal()}>
                    <View style={styles.transparentBackground}>
                        {/* <TouchableWithoutFeedback> */}
                        <Animated.View
                            style={[styles.textAndImage, animatedStyle]}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.closeIcon}
                                onPress={() => closeModal()}>
                                <Icon
                                    name={'times'}
                                    size={Icons.medium}
                                    color={Colors.icons}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.infoIcon}
                                onPress={() => setShowDescript(!showDescript)}>
                                <Icon
                                    name={'info'}
                                    size={Icons.medium}
                                    color={Colors.icons}
                                />
                            </TouchableOpacity>
                            <TouchableWithoutFeedback
                                activeOpacity={1}
                                onPress={() => {
                                    setShowDescript(!showDescript);
                                }}>
                                <View
                                    onLayout={(event) => {
                                        setLayout(
                                            event.nativeEvent.layout,
                                            'image'
                                        );
                                    }}
                                    style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={selectedSign.source}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            {showDescript && (
                                <View
                                    onStartShouldSetResponder={() => true}
                                    style={[
                                        styles.textDescription,
                                        { maxHeight: maxHeightScroll },
                                    ]}>
                                    {textDescription()}
                                </View>
                            )}
                        </Animated.View>
                        {/* </TouchableWithoutFeedback> */}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
});

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignContent: 'center',
        // flex: 1,
    },
    transparentBackground: {
        // flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    closeIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: RUtils.isSmallScreen() ? 12 : 20,
    },
    infoIcon: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: Colors.modalButton,
        zIndex: 1,
        margin: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.sketchHeaderButtonSmall,
    },
    textAndImage: {
        padding: '4%',
        width: '85%',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.dividerPrimary,
        justifyContent: 'flex-start',
        backgroundColor: Colors.sketchBackground,
    },
    imageContainer: {
        width: '100%',
        maxHeight: RUtils.isSmallScreen() ? 200 : 500,
        // resizeMode: 'contain',
    },
    image: {
        width: '100%',
        maxHeight: RUtils.isSmallScreen() ? 200 : 500,
        resizeMode: 'contain',
        // backgroundColor: 'red',
    },
    textDescription: {
        marginTop: '5%',
        width: '90%',
        alignSelf: 'center',
        // backgroundColor: 'red',
    },
    textStyle: {
        width: '100%',
        color: Colors.textPrimary,
        textAlign: 'center',
        // backgroundColor: 'blue',
        ...Typography.section,
    },
});

export default RoadSignModal;
