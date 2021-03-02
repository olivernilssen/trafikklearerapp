import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-ui-lib';

import Color from '../../styles/Colors';
import backgroundImagePath from '../sketchComponents/illustrationsPath';

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

        //set the background image when initially launched
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

        //Set the road design and reset intersectiontype to X
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

        //Set the intersection type, only applies to Intersection road design (veikryss)
        const radioButtonChange = (radioValue) => {
            setIntersectionType(radioValue);
            const imgSource =
                thisRoadType[roadDesign][radioValue][extensionType];
            setImage(imgSource);
        };

        return (
            <View style={styles.btnAndRadios}>
                {/* START * The main buttons (Høyrekryss, forkjørs, lys) */}
                {RoadDesigns.map((label, i) => {
                    const activeBtn = label === roadDesign;

                    return (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.buttonContainer,
                                activeBtn
                                    ? {
                                          backgroundColor:
                                              Color.buttonSecActive,
                                      }
                                    : {
                                          backgroundColor:
                                              Color.buttonSecondary,
                                      },
                            ]}
                            activeOpacity={0.6}
                            onPress={() => onPressButton(label)}>
                            <Text
                                style={[
                                    styles.buttonText,
                                    activeBtn
                                        ? {
                                              color: Color.textPrimary,
                                          }
                                        : {
                                              color:
                                                  Color.tabHeaderTextInactive,
                                          },
                                ]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
                {/* END * The main buttons (Høyrekryss, forkjørs, lys) */}

                {/* START * The radio buttons (X, T, Y) */}
                {roadType == 'Veikryss' && (
                    <View style={styles.radioGroup}>
                        <RadioGroup
                            initialValue={intersectionType}
                            onValueChange={(value) => radioButtonChange(value)}>
                            {IntersectionTypes.map((name, i) => {
                                return (
                                    <RadioButton
                                        key={i}
                                        label={name}
                                        value={name}
                                        size={25}
                                        labelStyle={{ fontSize: 20 }}
                                        style={styles.radioBtn}
                                        color={Color.buttonSecActive}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </View>
                )}
            </View>
        );
    }
);

export default BottomMenuContent;

const styles = StyleSheet.create({
    btnAndRadios: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttonContainer: {
        backgroundColor: 'white',
        padding: 25,
        borderWidth: 2,
        // height: '100%',
        borderColor: 'transparent',
        borderRadius: 20,
        marginRight: 5,
        marginHorizontal: 15,
        justifyContent: 'center',
        elevation: 3,
    },
    buttonText: {
        fontSize: 20,
    },
    radioGroup: {
        alignContent: 'center',
        marginLeft: 30,
    },
    radioBtn: {
        margin: 5,
        backgroundColor: 'white',
    },
});
