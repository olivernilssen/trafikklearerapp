import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, TabBar } from 'react-native-ui-lib';

import Color from '../../styles/Colors';

const BottomSheetTabs = (props) => {
    const { selectedRoadType, roadTypes, roadType } = props;

    const keys = Object.keys(roadTypes);

    return (
        <View style={styles.tabView}>
            {keys.map((key, i) => {
                const isOnTabAndKey =
                    selectedRoadType[0] == key &&
                    selectedRoadType[1] == roadType;
                return (
                    <TouchableOpacity
                        key={i}
                        style={
                            isOnTabAndKey
                                ? styles.activeButton
                                : styles.inActiveButton
                        }
                        onPress={() => onImageSelect(key)}>
                        <Text
                            style={
                                isOnTabAndKey
                                    ? styles.buttonTextActive
                                    : styles.buttonTextInactive
                            }>
                            {key.toString()}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabView: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    activeButton: {
        backgroundColor: Color.tabButtonActive,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Color.tabButtonBorder,
        padding: 10,
    },
    inActiveButton: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Color.tabButtonBorder,
        padding: 10,
    },
    buttonTextActive: {
        color: Color.textPrimary,
        fontWeight: 'bold',
    },
    buttonTextInactive: {
        color: Color.textPrimary,
    },
});

export default BottomSheetTabs;
