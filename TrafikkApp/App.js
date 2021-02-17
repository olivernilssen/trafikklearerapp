import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';

import Navigator from './components/drawerComponents/Navigator';

export default function App() {
    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    );
}
