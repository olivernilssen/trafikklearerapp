import React from 'react';

import { MainView } from '../components/reusableComponents/';
import StartArea from '../components/startScreenComponents/StartArea';

/**
 * Screen component for the start screen.
 * This screen contains clickable elements that redirects the user to the most important
 * screens in the app, and some clickable external links.
 * @namespace StartScreen
 * @category Screens
 */
const StartScreen = React.memo(() => {
    return (
        <MainView>
            <StartArea />
        </MainView>
    );
});

export default StartScreen;
