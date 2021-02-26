import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-ui-lib';

import MainView from '../components/MainView';
import Color from '../styles/Colors';
import Header from '../components/Header';
import imgSource from '../components/sketchComponents/illustrationsPath';

const RoadScreen = React.memo(({ navigation }) => {
    const labelsArray = [];
    const roadTypes = imgSource['Veikryss'];
    const kryssUtforming = ['X', 'T', 'Y'];

    // Get all the keys from our imgSource (høyre, lys etc for labels)
    const keys = Object.keys(roadTypes);
    keys.map((keys) => {
        labelsArray.push(keys);
    });

    // Initial image is Høyrekryss with X-utforming
    const initialImageSrcName = Object.keys(roadTypes[labelsArray[0]])[0];

    const [backroundImage, setBackroundImage] = useState(
        roadTypes[labelsArray[0]][initialImageSrcName]
    );

    const [selectedRadioBtn, setSelectedRadioBtn] = useState(0);
    const [selectedRoad, setSelectedRoad] = useState(labelsArray[0]);

    // When clicking the main buttons (høyrekryss, forkjørs, lys), the image should change
    const onRoadPress = (roadPressed) => {
        setSelectedRoad(labelsArray[roadPressed]);

        setBackroundImage(
            roadTypes[labelsArray[roadPressed]][
                Object.keys(roadTypes[labelsArray[roadPressed]])[
                    selectedRadioBtn
                ]
            ]
        );
    };

    // When clicking the radio buttons, the image should change
    const radioButtonChange = (value) => {
        setSelectedRadioBtn(value);

        setBackroundImage(
            roadTypes[selectedRoad][Object.keys(roadTypes[selectedRoad])[value]]
        );
    };

    // Changing the state of the backgroundImage should be done here?
    const onImageChange = (roadType, roadSubType) => {
        setBackroundImage(
            roadTypes[selectedRoad][
                Object.keys(roadTypes[selectedRoad])[selectedRadioBtn]
            ]
        );
    };

    return (
        <MainView>
            <Header name={'Vei'} navigation={navigation} />
            <ImageBackground
                resizeMode={'cover'}
                style={styles.img}
                source={backroundImage}>
                <View style={{ flex: 2 }}></View>
                <View style={styles.btnAndRadios}>
                    {/* START * The main buttons (Høyrekryss, forkjørs, lys) */}
                    {labelsArray.map((label, i) => {
                        const activeBtn = selectedRoad == labelsArray[i];
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
                                onPress={() => onRoadPress(i)}>
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
                    <View style={styles.radioGroup}>
                        <RadioGroup
                            initialValue={selectedRadioBtn}
                            onValueChange={(value) => radioButtonChange(value)}>
                            {kryssUtforming.map((label, i) => {
                                return (
                                    <RadioButton
                                        key={i}
                                        label={label}
                                        value={i}
                                        size={25}
                                        labelStyle={{ fontSize: 20 }}
                                        style={styles.radioBtn}
                                        color={Color.buttonSecActive}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </View>
                    {/* END * The radio buttons (X, T, Y) */}
                </View>
            </ImageBackground>
        </MainView>
    );
});

const styles = StyleSheet.create({
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    btnAndRadios: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttonContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderWidth: 2,
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

export default RoadScreen;
