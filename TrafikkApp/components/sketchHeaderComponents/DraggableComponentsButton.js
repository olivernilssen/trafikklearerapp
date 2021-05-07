import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Colors, Icons } from '../../styles';

/**This is the button component for the
 * box that is either open or closed on the sketchheader
 * @namespace DraggableComponentsButton
 * @category SketchHeaderComponents
 * @prop {function} topMenuHidden Whether the draggable components menu is hidden or not
 * @prop {boolean} toggleTopMenu Handler to be called when the user presses the button
 */
const DraggableComponentsButton = React.memo((props) => {
    const { topMenuHidden } = props;
    return (
        <View
            style={[
                styles.buttonSize,
                !topMenuHidden.isOpen
                    ? styles.buttonActive
                    : styles.buttonInactive,
            ]}>
            <TouchableOpacity onPress={() => topMenuHidden.onToggle()}>
                <Icon
                    name={!topMenuHidden.isOpen ? 'car-crash' : 'car'}
                    size={Icons.medium}
                    color={
                        !topMenuHidden.isOpen
                            ? Colors.textPrimary
                            : Colors.icons
                    }
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
        ...Buttons.sketchHeaderButton,
    },
    buttonInactive: {
        backgroundColor: Colors.headerBg,
    },
});

export default DraggableComponentsButton;
