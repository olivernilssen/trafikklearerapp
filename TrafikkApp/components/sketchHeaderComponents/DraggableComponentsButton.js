import { TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Colors, Icons } from '../../styles';

/**This is the button component for the
 * box that is either open or closed on the sketchheader
 * @namespace DraggableComponentsButton
 * @memberof sketchHeaderComponents
 * @prop {function} topMenuHidden handler to be called when user presses button
 * @prop {boolean} toggleRightMenuState the state toggleRightMenuState
 */
const DraggableComponentsButton = (props) => {
    const { topMenuHidden, toggleRightMenuState } = props;
    return (
        <View
            style={
                !toggleRightMenuState
                    ? [styles.buttonSize, styles.buttonActive]
                    : [styles.buttonSize, styles.buttonInactive]
            }>
            <TouchableOpacity onPress={() => topMenuHidden()}>
                <Icon
                    name={!toggleRightMenuState ? 'car-crash' : 'car'}
                    size={Icons.medium}
                    color={Colors.textPrimary}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonSize: {
        height: 62,
        width: 62,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.round,
    },
    buttonActive: {
        color: Colors.textPrimary,
        backgroundColor: Colors.boxIconActive,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: Colors.header,
    },
});

export default DraggableComponentsButton;
