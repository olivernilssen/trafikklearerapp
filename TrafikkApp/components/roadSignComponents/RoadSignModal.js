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
import { Colors, Icons } from '../../styles';
import { Divider } from '../reusableComponents';
import { isSmallScreen } from '../helpers';

/**
 * This component will display a modal with an image of the chosen road sign.
 * When the image, or the "i"-button is pressed, it will display the name and description related to said sign.
 * To close the modal, either press the "X"-button or outside of the modal.
 *
 * @namespace RoadSignModal
 * @category RoadSignComponents
 * @prop {object} modalVisible If the modal is visible or not, plus functions to open and close it
 * @prop {object} selectedSign Contains name, description and image source of the chosen sign
 * @prop {string} selectedSignCode The sign code of the selected sign (example: 100_1)
 */
const RoadSignModal = React.memo((props) => {
    const { modalVisible, selectedSign, selectedSignCode } = props;

    const [viewHeight, setViewHeight] = useState(new Animated.Value(300));
    const [showDescript, setShowDescript] = useState(false);
    const [imgHeight, setImgHeight] = useState(400);
    const [descriptionHeight, setDescriptionHeight] = useState(0);
    const [maxHeightScroll, setMaxHeightScroll] = useState(250);
    const [showText, setShowText] = useState(false);

    /**
     * @memberof RoadSignModal
     * @typedef {function} useEffect
     * @description UseEffect that is triggered when the modal pops up or goes away.
     * Sets the height of the modal to the image height.
     */
    useEffect(() => {
        const heightModal = isSmallScreen() ? imgHeight + 50 : imgHeight + 100;

        Animated.timing(viewHeight, {
            toValue: heightModal,
            useNativeDriver: false,
        }).start();

        setShowDescript(false);
        setShowText(false);
    }, [modalVisible.isOpen]);

    /**
     * @memberof RoadSignModal
     * @typedef {function} useEffect
     * @description UseEffect that is triggered when either image height, description height or show description changes.
     * Changes the height of the modal.
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
     * to get the correct size of the modal on the screen.
     * @memberof RoadSignModal
     * @function
     * @param {object} layout X-position, Y-position, width and height of the view
     * @param {string} type The name of the view. Is either 'image' or 'description'.
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
     * The name and description of the road sign chosen.
     * @memberof RoadSignModal
     * @returns The title and description of the sign
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
                            padding: 10,
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
                visible={modalVisible.isOpen}
                onRequestClose={() => modalVisible.onClose()}>
                <TouchableWithoutFeedback
                    onPress={() => modalVisible.onClose()}>
                    <View style={styles.transparentBackground}>
                        {/* <TouchableWithoutFeedback> */}
                        <Animated.View
                            style={[styles.textAndImage, animatedStyle]}>
                            {/* BUTTON TO GET THE EXIT MODAL */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.closeIcon}
                                onPress={() => modalVisible.onClose()}>
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
                                    color={Colors.textSecondary}
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
        width: 600,
        borderWidth: 5,
        borderColor: 'black',
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
        ...Typography.section,
    },
    textStyleDescription: {
        width: '100%',
        color: Colors.textPrimary,
        textAlign: 'center',
        ...Typography.section,
    },
});

export default RoadSignModal;
