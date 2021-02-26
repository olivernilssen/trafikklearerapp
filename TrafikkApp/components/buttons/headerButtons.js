import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Color from '../../styles/Colors';
import { Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, View, Button } from 'react-native-ui-lib';

const IconButtons = (item, index) => {
    return (
        <View style={styles.spacedRight} key={index}>
            <TouchableOpacity
                onPress={() => {
                    item.pressed(),
                        // setActive(item.active, item.active),
                        focusedActiveButton(item.active);
                }}>
                <Icon
                    name={item.iconName}
                    style={
                        isActive === index
                            ? styles.buttonActive
                            : [styles.buttonSize, styles.buttonInactive]
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

export { IconButtons };
