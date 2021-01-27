/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles.js';
import Header from '../components/Header.js';

const IntersectionScreen = ({ navigation }) => {
     return (
          <SafeAreaView style={styles.container}>
               <Header name="Veikryss" toggleDrawer={navigation.toggleDrawer} />
               <View style={screenStyles.main}>
                    <Text>Veikryss siden</Text>
               </View>
          </SafeAreaView>
     );
};

const screenStyles = StyleSheet.create({
     main: {
          height: '90%',
          justifyContent: 'center',
          alignItems: 'center',
     },
});

export default IntersectionScreen;
