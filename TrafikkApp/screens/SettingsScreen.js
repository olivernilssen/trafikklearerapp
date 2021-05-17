import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { MainView, Header, Overlay } from '../components/reusableComponents/';
import { Colors } from '../styles';
import { SettingsArea } from '../components/settingsComponents';
import { useOpen } from '../components/helpers';

/**
 * Screen component for the settings screen.
 * This screen contains a list of settings the user can set, to change the behaviour of some functions in the app.
 * The choices the user can make includes changing eraser size, pencil color, color of draggable objects, which
 * draggable objects to be displayed in the sketch screens, and if the drawing is to be erased when changing background image.
 * @namespace SettingsScreen
 * @category Screens
 */
const SettingsScreen = React.memo(() => {
    const pickerVisible = useOpen(false);
    const overlayVisiable = useOpen(!pickerVisible.isOpen);

    /** Use effect to either show or hide the overlay. The overlay is shown
     * when the modal where the user can change between draggable objects is open.
     * Is triggeres when the modal is open.
     * @memberof SettingsScreen
     */
    useEffect(() => {
        if (!pickerVisible.isOpen) overlayVisiable.onClose();
        else if (pickerVisible.isOpen) overlayVisiable.onOpen();
    }, [pickerVisible.isOpen]);

    return (
        <MainView>
            <Overlay showOverlay={overlayVisiable} />
            <View style={styles.main}>
                <Header name="Innstillinger" style={styles.header} />
                <View style={styles.content}>
                    <SettingsArea pickerVisible={pickerVisible} />
                </View>
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
