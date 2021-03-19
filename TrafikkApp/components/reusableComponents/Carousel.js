import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

/**
 * Component that displays a carousel
 * @namespace Carousel
 * @memberof reusableComponents
 * @prop {int} itemsPerSlide Number of items to be displayed per slide in the Carousel
 * @prop {array} objectArray The items of the slide
 */
const Carousel = (props) => {
    const { itemsPerSlide, objectArray } = props;

    const [numberOfSlides, setNumberOfSlides] = useState(1);
    const [activeSlide, setActiveSlide] = useState(1);
    const [width, setWidth] = useState(0);
    let bullets = [];

    /**
     * Function to set the layout of the carousel.
     * Sets the width of the carousel, and the number of slides
     * @memberof reusableComponents.Carousel
     * @param {number} width Width of the carousel
     */
    const setCarouselLayout = (width) => {
        // Initialise width of carousel
        setWidth(width);

        // Initialise total number of slides
        const totalItems = objectArray.length; // * 2 for testing
        setNumberOfSlides(Math.ceil(totalItems / itemsPerSlide));
    };

    /**
     * Function to get the active slide
     * @memberof reusableComponents.Carousel
     * @param {number} offset The content offset of the carousel
     * @returns {int} The active slide
     */
    const getActiveSlide = (offset) => {
        for (let i = 1; i <= numberOfSlides; i++) {
            if (offset * 2 < (width / numberOfSlides) * i) {
                return i;
            }
            if (i == numberOfSlides) {
                return i;
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

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                contentContainerStyle={{ width: `${100 * numberOfSlides}%` }}
                pagingEnabled
                onContentSizeChange={(w, h) => setCarouselLayout(w)}
                style={styles.carousel}
                onScroll={(data) => {
                    setActiveSlide(
                        getActiveSlide(data.nativeEvent.contentOffset.x)
                    );
                }}
                scrollEventThrottle={200}>
                {objectArray}
            </ScrollView>
            <View style={styles.bulletContainer}>{bullets}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center',
    },
    carousel: {
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    bulletContainer: {
        flexDirection: 'row',
    },
    bullet: {
        paddingHorizontal: 10,
        fontSize: 30,
    },
});

export default Carousel;
