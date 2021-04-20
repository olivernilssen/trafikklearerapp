import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { Colors, Typography } from '../../styles';
import RoadSignMenuContentButton from './RoadSignMenuContentButton';
import ButtonGroup from '../reusableComponents/ButtonGroup';
// import { ButtonGroup } from '../reusableComponents';
// import curriculumData from './curriculumData';
// import { Colors, Typography } from '../../styles';
import {
    fareSkilt,
    forbudsSkilt,
    markeringsSkilt,
    opplysningsSkilt,
    påbudsSkilt,
    serviceSkilt,
    underSkilt,
    veivisningsSkilt,
    vikepliktsSkilt,
} from '../../assets/sign_descriptions/index';

const RoadSignMenuContent = (props) => {
    const {
        handleSignType,
        setBottomSheetHidden,
        setActiveTypeID,
        activeTypeID,
        handleActiveButton,
    } = props;

    const signTypeArray = [
        { typeName: 'Fareskilt', typeObject: fareSkilt, buttonID: 0 },
        { typeName: 'Forbudsskilt', typeObject: forbudsSkilt, buttonID: 1 },
        {
            typeName: 'Markeringsskilt',
            typeObject: markeringsSkilt,
            buttonID: 2,
        },
        {
            typeName: 'Opplysningsskilt',
            typeObject: opplysningsSkilt,
            buttonID: 3,
        },
        { typeName: 'Påbudsskilt', typeObject: påbudsSkilt, buttonID: 4 },
        { typeName: 'Serviceskilt', typeObject: serviceSkilt, buttonID: 5 },
        { typeName: 'Underskilt', typeObject: underSkilt, buttonID: 6 },
        {
            typeName: 'Veivisningsskilt',
            typeObject: veivisningsSkilt,
            buttonID: 7,
        },
        {
            typeName: 'Vikeplikt- og forkjørsskilt',
            typeObject: vikepliktsSkilt,
            buttonID: 8,
        },
    ];

    const handleBottomMenuPress = (value) => {
        handleSignType(value);
        setBottomSheetHidden(true);
    };

    const SignTypeButton = signTypeArray.map((value, index) => {
        return (
            <View
                key={index}
                style={{
                    width: '30%',
                    height: '30%',
                    alignItems: 'center',
                    paddingVertical: 10,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        handleBottomMenuPress(value.typeObject);
                        handleActiveButton(value.buttonID);
                    }}
                    style={[
                        styles.button,
                        activeTypeID === value.buttonID
                            ? styles.buttonActive
                            : styles.buttonInActive,
                    ]}>
                    <Text
                        style={[
                            styles.textStyle,
                            activeTypeID === value.buttonID
                                ? styles.activeText
                                : styles.inActiveText,
                        ]}>
                        {value.typeName}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    });

    return (
        <View
            style={{
                width: '100%',
                height: 200,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                padding: 10,
            }}>
            {SignTypeButton}
        </View>
    );
};

const styles = StyleSheet.create({
    // container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    activeText: {
        color: Colors.secSlideTextActive,
    },
    inActiveText: {
        color: Colors.secSlideTextInactive,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 20,
        ...Typography.button,
    },
    button: {
        borderRadius: 10,
        height: '120%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonActive: {
        backgroundColor: Colors.startScreenLinkTheory,
        elevation: 8,
    },
    buttonInActive: {
        backgroundColor: Colors.slideInactiveBg,
        borderColor: Colors.bottomMenyButtons,
        borderWidth: 3,
    },
});

export default RoadSignMenuContent;
