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
import { Colors, Typography } from '../../styles';
import { Divider } from '../reusableComponents';

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
    const [maxHeightScroll, setMaxHeightScroll] = useState(300);

    useEffect(() => {
        Animated.spring(viewHeight, {
            toValue: imgHeight + 100,
            useNativeDriver: false,
        }).start();

        setShowDescript(false);
    }, [modalVisible]);

    useEffect(() => {
        const heightModal = imgHeight + 100;

        Animated.spring(viewHeight, {
            toValue: showDescript
                ? descriptionHeight + heightModal
                : heightModal,
            useNativeDriver: false,
        }).start();

        setAnimationDone(!animationDone);
    }, [imgHeight, descriptionHeight, showDescript]);

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
                            padding: 10,
                        }}
                        borderColor={Colors.dividerPrimary}></Divider>
                    {selectedSign.beskrivelse === '' ? (
                        <Text style={styles.textStyle}></Text>
                    ) : (
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
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={[styles.textAndImage, animatedStyle]}>
                                <TouchableWithoutFeedback
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
                        </TouchableWithoutFeedback>
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
        maxHeight: 500,
        // resizeMode: 'contain',
    },
    image: {
        width: '100%',
        maxHeight: 500,
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
        ...Typography.section,
    },
});

export default RoadSignModal;
