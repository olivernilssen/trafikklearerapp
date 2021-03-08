import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
} from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-ui-lib';

import { Colors, Icons, Typography, Buttons } from '../../styles';
import backgroundImagePath from '../sketchComponents/illustrationsPath';

/**
 * BottomMenuContent is a menu that slides up from the bottom of the screen
 * This menu allows the user to change the background image according to
 * which screen they are on
 */
const BottomMenuContent = React.memo(
    ({ roadType, setImage, extensionType }) => {
        //Get the roadtype json this component applies too based on roadType prop
        const thisRoadType = backgroundImagePath[roadType];

        //RoadDesign == "høyrekryss", "lyskryss etc"
        const RoadDesigns = [];
        const IntersectionTypes = [];

        //Get the keys of all the road designs for this road type (høyrekryss, lyskryss etc.)
        const keys = Object.keys(thisRoadType);
        keys.map((key) => {
            RoadDesigns.push(key);
        });

        //States for selected roadDesign and intersectionType
        const [roadDesign, setRoadDesign] = useState(RoadDesigns[0]);
        const [intersectionType, setIntersectionType] = useState('X');
        // const [selectedRadioBtn, setSelectedRadioBtn] = useState(0);

        //Get the intersection types if the road design is intersection (veikryss)
        if (roadType === 'Veikryss') {
            const keys = Object.keys(thisRoadType[roadDesign]);
            keys.map((key) => {
                IntersectionTypes.push(key);
            });
        }

        /**
         * Is triggered on mount and unmount, will help set the background
         * when the screen is first mounted
         */
        useEffect(() => {
            if (roadType == 'Veikryss') {
                const imgSource =
                    thisRoadType[roadDesign][intersectionType][extensionType];
                setImage(imgSource);
            } else {
                const imgSource = thisRoadType[roadDesign][extensionType];
                setImage(imgSource);
            }
        }, []);

        /**
         * Is triggered when extensionType state is changed
         * Will update the background image according to this parameter
         */
        useEffect(() => {
            if (roadType == 'Veikryss') {
                const imgSource =
                    thisRoadType[roadDesign][intersectionType][extensionType];
                setImage(imgSource);
            } else {
                const imgSource = thisRoadType[roadDesign][extensionType];
                setImage(imgSource);
            }
        }, [extensionType]);

        /**
         * Button event that changes the background image of the screen
         * Depending on if it is a intersection or not, the handling is different
         * Also sets the roadDesign state.
         * @param {String} designName
         */
        const onPressButton = (designName) => {
            if (roadType == 'Veikryss') {
                const imgSource = thisRoadType[designName]['X'][extensionType];
                setImage(imgSource);
                setIntersectionType('X');
            } else {
                const imgSource = thisRoadType[designName][extensionType];
                setImage(imgSource);
            }
            setRoadDesign(designName);
        };

        /**
         * Triggered when the radiobuttons are clicked
         * Changes the type of intersection design that is chosen (x, y, t)
         * @param {String} radioValue
         */
        const radioButtonChange = (radioValue) => {
            setIntersectionType(radioValue);
            const imgSource =
                thisRoadType[roadDesign][radioValue][extensionType];
            setImage(imgSource);
        };

        const getImage = (designName) => {
            let imgSource = '';
            if (roadType == 'Veikryss') {
                imgSource = thisRoadType[designName]['X'][extensionType];
            } else {
                imgSource = thisRoadType[designName][extensionType];
            }
            return imgSource;
        };

        return (
            <View style={styles.btnAndRadios}>
                {/* START * The radio buttons (X, T, Y) */}
                {roadType == 'Veikryss' && (
                    <View style={styles.radioView}>
                        <RadioGroup
                            style={styles.radioGroup}
                            initialValue={intersectionType}
                            onValueChange={(value) => radioButtonChange(value)}>
                            {IntersectionTypes.map((name, i) => {
                                return (
                                    <RadioButton
                                        key={i}
                                        label={name}
                                        value={name}
                                        size={Icons.small}
                                        labelStyle={{
                                            color: Colors.textLight,
                                            ...Typography.medium,
                                        }}
                                        style={styles.radioBtn}
                                        color={Colors.bottomMenyButtons}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </View>
                )}

                {/* START * The main buttons (Høyrekryss, forkjørs, lys) */}
                <View style={styles.buttonGroup}>
                    {RoadDesigns.map((label, i) => {
                        const activeBtn = label === roadDesign;
                        const imgSource = getImage(label);
                        return (
                            <View key={i}>
                                <TouchableOpacity
                                    style={[
                                        styles.buttonContainer,
                                        // activeBtn
                                        //     ? {
                                        //           backgroundColor:
                                        //               Colors.bottomMenyButtons,
                                        //       }
                                        //     : {
                                        //           backgroundColor:
                                        //               Colors.bottomMeny,
                                        //       },
                                    ]}
                                    activeOpacity={0.6}
                                    onPress={() => onPressButton(label)}>
                                    <Image
                                        source={imgSource}
                                        style={[
                                            styles.buttonImage,
                                            activeBtn
                                                ? {
                                                      opacity: 1,
                                                  }
                                                : {
                                                      opacity: 0.6,
                                                  },
                                        ]}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={[
                                        styles.buttonText,
                                        activeBtn
                                            ? {
                                                  color: Colors.textLight,
                                              }
                                            : {
                                                  color: Colors.icons,
                                              },
                                    ]}>
                                    {label}
                                </Text>
                            </View>
                        );
                    })}
                </View>
                {/* END * The main buttons (Høyrekryss, forkjørs, lys) */}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    btnAndRadios: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    radioView: {
        width: '50%',
        marginBottom: 20,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    radioBtn: {
        backgroundColor: Colors.icons,
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    buttonContainer: {
        padding: 25,
        marginRight: 5,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        backgroundColor: Colors.bottomMeny,
        ...Buttons.largeWidthRounded,
    },
    buttonImage: {
        overflow: 'hidden',
        height: undefined,
        width: undefined,
        ...Buttons.rounded,
        ...StyleSheet.absoluteFillObject,
    },
    buttonText: {
        paddingTop: 5,
        textAlign: 'center',
        ...Typography.medium,
    },
});

export default BottomMenuContent;
