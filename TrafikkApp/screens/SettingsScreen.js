/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles.js';
import Header from '../components/Header.js';

const SettingsScreen = ({ navigation }) => {
     return (
          <SafeAreaView style={styles.container}>
               <Header
                    name="Innstillinger"
                    toggleDrawer={navigation.toggleDrawer}
               />
               <View
                    style={{
                         height: '90%',
                         justifyContent: 'center',
                         alignItems: 'center',
                    }}>
                    <Text>Innstillinger</Text>
               </View>
          </SafeAreaView>
     );
};
export default SettingsScreen;
