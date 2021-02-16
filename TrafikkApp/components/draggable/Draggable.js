import React, { Component } from 'react';
import {
    StyleSheet,
    Animated,
    View,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const colors = [
//     '#20303C',
//     '#43515C',
//     '#66737C',
//     '#858F96',
//     '#A3ABB0',
//     '#C2C7CB',
//     '#E0E3E5',
//     '#F2F4F5',
// ];

import Gestures from 'react-native-easy-gestures';
import { color } from 'react-native-reanimated';

export default class Draggable extends Component {
    pinchRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: props.source,
            dropZoneValues: props.dropZoneValues,
            scale: new Animated.Value(1),
            isScaling: false,
            tintColor: props.tintColor == null ? null : props.tintColor,
        };
    }
    //Actions to take when Drag is started
    onDragStart = (gesture) => {
        //Start spring animation (user feedback)
        Animated.spring(this.state.scale, {
            toValue: 1.2,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    //Actions to take when drag is active
    onDragMove = (gesture) => {
        if (this.isDropArea(gesture) && !this.state.isScaling) {
            this.props.onTrashHover(true);
        } else {
            this.props.onTrashHover(false);
        }
    };

    //Actions to take when drag has ended
    onDragEnd = (gesture) => {
        //If in dropzone, delete element
        if (this.isDropArea(gesture) && !this.state.isScaling) {
            //End spring animation to trashcan
            Animated.spring(this.state.scale, {
                toValue: 0.1,
                velocity: 1,
                bounciness: 0,
                useNativeDriver: true,
            }).start(() => this.removeItem());
        } else {
            //End spring animation
            Animated.spring(this.state.scale, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start(this.setState({ isScaling: false }));
        }

        this.setState({ isScaling: false });
    };

    //Helper function so we can run to functions
    //after animation over trashcan has ended
    removeItem() {
        this.props.removeItem(this.props.id);
        this.props.onTrashHover(false);
    }

    isDropArea(gesture) {
        var dz = this.state.dropZoneValues;

        var isInZone =
            gesture.nativeEvent.pageX > dz.x &&
            gesture.nativeEvent.pageX < dz.x + dz.height &&
            gesture.nativeEvent.pageY > dz.y &&
            gesture.nativeEvent.pageY < dz.y + dz.height;

        return isInZone;
    }

    onLongPress() {}

    render() {
        // const panStyle = {
        //     transform: this.state.pan.getTranslateTransform(),
        // };

        return (
            <Gestures
                draggable={true}
                scalable={true}
                rotatable={true}
                style={styles.container}
                onEnd={(event) => this.onDragEnd(event)}
                onChange={(event) => this.onDragMove(event)}
                onStart={(event) => this.onDragStart(event)}
                onScaleStart={() => {
                    this.setState({ isScaling: true });
                }}>
                <TouchableWithoutFeedback
                    onLongPress={() => console.log('Long pressed')}>
                    <Animated.Image
                        source={this.state.imageSrc}
                        resizeMode={'contain'}
                        style={[
                            styles.item,
                            this.state.tintColor == null
                                ? null
                                : { tintColor: this.state.tintColor },

                            {
                                transform: [{ scale: this.state.scale }],
                            },
                        ]}
                    />
                </TouchableWithoutFeedback>
            </Gestures>
        );
    }
}

let ITEM_SIZE = 60;

let styles = StyleSheet.create({
    item: {
        width: ITEM_SIZE,
        height: ITEM_SIZE * 2,
        // backgroundColor: 'gray',
    },
    container: {
        position: 'absolute',
        top: windowHeight / 2,
        left: windowWidth / 2,
        width: ITEM_SIZE,
        height: ITEM_SIZE * 2,
        // backgroundColor: 'blue',
    },
});
