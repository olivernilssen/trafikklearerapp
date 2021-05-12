import React from 'react';
import { View } from 'react-native';
import { MainView } from '../components/reusableComponents/';
import { RoadSignArea } from '../components/roadSignComponents/';

/**
 * Screen component for sign screen
 * Displays a list of roadsigns as images, when pressed these images will open up a
 * modal with a bigger versjon of the pressed image and the possibility of showing a description of said sign.
 * There are multiple signtypes, and it is possible to switch between these using the bottomSheetMenu
 * @namespace RoadSignScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */

const RoadSignScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <RoadSignArea />
        </MainView>
    );
});

export default RoadSignScreen;
