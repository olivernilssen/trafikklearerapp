import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Color from '../styles/Colors';

const Carousel = (props) => {
    const itemsPerInterval = 9;

    const [intervals, setIntervals] = useState(1);
    const [interval, setInterval] = useState(1);
    const [width, setWidth] = useState(0);

    const init = (width) => {
        // initialise width
        setWidth(width);

        // initialise total intervals
        const totalItems = props.objectArray.length * 2;
        setIntervals(Math.ceil(totalItems / itemsPerInterval));
    };

    const getInterval = (offset) => {
        for (let i = 1; i <= intervals; i++) {
            if (offset * 2 < (width / intervals) * i) {
                return i;
            }
            if (i == intervals) {
                return i;
            }
        }
    };

    // BULLETPOINTS
    let bullets = [];
    for (let i = 1; i <= intervals; i++) {
        bullets.push(
            <Text
                key={i}
                style={{
                    paddingHorizontal: 10,
                    fontSize: 25,
                    opacity: interval === i ? 0.5 : 0.1,
                }}>
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
                // contentContainerStyle={{ width: `${100 * intervals}%` }}
                pagingEnabled
                onContentSizeChange={(w, h) => init(w)}
                style={styles.scrollView}
                onScroll={(data) => {
                    setInterval(getInterval(data.nativeEvent.contentOffset.x));
                }}
                scrollEventThrottle={200}>
                {props.children}
            </ScrollView>
            <View style={styles.bullets}>{bullets}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        alignItems: 'center',
    },
    scrollView: {
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    bullets: {
        flexDirection: 'row',
    },
    bullet: {
        paddingHorizontal: 10,
        fontSize: 25,
    },
});

export default Carousel;
