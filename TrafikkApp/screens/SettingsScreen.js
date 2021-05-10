import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MainView, Header, Overlay } from '../components/reusableComponents/';
import { Colors } from '../styles';
import { SettingsView } from '../components/settingsComponents/';
import { useOpen } from '../components/helpers/useOpen';

/**
 * Screen component for the settings screen (TODO)
 * @namespace SettingsScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const SettingsScreen = React.memo(({ navigation }) => {
    const pickerVisible = useOpen(false);
    const overlayVisiable = useOpen(!pickerVisible.isOpen);

    useEffect(() => {
        if (!pickerVisible.isOpen) overlayVisiable.onClose();
        else if (pickerVisible.isOpen) overlayVisiable.onOpen();
    }, [pickerVisible.isOpen]);

    return (
        <MainView>
            <Overlay showOverlay={overlayVisiable} />
            <View style={styles.main}>
                <Header
                    name="Innstillinger"
                    toggleDrawer={navigation.toggleDrawer}
                    style={styles.header}
                />
                <View style={styles.content}>
                    <SettingsView pickerVisible={pickerVisible} />
                </View>
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    main: {
        height: '100%',
        width: '100%',
        zIndex: 2,
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.sketchBackground,
    },
});

export default SettingsScreen;
