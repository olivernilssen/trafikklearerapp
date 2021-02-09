import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Fab, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from '../styles/Colors';

const SelectIntersection = (props) => {
    const hoyreX = require('../assets/intersections/hoyrekryss/veikryss-hoyre-X.png');
    const forkjorsX = require('../assets/intersections/forkjorskryss/veikryss-forkjors-X.png');
    const lysX = require('../assets/intersections/lyskryss/veikryss-lys-X.png');

    const [currImage, setImage] = useState(hoyreX);
    const [FabActive, setActiveFab] = useState(false);

    const onImageChange = (newImage) => {
        setImage(newImage);
        setActiveFab(!FabActive);
    };

    return (
        <View style={screenStyles.container}>
            <ImageBackground
                style={screenStyles.backgroundImage}
                source={currImage}>
                {props.children}

                {/* Floating avtion button to pick a different background image */}
                <Fab
                    active={FabActive}
                    direction="left"
                    containerStyle={{}}
                    style={{ backgroundColor: Colors.colorful }}
                    position="bottomRight"
                    onPress={() => setActiveFab(!FabActive)}>
                    <Icon name="images" />
                    <Button
                        onPress={() => onImageChange(hoyreX)}
                        style={{ backgroundColor: Colors.fab_hoyrekryss }}>
                        <Text>H</Text>
                    </Button>
                    <Button
                        onPress={() => onImageChange(lysX)}
                        style={{ backgroundColor: Colors.fab_lyskryss }}>
                        <Text>L</Text>
                    </Button>
                    <Button
                        onPress={() => onImageChange(forkjorsX)}
                        style={{ backgroundColor: Colors.fab_forkjorskryss }}>
                        <Text>F</Text>
                    </Button>
                </Fab>
            </ImageBackground>
        </View>
    );
};

const screenStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    footerNav: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20,
        backgroundColor: Colors.light,
    },
});

export default SelectIntersection;
