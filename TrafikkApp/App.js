import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainDrawer from './components/Drawer';

export default function App() {
    return (
        <NavigationContainer>
            <MainDrawer />
        </NavigationContainer>
    );
}
