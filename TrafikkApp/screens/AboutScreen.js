import React from 'react';
import { MainView } from '../components/reusableComponents/';
import { AboutArea } from '../components/aboutComponents/';

/**
 * The screen component for the About App screen.
 * The screen displays some info about the app and contact information for the developers.
 * It also displays a button that sends the user to Google Play Store to review the app.
 * @namespace AboutScreen
 * @category Screens
 */
const AboutScreen = React.memo(() => {
    return (
        <MainView>
            <AboutArea />
        </MainView>
    );
});

export default AboutScreen;
