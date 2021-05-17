import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography, Icons } from '../../styles';

/**
 * Component for the items that are shown in the drawer menu.
 * @namespace DrawerItem
 * @category NavigationComponents
 * @prop {int} screenIndex The index number of the screenIndex
 * @prop {string} screenName Screen name of the view
 * @prop {array} params Parameters for this view
 */
const DrawerItem = React.memo(({ navigateTo, isActive, params }) => {
    const { icon, title } = params;

    return (
        <TouchableOpacity
            style={[
                styles.menuItem,
                {
                    backgroundColor:
                        isActive == true
                            ? Colors.drawerIconActive
                            : Colors.drawerBg,
                },
            ]}
            activeOpacity={0.2}
            onPress={() => navigateTo()}>
            <View style={styles.iconContainer}>
                <MaterialIcon
                    name={icon}
                    size={Icons.medium}
                    color={
                        isActive == true
                            ? Colors.textSecondary
                            : Colors.slideTextInactive
                    }
                    style={styles.icon}
                />
            </View>

            <Text
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
