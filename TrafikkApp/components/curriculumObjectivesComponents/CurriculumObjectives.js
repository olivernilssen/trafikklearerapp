import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import curriculumData from './curriculumData';
import { Colors, Typography } from '../../styles';

/**
 * Component to actually display the curriculum objectives as text on the screen.
 * Which content to display is decided by which button(s) in the BottomMenu
 * that is pressed
 * @namespace CurriculumObjectives
 * @category CurriculumObjectivesComponents
 * @prop {string} curriculumObjective The name of the chosen curriculum objective
 * @prop {function} setCurriculumObjective Sets the state curriculumObjective
 * @prop {string} trafficClass The name of the chosen traffic class
 * @prop {function} setTrafficClass Sets the state trafficClass
 * @prop {object} scrollRef Reference to the scrollview component in the
 * CurriculumObjectiveScreen
 */
const CurriculumObjectives = React.memo(
    ({
        curriculumObjective,
        trafficClass,
        // subHeading,
        setSubHeading,
        setMainHeading,
    }) => {
        /**
         * useEffect that is triggered when curriculumObjective is changed.
         * Will run the function onContentChange() to change the content on the creen
         */
        useEffect(() => {
            onContentChange();
        }, [curriculumObjective]);

        /**
         * useEffect that is triggered when trafficClass is changed.
         * Will run the function onContentChange() to change the content on the creen
         */
        useEffect(() => {
            onContentChange();
        }, [trafficClass]);

        // Get the name of all the curriculum objectives from the data file
        const curriculumObjectives =
            curriculumData[trafficClass][curriculumObjective];
        const curriculumContents = Object.keys(curriculumObjectives);

        /**
         * Function that is triggered when the states curriculumObjective
         * or trafficClass changes.
         * Changes the main heading to the chosen trafficClass, and the subheading
         * to the chosen curriculum objective.
         * @memberof CurriculumObjectives
         */
        const onContentChange = () => {
            setMainHeading(trafficClass);
            const subHeading =
                curriculumData[trafficClass][curriculumObjective]['overskrift'];
            setSubHeading(subHeading);
        };

        /**
         * Maps through all the curriculum objectives from the data file.
         * @memberof CurriculumObjectives
         * @returns The contents of the objectives to be displayed on the screen
         */
        const contents = curriculumContents.map((source, i) => {
            if (source !== 'overskrift') {
                const textContent =
                    curriculumData[trafficClass][curriculumObjective][source];
                return (
                    <View key={i} style={styles.content}>
                        <Text style={styles.curriculumObjective}>{source}</Text>
                        <Text style={styles.curriculumObjectiveContent}>
                            {textContent}
                        </Text>
                    </View>
                );
            }
        });

        return <View style={styles.main}>{contents}</View>;
    }
);

const styles = StyleSheet.create({
    main: {
        marginBottom: '10%',
    },
    content: {
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.dividerPrimary,
        backgroundColor: Colors.curriculumCards,
        elevation: 2,
    },
    curriculumObjective: {
        color: Colors.textPrimary,
        lineHeight: 30,
        ...Typography.section,
    },
    curriculumObjectiveContent: {
        paddingVertical: 5,
        lineHeight: 30,
        color: Colors.icons,
        ...Typography.body,
    },
});

export default CurriculumObjectives;
