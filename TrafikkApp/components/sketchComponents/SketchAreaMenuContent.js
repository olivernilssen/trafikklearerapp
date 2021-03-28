import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

import { Colors, Typography, Buttons } from '../../styles';
import Divider from '../reusableComponents/Divider';
import ButtonGroup from '../reusableComponents/ButtonGroup';
import backgroundImagePath from './backgroundImagePath';

/**
 * SketchAreaMenuContent is a menu that slides up from the bottom of the screen
 * This menu allows the user to change the background image according to
 * which screen they are on
 */
const SketchAreaMenuContent = React.memo(
    ({ roadType, setImage, setRoadDesignChange, extensionType }) => {
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
         * Also sets the roadDesignChange to false so that the canvas is not cleared
         */
        useEffect(() => {
            setRoadDesignChange(false);
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
         * Also sets the roadDesignChange to true so that the canvas is cleared
         * @param {String} designName
         */
        const onPressButton = (designName) => {
            setRoadDesignChange(true);
            if (roadType == 'Veikryss') {
                const imgSource =
                    thisRoadType[designName][intersectionType][extensionType];
                setImage(imgSource);
                // setIntersectionType('X');
            } else {
                const imgSource = thisRoadType[designName][extensionType];
                setImage(imgSource);
            }
            setRoadDesign(designName);
        };

        /**
         * Triggered when the radiobuttons are clicked
         * Changes the type of intersection design that is chosen (x, y, t)
         * Also sets the roadDesignChange to true so that the canvas is cleared
         * @param {String} radioValue
         */
        const intersectionTypeChange = (intersectionType) => {
            setRoadDesignChange(true);
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
                                                  color: Colors.textPrimary,
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

                {/* START * The intersectionType buttons (X, T, Y) */}
                {roadType == 'Veikryss' && (
                    <View style={styles.intersectionTypeSection}>
                        <Divider
                            style={styles.divider}
                            borderColor={Colors.bottomMenyButtons}
                        />
                        <Text style={styles.intersectionTypeInfoText}>
                            Kryssutforming:
                        </Text>

                        <ButtonGroup
                            selectedValue={intersectionType}
                            values={IntersectionTypes}
                            onSelect={(newValue) =>
                                intersectionTypeChange(newValue)
                            }
                            groupWidth={300}
                            highlightBackgroundColor={Colors.bottomMenyButtons}
                            highlightTextColor={Colors.icons}
                            inactiveBackgroundColor={Colors.secSlideInactiveBg}
                            inactiveTextColor={Colors.secSlideTextInactive}
                        />
                    </View>
                )}
                {/* END * The intersectionType buttons (X, T, Y) */}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        paddingTop: 40,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        marginVertical: 10,
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
        ...Typography.body,
    },
    intersectionTypeSection: {
        flexDirection: 'column',
        width: '100%',
        marginVertical: 20,
        alignItems: 'center',
    },
    divider: {
        width: '80%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    intersectionTypeInfoText: {
        textAlign: 'center',
        paddingBottom: 15,
        color: Colors.icons,
        opacity: 0.5,
        ...Typography.label,
    },
});

export default SketchAreaMenuContent;
