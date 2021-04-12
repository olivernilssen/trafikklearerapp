import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

/**
 * Component that displays a carousel
 * @namespace Carousel
 * @category ReusableComponents
 * @prop {int} itemsPerSlide Number of items to be displayed per slide in the Carousel
 */
const Carousel = (props) => {
    const { onNewDraggable, objectKeys, objects } = props;
    const [numberOfSlides, setNumberOfSlides] = useState(1);
    const [slidesArray, setSlidesArray] = useState([]);
    const [activeSlide, setActiveSlide] = useState(1);
    const [viewWidth, setViewWidth] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);
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
     * Displayes the available draggable images that can be used
     * @return all the images that are in the "objects" array
     */
    const images = slidesArray.map((i) => {
        const startFrom = i * itemsPerSlide;
        return (
            <View
                key={i}
                style={[
                    styles.imageContainer,
                    {
                        width: viewWidth / numberOfSlides,
                        padding: 5,
                    },
                ]}>
                {objectKeys
                    .slice(startFrom, startFrom + itemsPerSlide)
                    .map((key, j) => {
                        return (
                            <TouchableOpacity
                                key={j}
                                activeOpacity={0.4}
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
     * Generate bulletpoints to show number of slide
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

    const scrollClick = (pageIndex) => {
        setActiveSlide(pageIndex);
        scrollNode.current?.scrollTo({
            x: viewWidth * (pageIndex - 1),
        });
    };

    const onLayout = (layout) => {
        const { x, y, width, height } = layout;

        // Initialise width of carousel
        setViewWidth(width);

        if (width != 0) {
            const totalItems = objectKeys.length;
            const itemsOnSlide = Math.ceil(width / 90);
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
        // width: '55%',
        // paddingTop: 15,
        alignItems: 'center',
    },

    bulletContainer: {
        flexDirection: 'row',
    },
    bullet: {
        paddingHorizontal: 10,
        fontSize: 30,
    },
    imageContainer: {
        justifyContent: 'space-evenly',
        flex: 1,
        flexDirection: 'row',
    },

    image: {
        height: 50,
        width: 50,
    },
});

export default Carousel;
