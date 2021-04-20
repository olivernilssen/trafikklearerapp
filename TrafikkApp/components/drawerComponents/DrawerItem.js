import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography, Icons } from '../../styles';

/**
 * Components item that are shown in the navigation drawer
 * @namespace DrawerItem
 * @category DrawerComponents
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
                <View style={styles.iconContainer}>
                    <MaterialIcon
                        name={icon}
                        size={Icons.medium}
                        color={
                            screenIndex == value
                                ? Colors.textSecondary
                                : Colors.slideTextInactive
                        }
                        style={styles.icon}
                    />
                </View>

                <Text
                    style={[
                        styles.menuItemText,
                        {
                            color:
                                screenIndex == value
                                    ? Colors.textSecondary
                                    : Colors.slideTextInactive,
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
        marginBottom: 10,
        alignItems: 'center',
        color: Colors.icons,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 10,
    },
    iconContainer: {
        width: 65,
    },
    icon: {
        margin: 15,
    },
    menuItemText: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: '300',
        margin: 12,
        textAlign: 'left',
        ...Typography.body,
    },
});

export default DrawerItem;
