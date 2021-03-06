import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import { MainView, BottomMenuAnimated, Overlay } from '../reusableComponents';
import { SketchHeader } from '../sketchHeaderComponents/';
import DraggablesWithMenu from '../draggableComponents/DraggablesWithMenu';
import SketchAreaMenuContent from './SketchAreaMenuContent';
import { Colors } from '../../styles';
import AppContext from '../../AppContext';
import { useOpen, isSmallScreen } from '../helpers';

const { width, height } = Dimensions.get('window');

/**
 * This is the SketchArea compoennt, a big component that contains all the components related to the drawing function and that are visible
 * on the sketch screens. This is the IntersectionScreen, RoundaboutScreen, HighwayScreen, CountryRoadScreen and MapSketchScreen.
 * The component behaves differently the MapSketchScreen, for that screen a snapshow of the map is used as a sketch backround. For the
 * other screens, illustrations from a data file is used.
 *
 * @namespace SketchArea
 * @category SketchComponents
 * @prop {string} name Name of the screen (IntersectionScreen, RoundaboutScreen etc)
 */
const SketchArea = React.memo((props) => {
    const appContext = useContext(AppContext);
    const sketchRef = useRef();
    const eraserSize = parseInt(appContext.eraserSize);
    const eraserColor = 'transparent';
    const defaultPencilSize = 5;

    const { name } = props;
    const isMap = name == 'Map';
    const [pencilColor, setPencilColor] = useState(appContext.penColor);
    const [chosenColor, setChosenColor] = useState(appContext.penColor);
    const [pencilSize, setPencilSize] = useState(defaultPencilSize);
    const [chosenPencilSize, setChosenPencilSize] = useState(null);
    const [roadDesignChange, setRoadDesignChange] = useState(true);
    const [currentImg, setImage] = useState();
    const topMenuOpen = useOpen(false);
    const bottomSheetOpen = useOpen(true);
    const [draggables, setDraggables] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [deletingItemId, setDeletingItemId] = useState(null);

    const [extensionType, setExtensionType] = useState('Vanlig');

    /**
     * @memberof SketchArea
     * @typedef {function} useEffect
     * @description useEffect that is triggered when currentImg is changed.
     * Will clear the canvas and delete all objects on the screen unless the user
     * has changed the settings for deleteOnChange in the settings.
     */
    useEffect(() => {
        if (isMap) {
            if (appContext.deleteOnChange == 'Ja') {
                clearCanvas();
                setDraggables([]);
            }
        } else {
            if (roadDesignChange && appContext.deleteOnChange == 'Ja') {
                clearCanvas();
                setDraggables([]);
            }
        }
    }, [currentImg]);

    /**
     * @memberof SketchArea
     * @typedef {function} useEffect
     * @description useEffect used when the screen that uses the SketchArea is map.
     * Will take the latest snapshot taken from the map, and set this
     * as the sketch background image.
     */
    useEffect(() => {
        if (isMap) {
            if (appContext.latestSnapshot != '') {
                setImage(appContext.latestSnapshot);
            } else {
                console.warn('no image stored');
            }
        }
    }, [appContext.latestSnapshot]);

    /**
     * @memberof SketchArea
     * @typedef {function} useEffect
     * @description useEffect that is triggered when the user changes eraser size in settings.
     * Wil set the eraser size according to what the user has chosen.
     */
    useEffect(() => {
        setEraserSize(parseInt(appContext.eraserSize));
        if (pencilColor === eraserColor) {
            setPencilSize(parseInt(appContext.eraserSize));
        }
    }, [appContext.eraserSize]);

    /**
     * Changes the pencil color and size when switching between eraser and pencil.
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
     * Function to undo the previous action of the user.
     * will remove strokes or draggables.
     * Does not unto draggable movements.
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

    /**
     * When strokeEnded the added path/stroke
     * is added to actionList to keep track of undo actions.
     * @memberof SketchArea
     * @function
     */
    const onStrokeEnd = useCallback(() => {
        setActionList([...actionList, { type: 'stroke' }]);
    });

    /**
     * Function to clear the canvas and set draggables to empty list.
     * Only clear canvas if roadDesignChange is true.
     * @memberof SketchArea
     * @function
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
     * @function
     */
    const onStrokeStart = useCallback(() => {
        if (bottomSheetOpen.isOpen === true) bottomSheetOpen.onToggle();
    }, [bottomSheetOpen.isOpen]);

    return (
        <MainView>
            {name != 'Map' && <Overlay showOverlay={bottomSheetOpen} />}
            <View style={styles.main}>
                <SketchHeader
                    onEraserPencilSwitch={onEraserPencilSwitch}
                    undoChange={undoChange}
                    clearCanvas={clearCanvas}
                    eraser={eraser}
                    onPaletteColorChange={(color) => setPencilColor(color)}
                    name={name}
                    topMenuOpen={topMenuOpen}
                    onChangePencilSize={onChangePencilSize}
                    pencilColor={pencilColor}
                    pencilSize={pencilSize}
                    chosenColor={chosenColor}
                />

                <View style={styles.backgroundImageContainer}>
                    <Image
                        resizeMode={'cover'}
                        style={
                            isMap
                                ? styles.mapBackgroundImage
                                : styles.backgroundImage
                        }
                        source={isMap ? { uri: currentImg } : currentImg}
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
                    <DraggablesWithMenu
                        draggables={draggables}
                        setDraggables={setDraggables}
                        topMenuOpen={topMenuOpen}
                        deletingItemId={deletingItemId}
                        name={name}
                        setActionList={setActionList}
                        actionList={actionList}
                        extensionType={extensionType}
                        setExtensionType={setExtensionType}
                    />
                </View>
            </View>

            {!isMap && (
                <BottomMenuAnimated bottomSheetOpen={bottomSheetOpen}>
                    <SketchAreaMenuContent
                        roadType={name}
                        setImage={setImage}
                        setRoadDesignChange={setRoadDesignChange}
                        extensionType={extensionType}
                        closeBottomSheet={() => bottomSheetOpen.onClose()}
                    />
                </BottomMenuAnimated>
            )}
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
        paddingTop: isSmallScreen() ? 60 : 80,
        paddingBottom: isSmallScreen() ? 50 : 50,
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
    mapBackgroundImage: {
        height: '100%',
        maxHeight: '100%',
        width: '100%',
        maxWidth: width,
        alignSelf: 'center',
        backgroundColor: Colors.sketchBackground,
        zIndex: 0,
    },
});

export default SketchArea;
