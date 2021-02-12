import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated, Image } from 'react-native';

export default class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: props.source,
            pan: new Animated.ValueXY(),
            dropZoneValues: props.dropZoneValues,
        };
        this.state.pan.setValue({ x: 0, y: 0 });

        // Initialize PanResponder with move handling
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value,
                });
                this.state.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: (e, gesture) => {
                //
                // Set value of state.animate x/y to the
                // delta value of each
                //
                this.state.pan.setValue({
                    x: gesture.dx,
                    y: gesture.dy,
                });
            },
            onPanResponderRelease: (e, gesture) => {
                if (this.isDropArea(gesture)) {
                    console.log('should delete');
                    this.props.removeItem(this.props.index);
                } else {
                    this.state.pan.flattenOffset();
                }
            },
        });
    }

    isDropArea(gesture) {
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform(),
        };

        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout()]}>
                <Image style={styles.item} source={this.state.imageSrc} />
            </Animated.View>
        );
    }
}

let ITEM_SIZE = 60;

let styles = StyleSheet.create({
    item: {
        position: 'absolute',
        width: ITEM_SIZE,
        resizeMode: 'contain',
    },
});
