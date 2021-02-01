import Icon from 'react-native-vector-icons/FontAwesome';
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

const SketchHeader = ({ name, navigation, undo, clear }) => (
    <View style={styles.header}>
        <View styles={styles.headerInfo}>
            <BackButton name={name} navigation={navigation} />
            <Text style={styles.headerText}>{name}</Text>
        </View>
        <ToolBar undo={undo} clear={clear} />
    </View>
);

const ToolBar = ({ undo, clear }) => {
    return (
        <View style={styles.toolBar}>
            <TouchableOpacity onPress={undo}>
                <Icon name="undo" size={32} />
                <Text>Undo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clear}>
                <Icon name="trash" size={32} />
                <Text>Clear</Text>
            </TouchableOpacity>
        </View>
    );
};

const BackButton = ({ name, navigation }) => {
    return (
        <TouchableOpacity
            onPress={
                name == 'Hjem' ? navigation.toggleDrawer : navigation.goBack
            }>
            <Icon
                name={name == 'Hjem' ? 'bars' : 'angle-left'}
                size={32}
                color={Colors.dark}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: Colors.light,
        flex: 1,
        elevation: 10,
        backgroundColor: 'pink',
    },
    headerInfo: {
        // flex: 1,
        // width: '100%',
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: Colors.dark,
        fontSize: 25,
    },
    toolBar: {
        // flex: 1,
        backgroundColor: 'green',
        // width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default SketchHeader;
