import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Typography, Icons } from '../../styles';

/**
 * Components item that are shown in the navigation drawer
 * @namespace drawerComponents
 * @memberof DrawerItem
 * @prop {function} navigation functions for the drawer navigation
 * @prop {int} screenIndex the index number of the screenIndex
 * @prop {string} screenName screen name of the view
 * @prop {array[]} params parameters for this view
 */
const DrawerItem = React.memo(
    ({ navigation, screenIndex, screenName, params }) => {
        const { icon, value, title } = params;
        return (
            <TouchableOpacity
                style={[
                    styles.menuItem,
                    {
                        backgroundColor:
                            screenIndex == value
                                ? Colors.drawerIconActive
                                : Colors.drawerBg,
                    },
                ]}
                activeOpacity={0.2}
                onPress={() =>
                    navigation.navigate(`${screenName}`, {
                        isStatusBarHidden: false,
                    })
                }>
                <Icon
                    name={icon}
                    size={Icons.medium}
                    color={
                        screenIndex == value
                            ? Colors.textSecondary
                            : Colors.icons
                    }
                    style={{ margin: 15 }}
                />
                <Text
                    style={[
                        styles.menuItemText,
                        {
                            color:
                                screenIndex == value
                                    ? Colors.textSecondary
                                    : Colors.icons,
                        },
                    ]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
        color: Colors.icons,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 10,
    },
    menuItemText: {
        // fontSize: 20,
        fontWeight: '300',
        margin: 12,
        textAlign: 'center',
        ...Typography.body,
    },
});

export default DrawerItem;
