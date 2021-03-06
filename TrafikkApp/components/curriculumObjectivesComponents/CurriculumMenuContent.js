import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ButtonGroup } from '../reusableComponents/';
import curriculumData from './curriculumData';
import { Colors, Typography } from '../../styles';
import { isSmallScreen } from '../helpers/';

/**
 * Component to display the content of the BottomMenu, on the screen
 * for the CurriculumObjectives. The content of the menu on this screen is a tab bar to choose
 * between the different traffic classes, and a buttonGroup to choose between the
 * curriculumObjectives for these classes.
 * @namespace CurriculumMenuContent
 * @category CurriculumObjectivesComponents
 * @prop {string} curriculumObjective The name of the chosen curriculum objective
 * @prop {function} setCurriculumObjective Sets the state curriculumObjective
 * @prop {string} trafficClass The name of the chosen traffic class
 * @prop {function} setTrafficClass Sets the state trafficClass
 * @prop {object} scrollRef Reference to the scrollview component in the CurriculumObjectiveScreen
 * @prop {function} closeBottomMenu Function to close the bottom menu
 */
const CurriculumMenuContent = React.memo(
    ({
        curriculumObjective,
        setCurriculumObjective,
        trafficClass,
        setTrafficClass,
        scrollRef,
        closeBottomMenu,
    }) => {
        // Width of the button group in the bottom menu
        const buttonGroupWidth = isSmallScreen() ? 360 : 550;
        const buttonGroupWidthSmaller = isSmallScreen() ? 290 : 450;

        // The traffic classes (klasse B, klasse B kode 96 og BE)
        const trafficClasses = [];
        const keys = Object.keys(curriculumData);
        keys.map((key) => {
            trafficClasses.push(key);
        });

        // The curriculum objectives (trinn 1, trinn 2, trinn 3 etc)
        const curriculumObjectives = [];
        const currKeys = Object.keys(curriculumData[trafficClass]);
        currKeys.map((key) => {
            curriculumObjectives.push(key);
        });

        /**
         * Button event that is triggered when the tab bars in the bottom menu is clicked.
         * Sets the state trafficClass according to the tab that is pressed.
         * Also sets the state curriculumObjective to 'Hovedmål' (main goals).
         * @memberof CurriculumMenuContent
         * @param {String} trafficClassName
         */
        const onTrafficClassChange = (trafficClassName) => {
            setCurriculumObjective('Hovedmål');
            setTrafficClass(trafficClassName);
        };

        /**
         * Button event that is triggered when the buttons in the button group are clicked.
         * Sets the state curriculumObjective according to the button that is pressed.
         * Also scrolls to the top of the screen.
         * Also hides the bottom menu.
         * @memberof CurriculumMenuContent
         * @param {String} curriculumObjective
         */
        const onCurriculumObjectiveChange = (curriculumObjective) => {
            setCurriculumObjective(curriculumObjective);
            scrollRef.current.scrollTo({ y: 0, animated: true });
            scrollRef.current.scrollTo({ y: 0, animated: true });
            setTimeout(() => {
                closeBottomMenu();
            }, 500);
        };

        return (
            <View style={styles.main}>
                {/* START * The main buttons (Klasse B, Klasse B kode 96 og BE) */}
                <View style={styles.buttonGroup}>
                    {trafficClasses.map((label, i) => {
                        const activeBtn = label === trafficClass;
                        return (
                            <View key={i} style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={[
                                        styles.buttonContainer,
                                        activeBtn
                                            ? {
                                                  backgroundColor:
                                                      Colors.bottomMeny,
                                                  elevation: 8,
                                              }
                                            : {
                                                  backgroundColor:
                                                      Colors.bottomMenyButtons,
                                              },
                                    ]}
                                    activeOpacity={0.6}
                                    onPress={() => onTrafficClassChange(label)}>
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            activeBtn
                                                ? {
                                                      color: Colors.textPrimary,
                                                  }
                                                : {
                                                      color: Colors.icons,
                                                      opacity: 0.6,
                                                  },
                                        ]}>
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                {/* END * The main buttons (Klasse B, Klasse B kode 96 og BE) */}

                {/* START * The curriculumObjectives buttons (Hovedmål, trinn 1, trinn 2 osv) */}
                <View style={styles.curriculumObjectivesSection}>
                    <Text style={styles.curriculumObjectivesInfoText}>
                        Læreplanmål:
                    </Text>

                    <ButtonGroup
                        selectedValue={curriculumObjective}
                        values={curriculumObjectives}
                        onSelect={(newValue) =>
                            onCurriculumObjectiveChange(newValue)
                        }
                        width={
                            trafficClass == 'Klasse B'
                                ? buttonGroupWidth
                                : buttonGroupWidthSmaller
                        }
                        height={55}
                        highlightBackgroundColor={Colors.startScreenLinkTheory}
                        highlightTextColor={Colors.secSlideTextActive}
                        inactiveBackgroundColor={Colors.secSlideInactiveBg}
                        inactiveTextColor={Colors.secSlideTextInactive}
                    />
                </View>

                {/* END * The curriculumObjectives buttons (Hovedmål, trinn 1, trinn 2 osv) */}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
    },
    buttonContainer: {
        padding: 25,
        width: '100%',
        backgroundColor: Colors.bottomMeny,
    },
    buttonText: {
        paddingTop: 5,
        textAlign: 'center',
        ...Typography.section,
    },
    curriculumObjectivesSection: {
        flexDirection: 'column',
        width: '100%',
        marginVertical: 20,
        alignItems: 'center',
    },
    curriculumObjectivesInfoText: {
        textAlign: 'center',
        paddingBottom: 15,
        color: Colors.icons,
        opacity: 0.5,
        ...Typography.label,
    },
});

export default CurriculumMenuContent;
