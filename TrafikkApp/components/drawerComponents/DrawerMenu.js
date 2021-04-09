import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { DrawerToggleItem, DrawerItem } from '.';
import { Divider } from '../reusableComponents/';
import { Colors } from '../../styles';

/**
 * Component to display the menu as a flatlist in
 * the navigation drawer (will add all items that are in props.state.routes)
 * @namespace DrawerMenu
 * @category DrawerComponents
 * @prop {function} navigation functions for the drawer navigation
 */
const DrawerMenu = React.memo((props) => {
    return (
        <View style={styles.container}>
            <DrawerToggleItem navigation={props.navigation} icon={'times'} />
            <Divider
                style={styles.divider}
                borderColor={Colors.dividerPrimary}
            />
            <FlatList
                data={props.state.routes}
                renderItem={({ item }) => (
                    <DrawerItem
                        navigation={props.navigation}
                        screenIndex={props.state.index}
                        screenName={item.name}
                        params={item.params}
                        key={item.key}
                    />
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.drawerBg,
        paddingTop: 15,
        // paddingHorizontal: 15,
    },
    divider: {
        marginBottom: 10,
    },
});

export default DrawerMenu;
