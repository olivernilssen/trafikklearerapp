/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import MainView from '../MainView';
import SketchHeader from './SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Color from '../../styles/Colors';
<<<<<<< HEAD
import BottomSheet from './BottomSheet';
=======
import ComponentMenuTop from './ComponentMenuTop';
import BottomSheet from './bottomSheet';
>>>>>>> 3cc835ca161ec3a4412275ad0d8783fb361fb9d5

import imgSource from './illustrationsPath';

const SketchArea = (props) => {
    const labelsArray = [];
    const roadTypes = imgSource[props.name];

    //Get all the keys from our imgSource (høyre, lys etc for labels)
    const keys = Object.keys(roadTypes);
    keys.map((keys) => {
        labelsArray.push(keys);
    });

    const initialImageSrcName = Object.keys(roadTypes[labelsArray[0]])[0];
    const InitialImageSrc = roadTypes[labelsArray[0]][initialImageSrcName];

    const sketchRef = useRef();
    const bottomSheetRef = useRef();
    const [currPencilColor, setPencilColor] = useState('black');
    const [prevPencilColor, setPrevPencilColor] = useState('');
    const [currPencilSize, setPencilSize] = useState(10);
    const [currentImg, setImage] = useState(InitialImageSrc);
    const [toggleRightMenu, setToggleRightMenu] = useState(false);

    //Clear canvas if new image is loaded
    useEffect(() => {
        clearCanvas();
    }, [currentImg]);

    const onPencilColorChange = (color) => {
        setPencilColor(color);
        console.log(color);
    };

    const onSwitchPencilColor = () => {
        if (currPencilColor === '#00000000') {
            setPencilColor(prevPencilColor);
        } else setPencilColor(currPencilColor);
    };

    const onChangePencilSize = (newPencilSize) => {
        setPencilSize(newPencilSize);
    };

    const undoChange = () => {
        sketchRef.current.undo();
    };

    const clearCanvas = () => {
        sketchRef.current.clear();
    };

    const eraser = () => {
        if (currPencilColor != '#00000000') {
            setPrevPencilColor(currPencilColor);
            setPencilColor('#00000000');
        } else {
            currPencilColor;
        }
    };

    const toggleMenu = () => {
        setToggleRightMenu(!toggleRightMenu);
    };

    //Vil at denne skal kjøre om bruker trykker utenfor viewen men det er ikke
    //så jævla enkelt haha. Vi må nok sette opp en form form guesture event listener som
    //ikke alltid er så enkelt.. hmm
    const toggleBottomSheet = () => {
        this.bottomSheetRef.current.onHiddenViewChange();
    };

    return (
        <MainView>
            <SketchHeader
                pencil={onSwitchPencilColor}
                undo={undoChange}
                clear={clearCanvas}
                eraser={eraser}
                onPencilColorChange={onPencilColorChange}
                navigation={props.navigation}
                name={props.name}
                toggleRightMenu={toggleMenu}
            />

            <View style={styles.main}>
                <ImageBackground
                    resizeMode={'contain'}
                    style={styles.backgroundImage}
                    source={currentImg}>
                    <ComponentMenuTop
                        toggleRightMenu={toggleRightMenu}
                        setToggleRightMenu={toggleMenu}
                    />
                    <SketchCanvas
                        ref={sketchRef}
                        style={styles.sketchCanvas}
                        strokeColor={currPencilColor}
                        strokeWidth={currPencilSize}
                    />

                    <BottomSheet
                        // ref={bottomSheetRef}
                        labelsArray={labelsArray}
                        imgSource={imgSource[props.name]}
                        onImageChange={setImage}
                    />
                </ImageBackground>
            </View>
        </MainView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Color.sketchBg,
    },
    sketchCanvas: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.header,
    },
});

export default SketchArea;
