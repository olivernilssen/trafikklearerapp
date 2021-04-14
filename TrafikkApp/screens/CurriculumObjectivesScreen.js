import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import {
    MainView,
    Header,
    Overlay,
    BottomMenuAnimated,
} from '../components/reusableComponents';
import {
    CurriculumMenuContent,
    CurriculumObjectives,
} from '../components/curriculumObjectivesComponents/';
import { Colors, Typography } from '../styles';

/**
 * The screen component for the curriculum objectives for traffic training
 * @namespace CurriculumObjectivesScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const CurriculumObjectivesScreen = React.memo(({ navigation }) => {
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [mainHeading, setMainHeading] = useState('Klasse B');
    const [subHeading, setSubHeading] = useState();
    const [curriculumObjective, setCurriculumObjective] = useState('Hovedmål');
    const [trafficClass, setTrafficClass] = useState('Klasse B');
    const scrollRef = useRef();

    return (
        <MainView>
            <Overlay
                showOverlay={bottomSheetHidden}
                setShowOverlay={setBottomSheetHidden}
            />
            <View style={styles.main}>
                <Header navigation={navigation} style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.siteHeading}>Læreplanmål</Text>
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
                    setBottomSheetHidden={setBottomSheetHidden}
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
    headerContent: {
        width: '93%',
        flexDirection: 'row',
    },
    siteHeading: {
        color: Colors.icons,
        textAlignVertical: 'center',
        ...Typography.heading,
    },
    subHeadingContainer: {
        flex: 1,
        alignItems: 'flex-end',
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
