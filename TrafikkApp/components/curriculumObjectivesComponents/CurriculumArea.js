import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import {
    MainView,
    Header,
    Overlay,
    BottomMenuAnimated,
} from '../reusableComponents';
import CurriculumObjectives from './CurriculumObjectives';
import CurriculumMenuContent from './CurriculumMenuContent';

import { Colors, Typography } from '../../styles';
import { RUtils } from 'react-native-responsive-component';

/**
 * The screen component for the curriculum objectives for traffic training.
 * This screen contains a menu to chose between the different curriculum objectives,
 * and displays the text on the screen.
 * @namespace CurriculumArea
 * @category CurriculumObjectivesComponents
 * @prop {object} toggleDrawer Used for navigation between the different screens
 * @prop {object} navigate
 */
const CurriculumArea = React.memo((props) => {
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [mainHeading, setMainHeading] = useState('Klasse B');
    const [subHeading, setSubHeading] = useState();
    const [curriculumObjective, setCurriculumObjective] = useState('Hovedmål');
    const [trafficClass, setTrafficClass] = useState('Klasse B');
    const scrollRef = useRef();

    const { toggleDrawer } = props;

    return (
        <>
            <Overlay
                showOverlay={bottomSheetHidden}
                setShowOverlay={setBottomSheetHidden}
            />
            <View style={styles.main}>
                <Header toggleDrawer={toggleDrawer} style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.siteHeading}>Læreplanmål</Text>
                        <ScrollView
                            contentContainerStyle={styles.subHeadingContainer}>
                            <Text style={styles.mainHeading}>
                                {mainHeading}
                            </Text>
                            {!RUtils.isSmallScreen() && (
                                <Text style={styles.subHeading}>
                                    {subHeading}
                                </Text>
                            )}
                        </ScrollView>
                    </View>
                </Header>
                <ScrollView
                    ref={scrollRef}
                    persistentScrollbar={true}
                    showsVerticalScrollIndicator={true}
                    style={styles.scrollView}>
                    {RUtils.isSmallScreen() && (
                        <Text style={styles.subHeadingSmallScreens}>
                            {subHeading}
                        </Text>
                    )}
                    <CurriculumObjectives
                        curriculumObjective={curriculumObjective}
                        trafficClass={trafficClass}
                        // subHeading={subHeading}
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
        </>
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
        height: '100%',
        width: '93%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    siteHeading: {
        paddingLeft: '1%',
        color: Colors.icons,
        textAlignVertical: 'center',
        ...Typography.heading,
    },
    subHeadingContainer: {
        width: '100%',
        alignItems: 'flex-end',
        alignSelf: 'center',
    },
    mainHeading: {
        textAlignVertical: 'bottom',
        color: Colors.icons,
        opacity: 0.7,
        ...Typography.body,
    },
    subHeading: {
        textAlignVertical: 'top',
        textAlign: 'right',
        color: Colors.icons,
        opacity: 0.7,
        ...Typography.label,
    },
    subHeadingSmallScreens: {
        textAlign: 'left',
        color: Colors.textPrimary,
        paddingLeft: 5,
        ...Typography.section,
    },
});

export default CurriculumArea;
