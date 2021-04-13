import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../styles';

/**
 * This component is used to display a name/logo on the header in the StartScreen.
 * @namespace HeaderName
 * @category StartScreenComponents
 */
const HeaderName = React.memo(() => {
    return (
        <View style={styles.main}>
            <Text style={styles.textPartOne}>illus</Text>
            <Text style={styles.textPartTwo}>Trafikk</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
    },
    textPartOne: {
        color: Colors.startScreenLinkDrawing,
        ...Typography.heading,
    },
    textPartTwo: {
        color: Colors.icons,
        ...Typography.heading,
    },
});

export default HeaderName;
