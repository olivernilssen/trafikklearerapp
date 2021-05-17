import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../styles';

/**
 * Component to display the hamburger icon to toggle the drawer menu.
 * @namespace DrawerToggle
 * @category NavigationComponents
 * @prop {function} toggleDrawer Functions for the drawer toggleDrawer
 * @prop {string} icon The icon name for this screen item
 */
const DrawerToggle = React.memo(({ toggleDrawer, icon }) => (
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
        width: '15%',
        margin: 20,
    },
});

export default DrawerToggle;
