import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Header } from '../reusableComponents';
import { Colors } from '../../styles';

/**
 * The area component for the authority pyramid screen.
 * This is the component that contains all the other components related to the AuthorityPyramidScreen.
 * @namespace AuthorityPyramidArea
 * @category AthorityPyramidComponents
 */
const AuthorityPyramidArea = React.memo((props) => {
    return (
        <>
            <Header name="Myndighetspyramiden" style={styles.header}></Header>
            <View style={styles.main}>
                <Image
                    resizeMode={'contain'}
                    source={require('../../assets/images/myndighetspyramiden.png')}
                    style={styles.image}
                />
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.sketchBackground,
    },
    image: {
        width: '95%',
        height: '95%',
    },
});

export default AuthorityPyramidArea;
