//
// ALL COLORS USED IN THE APP SHOULD BE DECLARED HERE
//
const lightCharcoal = '#747474';
const charcoal = '#4A4A4A';
const darkCharcoal = '#434343';
const darkerCharchoal = '#404040';

const lightGray = '#DAD8D8';
const mediumGray = '#C3C2C2';

const darkGray = '#3B3B3B';
const darkerGray = '#393939';
const evenDarkerGray = '#2E2E2E';

const black = '#242424';
const white = '#FFFFFF';

const mustard = '#E2BD38';
const green = '#66DA8D';
const blue = '#79B7DA';
const blueGray = '#CDD7DC';
const blueGreen = '#56B897';
const darkerBlue = '#22a6dd';

const red = '#FB5555';

// DEFINING PRIMARY COLOR, SECONDARY COLOR, ACCENT COLOR ++
const accentColor = blueGreen;

export default {
    // Main
    headerBg: darkGray,
    drawerBg: darkGray,
    dividerPrimary: charcoal,
    dividerSecondary: lightGray,

    // Text and icons
    textPrimary: white,
    textSecondary: darkGray,
    logo: accentColor,
    icons: lightGray,
    iconActive: charcoal, // or mustard?
    drawerIconActive: blueGreen,
    links: blue,

    // Buttongroup
    slideActiveBg: blueGreen,
    slideInactiveBg: darkGray,
    slideTextActive: darkGray,
    slideTextInactive: mediumGray,

    secSlideActiveBg: blueGreen,
    secSlideInactiveBg: darkerGray,
    secSlideTextActive: darkGray,
    secSlideTextInactive: mediumGray,

    // BottomMenu
    bottomMeny: darkGray,
    bottomMenyButtons: charcoal,

    // StartScreen
    startScreenBg: darkGray,
    startScreenLinkDrawing: blueGreen,
    startScreenLinkTheory: blue,
    startScreenLinkLink: charcoal,
    footer: darkerGray,

    // Sketch screens
    sketchBackground: evenDarkerGray,
    componentMenu: charcoal,
    componentMenuButtons: darkGray,
    componentMenuSection: darkCharcoal,

    // SketchHeader
    boxIconActive: mustard,
    eraserIconActive: blueGreen,
    pencilThicknessBox: black,
    colorPaletteMenu: charcoal,
    deleteButton: darkGray,
    deleteButtonActive: red,

    // Curriculum screen
    curriculumBg: evenDarkerGray,
    curriculumCards: darkGray, //'#171717',

    //imagePicker
    selectedBorder: blue,
    modalBg: darkGray,
    modalButtonSave: blueGreen,
    modalButtonClose: red,
    modalButtonDeselect: blue,
    modalText: lightGray,

    //misc
    warning: red,
    alertButton: accentColor,
    alertButtonSecondary: lightCharcoal,
};
