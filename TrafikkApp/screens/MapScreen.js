import React from 'react';
import { Header, MainView } from '../components/reusableComponents/index';
import MapArea from '../components/mapComponents/MapArea';
import { StyleSheet } from 'react-native';
import { Colors } from '../styles';

/**
 * The screen component for the map screen.
 * This screen shows a map (from Google Maps) over the users location.
 * @namespace MapScreen
 * @category Screens
 */
const MapScreen = () => {
    return (
        <MainView>
            <Header name="Kart" style={styles.header} />
            <MapArea />
        </MainView>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
});
