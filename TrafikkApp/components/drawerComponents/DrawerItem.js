import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../styles/Colors';

const DrawerItem = ({ navigation, screenIndex, screenName, params }) => {
    const { icon, value, title } = params;
    return (
        <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.2}
            onPress={() =>
                navigation.navigate(`${screenName}`, {
                    isStatusBarHidden: false,
                })
            }>
            <Icon
                name={icon}
                size={25}
                color={
                    screenIndex == value
                        ? Color.drawerActiveText
                        : Color.drawerInactiveText
                }
                style={{ margin: 15 }}
            />
            <Text
                style={[
                    styles.menuItemText,
                    {
                        color:
                            screenIndex == value
                                ? Color.drawerActiveText
                                : Color.drawerInactiveText,
                    },
                ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        marginBottom: 15,
        // color: 'red',
    },
    menuItemText: {
        fontSize: 20,
        fontWeight: '300',
        margin: 15,
        // color: Colors.light,
    },
});

export default DrawerItem;
