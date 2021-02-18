import React, { Component } from 'react';
import {
    StyleSheet,
    Animated,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import { Container, Content, Button } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const colors = [
    '#335c67',
    '#e09f3e',
    '#9e2a2b',
    '#284b63',
    '#3a5a40',
    // '#3c153b',
    // '#001427',
    '#000000',
];

import Gestures from 'react-native-easy-gestures';
import Icon from 'react-native-vector-icons/FontAwesome5';

let ITEM_SIZE = 100;
let radius = (ITEM_SIZE * 2) / 2;

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
            colorMenuActive: true,
            menuScale: new Animated.Value(1),
        };

        this.calculatePos = (i) => {
            const so = 0;
            const rx = radius;
            const ry = radius;
            const n = colors.length;
            const cw = true;
            const maxCircle = 180;

            const x =
                ry +
                ry * -Math.sin((150 / n / maxCircle) * (i + 1 + so) * Math.PI);
            const y =
                rx +
                -rx * Math.cos((150 / n / maxCircle) * (i + 1 + so) * Math.PI);
            return { x, y };
        };
    }
    //Actions to take when Drag is started
    onDragStart = (gesture) => {
        //Start spring animation (user feedback)
        if (this.state.colorMenuActive)
            this.setState({ colorMenuActive: !this.state.colorMenuActive });
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

    onTintChange(newColor) {
        console.log('Tint color should change');
        this.setState({ tintColor: newColor, colorMenuActive: false });
    }

    onLongPress() {
        console.log('Longpress method started');
        this.setState({ colorMenuActive: true });
    }

    render() {
        const CircleItems = () => {
            return colors.map((color, i) => {
                const coords = this.calculatePos(i);
                if (i != colors.length - 1) {
                    return (
                        <View
                            key={i}
                            style={[
                                styles.buttonView,
                                {
                                    top: coords.y - buttonSize / 2,
                                    right: coords.x - buttonSize / 2,
                                },
                            ]}>
                            <TouchableOpacity
                                color={color}
                                style={[
                                    styles.button,
                                    { backgroundColor: color },
                                ]}
                                onPress={() => this.onTintChange(color)}
                            />
                        </View>
                    );
                } else {
                    return (
                        <View
                            key={i}
                            style={[
                                styles.buttonView,
                                {
                                    top: coords.y - buttonSize / 2,
                                    right: coords.x - buttonSize / 2,
                                },
                            ]}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: 'black',
                                    },
                                ]}
                                onPress={() =>
                                    this.setState({
                                        colorMenuActive: !this.state
                                            .colorMenuActive,
                                    })
                                }>
                                <Icon name={'times'} color={'white'} />
                            </TouchableOpacity>
                        </View>
                    );
                }
            });
        };

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
                <View styles={{}}>
                    {this.state.colorMenuActive && (
                        <Animated.View
                            style={[
                                styles.popupMenu,
                                {
                                    transform: [
                                        { scale: this.state.menuScale },
                                    ],
                                },
                            ]}>
                            {CircleItems()}
                        </Animated.View>
                    )}
                    <TouchableWithoutFeedback
                        onLongPress={() => this.onLongPress()}
                        accessibilityRole={'image'}>
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
                </View>
            </Gestures>
        );
    }
}
const buttonSize = 25;

let styles = StyleSheet.create({
    button: {
        height: '100%',
        width: '100%',
        borderRadius: buttonSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
        // zIndex: -1,
        position: 'absolute',
        height: buttonSize,
        width: buttonSize,
    },
    item: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'gray',
    },
    container: {
        position: 'absolute',
        top: windowHeight / 2,
        left: windowWidth / 2,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        justifyContent: 'center',

        // backgroundColor: 'black',
        // backgroundColor: 'blue',
    },
    popupMenu: {
        borderWidth: 3,
        borderColor: 'transparent',
        position: 'absolute',
        bottom: -(ITEM_SIZE / 2),
        width: ITEM_SIZE * 2,
        height: ITEM_SIZE * 2,
        borderRadius: radius,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        // zIndex: -1,
    },
});
