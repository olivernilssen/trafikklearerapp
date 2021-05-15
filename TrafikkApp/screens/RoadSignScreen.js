import React from 'react';
import { MainView } from '../components/reusableComponents/';
import { RoadSignArea } from '../components/roadSignComponents/';

/**
 * Screen component for the sign screen.
 * The screen displays a list of road signs as images, when pressed these images will open up a
 * modal with a bigger version of the pressed image and the possibility of showing a description of said sign.
 * There are multiple signtypes, and it is possible to switch between these using the bottom menu.
 * @namespace RoadSignScreen
 * @category Screens
 */

const RoadSignScreen = React.memo(() => {
    return (
        <MainView>
            <RoadSignArea />
        </MainView>
    );
});

export default RoadSignScreen;
