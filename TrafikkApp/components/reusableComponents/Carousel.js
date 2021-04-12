import React, { useState, useContext, useEffect } from 'react';
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
    const [width, setWidth] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);
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

    useEffect(() => {}, [objectKeys]);

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
                        width: width / numberOfSlides,
                        padding: 5,
                    },
                ]}>
                {objectKeys
                    .slice(startFrom, startFrom + itemsPerSlide)
                    .map((source, j) => {
                        return (
                            <TouchableOpacity
                                key={j}
                                activeOpacity={0.4}
                                style={styles.imageButton}
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

    /**
     * Function to get the active slide
     * @memberof Carousel
     * @param {number} offset The content offset of the carousel
     * @returns {int} The active slide
     */
    const getActiveSlide = (offset) => {
        for (let i = 0; i < numberOfSlides; i++) {
            if (offset <= width * i) {
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
                style={[
                    styles.bullet,
                    { opacity: activeSlide === i ? 0.6 : 0.2 },
                ]}>
                &bull;
            </Text>
        );
    }

    const onLayout = (layout) => {
        const { width, height } = layout;

        // Initialise width of carousel
        setWidth(width);
        // Initialise total number of slides
        const totalItems = objectKeys.length;
        const itemsOnSlide = Math.ceil(width / 80);
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
    };

    return (
        <View
            style={styles.container}
            onLayout={(event) => onLayout(event.nativeEvent.layout)}>
            <View style={styles.bulletContainer}>{bullets}</View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                contentContainerStyle={{
                    width: `${100 * numberOfSlides}%`,
                }}
                pagingEnabled
                style={styles.carousel}
                onScroll={(data) => {
                    setActiveSlide(
                        getActiveSlide(data.nativeEvent.contentOffset.x)
                    );
                }}
                scrollEventThrottle={100}>
                {images}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        // width: '55%',
        // paddingTop: 15,
        alignItems: 'center',
    },
    carousel: {
        // paddingHorizontal: 10,
        flexDirection: 'row',
    },
    bulletContainer: {
        flexDirection: 'row',
    },
    bullet: {
        paddingHorizontal: 10,
        fontSize: 30,
    },
    imageContainer: {
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    imageButton: {
        paddingHorizontal: 10,
    },
    image: {
        height: 50,
        width: 50,
    },
});

export default Carousel;
