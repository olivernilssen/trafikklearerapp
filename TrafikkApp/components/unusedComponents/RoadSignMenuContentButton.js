import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../styles';

const RoadSignMenuContentButton = (props) => {
    const {
        value,
        index,
        handleBottomMenuPress,
        handleActiveButton,
        activeTypeID,
    } = props;

    return (
        <View
            style={{
                width: '30%',
                alignItems: 'flex-start',
                paddingVertical: 10,
            }}>
            <TouchableOpacity
                onPress={() => {
                    handleBottomMenuPress(value.typeObject);
                    handleActiveButton(value.buttonID);
                }}
                style={
                    activeTypeID === value.buttonID
                        ? { backgroundColor: 'black' }
                        : { backgroundColor: 'grey' }
                }>
                <Text style={styles.textStyle}>{value.typeName}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    // container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    textStyle: {
        fontSize: 30,
        color: 'white',
    },
    buttonActive: {
        backgroundColor: 'black',
    },
    buttonInActive: {
        backgroundColor: Colors.slideInactiveBg,
    },
});

export default RoadSignMenuContentButton;
