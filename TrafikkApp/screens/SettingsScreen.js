import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainView from '../components/MainView';
import Header from '../components/Header.js';
import { Colors } from '../styles';

/**
 * Screen component for the settings screen (TODO)
 */
const SettingsScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <Header name="Innstillinger" navigation={navigation} />
            <View style={styles.main}>
                <Text>Innstillinger</Text>
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.sketchBackground,
    },
});

export default SettingsScreen;
