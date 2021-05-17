import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Colors, Typography, Buttons } from '../../styles';
import { Divider, ButtonGroup } from '../reusableComponents/';
import backgroundImagePath from './backgroundImagePath';
import AlertModal from './AlertModal';
import USER_KEYS from '../helpers/storageKeys';
import AppContext from '../../AppContext';
import { isSmallScreen, useOpen } from '../helpers';

/**
 * SketchAreaMenuContent is a menu that slides up from the bottom of the screen.
 * This menu allows the user to change the background image according to
 * which screen they are on.
 * In the IntersectionScreen, a buttonGroup is displayed in addition to the road designs. This
 * button group is to choose between the different intersection types (X, Y or T).
 *
 * @namespace SketchAreaMenuContent
 * @category SketchComponents
 * @prop {string} roadType Name of roadtype
 * @prop {function} setImage Changes the state currentImage
 * @prop {function} setRoadDesignChange Changes the state roadDesignChange to true or false
 * @prop {string} extensionType Name of the extension type to be set (vanlig, gangfelt, sykkelfelt)
 * @prop {function} bottomSheetToggle Changes the state bottomSheetOpen to hide or show the bottomMenu
 */
const SketchAreaMenuContent = React.memo(
    ({
        roadType,
        setImage,
        setRoadDesignChange,
        extensionType,
        closeBottomSheet,
    }) => {
        // Width of button group in bottom menu
        const buttonGroupWidth = isSmallScreen() ? 200 : 300;

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

        // For handling showing/not showing of alert on imageChange
        const modalVisible = useOpen(false);
        const [alwaysHideAlert, setAlwaysHideAlert] = useState(false);

        const [tempImage, setTempImage] = useState('');
        const [tempRoadDesign, setTempRoadDesign] = useState('');
        const [tempIntersectionType, setTempIntersectionType] = useState('');
        const [isDesignBtn, setIsDesignBtn] = useState(false);
        const [isIntersectionBtn, setIsIntersectionBtn] = useState(false);

        const appContext = useContext(AppContext);

        /**
         * @memberof SketchAreaMenuContent
         * @typedef {function} useEffect
         * @description useEffect that is triggered on mount and unmount, will help set the background
         * when the screen is first mounted.
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
         * @memberof SketchAreaMenuContent
         * @typedef {function} useEffect
         * @description useEffect triggered when extensionType state is changed.
         * Will update the background image according to this parameter.
         * Also sets the roadDesignChange to false so that the canvas is not cleared.
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
         * Button event that changes the background image of the screen.
         * Opens an alert if the drawing is set to be deleted.
         * Depending on if it is a intersection or not, the handling is different.
         * Also sets the roadDesign state.
         * Also sets the roadDesignChange to true so that the canvas is cleared.
         * @memberof SketchAreaMenuContent
         * @param {String} designName
         */
        const onPressButton = (designName) => {
            if (
                appContext.deleteOnChange == 'Ja' &&
                appContext.showDeleteAlert == 'true' &&
                designName != roadDesign
            ) {
                modalVisible.onToggle();

                if (roadType == 'Veikryss') {
                    const imgSource =
                        thisRoadType[designName][intersectionType][
                            extensionType
                        ];
                    setTempImage(imgSource);
                    // setIntersectionType('X');
                } else {
                    const imgSource = thisRoadType[designName][extensionType];
                    setTempImage(imgSource);
                }
                setTempRoadDesign(designName);
                setIsIntersectionBtn(false);
                setIsDesignBtn(true);
            } else {
                setRoadDesignChange(true);

                if (roadType == 'Veikryss') {
                    const imgSource =
                        thisRoadType[designName][intersectionType][
                            extensionType
                        ];
                    setImage(imgSource);
                    // setIntersectionType('X');
                } else {
                    const imgSource = thisRoadType[designName][extensionType];
                    setImage(imgSource);
                }
                setRoadDesign(designName);
                setTimeout(() => {
                    closeBottomSheet();
                }, 100);
            }
        };

        /**
         * Triggered when one of the buttons in the buttonGroup are pressed.
         * Opens an alert if the drawing is set to be deleted.
         * Changes the type of intersection design that is chosen (x, y, t).
         * Also sets the roadDesignChange to true so that the canvas is cleared.
         * @memberof SketchAreaMenuContent
         * @param {String} intersectionName
         */
        const intersectionTypeChange = (intersectionName) => {
            if (
                appContext.deleteOnChange == 'Ja' &&
                appContext.showDeleteAlert == 'true' &&
                intersectionName != intersectionType
            ) {
                modalVisible.onToggle();

                setTempIntersectionType(intersectionName);

                const imgSource =
                    thisRoadType[roadDesign][intersectionName][extensionType];
                setTempImage(imgSource);

                setIsIntersectionBtn(true);
                setIsDesignBtn(false);
            } else {
                setRoadDesignChange(true);
                setIntersectionType(intersectionName);

                const imgSource =
                    thisRoadType[roadDesign][intersectionName][extensionType];
                setImage(imgSource);
            }
        };

        /**
         * Button event that changes the background image of the screen.
         * Is triggered when pressing the 'OK' button in the Alert.
         * Depending on if it is a intersection or not, the handling is different.
         * Also sets the roadDesign state.
         * Also sets the roadDesignChange to true so that the canvas is cleared
         * @memberof SketchAreaMenuContent
         */
        const onAlertOK = () => {
            setRoadDesignChange(true);

            if (isDesignBtn) {
                setRoadDesign(tempRoadDesign);
                closeBottomSheet();
            } else if (isIntersectionBtn) {
                setIntersectionType(tempIntersectionType);
            }

            if (alwaysHideAlert) {
                appContext.saveNewSettings(
                    'false',
                    appContext.setShowDeleteAlert,
                    USER_KEYS.SHOW_DELETE_ALERT_KEY
                );
            }
            setImage(tempImage);
            modalVisible.onToggle();
        };

        /**
         * Returns the source of the image to be displayed as a background image
         * of the buttons in the BottomMenu.
         * @memberof SketchAreaMenuContent
         * @param {String} designName
         * @returns The source of the image
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
                <AlertModal
                    modalVisible={modalVisible}
                    alwaysHideAlert={alwaysHideAlert}
                    setAlwaysHideAlert={setAlwaysHideAlert}
                    onOK={() => onAlertOK()}
                />
                {/* START * The intersectionType buttons (X, T, Y) */}
                {roadType == 'Veikryss' && (
                    <View style={styles.intersectionTypeSection}>
                        <Text style={styles.intersectionTypeInfoText}>
                            Kryssutforming:
                        </Text>

                        <ButtonGroup
                            selectedValue={intersectionType}
                            values={IntersectionTypes}
                            onSelect={(newValue) =>
                                intersectionTypeChange(newValue)
                            }
                            width={buttonGroupWidth}
                            highlightBackgroundColor={Colors.bottomMenyButtons}
                            highlightTextColor={Colors.icons}
                            inactiveBackgroundColor={Colors.secSlideInactiveBg}
                            inactiveTextColor={Colors.secSlideTextInactive}
                        />
                        <Divider
                            style={styles.divider}
                            borderColor={Colors.bottomMenyButtons}
                        />
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
            </View>
        );
    }
);

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        paddingTop: 30,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    intersectionTypeInfoText: {
        textAlign: 'center',
        paddingBottom: 15,
        color: Colors.icons,
        opacity: 0.5,
        ...Typography.label,
    },
    intersectionTypeSection: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
    },
    divider: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        paddingVertical: 20,
    },
    buttonContainer: {
        padding: 25,
        marginHorizontal: isSmallScreen() ? 10 : 15,
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
});

export default SketchAreaMenuContent;
