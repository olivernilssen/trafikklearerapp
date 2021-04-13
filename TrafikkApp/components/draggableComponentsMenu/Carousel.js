import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Colors } from '../../styles';

/**
 * Component that displays a carousel with items.
 * @namespace Carousel
 * @category DraggableComponentsMenu
 * @prop {int} itemsPerSlide Number of items to be displayed per slide in the Carousel
 */
const Carousel = (props) => {
    const { onNewDraggable, objectKeys, objects } = props;
    const [numberOfSlides, setNumberOfSlides] = useState(1);
    const [slidesArray, setSlidesArray] = useState([]);
    const [activeSlide, setActiveSlide] = useState(1);
    const [viewWidth, setViewWidth] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);
    const [imageWidth, setImageWidth] = useState(90);
    const scrollNode = useRef();
    let bullets = [];

    /**
     * Get's the image source of the draggable
     * and creates a new draggable item
     * @memberof DraggableComponents
     * @param {int} source image source of new draggable
     */
    const onElementPress = (source) => {
        onNewDraggable(objects[source]);
    };

    useEffect(() => {
        updateScrollView();
    }, [objectKeys]);

    /**
     * Function to get the active slide
     * @memberof Carousel
     * @param {number} offset The content offset of the carousel
     * @returns {int} The active slide
     */
    const getActiveSlide = (offset) => {
        for (let i = 0; i < numberOfSlides; i++) {
            if (offset <= viewWidth * i) {
                return i + 1;
            }
            if (i == numberOfSlides) {
                return i + 1;
            }
        }
    };

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
     * @param {object} pageIndex X-position, Y-position, width and height of the view
     */
    const onLayout = (layout) => {
        const { x, y, width, height } = layout;

        // Initialise width of carousel
        setViewWidth(width);

        if (width != 0) {
            const totalItems = objectKeys.length;
            const itemsOnSlide = Math.floor(width / 90);
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
     * Is triggered when the items to be displayed in the carousel changes.
     * @memberof Carousel
     */
    const updateScrollView = () => {
        if (viewWidth != 0) {
            const totalItems = objectKeys.length;
            const itemsOnSlide = Math.ceil(viewWidth / 90);
            setItemsPerSlide(itemsOnSlide);

            const slides = Math.ceil(totalItems / itemsOnSlide);
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
     * Generate bulletpoints to show number of slides
     * Bulletpoint for active slide is highlighted
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
     * @return all the images that are in the "objects" array
     */
    const images = slidesArray.map((i) => {
        const startFrom = i * itemsPerSlide;

        return (
            <View
                key={i}
                style={[
                    styles.slideContainer,
                    {
                        width: imageWidth,
                    },
                ]}>
                {objectKeys
                    .slice(startFrom, startFrom + itemsPerSlide - 1)
                    .map((source, j) => {
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
                                onPress={() => onElementPress(source)}>
                                <Image
                                    source={objects[source]}
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
};

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
        height: 50,
        width: 50,
    },
});

export default Carousel;
