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
                <Header navigation={navigation} style={styles.header}>
                    <View style={styles.heading}>
                        <View>
                            <Text style={styles.screenName}>Læreplanmål</Text>
                        </View>
                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.mainHeading}>
                                {mainHeading}
                            </Text>
                            <Text style={styles.subHeading}>{subHeading}</Text>
                        </View>
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
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    scrollView: {
        width: '100%',
        padding: '2%',
        backgroundColor: Colors.curriculumBg,
    },
    heading: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    screenName: {
        flex: 1,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: Colors.icons,
        ...Typography.heading,
    },
    subHeadingContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: '2%',
    },
    mainHeading: {
        flex: 1,
        textAlignVertical: 'bottom',
        color: Colors.icons,
        ...Typography.body,
    },
    subHeading: {
        flex: 1,
        textAlignVertical: 'top',
        color: Colors.icons,
        opacity: 0.7,
        ...Typography.label,
    },
});

export default CurriculumObjectivesScreen;
