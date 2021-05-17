import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Colors } from '../../../styles';
import { isSmallScreen } from '../../helpers';

/**
 * Component that displays a swipeable carousel containing all the draggable objects.
 * @namespace Carousel
 * @category DraggableComponents
 * @subcategory DraggableMenu
 * @prop {function} onNewDraggable Function to add new draggable
 * @prop {dictionary} objects Dictionary with the image path to the draggable objects
 * @prop {array} objectKeys Array with the keys to the different draggable objects
 */
const Carousel = React.memo((props) => {
    const { onNewDraggable, objectKeys, objects } = props;

    const [numberOfSlides, setNumberOfSlides] = useState(1);
    const [slidesArray, setSlidesArray] = useState([]);
    const [activeSlide, setActiveSlide] = useState(1);
    const [viewWidth, setViewWidth] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);
    const [imageWidth, setImageWidth] = useState(isSmallScreen() ? 55 : 80);
    const scrollNode = useRef();
    let bullets = [];

    /**
     * Gets the image source of the draggable
     * and creates a new draggable item.
     * Is triggered when pressing the 'image' of the draggable in the top menu.
     * @memberof Carousel
     * @param {int} source Image source of the item pressed
     */
    const onElementPress = (source) => {
        onNewDraggable(objects[source]);
    };

    /**
     * @memberof Carousel
     * @typedef {function} useEffect
     * @description useEffect that is triggered when objectKeys is changed.
     * Will run the function updateScrollView() and update the scrollview
     * every time objectKeys change.
     */
    useEffect(() => {
        updateScrollView();
    }, [objectKeys]);

    /**
     * Function to get the active slide of the carousel.
     * @memberof Carousel
     * @function
     * @param {number} offset The content offset of the carousel
     * @returns {int} The active slide
     */
    const getActiveSlide = useCallback((offset) => {
        for (let i = 0; i < numberOfSlides; i++) {
            if (offset <= viewWidth * i) {
                return i + 1;
            }
            if (i == numberOfSlides) {
                return i + 1;
            }
        }
    });

    /**
     * Function to scroll to a slide.
     * Is triggered by pressing the bulletpoints.
     * @memberof Carousel
     * @param {number} pageIndex The index of the page to be scrolled to
     */
    const scrollClick = (pageIndex) => {
        setActiveSlide(pageIndex);
        scrollNode.current?.scrollTo({
            x: viewWidth * (pageIndex - 1),
        });
    };

    /**
     * Function to get the layout of the slides.
     * Calculates the number of slides, and the number of items to
     * be displayed on each slide.
     * Also sets the width of the image container (holding each item).
     * @memberof Carousel
     * @param {object} layout X-position, Y-position, width and height of the view
     */
    const onLayout = (layout) => {
        const { x, y, width, height } = layout;

        // Initialise width of carousel
        setViewWidth(width);

        if (width != 0) {
            const totalItems = objectKeys.length;
            const itemsOnSlide = Math.floor(
                width / (isSmallScreen() ? 55 : 80)
            );
            setItemsPerSlide(itemsOnSlide);

            const slides = Math.ceil(totalItems / itemsOnSlide);
            setNumberOfSlides(slides);

            setImageWidth(width / itemsOnSlide);

            const numbArray = [];

            var i = 0;
            while (i < slides) {
                numbArray.push(i);
                i++;
            }
            setSlidesArray(numbArray);
        }
    };

    /**
     * Function to update the carousel with the new number of slides, and
     * number of items per slide.
     * Is triggered each time the items to be displayed in the carousel changes, e.g. when the user
     * changes which draggables to be displayed in the menu.
     * @memberof Carousel
     */
    const updateScrollView = () => {
        if (viewWidth != 0) {
            const totalItems = objectKeys.length;
            const slides = Math.ceil(totalItems / itemsPerSlide);
            setNumberOfSlides(slides);

            const numbArray = [];

            var i = 0;
            while (i < slides) {
                numbArray.push(i);
                i++;
            }
            setSlidesArray(numbArray);
        }
    };

    /**
     * Generates bulletpoints to show number of slides, and add
     * the these to the bullets array.
     * Bulletpoint for active slide is highlighted.
     * @memberof Carousel
     */
    for (let i = 1; i <= numberOfSlides; i++) {
        bullets.push(
            <Text
                key={i}
                onPress={() => scrollClick(i)}
                style={[
                    styles.bullet,
                    { opacity: activeSlide === i ? 0.6 : 0.2 },
                ]}>
                &bull;
            </Text>
        );
    }

    /**
     * Displayes the available draggable images that can be used.
     * For each slide, maps through the objectsKeys making the images
     * touchable so that they can be used as draggable objects.
     * Returns all the images that are in the "objects" array as touchables
     * elements.
     * @returns All the images that are in the "objects" array as touchable elements
     * @memberof Carousel
     */
    const images = slidesArray.map((i) => {
        const startFrom = i * itemsPerSlide;

        return (
            <View
                key={i}
                style={[
                    styles.slideContainer,
                    {
                        width: viewWidth,
                    },
                ]}>
                {objectKeys
                    .slice(startFrom, startFrom + itemsPerSlide)
                    .map((key, j) => {
                        return (
                            <TouchableOpacity
                                key={j}
                                activeOpacity={0.4}
                                style={[
                                    styles.imageContainer,
                                    {
                                        width: imageWidth,
                                    },
                                ]}
                                onPress={() => onElementPress(key)}>
                                <Image
                                    source={objects[key].source}
                                    style={styles.image}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                        );
                    })}
            </View>
        );
    });

    return (
        <View
            style={styles.container}
            onLayout={(event) => onLayout(event.nativeEvent.layout)}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                contentContainerStyle={{
                    width: `${100 * numberOfSlides}%`,
                }}
                pagingEnabled
                onScroll={(data) => {
                    setActiveSlide(
                        getActiveSlide(data.nativeEvent.contentOffset.x)
                    );
                }}
                scrollEventThrottle={100}
                ref={scrollNode}>
                {images}
            </ScrollView>
            <View style={styles.bulletContainer}>{bullets}</View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bulletContainer: {
        flexDirection: 'row',
    },
    bullet: {
        paddingHorizontal: 10,
        fontSize: 30,
    },
    slideContainer: {
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        borderRightWidth: 3,
        borderRightColor: Colors.headerBg,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        height: isSmallScreen() ? 35 : 50,
        width: isSmallScreen() ? 35 : 50,
    },
});

export default Carousel;
