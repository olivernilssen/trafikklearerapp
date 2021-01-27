import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import drawerStyles from '../styles/drawerStyle.js'
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer'

const menuData = [
    {
        icon: 'home',
        name: 'Hjem',
        screenName: 'StartScreen',
        key: 0,
        value: 0,
    },
    {
        icon: 'sliders',
        name: 'Innstillinger',
        screenName: 'SettingsScreen',
        key: 1,
        value: 1,
    },
    {
        icon: 'road',
        name: 'Veikryss',
        screenName: 'IntersectionScreen',
        key: 2,
        value: 2,
    },
]

class DrawerMenu extends Component {
    render() {
        return (
            <View style={drawerStyles.container}>
                <BackItem navigation={this.props.navigation} icon={'times'} />
                {/* <DrawerItemList
                    icon={({ name, color, size }) => (
                        <Icon color={color} size={size} name={name} />
                    )}
                    inactiveTintColor="white"
                    activeTintColor="white"
                    {...this.props}
                /> */}
                <FlatList
                    data={menuData}
                    renderItem={({ item }) => (
                        <DrawerItem
                            navigation={this.props.navigation}
                            state={this.props.state}
                            screenName={item.screenName}
                            icon={item.icon}
                            name={item.name}
                            value={item.value}
                        />
                    )}
                />
            </View>
        )
    }
}

const DrawerItem = ({ navigation, state, icon, name, screenName, value }) => (
    <TouchableOpacity
        style={drawerStyles.menuItem}
        activeOpacity={0.2}
        onPress={() =>
            navigation.navigate(`${screenName}`, {
                isStatusBarHidden: false,
            })
        }
    >
        <Icon
            name={icon}
            size={25}
            color={state.index == value ? '#f05454' : '#DDDDDD'}
            style={{ margin: 15 }}
        />
        <Text
            style={[
                drawerStyles.menuItemText,
                {
                    color: state.index == value ? '#f05454' : '#DDDDDD',
                },
            ]}
        >
            {name}
        </Text>
    </TouchableOpacity>
)

const BackItem = ({ navigation, icon }) => (
    <TouchableOpacity
        style={[{ paddingBottom: 20 }, drawerStyles.menuItem]}
        activeOpacity={0.2}
        onPress={() => navigation.toggleDrawer()}
    >
        <Icon
            name={icon}
            size={35}
            color="#DDDDDD"
            style={{ marginTop: 10, marginLeft: 10 }}
        />
    </TouchableOpacity>
)

export default DrawerMenu
