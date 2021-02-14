import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated, Image } from 'react-native';

export default class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: props.source,
            pan: new Animated.ValueXY(),
            dropZoneValues: props.dropZoneValues,
            scale: 1,
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
                if (this.isDropArea(gesture)) {
                    this.props.onTrashHover(true);
                } else {
                    this.props.onTrashHover(false);
                }

                //set values (x and y) we are currently on for the animated.view
                this.state.pan.setValue({
                    x: gesture.dx,
                    y: gesture.dy,
                });
            },
            onPanResponderRelease: (e, gesture) => {
                if (this.isDropArea(gesture)) {
                    this.props.removeItem(this.props.id);
                    this.props.onTrashHover(false); //reset the trash icon
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
                <Animated.Image
                    style={[styles.item]}
                    source={this.state.imageSrc}
                />
            </Animated.View>
        );
    }
}

let ITEM_SIZE = 60;

let styles = StyleSheet.create({
    item: {
        position: 'absolute',
        width: ITEM_SIZE,
        height: ITEM_SIZE * 2,
        resizeMode: 'contain',
    },
});
