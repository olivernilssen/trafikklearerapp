import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors, Typography } from '../../styles';
import curriculumData from './curriculumData';

const CurriculumContent = React.memo(
    ({
        curriculumObjective,
        trafficClass,
        subHeading,
        setSubHeading,
        setMainHeading,
    }) => {
        useEffect(() => {
            onContentChange();
        }, [curriculumObjective]);

        useEffect(() => {
            onContentChange();
        }, [trafficClass]);

        const curriculumObjectives =
            curriculumData[trafficClass][curriculumObjective];
        const curriculumContents = Object.keys(curriculumObjectives);

        const onContentChange = () => {
            setMainHeading(trafficClass);
            const subHeading =
                curriculumData[trafficClass][curriculumObjective]['overskrift'];
            setSubHeading(subHeading);
        };

        const contents = curriculumContents.map((source, i) => {
            if (source !== 'overskrift') {
                const textContent =
                    curriculumData[trafficClass][curriculumObjective][source];
                return (
                    <View key={i} style={styles.content}>
                        <Text style={styles.curriculumObjective}>{source}</Text>
                        <Text style={styles.curriculumContent}>
                            {textContent}
                        </Text>
                    </View>
                );
            }
        });

        return (
            <View style={styles.main}>
                <Text style={styles.subHeading}>{subHeading}</Text>
                {contents}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    main: {
        marginBottom: '12%',
    },
    subHeading: {
        color: Colors.icons,
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '2%',
        fontWeight: 'bold',
        ...Typography.section,
    },
    content: {
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: Colors.curriculumCards,
        elevation: 5,
    },
    curriculumObjective: {
        color: Colors.textPrimary,
        ...Typography.section,
    },
    curriculumContent: {
        color: Colors.textPrimary,
        paddingVertical: 5,
        lineHeight: 30,
        ...Typography.body,
    },
});

export default CurriculumContent;
