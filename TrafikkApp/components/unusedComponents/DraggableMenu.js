// import React, { Component } from 'react';
// import {
//     View,
//     Image,
//     Text,
//     FlatList,
//     StyleSheet,
//     TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Colors } from '../../styles';

// import objectPaths from './draggableObjectPaths';

// export default class DraggableMenu extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             objects: Object.keys(objectPaths),
//         };
//     }

//     //Item that goes into flatlist
//     listItem = ({ item }) => (
//         <TouchableOpacity
//             style={styles.item}
//             onPress={() => this.props.addDraggable(objectPaths[item])}>
//             <Image source={objectPaths[item]} style={styles.image} />
//             <Icon style={styles.icon} name={'plus'} size={25} />
//             {/* <Text style={styles.flatlistTitle}>{item}</Text> */}

//         </TouchableOpacity>
//     );

//     render() {
//         return (
//             <View style={styles.flatList}>
//                 <FlatList
//                     data={this.state.objects}
//                     renderItem={this.listItem}
//                     keyExtractor={(item) => item}
//                 />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     flatList: {
//         // backgroundColor: 'grey',
//         width: '20%',
//         alignContent: 'space-around',
//         paddingVertical: 20,
//     },
//     item: {
//         borderColor: 'black',
//         borderWidth: 2,
//         elevation: 5,
//         backgroundColor: Colors.linkDivider,
//         flexDirection: 'row',
//         marginBottom: 15,
//         padding: 5,
//     },
//     flatlistTitle: {
//         flex: 1,
//         fontSize: 25,
//         color: 'black',
//         // backgroundColor: 'blue',
//     },
//     icon: {
//         flex: 1,
//         marginLeft: 10,
//         alignSelf: 'center',
//     },
//     image: {
//         flex: 1,
//         // backgroundColor: 'black',
//         padding: 20,
//         width: '100%',
//         height: '100%',
//         resizeMode: 'contain',
//         transform: [{ rotate: '0deg' }],
//     },
// });
