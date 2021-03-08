/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
} from 'react-native';

import MainView from '../MainView';
import SketchHeader from '../sketchHeader/SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Color from '../../styles/Colors';

import DraggableWithEverything from '../draggable/DraggableWithEverything';
import BottomMenuAnimated from '../bottomMenuComponent/BottomMenuAnimated';

/**
 * This is a big component that contains all the components that are visible
 * on the sketcharea screens.
 */
const SketchArea = React.memo((props) => {
    const sketchRef = useRef();

    const [currPencilColor, setPencilColor] = useState('#CF262F');
    const [prevPencilColor, setPrevPencilColor] = useState('red');
    const [currPencilSize, setPencilSize] = useState(5);
    const [prevPencilSize, setPrevPencilSize] = useState(null);
    const [currentImg, setImage] = useState();
    const [topMenuHidden, setTopMenuHidden] = useState(true);
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [draggables, setDraggables] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [deletingItemId, setDeletingItemId] = useState(null);
    const [extensionType, setExtensionType] = useState('vanlig');

    /**
     * useEffect that is triggered when currentImg is changed
     * Will clear the canvas and delete all objects on the screen
     */
    useEffect(() => {
        clearCanvas();
    }, [currentImg]);

    /**
     * Changes the pencil color according to user input
     * @param {String} color
     */
    const onPencilColorChange = (color) => {
        setPencilColor(color);
        if (prevPencilSize != null) {
            setPencilSize(prevPencilSize);
        }
    };

    /**
     * Changes the pencil color according to user input
     */
    const onSwitchPencilColor = useCallback(() => {
        if (currPencilColor === '#00000000') {
            setPencilColor(prevPencilColor);
            setPencilSize(5);
        } else {
            setPencilColor(currPencilColor);
            setPencilSize(5);
        }
    }, [currPencilColor]);

    /**
     * Function to change the pencil brush size
     * @param {int} newPencilSize
     */
    const onChangePencilSize = (newPencilSize) => {
        setPencilSize(newPencilSize);
    };

    /**
     * Function to undo the previous action of the user
     * will remove strokes or draggables
     * Does not unto draggable movements
     */
    const undoChange = useCallback(() => {
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
    }, [actionList]);

    /**
     * When strokeEnded the added path/stroke
     * is added to actionList to keep track of undo actions
     */
    const onStrokeEnd = useCallback(() => {
        setActionList([...actionList, { type: 'stroke' }]);
    });

    /**
     * Function to clear the canvas and set draggables to empty list
     */
    const clearCanvas = useCallback(() => {
        sketchRef.current.clear();
        setDraggables([]);
    });

    /**
     * Function to set the pencil to an eraser
     */
    const eraser = useCallback(() => {
        if (currPencilColor != '#00000000') {
            setPrevPencilColor(currPencilColor);
            setPencilColor('#00000000');
            setPrevPencilSize(currPencilSize);
            setPencilSize(80);
        } else {
            currPencilColor;
            setPencilSize(prevPencilSize);
        }
    }, [currPencilColor]);

    /**
     * Function to hide the bottomsheet when user starts
     * drawing on the canvas
     */
    const onStrokeStart = useCallback(() => {
        if (bottomSheetHidden == false)
            setBottomSheetHidden(!bottomSheetHidden);
    }, [bottomSheetHidden]);

    /**
     * Function to toggle the topmenu to hidden or not hidden
     */
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
                onChangePencilSize={onChangePencilSize}
            />

            <View style={styles.main}>
                <ImageBackground
                    resizeMode={'cover'}
                    style={styles.backgroundImage}
                    source={currentImg}>
                    <SketchCanvas
                        onStrokeStart={() => onStrokeStart()}
                        onStrokeEnd={() => onStrokeEnd()}
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
                        setExtensionType={setExtensionType}
                    />

                    <BottomMenuAnimated
                        roadType={props.name}
                        setImage={setImage}
                        extensionType={extensionType}
                        bottomSheetHidden={bottomSheetHidden}
                        setBottomSheetHidden={setBottomSheetHidden}
                    />
                </ImageBackground>
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Color.sketchBg,
        justifyContent: 'center',
    },
    sketchCanvas: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        flex: 1, // Denne må fjernes hvis bildet ikke skal skalere opp
        // marginVertical: 100,
        width: '100%',
        height: '100%', // Må stå som 'undefined'
        // aspectRatio: 1752 / 2263,
        // alignSelf: 'center', // Må stå som 'stretch' hvis bildet ikke skal skalere opp
        backgroundColor: Color.header,
    },
});

export default SketchArea;
