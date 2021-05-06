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
import { isSmallScreen } from '../reusableComponents/globalFunctions';

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
    const [maxHeightScroll, setMaxHeightScroll] = useState(250);
    const [showText, setShowText] = useState(false);

    /**
     * UseEffect that runs when modal pops up or goes away
     * sets the height of the modal to the image heigh
     * @memberof RoadSignModal
     */
    useEffect(() => {
        const heightModal = isSmallScreen() ? imgHeight + 50 : imgHeight + 100;

        Animated.timing(viewHeight, {
            toValue: heightModal,
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
        const heightModal = isSmallScreen() ? imgHeight + 50 : imgHeight + 100;

        Animated.timing(viewHeight, {
            toValue: showDescript
                ? descriptionHeight + heightModal
                : heightModal,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            if (showDescript === true) setShowText(true);
            else setShowText(false);
        });
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
                    <Text
                        style={[
                            styles.textStyle,
                            {
                                color: showText ? 'white' : 'transparent',
                            },
                        ]}>
                        {selectedSignCode.replace('_', '.')} {selectedSign.navn}
                    </Text>
                    <Divider
                        style={{
                            width: '95%',
                            alignSelf: 'center',
                            padding: '4%',
                        }}
                        borderColor={
                            showText ? Colors.dividerPrimary : 'transparent'
                        }></Divider>
                    {selectedSign.beskrivelse != '' && (
                        <ScrollView>
                            <Text
                                style={[
                                    styles.textStyleDescription,
                                    {
                                        color: showText
                                            ? 'white'
                                            : 'transparent',
                                    },
                                ]}>
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
                            {/* BUTTON TO GET THE EXIT MODAL */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.closeIcon}
                                onPress={() => closeModal()}>
                                <Icon
                                    name={'times'}
                                    size={Icons.large}
                                    color={Colors.icons}
                                />
                            </TouchableOpacity>

                            {/* BUTTON TO GET THE INFO ON OF SCREEN UP */}
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
    },
    transparentBackground: {
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
        padding: isSmallScreen() ? 12 : 20,
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
        alignItems: 'center',
        width: '100%',
        maxHeight: isSmallScreen() ? 200 : 450,
    },
    image: {
        width: isSmallScreen() ? '70%' : '85%',
        maxHeight: isSmallScreen() ? 200 : 450,
        resizeMode: 'contain',
        // backgroundColor: 'red',
    },
    textDescription: {
        marginTop: '5%',
        width: '90%',
        alignSelf: 'center',
    },
    textStyle: {
        width: '100%',
        color: Colors.textPrimary,
        textAlign: 'center',
        fontWeight: 'bold',
        // backgroundColor: 'blue',
        ...Typography.section,
    },
    textStyleDescription: {
        width: '100%',
        color: Colors.textPrimary,
        textAlign: 'center',
        // backgroundColor: 'blue',
        ...Typography.section,
    },
});

export default RoadSignModal;
