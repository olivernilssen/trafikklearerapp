import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Typography } from '../../styles';

/**
 * This component is used to display a name/logo on the header in the StartScreen.
 * @namespace HeaderName
 * @category StartScreenComponents
 */
const HeaderName = React.memo(() => {
    imgSource = require('../../assets/images/ic_launcher_round.png');
    return (
        <View style={styles.main}>
            <Image
                source={imgSource}
                style={styles.image}
                resizeMode={'contain'}
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
        height: undefined,
        width: 50,
        aspectRatio: 1329 / 1697,
    },
    text: {
        textAlignVertical: 'center',
        color: Colors.logo,
        ...Typography.heading,
        fontSize: 34,
    },
});

export default HeaderName;
