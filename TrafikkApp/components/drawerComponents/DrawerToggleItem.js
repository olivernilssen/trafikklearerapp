import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../styles';

/**
 * Component to display the menu as a flatlist in
 * the navigation drawer (will add all items that are in props.state.routes)
 * @namespace drawerComponents
 * @memberof DrawerToggleMenuItem
 * @prop {function} navigation functions for the drawer navigation
 * @prop {string} icon the icon name for this screen item
 */
const DrawerToggleMenuItem = React.memo(({ navigation, icon }) => (
    <TouchableOpacity
        style={styles.menuItem}
        activeOpacity={0.8}
        onPress={() => navigation.toggleDrawer()}>
        <Icon
            name={icon}
            size={35}
            color={Colors.icons}
            style={styles.menuIcon}
        />
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        marginBottom: 6,
        paddingBottom: 10,
        paddingLeft: 15,
    },
    menuIcon: {
        marginTop: 10,
        marginLeft: 10,
    },
});

export default DrawerToggleMenuItem;
