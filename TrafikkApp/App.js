import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from './components/drawerComponents/Navigator';

export default function App() {
    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    );
}
