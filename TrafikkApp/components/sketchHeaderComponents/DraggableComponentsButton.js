import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Colors, Icons } from '../../styles';

/**This is the button component for the
 * box that is either open or closed on the sketchheader
 * @namespace DraggableComponentsButton
 * @category SketchHeaderComponents
 * @prop {object} topMenuHidden hook to get bool and functions of the menu
 */
const DraggableComponentsButton = React.memo((props) => {
    const { topMenuHidden } = props;
    return (
        <View>
            <TouchableOpacity
                onPress={() => topMenuHidden.onToggle()}
                style={[
                    styles.buttonSize,
                    !topMenuHidden.isOpen
                        ? styles.buttonActive
                        : styles.buttonInactive,
                ]}>
                <Icon
                    name={topMenuHidden.isOpen ? 'car' : 'car-crash'}
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
        // ...Buttons.sketchHeaderButton,
    },
    buttonInactive: {
        backgroundColor: Colors.headerBg,
    },
});

export default DraggableComponentsButton;
