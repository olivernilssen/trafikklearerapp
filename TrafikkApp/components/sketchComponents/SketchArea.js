/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect, forwardRef } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
} from 'react-native';

import MainView from '../MainView';
import SketchHeader from './SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Color from '../../styles/Colors';

import ComponentMenuTop from './ComponentMenuTop';
import DraggableWithEverything from '../draggable/DraggableWithEverything';

import BottomSheet from './BottomSheet';
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
    const [currPencilColor, setPencilColor] = useState('#20303C');
    const [prevPencilColor, setPrevPencilColor] = useState('');
    const [currPencilSize, setPencilSize] = useState(10);
    const [currentImg, setImage] = useState(InitialImageSrc);
    const [topMenuHidden, setTopMenuHidden] = useState(true);
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [draggables, setDraggables] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [deletingItemId, setDeletingItemId] = useState(null);

    //Clear canvas if new image is loaded
    useEffect(() => {
        clearCanvas();
        setDraggables([]);
    }, [currentImg]);

    const onPencilColorChange = (color) => {
        setPencilColor(color);
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
        if (actionList.length == 0) return;

        const copyList = [...actionList];
        const lastItem = copyList.pop();

        if (lastItem.type == 'stroke') {
            sketchRef.current.undo();
        } else if (lastItem.type == 'draggable') {
            setDeletingItemId(lastItem.id);
        } else {
            console.log('error occured with deleting');
        }

        setActionList(copyList);
    };

    const clearCanvas = () => {
        sketchRef.current.clear();
        setDraggables([]);
    };

    const eraser = () => {
        if (currPencilColor != '#00000000') {
            setPrevPencilColor(currPencilColor);
            setPencilColor('#00000000');
        } else {
            currPencilColor;
        }
    };

    const onStrokeStart = () => {
        if (bottomSheetHidden == false)
            setBottomSheetHidden(!bottomSheetHidden);

        setActionList([...actionList, { type: 'stroke' }]);
    };

    const toggleMenu = () => {
        setTopMenuHidden(!topMenuHidden);
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
                topMenuHidden={toggleMenu}
                toggleRightMenuState={topMenuHidden}
            />

            <View style={styles.main}>
                <ImageBackground
                    resizeMode={'contain'}
                    style={styles.backgroundImage}
                    source={currentImg}>
                    <SketchCanvas
                        onStrokeStart={() => onStrokeStart()}
                        ref={sketchRef}
                        style={styles.sketchCanvas}
                        strokeColor={currPencilColor}
                        strokeWidth={currPencilSize}
                    />

                    <DraggableWithEverything
                        draggables={draggables}
                        setDraggables={setDraggables}
                        topMenuHidden={topMenuHidden}
                        deletingItemId={deletingItemId}
                        setActionList={setActionList}
                        actionList={actionList}
                    />

                    <BottomSheet
                        labelsArray={labelsArray}
                        imgSource={imgSource[props.name]}
                        onImageChange={setImage}
                        bottomSheetHidden={bottomSheetHidden}
                        setBottomSheetHidden={setBottomSheetHidden}
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
