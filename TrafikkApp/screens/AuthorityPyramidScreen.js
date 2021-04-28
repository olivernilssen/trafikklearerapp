import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { MainView, Header } from '../components/reusableComponents/';
import { Colors } from '../styles';

/**
 * The screen component for the authority pyramid.
 * This screen contains only an image of the pyramid.
 * @namespace AuthorityPyramidScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const AuthorityPyramidScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <Header
                name="Myndighetspyramiden"
                toggleDrawer={navigation.toggleDrawer}
                style={styles.header}></Header>
            <View style={styles.main}>
                <Image
                    resizeMode={'contain'}
                    source={require('../assets/images/myndighetspyramiden.png')}
                    style={styles.image}
                />
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
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.sketchBackground,
    },
    image: {
        width: '95%',
        height: '95%',
    },
});

export default AuthorityPyramidScreen;
