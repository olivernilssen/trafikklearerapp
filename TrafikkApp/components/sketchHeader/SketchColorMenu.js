import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, ColorPalette } from 'react-native-ui-lib';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import { Colors, Typography, Buttons } from '../../styles';

const { Popover } = renderers;

const SketchColorMenu = React.memo((props) => {
    const INITIAL_COLOR = '#CF262F';

    const [currentColorSetup, setCurrentColorSetup] = useState({
        color: INITIAL_COLOR,
        textColor: Colors.header,
        paletteChange: false,
    });

    const {
        onPencilColorChange,
        propsStyle,
        iconSize,
        pencil,
        buttonOnPress,
        buttonActiveNumber,
        isActive,
        focusedActiveButton,
    } = props;

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
        focusedActiveButton(buttonActiveNumber);
    };

    const { color } = currentColorSetup;

    return (
        <View style={propsStyle} key={currentColorSetup.color}>
            <Menu
                renderer={Popover}
                rendererProps={{ preferredPlacement: 'bottom' }}>
                <MenuTrigger
                    triggerOnLongPress
                    onAlternativeAction={() => {
                        pencil,
                            buttonOnPress(),
                            focusedActiveButton(buttonActiveNumber);
                    }}
                    style={
                        isActive === buttonActiveNumber
                            ? styles.buttonActive
                            : [styles.buttonSize, styles.buttonInactive]
                    }>
                    <Icon
                        name={'pen'}
                        size={30}
                        solid
                        color={currentColorSetup.color}
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
});

const styles = StyleSheet.create({
    buttonSize: {
        // fontSize: 30,
        ...Typography.large,
    },
    buttonActive: {
        // backgroundColor: 'yellow',
        // flex: 1,
        // color: Color.iconPrimary,
        // fontSize: 30,
        backgroundColor: Colors.iconActive,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: Color.tabButtonBorder,
        // width: '100%',
        // height: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Buttons.round,
        ...Typography.large,
    },
    buttonInactive: {
        color: Colors.icons,
        // fontSize: 30,
        backgroundColor: Colors.header,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: Color.tabButtonBorder,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Typography.large,
    },
});

export default SketchColorMenu;
