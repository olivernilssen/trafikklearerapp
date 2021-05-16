import React from 'react';

import { MainView } from '../components/reusableComponents';
import CurriculumArea from '../components/curriculumObjectivesComponents/CurriculumArea';

/**
 * The screen component for the curriculum objectives for traffic training.
 * This screen contains a menu to chose between the different curriculum objectives,
 * and displays the text on the screen.
 * @namespace CurriculumObjectivesScreen
 * @category Screens
 */
const CurriculumObjectivesScreen = React.memo(() => {
    return (
        <MainView>
            <CurriculumArea />
        </MainView>
    );
});

export default CurriculumObjectivesScreen;
