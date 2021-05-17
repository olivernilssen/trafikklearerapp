import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Colors, Icons } from '../../styles';

/**
 * This component displays the button to open the draggableMenu on the sketch screens.
 * The button is displayed in the header on the sketch screens.
 *
 * @namespace DraggableComponentsButton
 * @category SketchHeaderComponents
 * @prop {object} topMenuOpen Hook to get bool and functions of the menu
 */
const DraggableComponentsButton = React.memo((props) => {
    const { topMenuOpen } = props;
    return (
        <View>
            <TouchableOpacity
                onPress={() => topMenuOpen.onToggle()}
                style={[
                    styles.buttonSize,
                    topMenuOpen.isOpen
                        ? styles.buttonActive
                        : styles.buttonInactive,
                ]}>
                <Icon
                    name={topMenuOpen.isOpen ? 'car-crash' : 'car'}
                    size={Icons.medium}
                    color={Colors.textPrimary}
                />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.sketchHeaderButton,
    },
    buttonActive: {
        backgroundColor: Colors.boxIconActive,
    },
    buttonInactive: {
        backgroundColor: Colors.headerBg,
    },
});

export default DraggableComponentsButton;
