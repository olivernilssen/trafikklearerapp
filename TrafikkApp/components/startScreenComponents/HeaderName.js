import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Typography } from '../../styles';

/**
 * This component is used to display a name/logo on the header in the StartScreen.
 * @namespace HeaderName
 * @category StartScreenComponents
 */
const HeaderName = React.memo(() => {
    imgSource = require('../../assets/images/logo.png');
    return (
        <View style={styles.main}>
            <Image
                source={imgSource}
                style={styles.image}
                resizeMode={'cover'}
            />
            <Text style={styles.text}>illusTrafikk</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    image: {
        height: 70,
        width: undefined,
        aspectRatio: 1329 / 1697,
    },
    text: {
        textAlignVertical: 'center',
        fontWeight: 'bold',
        color: Colors.startScreenLinkDrawing,
        ...Typography.heading,
    },
});

export default HeaderName;
