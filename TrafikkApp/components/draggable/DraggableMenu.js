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

import objectPaths from './draggableObjectPaths';

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
            {/* <Text style={styles.flatlistTitle}>{item}</Text> */}
            <Image source={objectPaths[item]} style={styles.image} />
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
        // backgroundColor: 'grey',
        width: '30%',
        alignContent: 'space-around',
    },
    item: {
        borderColor: 'black',
        borderWidth: 2,
        elevation: 5,
        backgroundColor: 'beige',
        flexDirection: 'row',
        marginBottom: 15,
    },
    flatlistTitle: {
        flex: 1,
        fontSize: 25,
        color: 'black',
        // backgroundColor: 'blue',
    },
    icon: {
        flex: 1,
        marginLeft: 10,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        // backgroundColor: 'black',
        width: 20,
        height: 40,
        resizeMode: 'contain',
        transform: [{ rotate: '0deg' }],
    },
});
