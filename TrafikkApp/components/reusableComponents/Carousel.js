import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../styles';

const Carousel = (props) => {
    const itemsPerSlide = props.itemsPerSlide;

    const [numberOfSlides, setNumberOfSlides] = useState(1);
    const [activeSlide, setActiveSlide] = useState(1);
    const [width, setWidth] = useState(0);

    const getCarouselLayout = (width) => {
        // Initialise width of carousel
        setWidth(width);

        // Initialise total number of slides
        const totalItems = props.objectArray.length; // * 2 for testing
        setNumberOfSlides(Math.ceil(totalItems / itemsPerSlide));
    };

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

    // x bulletpoints for x number of slides
    let bullets = [];
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
                onContentSizeChange={(w, h) => getCarouselLayout(w)}
                style={styles.carousel}
                onScroll={(data) => {
                    setActiveSlide(
                        getActiveSlide(data.nativeEvent.contentOffset.x)
                    );
                }}
                scrollEventThrottle={200}>
                {props.children}
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
