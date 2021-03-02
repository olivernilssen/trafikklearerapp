/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect, useCallback } from 'react';
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

import DraggableWithEverything from '../draggable/DraggableWithEverything';
import BottomMenuAnimated from '../bottomMenuComponent/BottomMenuAnimated';

const SketchArea = React.memo((props) => {
    const sketchRef = useRef();
    // const roadTypeNames = [];
    // const roadTypes = imgSource[props.name]; //get the correct object based on type of road

    // //Get all the keys from our imgSource (høyre, lys etc for labels)
    // const keys = Object.keys(roadTypes);
    // keys.map((keys) => {
    //     roadTypeNames.push(keys);
    // });

    // const initialImageSrcName = Object.keys(roadTypes[roadTypeNames[0]])[0];
    // const InitialImageSrc = roadTypes[roadTypsNames[0]][initialImageSrcName];

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

    //Clear canvas if new image is loaded
    useEffect(() => {
        clearCanvas();
        setDraggables([]);
    }, [currentImg]);

    const onPencilColorChange = (color) => {
        setPencilColor(color);
        setPencilSize(prevPencilSize);
    };

    const onSwitchPencilColor = useCallback(() => {
        if (currPencilColor === '#00000000') {
            setPencilColor(prevPencilColor);
            setPencilSize(5);
        } else {
            setPencilColor(currPencilColor);
            setPencilSize(5);
        }
    }, [currPencilColor]);

    const onChangePencilSize = (newPencilSize) => {
        setPencilSize(newPencilSize);
    };

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

    const onStrokeEnd = useCallback(() => {
        setActionList([...actionList, { type: 'stroke' }]);
    });

    const clearCanvas = useCallback(() => {
        sketchRef.current.clear();
        setDraggables([]);
    });

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

    const onStrokeStart = useCallback(() => {
        if (bottomSheetHidden == false)
            setBottomSheetHidden(!bottomSheetHidden);
    }, [bottomSheetHidden]);

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
        height: '100%',
        backgroundColor: Color.header,
    },
});

export default SketchArea;
