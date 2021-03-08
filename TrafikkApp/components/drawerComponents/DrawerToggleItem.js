import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../styles';

/**
 * Component for closing the drawer with button
 * Displayed as an X in the top left corner
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
        marginBottom: 15,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.iconActive,
    },
    menuIcon: {
        marginTop: 10,
        marginLeft: 10,
    },
});

export default DrawerToggleMenuItem;
