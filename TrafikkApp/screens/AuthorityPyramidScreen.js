import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { MainView, Header } from '../components/reusableComponents/';
import { Colors } from '../styles';

/**
 * The screen component for the authority pyramid
 * @namespace AuthorityPyramidScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const AuthorityPyramidScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <Header
                name="Myndighetspyramiden"
                navigation={navigation}
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
        height: '100%',
    },
});

export default AuthorityPyramidScreen;
