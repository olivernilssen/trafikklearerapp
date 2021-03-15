//
// ALL COLORS USED IN THE APP SHOULD BE DECLARED HERE

import { medium } from './typography';

//
const charcoal = '#4A4A4A';
const darkerCharchoal = '#404040';
const lightGray = '#DAD8D8';
const mediumGray = '#C3C2C2';
const darkGray = '#3B3B3B';
const black = '#242424';
const white = '#FFFFFF';
const mustard = '#E2BD38';

const green = '#66DA8D';
const blue = '#79B7DA';
const blueGray = '#CDD7DC';
const blueGreen = '#56B897';

const red = '#FB5555';

export default {
    // Main
    background: darkGray,
    header: darkGray,

    // Text and icons
    textDark: darkGray,
    textLight: white,
    icons: lightGray,
    iconActive: charcoal, // or mustard?
    drawerIconActive: blueGreen,
    links: 'blue',

    // Buttongroup
    slideActiveBg: blueGreen,
    slideInactiveBg: darkGray,
    slideTextActive: darkGray,
    slideTextInactive: mediumGray,

    // StartScreen
    startScreenLinkDrawing: blueGreen,
    startScreenLinkTheory: blue,
    startScreenLinkLink: lightGray,

    // Sketch screens
    sketchBackground: charcoal,
    componentMenu: charcoal,
    componentMenuSection: darkerCharchoal,
    componentMenuButtons: darkGray,
    bottomMeny: darkGray,
    bottomMenyButtons: charcoal,

    // SketchHeader
    boxIconActive: mustard,
    eraserIconActive: blueGreen,
    pencilThicknessBox: black,
    colorPaletteMenu: charcoal,
    deleteButton: darkGray,
    deleteButtonActive: red,

    // ButtonGroup in ComponentMenu
    secSlideActiveBg: blueGreen,
    secSlideInactiveBg: darkerCharchoal,
    secSlideTextActive: darkGray,
    secSlideTextInactive: mediumGray,

    textInputBg: charcoal,
};
