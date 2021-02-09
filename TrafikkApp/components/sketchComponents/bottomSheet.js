import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../styles/Colors';

var isHidden = false;

const BottomSheet = ({ props }) => {
    const [bounceValue, setBoundValue] = useState(new Animated.Value(0));
    const [hiddenViewButton, setHiddeViewButton] = useState('chevron-down');
    const [bottomSheetHeigh, setBottomSheetHeigh] = useState(0);

    // Show or hide the bottom sheet depending on hight and if it is showing or not
    const toggleSubview = () => {
        setHiddeViewButton(!isHidden ? 'ellipsis-h' : 'chevron-down');
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
                <Text>This is a sub view</Text>
                <Text>This is a sub view</Text>
                <Text>This is a sub view</Text>
            </View>
        </Animated.View>
    );
};

var styles = StyleSheet.create({
    bottomContainer: {
        backgroundColor: Colors.light,
        padding: 10,
        width: '100%',
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
});

export default BottomSheet;
