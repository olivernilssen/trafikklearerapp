import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography, Icons } from '../../styles';

/**
 * Component for the items that are shown in the drawer.
 * @namespace DrawerItem
 * @category NavigationComponent
 * @prop {int} screenIndex the index number of the screenIndex
 * @prop {string} screenName screen name of the view
 * @prop {array} params parameters for this view
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
                    styles.menuItemText,
                    {
                        color:
                            isActive == true
                                ? Colors.textSecondary
                                : Colors.slideTextInactive,
                    },
                ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        color: Colors.icons,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 15,
    },
    iconContainer: {},
    icon: {
        margin: '5%',
    },
    menuItemText: {
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,
        marginVertical: '5%',
        textAlign: 'left',
        ...Typography.body,
    },
});

export default DrawerItem;
