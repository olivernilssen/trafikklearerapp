import React from 'react';

import { MainView } from '../components/reusableComponents/';
import StartArea from '../components/startScreenComponents/StartArea';

/**
 * Screen component for the start screen.
 * Contains links to the most important screens in the app, and some clickable external links.
 * @namespace StartScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const StartScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <StartArea />
        </MainView>
    );
});

export default StartScreen;
