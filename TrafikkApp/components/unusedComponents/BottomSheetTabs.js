import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, TabBar } from 'react-native-ui-lib';

import Color from '../../styles/Colors';

const BottomSheetTabs = React.memo((props) => {
    const { selectedRoadType, roadTypes, selectedRoad, onImageSelect } = props;

    const keys = Object.keys(roadTypes);

    return (
        <View style={styles.tabView}>
            {keys.map((key, i) => {
                const isOnTabAndKey =
                    selectedRoadType[0] == key &&
                    selectedRoadType[1] == selectedRoad;
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
});

const styles = StyleSheet.create({
    tabView: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: Color.tabViewBg,
    },
    activeButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.tabHeaderTextActive,
        padding: 10,
        marginHorizontal: 10,
    },
    inActiveButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.tabButtonBorder,
        padding: 10,
        marginHorizontal: 10,
    },
    buttonTextActive: {
        color: Color.tabHeaderTextActive,
    },
    buttonTextInactive: {
        color: Color.tabHeaderTextInactive,
    },
});

export default BottomSheetTabs;
