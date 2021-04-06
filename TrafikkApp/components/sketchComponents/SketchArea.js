import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    ImageBackground,
} from 'react-native';

import MainView from '../reusableComponents/MainView';
import SketchHeader from '../sketchHeaderComponents/SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { Colors } from '../../styles';

import DraggableWithEverything from '../draggable/DraggableWithEverything';
import BottomMenuAnimated from '../reusableComponents/BottomMenuAnimated';
import SketchAreaMenuContent from './SketchAreaMenuContent';
import Overlay from '../reusableComponents/Overlay';

import AppContext from '../../AppContext';

const { width, height } = Dimensions.get('window');

/**This is a big component that contains all the components that are visible
 * on the SketchArea screens.
 * @namespace SketchArea
 * @prop {number} navigation
 * @prop {string} name
 */
const SketchArea = React.memo((props) => {
    const appContext = useContext(AppContext);
    const sketchRef = useRef();
    const eraserSize = parseInt(appContext.eraserSize);
    const eraserColor = 'transparent';
    const defaultPencilSize = 5;

    const { name, navigation } = props;

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

    /**useEffect that is triggered when currentImg is changed
     * Will clear the canvas and delete all objects on the screen
     */
    useEffect(() => {
        if (roadDesignChange && appContext.deleteOnChange == 'Ja') {
            clearCanvas();
            setDraggables([]);
        }
    }, [currentImg]);

    /**Changes the pencil color according to user input
     * @memberof SketchArea
     * @param {String} color The color thats been chosen
     */
    const onPaletteColorChange = (color) => {
        setPencilColor(color);
    };

    /**Changes the pencil color and size when switching between eraser and pencil
     * @memberof SketchArea
     * @function
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

    /**Function to change the pencil brush size
     * @memberof SketchArea
     * @function
     * @param {int} newPencilSize The thickness of the pencil
     */
    const onChangePencilSize = (newPencilSize) => {
        setPencilSize(newPencilSize);
        setChosenPencilSize(newPencilSize);
    };

    /**Function to undo the previous action of the user
     * will remove strokes or draggables
     * Does not unto draggable movements
     * @memberof SketchArea
     * @function
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

    /**When strokeEnded the added path/stroke
     * is added to actionList to keep track of undo actions
     * @memberof SketchArea
     * @function
     */
    const onStrokeEnd = useCallback(() => {
        setActionList([...actionList, { type: 'stroke' }]);
    });

    /**Function to clear the canvas and set draggables to empty list
     * Only clear canvas if roadDesignChange is true
     * @memberof SketchArea
     * @function
     */
    const clearCanvas = useCallback(() => {
        sketchRef.current.clear();
        setDraggables([]);
    });

    /**Function to set the pencil to an eraser
     * @memberof SketchArea
     * @function
     */
    const eraser = () => {
        if (pencilColor != eraserColor) {
            setChosenColor(pencilColor);
            setChosenPencilSize(pencilSize);
            setPencilColor(eraserColor);
            setPencilSize(eraserSize);
        }
    };

    /**Function to hide the bottomsheet when user starts
     * drawing on the canvas
     * @memberof SketchArea
     * @function
     */
    const onStrokeStart = useCallback(() => {
        if (bottomSheetHidden == false)
            setBottomSheetHidden(!bottomSheetHidden);
    }, [bottomSheetHidden]);

    /**Function to toggle the topmenu to hidden or not hidden
     * @memberof SketchArea
     * @function
     */
    const toggleMenu = () => {
        setTopMenuHidden(!topMenuHidden);
    };

    return (
        <MainView>
            <Overlay
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}
            />
            <View style={styles.main}>
                <SketchHeader
                    onEraserPencilSwitch={onEraserPencilSwitch}
                    undoChange={undoChange}
                    clearCanvas={clearCanvas}
                    eraser={eraser}
                    onPaletteColorChange={onPaletteColorChange}
                    navigation={navigation}
                    name={name}
                    topMenuHidden={toggleMenu}
                    toggleRightMenuState={topMenuHidden}
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
