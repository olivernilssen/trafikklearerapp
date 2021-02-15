import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu'

import MainDrawer from './components/drawerComponents/MainDrawer';

export default function App() {
    return (
        <MenuProvider>
            <NavigationContainer>
                <MainDrawer />
            </NavigationContainer>
        </MenuProvider>
    );
}
