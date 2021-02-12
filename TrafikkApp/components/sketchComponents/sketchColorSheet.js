import React, { useState } from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Button, TabBar } from 'react-native-ui-lib';

import Color from '../../styles/Colors';
const labelsArray = [
    'ONE TWO',
    'THREE',
    'THREEEEEEEE',
    'FOUR',
    'FIVE FIVE',
    'SIX',
    'SEVEN-ELEVEN',
];
var isHidden = false;

const SketchColorSheet = ({ props }) => {
    const [bounceValue, setBoundValue] = useState(new Animated.Value(0));
    const [hiddenViewButton, setHiddeViewButton] = useState('chevron-up');
    const [bottomSheetHeigh, setBottomSheetHeigh] = useState(0);
    const [labels, setLabel] = useState(labelsArray);
    const [currentTab, setCurrentTab] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(1);

    // Show or hide the bottom sheet depending on hight and if it is showing or not
    const toggleSubview = () => {
        setHiddeViewButton(!isHidden ? 'ellipsis-h' : 'chevron-up');
        var toValue = bottomSheetHeigh;

        if (isHidden) {
            toValue = 0;
        }

        Animated.spring(bounceValue, {
            useNativeDriver: true,
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
        }).start();

        isHidden = !isHidden;
    };

    // Get the high of the view which is hidden
    const getBottomSheetLayout = (layout) => {
        const { x, y, width, height } = layout;
        setBottomSheetHeigh(height);
    };

    return (
        <Animated.View
            style={[
                styles.subView,
                { transform: [{ translateY: bounceValue }] },
            ]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => toggleSubview()}>
                <Icon name={hiddenViewButton} size={40} color={'black'}></Icon>
            </TouchableOpacity>
            <View
                onLayout={(event) => {
                    getBottomSheetLayout(event.nativeEvent.layout);
                }}
                style={styles.bottomContainer}>
                <TabBar style={styles.tabbar} selectedIndex={0} enableShadow>
                    <TabBar.Item
                        label="Forkjørskryss"
                        labelStyle={{
                            color: Color.headerText,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                        }}
                    />
                    <TabBar.Item
                        label="Lyskryss"
                        labelStyle={{
                            color: Color.headerText,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                        }}
                    />
                    <TabBar.Item
                        label="Høyrekryss"
                        labelStyle={{
                            color: Color.headerText,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                        }}
                    />
                </TabBar>
            </View>
        </Animated.View>
    );
};

var styles = StyleSheet.create({
    bottomContainer: {
        backgroundColor: Color.drawerBg,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 17,
        color: '#007AFF',
    },
    subView: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    tabbar: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});

export default SketchColorSheet;
