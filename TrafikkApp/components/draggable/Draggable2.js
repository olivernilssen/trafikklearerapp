import React, { Component } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';

import {
    PanGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    State,
} from 'react-native-gesture-handler';

// import { USE_NATIVE_DRIVER } from '../config';
var USE_NATIVE_DRIVER = true;

export default class Draggable extends Component {
    panRef = React.createRef();
    rotationRef = React.createRef();
    pinchRef = React.createRef();

    constructor(props) {
        super(props);
        this._translateX = new Animated.Value(0);
        this._translateY = new Animated.Value(0);
        this._lastOffset = { x: 0, y: 0 };

        this._onGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this._translateX,
                        translationY: this._translateY,
                    },
                },
            ],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );

        /* Pincing */
        this._baseScale = new Animated.Value(1);
        this._pinchScale = new Animated.Value(1);
        this._scale = Animated.multiply(this._baseScale, this._pinchScale);
        this._lastScale = 1;
        this._onPinchGestureEvent = Animated.event(
            [{ nativeEvent: { scale: this._pinchScale } }],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );

        /* Rotation */
        this._rotate = new Animated.Value(0);
        this._rotateStr = this._rotate.interpolate({
            inputRange: [-100, 100],
            outputRange: ['-100rad', '100rad'],
        });
        this._lastRotate = 0;
        this._onRotateGestureEvent = Animated.event(
            [{ nativeEvent: { rotation: this._rotate } }],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );
    }

    _onHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastOffset.x += event.nativeEvent.translationX;
            this._lastOffset.y += event.nativeEvent.translationY;
            this._translateX.setOffset(this._lastOffset.x);
            this._translateX.setValue(0);
            this._translateY.setOffset(this._lastOffset.y);
            this._translateY.setValue(0);
        }
    };

    _onRotateHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastRotate += event.nativeEvent.rotation;
            this._rotate.setOffset(this._lastRotate);
            this._rotate.setValue(0);
        }
    };

    _onPinchHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastScale *= event.nativeEvent.scale;
            this._baseScale.setValue(this._lastScale);
            this._pinchScale.setValue(1);
        }
    };

    render() {
        return (
            <React.Fragment>
                <PanGestureHandler
                    ref={this.panRef}
                    onGestureEvent={this._onGestureEvent}
                    onHandlerStateChange={this._onHandlerStateChange}
                    simultaneousHandlers={[this.pinchRef, this.rotationRef]}
                    avgTouches
                    minPointers={1}
                    maxPointers={2}>
                    <Animated.View
                        style={[
                            styles.wrapper,
                            {
                                transform: [
                                    { translateX: this._translateX },
                                    { translateY: this._translateY },
                                ],
                            },
                        ]}>
                        <RotationGestureHandler
                            ref={this.rotationRef}
                            simultaneousHandlers={[this.pinchRef, this.panRef]}
                            onGestureEvent={this._onRotateGestureEvent}
                            onHandlerStateChange={
                                this._onRotateHandlerStateChange
                            }>
                            <Animated.View
                                style={[
                                    (styles.wrapper2,
                                    {
                                        transform: [
                                            { rotate: this._rotateStr },
                                        ],
                                    }),
                                ]}>
                                <PinchGestureHandler
                                    ref={this.pinchRef}
                                    simultaneousHandlers={this.rotationRef}
                                    onGestureEvent={this._onPinchGestureEvent}
                                    onHandlerStateChange={
                                        this._onPinchHandlerStateChange
                                    }>
                                    <Animated.View
                                        style={[
                                            styles.container,
                                            {
                                                transform: [
                                                    {
                                                        translateX: this
                                                            ._translateX,
                                                    },
                                                    {
                                                        translateY: this
                                                            ._translateY,
                                                    },
                                                    { rotate: this._rotateStr },
                                                    { scale: this._scale },
                                                ],
                                            },
                                        ]}
                                        collapsable={false}>
                                        <Animated.Image
                                            resizeMode={'contain'}
                                            style={styles.pinchableImage}
                                            source={require('../../assets/Elements/red-car-top.png')}
                                        />
                                    </Animated.View>
                                </PinchGestureHandler>
                            </Animated.View>
                        </RotationGestureHandler>
                    </Animated.View>
                </PanGestureHandler>
            </React.Fragment>
        );
    }
}

const ITEM_HEIGHT = 100;
const ITEM_WIDTH = 55;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        // overflow: 'hidden',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    pinchableImage: {
        // backgroundColor: 'transparent',
        ...StyleSheet.absoluteFillObject,
        height: ITEM_HEIGHT,
    },
    wrapper: {
        flex: 1,
        backgroundColor: 'black',
    },
    wrapper2: {
        flex: 1,
        backgroundColor: 'blue',
    },
});
