import Icon from 'react-native-vector-icons/FontAwesome'
import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import styles from '../styles/mainStyles.js'

const Header = ({ name, toggleDrawer }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => toggleDrawer()}>
            <Icon name="bars" size={32} color="#dddddd" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={{ width: 50 }} />
    </View>
)

export default Header
