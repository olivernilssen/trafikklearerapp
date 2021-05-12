import React from 'react';
import { Header, MainView } from '../components/reusableComponents/index';
import MapArea from '../components/mapComponents/MapArea';
import { StyleSheet } from 'react-native';

/**
 * This show the Map screen with a google map
 * @param {object} navigation navigation param sent from the navigator
 * @returns
 */
const MapScreen = ({ navigation }) => {
    return (
        <MainView>
            <Header name="Kart" style={styles.header} t />
            <MapArea />
        </MainView>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        elevation: 10,
    },
});
