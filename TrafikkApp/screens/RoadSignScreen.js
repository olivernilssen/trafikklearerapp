import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SectionList,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header, MainView } from '../components/reusableComponents/';
import { Colors } from '../styles';
// import signSource from '../components/roadSignComponents/signPath';
// import dangerSignDescription from '../assets/fareskiltBeskrivelse.js';
import { fareSkilt, forbudsSkilt } from '../assets/sign_descriptions/';

const numColumns = 4;
const signObjectKeys = Object.keys(fareSkilt);
/**
 * Screen component for sign screen
 * Langt fra ferdig!!!
 * @namespace RoadSignScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */

const RoadSignScreen = ({ navigation }) => {
    // const signObjectKeys = Object.keys(fareSkilt);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={fareSkilt[item].source}
                    resizeMode={'contain'}></Image>
            </TouchableOpacity>
        );
    };

    return (
        <MainView>
            <View>
                <Header name={'Skilt'} navigation={navigation} />
            </View>
            {/* <ScrollView>{imageMapper}</ScrollView> */}
            <FlatList
                data={signObjectKeys}
                style={styles.imageContainer}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                numColumns={4}></FlatList>
        </MainView>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        marginVertical: 1,
        backgroundColor: 'grey',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width / numColumns - 3,
        margin: 1,
        height: Dimensions.get('screen').height / 7.5,
    },
});

export default RoadSignScreen;
