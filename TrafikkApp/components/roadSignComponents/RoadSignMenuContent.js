import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { Colors, Typography } from '../../styles';

import {
    fareskiltData,
    forbudsskiltData,
    markeringsskiltData,
    opplysningsskiltData,
    påbudsskiltData,
    serviceskiltData,
    underskiltData,
    veivisningsskiltData,
    vikepliktsskiltData,
} from '../../assets/sign_descriptions/';

// may very well be the ugliest array in existence...
const signTypeArray = [
    {
        typeName: 'Fareskilt',
        typeObject: fareskiltData,
        buttonID: 0,
    },
    {
        typeName: 'Forbudsskilt',
        typeObject: forbudsskiltData,
        buttonID: 1,
    },
    {
        typeName: 'Markeringsskilt',
        typeObject: markeringsskiltData,
        buttonID: 2,
    },
    {
        typeName: 'Opplysningsskilt',
        typeObject: opplysningsskiltData,
        buttonID: 3,
    },
    {
        typeName: 'Påbudsskilt',
        typeObject: påbudsskiltData,
        buttonID: 4,
    },
    {
        typeName: 'Serviceskilt',
        typeObject: serviceskiltData,
        buttonID: 5,
    },
    {
        typeName: 'Underskilt',
        typeObject: underskiltData,
        buttonID: 6,
    },
    {
        typeName: 'Veivisningsskilt',
        typeObject: veivisningsskiltData,
        buttonID: 7,
    },
    {
        typeName: 'Vikeplikt- og forkjørsskilt',
        typeObject: vikepliktsskiltData,
        buttonID: 8,
    },
];

/**
 * @namespace RoadSignMenuContent
 * @category RoadSignComponents
 * @prop {function} handleSignType Handles the change from one signType to another
 * @prop {function} openBottomSheet Sets the state of bottomSheetHidden
 * @prop {function} handleHeaderName Handles the headername when signType changes
 * @returns Buttons for each signType
 */
const RoadSignMenuContent = (props) => {
    const [activeTypeID, setActiveTypeID] = useState(0);

    const {
        handleSignType,
        openBottomSheet,
        handleHeaderName,
        scrollToTop,
    } = props;

    /**
     * Function to change which sign type the
     * user is browsing
     * @memberof RoadSignMenuContent
     * @param {object} value The object of the chosen signType, contains name, description and image source
     */
    const handleBottomMenuPress = (value) => {
        handleSignType(value);
        openBottomSheet();
    };

    return (
        <View style={styles.container}>
            {signTypeArray.map((value, index) => {
                return (
                    <View key={index} style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={() => {
                                scrollToTop();
                                handleBottomMenuPress(value.typeObject);
                                setActiveTypeID(value.buttonID);
                                handleHeaderName(value.typeName);
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
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '2%',
    },
    buttonView: {
        width: '32%',
        height: '30%',
        alignItems: 'center',
        padding: '1%',
    },
    activeText: {
        color: Colors.secSlideTextActive,
    },
    inActiveText: {
        color: Colors.secSlideTextInactive,
        opacity: 0.9,
    },
    textStyle: {
        textAlign: 'center',
        padding: '6%',
        ...Typography.button,
    },
    button: {
        borderRadius: 10,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonActive: {
        backgroundColor: Colors.startScreenLinkTheory,
        elevation: 8,
    },
    buttonInActive: {
        backgroundColor: Colors.bottomMenyButtons,
        borderColor: Colors.bottomMenyButtons,
        borderWidth: 2,
    },
});

export default RoadSignMenuContent;
