import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { MainView, Header } from '../components/reusableComponents';
import CurriculumMenuContent from '../components/curriculumObjectivesComponents/CurriculumMenuContent';
import CurriculumObjectives from '../components/curriculumObjectivesComponents/CurriculumObjectives';
import { Colors, Typography } from '../styles';
import { Overlay } from '../components/reusableComponents';
import BottomMenuAnimated from '../components/reusableComponents/BottomMenuAnimated';

/**
 * The screen component for the curriculum objectives for traffic training
 */
const CurriculumObjectivesScreen = React.memo(({ navigation }) => {
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [mainHeading, setMainHeading] = useState('Klasse B');
    const [subHeading, setSubHeading] = useState();
    const [curriculumObjective, setCurriculumObjective] = useState('Hovedmål');
    const [trafficClass, setTrafficClass] = useState('Klasse B');

    const [scrollRef, setScrollRef] = useState(useRef());

    return (
        <MainView>
            <Overlay
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}
            />
            <View style={styles.main}>
                <Header navigation={navigation}>
                    <View style={styles.header}>
                        <Text style={styles.screenName}>Læreplanmål</Text>
                        <Text style={styles.heading}>{mainHeading}</Text>
                    </View>
                </Header>
                <ScrollView
                    ref={scrollRef}
                    persistentScrollbar={true}
                    showsVerticalScrollIndicator={true}
                    style={styles.scrollView}>
                    <CurriculumObjectives
                        curriculumObjective={curriculumObjective}
                        trafficClass={trafficClass}
                        subHeading={subHeading}
                        setSubHeading={setSubHeading}
                        setMainHeading={setMainHeading}
                    />
                </ScrollView>
            </View>
            <BottomMenuAnimated
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}>
                <CurriculumMenuContent
                    curriculumObjective={curriculumObjective}
                    setCurriculumObjective={setCurriculumObjective}
                    trafficClass={trafficClass}
                    setTrafficClass={setTrafficClass}
                    scrollRef={scrollRef}
                />
            </BottomMenuAnimated>
        </MainView>
    );
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 1,
    },
    scrollView: {
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
