import * as React from 'react'
import { Button, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import MyDrawer from './components/Drawer.js'

export default function App() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    )
}
