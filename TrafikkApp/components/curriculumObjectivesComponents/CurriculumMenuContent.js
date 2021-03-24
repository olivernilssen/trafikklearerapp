import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { Colors, Typography } from '../../styles';
import ButtonGroup from '../reusableComponents/ButtonGroup';
import curriculumData from './curriculumData';

/**
 * BottomMenuContent is a menu that slides up from the bottom of the screen
 */
const CurriculumMenuContent = React.memo(
    ({
        curriculumObjective,
        setCurriculumObjective,
        trafficClass,
        setTrafficClass,
    }) => {
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
         * Button event that changes the content of the screen
         * Also sets the trafficClass state.
         * @param {String} trafficClassName
         */
        const onTrafficClassChange = (trafficClassName) => {
            setCurriculumObjective('Hovedmål');
            setTrafficClass(trafficClassName);
        };

        /**
         * Triggered when the radiobuttons are clicked
         * Changes the type of curriculumObjective (trinn 1, trinn 2 osv)
         * @param {String} curriculumObjective
         */
        const onCurriculumObjectiveChange = (curriculumObjective) => {
            setCurriculumObjective(curriculumObjective);
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
                                                      color: Colors.textLight,
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
                        groupWidth={600}
                        height={50}
                        textSize={20}
                        highlightBackgroundColor={Colors.secSlideActiveBg}
                        highlightTextColor={Colors.secSlideTextActive}
                        inactiveBackgroundColor={Colors.bottomMenyButtons}
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
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: 'hidden',
        elevation: 1,
    },
    buttonContainer: {
        padding: 25,
        width: '100%',
        backgroundColor: Colors.bottomMeny,
    },
    buttonText: {
        paddingTop: 5,
        textAlign: 'center',
        ...Typography.mediumPlus,
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
        ...Typography.medium,
    },
});

export default CurriculumMenuContent;
