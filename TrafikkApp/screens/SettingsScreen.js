import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MainView, Header } from '../components/reusableComponents/';
import { Colors } from '../styles';
import { SettingsView } from '../components/settingsComponents/';

/**
 * Screen component for the settings screen (TODO)
 * @namespace SettingsScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const SettingsScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <Header name="Innstillinger" navigation={navigation} />
            <View style={styles.main}>
                <SettingsView />
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.sketchBackground,
    },
});

export default SettingsScreen;
