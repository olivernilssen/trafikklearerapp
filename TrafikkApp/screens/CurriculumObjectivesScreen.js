import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { MainView, Header } from '../components/reusableComponents';
import CurriculumMenu from '../components/curriculumObjectivesComponents/CurriculumMenu';
import CurriculumContent from '../components/curriculumObjectivesComponents/CurriculumContent';
import { Colors, Typography } from '../styles';

/**
 * The screen component for the curriculum objectives for traffic training
 */
const CurriculumObjectivesScreen = React.memo(({ navigation }) => {
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [mainHeading, setMainHeading] = useState('Klasse B');
    const [subHeading, setSubHeading] = useState();
    const [curriculumObjective, setCurriculumObjective] = useState('Hovedmål');
    const [trafficClass, setTrafficClass] = useState('Klasse B');

    return (
        <MainView>
            <Header navigation={navigation}>
                <View style={styles.header}>
                    <Text style={styles.screenName}>Læreplanmål</Text>
                    <Text style={styles.heading}>{mainHeading}</Text>
                </View>
            </Header>
            <ScrollView
                persistentScrollbar={true}
                showsVerticalScrollIndicator={true}
                style={styles.main}>
                <CurriculumContent
                    curriculumObjective={curriculumObjective}
                    trafficClass={trafficClass}
                    subHeading={subHeading}
                    setSubHeading={setSubHeading}
                    setMainHeading={setMainHeading}
                />
            </ScrollView>
            <CurriculumMenu
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}
                curriculumObjective={curriculumObjective}
                setCurriculumObjective={setCurriculumObjective}
                trafficClass={trafficClass}
                setTrafficClass={setTrafficClass}
            />
        </MainView>
    );
});

const styles = StyleSheet.create({
    main: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.curriculumBg,
    },
    header: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenName: {
        flex: 1,
        color: Colors.icons,
        textAlign: 'right',
        ...Typography.heading,
    },
    heading: {
        flex: 1,
        color: Colors.icons,
        opacity: 0.7,
        textAlign: 'right',
        ...Typography.section,
    },
});

export default CurriculumObjectivesScreen;
