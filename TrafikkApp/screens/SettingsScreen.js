import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MainView, Header, Overlay } from '../components/reusableComponents/';
import { Colors } from '../styles';
import { SettingsView } from '../components/settingsComponents/';

/**
 * Screen component for the settings screen (TODO)
 * @namespace SettingsScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const SettingsScreen = React.memo(({ navigation }) => {
    const [pickerVisible, setPickerVisible] = useState(false);

    return (
        <MainView>
            <Overlay
                showOverlay={!pickerVisible}
                setShowOverlay={setPickerVisible}
            />
            <Header
                name="Innstillinger"
                navigation={navigation}
                style={styles.header}
            />

            <View style={styles.main}>
                <SettingsView
                    pickerVisible={pickerVisible}
                    setPickerVisible={setPickerVisible}
                />
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        // elevation: 10,
    },
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.sketchBackground,
    },
});

export default SettingsScreen;
