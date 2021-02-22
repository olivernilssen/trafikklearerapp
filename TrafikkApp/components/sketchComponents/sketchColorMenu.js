import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, View, ColorPalette } from 'react-native-ui-lib';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

const { Popover } = renderers;

import Color from '../../styles/Colors';

const SketchColorMenu = (props) => {
    const [currentColorSetup, setCurrentColorSetup] = useState({
        color: INITIAL_COLOR,
        textColor: Colors.white,
        paletteChange: false,
    });

    const { onPencilColorChange } = props;

    const INITIAL_COLOR = '#20303C';
    const colors = [
        '#20303C',
        '#3182C8',
        '#00AAAF',
        '#00A65F',
        '#E2902B',
        '#D9644A',
        '#CF262F',
        '#8B1079',
    ];

    const onPaletteValueChange = (value, options) => {
        setCurrentColorSetup({
            color: value,
            textColor: options ? options.tintColor : undefined,
            paletteChange: true,
        });

        onPencilColorChange(value);
    };

    const { color, textColor, customColors, paletteChange } = currentColorSetup;

    return (
        <View key={currentColorSetup.color}>
            <Menu
                renderer={Popover}
                // opened={true}
                rendererProps={{ preferredPlacement: 'bottom' }}>
                <MenuTrigger>
                    <Icon
                        name={'circle'}
                        size={15}
                        solid
                        color={currentColorSetup.color}
                        style={styles.buttonSize}
                    />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption>
                        <ColorPalette
                            value={color}
                            swatchStyle={{
                                width: 250 / colors.length,
                                height: 250 / colors.length,
                            }}
                            onValueChange={onPaletteValueChange}
                            colors={colors}
                            numberOfRows={2}
                            containerWidth={250}
                            usePagination={false}
                        />
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonSize: {
        fontSize: 30,
    },
});

export default SketchColorMenu;
