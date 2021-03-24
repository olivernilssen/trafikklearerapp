import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors, Typography } from '../../styles';
import curriculumData from './curriculumData';
import { Divider } from '../reusableComponents';

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
                <Divider borderColor={Colors.header} />
                {contents}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    main: {
        width: '100%',
        // backgroundColor: Colors.sketchBackground,
        marginBottom: '12%',
    },
    subHeading: {
        color: Colors.textLight,
        fontSize: 25,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // fontWeight: 'bold',
    },
    content: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        // backgroundColor: Colors.secSlideInactiveBg,
        // elevation: 5,
    },
    curriculumObjective: {
        fontSize: 21,
        color: Colors.textLight,
    },
    curriculumContent: {
        fontSize: 18,
        color: Colors.icons,
        paddingVertical: 5,
        lineHeight: 30,
    },
});

export default CurriculumContent;
