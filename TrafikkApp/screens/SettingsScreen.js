import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainView from '../components/reusableComponents/MainView';
import Header from '../components/reusableComponents/Header';
import { Colors } from '../styles';
import SettingsView from '../components/settingsComponents/SettingsView';
// import SettingsView from '../components/settingsComponents/SettingsView';

/**
 * Screen component for the settings screen (TODO)
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
