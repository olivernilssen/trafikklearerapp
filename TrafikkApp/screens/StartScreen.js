import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import styles from '../styles/mainStyles.js'
import { SafeAreaView } from 'react-native-safe-area-context'

// pull in header with DrawerTrigger
import Header from '../components/Header.js'

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Home" toggleDrawer={navigation.toggleDrawer} />
            <Image
                source={require('../assets/banner.png')}
                style={{ width: '100%', height: '90%' }}
                resizeMode="contain"
            />
        </SafeAreaView>
    )
}

export default StartScreen
