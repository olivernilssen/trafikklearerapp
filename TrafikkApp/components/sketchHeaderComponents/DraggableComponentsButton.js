import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Colors, Icons } from '../../styles';

/**This is the button component for the
 * box that is either open or closed on the sketchheader
 * @namespace DraggableComponentsButton
 * @category SketchHeaderComponents
 * @prop {object} topMenuOpen hook to get bool and functions of the menu
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
        // ...Buttons.sketchHeaderButton,
    },
    buttonInactive: {
        backgroundColor: Colors.headerBg,
    },
});

export default DraggableComponentsButton;
