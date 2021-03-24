import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Icons } from '../../styles';
import { useCallback } from 'react';
import CurriculumMenuContent from './CurriculumMenuContent';

/**
 * This is the main component for the BottomMenu in the CurriculumObjectives screen
 * It has properties to move or hide the view and will show the content of it's children
 */
const CurriculumMenu = React.memo((props) => {
    const {
        bottomSheetHidden,
        setBottomSheetHidden,
        curriculumObjective,
        setCurriculumObjective,
        trafficClass,
        setTrafficClass,
    } = props;

    const [bounceValue, setBounceValue] = useState(new Animated.Value(0));
    const [hiddenViewButton, setHiddenViewButton] = useState('chevron-down');
    const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

    /**
     * Is triggered when the state bottomSheetHidden is changed
     * Will trigger the toggleSubview function to animate the
     * bottomsheet into view
     */
    useEffect(() => {
        toggleSubview();
    }, [bottomSheetHidden]);

    /**
     * This function will change the little icon at the top of the bottom menu
     * to either show a chevorn of elipsis.
     * It also animates the menu to either be hidden or shown
     */
    const toggleSubview = useCallback(() => {
        setHiddenViewButton(bottomSheetHidden ? 'chevron-up' : 'chevron-down');
        var toValue = bottomSheetHeight;

        if (!bottomSheetHidden) {
            toValue = 0;
        }

        Animated.spring(bounceValue, {
            useNativeDriver: true,
            toValue: toValue,
            velocity: 3,
            tension: 20,
            friction: 8,
        }).start();
    }, [bottomSheetHidden]);

    /**
     * Change the state of the bottomSheetHidden state
     * This will also trigger a useEffect to run afterwards
     */
    const onHiddenViewChange = () => {
        setBottomSheetHidden(!bottomSheetHidden);
    };

    /**
     * Is triggered to get the layout (height, width) of the
     * bottom menu view. This is to accuractly decide how far up
     * on the screen the menu needs to slide
     * @param {dictionary} layout
     */
    const getLayout = (layout) => {
        const { x, y, width, height } = layout;
        setBottomSheetHeight(height);
    };

    return (
        <Animated.View
            style={[
                styles.subView,
                { transform: [{ translateY: bounceValue }] },
            ]}>
            <TouchableOpacity
                style={styles.button}
                onPress={onHiddenViewChange}>
                <Icon
                    name={hiddenViewButton}
                    size={Icons.medium}
                    color={Colors.icons}
                />
            </TouchableOpacity>

            <View
                onLayout={(event) => {
                    getLayout(event.nativeEvent.layout);
                }}
                style={styles.bottomContainer}>
                <CurriculumMenuContent
                    curriculumObjective={curriculumObjective}
                    setCurriculumObjective={setCurriculumObjective}
                    trafficClass={trafficClass}
                    setTrafficClass={setTrafficClass}
                />
            </View>
        </Animated.View>
    );
});

var styles = StyleSheet.create({
    subView: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    button: {
        paddingBottom: 10,
        opacity: 0.8,
    },
    bottomContainer: {
        backgroundColor: Colors.bottomMeny,
        paddingBottom: 10,
        alignItems: 'center',
        elevation: 22,
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
});

export default CurriculumMenu;
