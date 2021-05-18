import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Typography } from '../../styles';

/**
 * This component is used to display a name/logo on the header in the StartScreen.
 *
 * @namespace HeaderName
 * @category StartScreenComponents
 */
const HeaderName = React.memo(() => {
    return (
        <View style={styles.main}>
            <Text style={styles.text}>
                illus<Text style={{ color: Colors.icons }}>Trafikk</Text>
            </Text>
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        textAlignVertical: 'center',
        color: Colors.logo,
        ...Typography.logoHeading,
    },
});

export default HeaderName;
