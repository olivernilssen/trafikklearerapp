import { TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Colors, Icons } from '../../styles';

/**This is the button component for the
 * box that is either open or closed on the sketchheader
 * @namespace DraggableComponentsButton
 * @category sketchHeaderComponents
 * @prop {function} topMenuHidden handler to be called when user presses button
 * @prop {boolean} toggleRightMenuState the state toggleRightMenuState
 */
const DraggableComponentsButton = (props) => {
    const { topMenuHidden, toggleRightMenuState } = props;
    return (
        <View
            style={[
                styles.buttonSize,
                !toggleRightMenuState
                    ? styles.buttonActive
                    : styles.buttonInactive,
            ]}>
            <TouchableOpacity onPress={() => topMenuHidden()}>
                <Icon
                    name={!toggleRightMenuState ? 'car-crash' : 'car'}
                    size={Icons.medium}
                    color={
                        !toggleRightMenuState
                            ? Colors.textPrimary
                            : Colors.icons
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

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
