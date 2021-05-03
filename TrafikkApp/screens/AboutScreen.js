import React from 'react';
import { MainView } from '../components/reusableComponents/';
import AboutArea from '../components/aboutComponents/AboutArea';

/**
 * The screen component for the About App screen.
 * The screen displays some info about the app and contact information for the developers.
 * It also displays a button that sends the user to Google Play Store to review the app.
 * @namespace AboutScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const AboutScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <AboutArea
                navigate={navigation.navigate}
                toggleDrawer={navigation.toggleDrawer}
            />
        </MainView>
    );
});

export default AboutScreen;
