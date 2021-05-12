import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Component that displays a safe area view around the contents of a screen.
 * Takes in other React Native components as children.
 * @namespace MainView
 * @category ReusableComponents
 */
const MainView = React.memo((props) => {
    return (
        <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: 'black',
    },
});

export default MainView;
