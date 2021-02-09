import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainDrawer from './components/drawerComponents/MainDrawer';

export default function App() {
    return (
        <NavigationContainer>
            <MainDrawer />
        </NavigationContainer>
    );
}
