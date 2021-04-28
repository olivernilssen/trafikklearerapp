import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import { MainView, BottomMenuAnimated, Overlay } from '../reusableComponents/';
import { SketchHeader } from '../sketchHeaderComponents/';
import { DraggableWithEverything } from '../draggable/';
import SketchAreaMenuContent from './SketchAreaMenuContent';
import { Colors } from '../../styles';
import AppContext from '../../AppContext';

const { width, height } = Dimensions.get('window');

/**
 * This is a big component that contains all the components that are visible
 * on the SketchArea screens.
 * @namespace SketchArea
 * @category SketchComponents
 * @prop {function} toggleDrawer Used for to toggle the drawer between the different screens
 * @prop {function} navigate Used to navigate between screens
 * @prop {string} name Name of the screen (IntersectionScreen, RoundaboutScreen etc)
 */
const SketchArea = React.memo((props) => {
    const appContext = useContext(AppContext);
    const sketchRef = useRef();
    const [eraserSize, setEraserSize] = useState(
        parseInt(appContext.eraserSize)
    );
    const eraserColor = 'transparent';
    const defaultPencilSize = 5;

    const { name, toggleDrawer, navigate } = props;

    const [pencilColor, setPencilColor] = useState(appContext.penColor);
    const [chosenColor, setChosenColor] = useState('');
    const [pencilSize, setPencilSize] = useState(defaultPencilSize);
    const [chosenPencilSize, setChosenPencilSize] = useState(null);
    const [roadDesignChange, setRoadDesignChange] = useState(true);
    const [currentImg, setImage] = useState();
    const [topMenuHidden, setTopMenuHidden] = useState(true);
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [draggables, setDraggables] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [deletingItemId, setDeletingItemId] = useState(null);

    const [extensionType, setExtensionType] = useState('Vanlig');

    /**
     * useEffect that is triggered when currentImg is changed
     * Will clear the canvas and delete all objects on the screen
     */
    useEffect(() => {
        if (roadDesignChange && appContext.deleteOnChange == 'Ja') {
            clearCanvas();
            setDraggables([]);
        }
    }, [currentImg]);

    useEffect(() => {
        setEraserSize(parseInt(appContext.eraserSize));
        if (pencilColor === eraserColor) {
            setPencilSize(parseInt(appContext.eraserSize));
        }
    }, [appContext.eraserSize]);

    /**
     * Changes the pencil color according to user input.
     * @memberof SketchArea
     * @param {String} color The color thats been chosen
     */
    const onPaletteColorChange = (color) => {
        setPencilColor(color);
    };

    /**
     * Changes the pencil color and size when switching between eraser and pencil.
     * @memberof SketchArea
     */
    const onEraserPencilSwitch = useCallback(() => {
        if (pencilColor === eraserColor) {
            setPencilColor(chosenColor);
            setPencilSize(chosenPencilSize);
        } else {
            setPencilColor(pencilColor);
            setPencilSize(pencilSize);
        }
    }, [pencilColor]);

    /**
     * Function to change the pencil brush size.
     * @memberof SketchArea
     * @param {int} newPencilSize The thickness of the pencil
     */
    const onChangePencilSize = (newPencilSize) => {
        setPencilSize(newPencilSize);
        setChosenPencilSize(newPencilSize);
    };

    /**
     * Function to undo the previous action of the user
     * will remove strokes or draggables
     * Does not unto draggable movements
     * @memberof SketchArea
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
            console.warn('error occured with deleting');
        }

        setActionList(copyList);
    }, [actionList]);

    /**
     * When strokeEnded the added path/stroke
     * is added to actionList to keep track of undo actions.
     * @memberof SketchArea
     */
    const onStrokeEnd = useCallback(() => {
        setActionList([...actionList, { type: 'stroke' }]);
    });

    /**
     * Function to clear the canvas and set draggables to empty list.
     * Only clear canvas if roadDesignChange is true.
     * @memberof SketchArea
     */
    const clearCanvas = useCallback(() => {
        sketchRef.current.clear();
        setDraggables([]);
    });

    /**
     * Function to set the pencil to an eraser.
     * @memberof SketchArea
     */
    const eraser = () => {
        if (pencilColor != eraserColor) {
            setChosenColor(pencilColor);
            setChosenPencilSize(pencilSize);
            setPencilColor(eraserColor);
            setPencilSize(eraserSize);
        }
    };

    /**
     * Function to hide the bottomsheet when user starts
     * drawing on the canvas.
     * @memberof SketchArea
     */
    const onStrokeStart = useCallback(() => {
        if (bottomSheetHidden == false)
            setBottomSheetHidden(!bottomSheetHidden);
    }, [bottomSheetHidden]);

    /**
     * Function to toggle the top menu to hidden or not hidden.
     * @memberof SketchArea
     */
    const toggleMenu = () => {
        setTopMenuHidden(!topMenuHidden);
    };

    return (
        <MainView>
            <Overlay
                showOverlay={bottomSheetHidden}
                setShowOverlay={setBottomSheetHidden}
            />
            <View style={styles.main}>
                <SketchHeader
                    onEraserPencilSwitch={onEraserPencilSwitch}
                    undoChange={undoChange}
                    clearCanvas={clearCanvas}
                    eraser={eraser}
                    onPaletteColorChange={onPaletteColorChange}
                    toggleDrawer={toggleDrawer}
                    name={name}
                    topMenuHidden={topMenuHidden}
                    toggleTopMenu={toggleMenu}
                    onChangePencilSize={onChangePencilSize}
                    pencilColor={pencilColor}
                    pencilSize={pencilSize}
                    chosenColor={chosenColor}
                />
                <View style={styles.backgroundImageContainer}>
                    <Image
                        resizeMode={'cover'}
                        style={styles.backgroundImage}
                        source={currentImg}
                    />
                </View>

                <View style={styles.sketchArea}>
                    <SketchCanvas
                        onStrokeStart={() => onStrokeStart()}
                        onStrokeEnd={() => onStrokeEnd()}
                        ref={sketchRef}
                        style={styles.sketchCanvas}
                        strokeColor={pencilColor}
                        strokeWidth={pencilSize}
                    />
                    <DraggableWithEverything
                        draggables={draggables}
                        setDraggables={setDraggables}
                        topMenuHidden={topMenuHidden}
                        deletingItemId={deletingItemId}
                        name={name}
                        setActionList={setActionList}
                        actionList={actionList}
                        extensionType={extensionType}
                        setExtensionType={setExtensionType}
                    />
                </View>
            </View>

            <BottomMenuAnimated
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}>
                <SketchAreaMenuContent
                    roadType={name}
                    setImage={setImage}
                    setRoadDesignChange={setRoadDesignChange}
                    extensionType={extensionType}
                    setBottomSheetHidden={setBottomSheetHidden}
                    navigate={navigate}
                />
            </BottomMenuAnimated>
        </MainView>
    );
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Colors.sketchBackground,
        justifyContent: 'center',
    },
    sketchArea: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    sketchCanvas: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    backgroundImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        paddingTop: 80,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    backgroundImage: {
        height: undefined,
        maxHeight: '100%',
        width: '100%',
        maxWidth: width,
        aspectRatio: 1752 / 2263,
        alignSelf: 'center',
        backgroundColor: Colors.sketchBackground,
        zIndex: 0,
    },
});

export default SketchArea;
