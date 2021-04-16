import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SectionList } from 'react-native';

import DrawerToggleItem from './DrawerToggleItem';
import DrawerItem from './DrawerItem';
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
    const [drawerInfo, setDrawerInfo] = useState({});

    useEffect(() => {
        var newArray = {};
        props.state.routes.forEach((screen) => {
            newArray[screen.params.section] = {
                nav: props.navigation,
                index: props.state.index,
                name: screen.name,
                key: screen.key,
                params: screen.params,
            };
        });
        setDrawerInfo(newArray);
        console.log([newArray]);
    }, []);

    return (
        <View style={styles.container}>
            <DrawerToggleItem navigation={props.navigation} icon={'times'} />
            <Divider
                style={styles.divider}
                borderColor={Colors.dividerPrimary}
            />
            {/* <SectionList
                sections={drawerInfo}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => <Item title={item.name} />}
                renderSectionHeader={({ section: test }) => <Text>test</Text>}
            /> */}
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
