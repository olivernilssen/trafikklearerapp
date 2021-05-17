import React from 'react';

import { MainView } from '../components/reusableComponents/';
import { AuthorityPyramidArea } from '../components/authorityPyramidComponents/';

/**
 * The screen component for the authority pyramid.
 * This screen contains only an image of the pyramid.
 * @namespace AuthorityPyramidScreen
 * @category Screens
 */
const AuthorityPyramidScreen = React.memo(() => {
    return (
        <MainView>
            <AuthorityPyramidArea />
        </MainView>
    );
});

export default AuthorityPyramidScreen;
