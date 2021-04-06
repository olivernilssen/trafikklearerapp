import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import Header from '../components/reusableComponents/Header';
import MainView from '../components/reusableComponents/MainView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../styles';
import signSource from '../components/roadSignComponents/signPath';
import dangerSignDescription from '../assets/fareskiltBeskrivelse.js';

/**
 * Screen component for sign screen
 * Langt fra ferdig!!!
 * @namespace RoadSignScreen
 * @memberof Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const RoadSignScreen = ({ navigation }) => {
    const [testData, setTestData] = useState([signSource]);

    console.log(testData);
    const thisSignType = dangerSignDescription;

    const SignDesigns = [];

    const keys = Object.keys(thisSignType);
    keys.map((key) => {
        SignDesigns.push(key);
    });

    console.log(SignDesigns);

    // console.log(signSource['skilt'][0]['fareskilt'][0]['signImg']);
    const testHandler = () => {
        setTestData(signSource);
    };

    return (
        <MainView>
            <View>
                <Header name={'Skilt'} navigation={navigation} />
            </View>
            <View style={{ flex: 1, marginTop: 22 }}>
                <FlatList
                    data={SignDesigns}
                    renderItem={({ item, index }) => {
                        console.log(item, index);
                        return (
                            <Image
                                source={
                                    item['skilt']['fareskilt'][100_1].signImg
                                }
                            />
                        );
                    }}></FlatList>
            </View>
        </MainView>
    );
};

export default RoadSignScreen;
