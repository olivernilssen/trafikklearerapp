import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import Colors from '../../styles/Colors';
import DrawerToggleMenuItem from './DrawerToggleMenuItem';
import DrawerItem from './DrawerItem';

class DrawerMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <DrawerToggleMenuItem
                    navigation={this.props.navigation}
                    icon={'times'}
                />
                <FlatList
                    data={this.props.state.routes}
                    renderItem={({ item }) => (
                        <DrawerItem
                            navigation={this.props.navigation}
                            screenIndex={this.props.state.index}
                            screenName={item.name}
                            params={item.params}
                            key={item.key}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark,
        paddingTop: 15,
        paddingHorizontal: 15,
    },
});

export default DrawerMenu;
