import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import objectPaths from './objectPaths';

export default class DraggableMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: Object.keys(objectPaths),
        };
    }

    //Item that goes into flatlist
    listItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => this.props.addDraggable(objectPaths[item])}>
            <Icon style={styles.icon} name={'plus'} size={25} />
            <Text style={styles.flatlistTitle}>{item}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.flatList}>
                <FlatList
                    data={this.state.objects}
                    renderItem={this.listItem}
                    keyExtractor={(item) => item}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatList: {
        backgroundColor: 'grey',
        height: '20%',
        width: '40%',
        alignContent: 'flex-start',
    },
    item: {
        width: '100%',
        elevation: 10,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    flatlistTitle: {
        flex: 5,
        fontSize: 25,
        color: 'black',
        // backgroundColor: 'blue',
    },
    icon: {
        flex: 1,
        marginLeft: 10,
        // backgroundColor: 'pink',
        alignSelf: 'center',
        alignItems: 'center',
    },
});
