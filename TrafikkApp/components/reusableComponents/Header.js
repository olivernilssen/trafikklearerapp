import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Icons, Typography } from '../../styles';

const Header = React.memo((props) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={props.navigation.toggleDrawer}>
            <Icon name={'bars'} size={Icons.small} color={Colors.icons} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{props.name}</Text>
        {props.children}
    </View>
));

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
        elevation: 5,
    },
    headerText: {
        flex: 1,
        color: Colors.icons,
        paddingRight: 30,
        textAlign: 'center',
        ...Typography.large,
    },
});

export default Header;
