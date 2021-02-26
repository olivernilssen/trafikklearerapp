import React from 'react';
import { FlatList, StyleSheet, View, Text, Image } from 'react-native';
import Header from '../components/Header';
import MainView from '../components/MainView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../styles/Colors';
import signSource from '../components/roadSignComponents/signPath';

const RoadSignScreen = ({ navigation }) => {
    const labelsArray = [];
    const testSkilt = signSource['Fareskilt'];
    const skiltGruppeArray = Object.keys(signSource);

    skiltGruppeArray.map((keys) => {
        labelsArray.push(keys);
    });

    const initialImageSrcName = Object.keys(signSource[labelsArray[0]])[0];

    const InitialImageSrc =
        signSource[skiltGruppeArray[0]][initialImageSrcName];

    console.log(initialImageSrcName);
    console.log(InitialImageSrc);
    console.log(labelsArray);

    const images = skiltGruppeArray.map((item, index) => {
        return (
            <View key={index}>
                <Image
                    source={skiltGruppeArray[item]}
                    // style={styles.icon}
                    resizeMode={'contain'}
                />
            </View>
        );
    });

    // const fareSkiltDisplay = fareSkilt.map((item, index) => (
    //     <Image source={item} />
    // ));

    return (
        <MainView>
            <View>
                <Header name={'Skilt'} navigation={navigation} />
            </View>
            {images}
        </MainView>
    );
};

export default RoadSignScreen;
