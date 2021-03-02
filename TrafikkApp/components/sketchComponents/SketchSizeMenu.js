import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, ScrollView } from 'react-native';
import {
    Colors,
    View,
    Text,
    Image,
    Slider,
    GradientSlider,
    ColorSliderGroup,
} from 'react-native-ui-lib';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

const { Popover } = renderers;

import Color from '../../styles/Colors';

const PencilSizePopup = () => {
    const [sliderValue, setSliderValue] = useState(5);

    const INITIAL_VALUE = 0;
    const COLOR = Colors.blue30;

    const onSliderValueChange = (value) => {
        setSliderValue(value);
    };

    return (
        <View>
            <Menu
                renderer={Popover}
                rendererProps={{ preferredPlacement: 'bottom' }}>
                <MenuTrigger>
                    <Icon name={'circle'} solid size={32} color={'black'} />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption>
                        <Slider
                            onValueChange={onSliderValueChange}
                            value={INITIAL_VALUE}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            containerStyle={styles.sliderContainer}
                            style={styles.sliderTest}
                        />
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    sliderTest: {
        flex: 1,
        width: 200,
        height: '100%',
    },
    image: {
        tintColor: Colors.dark30,
    },
    text: {
        width: 40,
    },
    slider: {
        marginVertical: 6,
    },
    sliderContainer: {
        flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
        // marginHorizontal: 10,
        width: '100%',
    },
    gradientSliderContainer: {
        flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
        marginHorizontal: 20,
        marginVertical: 10,
    },
    track: {
        height: 2,
    },
    thumb: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderColor: Colors.violet40,
        borderWidth: 1,
        shadowColor: Colors.white,
    },
    activeThumb: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    box: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.dark60,
    },
    group: {
        backgroundColor: Colors.dark60,
        padding: 10,
        borderRadius: 6,
    },
});

export default PencilSizePopup;
