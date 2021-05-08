import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, MainView } from '../components/reusableComponents/index';
import MapArea from '../components/mapComponents/MapArea';

const MapScreen = ({ navigation }) => {
    return (
        <MainView>
            <Header
                name="Kart"
                style={styles.header}
                toggleDrawer={navigation.toggleDrawer}
            />
            <MapArea style={'nothinghere'} />
        </MainView>
    );
};

export default MapScreen;

const styles = StyleSheet.create({});
