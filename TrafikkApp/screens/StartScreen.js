import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/mainStyles.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../styles/Colors';

// pull in header with DrawerTrigger
import Header from '../components/Header.js';

const StartScreen = ({ navigation }) => {
     return (
          <SafeAreaView style={styles.container}>
               <Header name="Home" toggleDrawer={navigation.toggleDrawer} />
               <View style={screenStyles.container}>
                    <TouchableOpacity
                         style={screenStyles.linkContainer}
                         activeOpacity={0.8}>
                         <Icon name="times" size={100} color={Colors.light} />
                         <Text style={screenStyles.linkText}>Veikryss</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={screenStyles.linkContainer}
                         activeOpacity={0.8}>
                         <Icon
                              name="question"
                              size={100}
                              color={Colors.light}
                         />
                         <Text style={screenStyles.linkText}>tba</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={screenStyles.linkContainer}
                         activeOpacity={0.8}>
                         <Icon
                              name="crosshairs"
                              size={100}
                              color={Colors.light}
                         />
                         <Text style={screenStyles.linkText}>Rundkjøring</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={screenStyles.linkContainer}
                         activeOpacity={0.8}>
                         <Icon
                              name="question"
                              size={100}
                              color={Colors.light}
                         />
                         <Text style={screenStyles.linkText}>tba</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={screenStyles.linkContainer}
                         activeOpacity={0.8}>
                         <Icon name="road" size={100} color={Colors.light} />
                         <Text style={screenStyles.linkText}>Vei</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={screenStyles.linkContainer}
                         activeOpacity={0.8}>
                         <Icon
                              name="question"
                              size={100}
                              color={Colors.light}
                         />
                         <Text style={screenStyles.linkText}>tba</Text>
                    </TouchableOpacity>
               </View>
          </SafeAreaView>
     );
};

const screenStyles = StyleSheet.create({
     container: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          alignContent: 'center',
     },
     linkContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          width: 250,
          height: 250,
          borderRadius: 30,
          borderWidth: 3,
          borderColor: Colors.light,
          overflow: 'hidden',
          margin: 30,
          backgroundColor: Colors.dark,
     },
     linkText: {
          fontSize: 30,
          color: Colors.light,
     },
});

export default StartScreen;
