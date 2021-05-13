import React from 'react';

import { MainView } from '../components/reusableComponents/';
import AuthorityPyramidArea from '../components/authorityPyramidComponents/AuthorityPyramidArea';

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
            <AuthorityPyramidArea />
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
