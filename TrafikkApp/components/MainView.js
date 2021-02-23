import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    },
});

export default MainView;
