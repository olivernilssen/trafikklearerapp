import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { MainView, Header } from '../components/reusableComponents/';
import { Colors } from '../styles';
import AuthorityPyramidArea from '../components/AuthorityPyramidComponents/AuthorityPyramidArea';

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
            <AuthorityPyramidArea toggleDrawer={navigation.toggleDrawer} />
        </MainView>
    );
});

// const styles = StyleSheet.create({
//     header: {
//         borderBottomWidth: 1,
//         borderBottomColor: Colors.dividerPrimary,
//         elevation: 10,
//     },
//     main: {
//         flex: 1,
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.sketchBackground,
//     },
//     image: {
//         width: '95%',
//         height: '95%',
//     },
// });

export default AuthorityPyramidScreen;
