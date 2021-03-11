import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

import { Colors, Typography, Buttons } from '../../styles';
import backgroundImagePath from '../sketchComponents/backgroundImagePath';

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
        const intersectionTypeChange = (intersectionType) => {
            setIntersectionType(intersectionType);
            const imgSource =
                thisRoadType[roadDesign][intersectionType][extensionType];
            setImage(imgSource);
        };

        /**
         * Returns the source of the image to be displayed as a background image
         * of the buttons in the BottomMenu.
         * @param {String} designName
         */
        const getImage = (designName) => {
            let imgSource = '';
            if (roadType == 'Veikryss') {
                imgSource = thisRoadType[designName]['X']['Vanlig'];
            } else {
                imgSource = thisRoadType[designName]['Vanlig'];
            }
            return imgSource;
        };

        return (
            <View style={styles.main}>
                {/* START * The intersectionType buttons (X, T, Y) */}
                {roadType == 'Veikryss' && (
                    <View style={styles.intersectionTypeBtnsGroup}>
                        {IntersectionTypes.map((name, i) => {
                            const activeBtn = name === intersectionType;

                            return (
                                <TouchableOpacity
                                    key={i}
                                    activeOpacity={0.6}
                                    onPress={() => intersectionTypeChange(name)}
                                    style={[
                                        styles.intersectionTypeButton,
                                        activeBtn
                                            ? {
                                                  backgroundColor:
                                                      Colors.bottomMenyButtons,
                                              }
                                            : {
                                                  backgroundColor:
                                                      Colors.bottomMeny,
                                              },
                                    ]}
                                    color={Colors.bottomMenyButtons}>
                                    <Text
                                        style={[
                                            styles.intersectionTypeBtnText,
                                            activeBtn
                                                ? {
                                                      color: Colors.textLight,
                                                  }
                                                : {
                                                      color: Colors.icons,
                                                  },
                                        ]}>
                                        {name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
                {/* END * The intersectionType buttons (X, T, Y) */}

                {/* START * The main buttons (Høyrekryss, forkjørs, lys) */}
                <View style={styles.buttonGroup}>
                    {RoadDesigns.map((label, i) => {
                        const activeBtn = label === roadDesign;
                        const imgSource = getImage(label);
                        return (
                            <View key={i}>
                                <TouchableOpacity
                                    style={styles.buttonContainer}
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
    main: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    intersectionTypeBtnsGroup: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    intersectionTypeButton: {
        borderWidth: 1,
        borderColor: Colors.bottomMenyButtons,
        padding: 5,
        elevation: 5,
        ...Buttons.small,
    },
    intersectionTypeBtnText: {
        textAlign: 'center',
        ...Typography.medium,
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
