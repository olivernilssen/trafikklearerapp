import Icon from 'react-native-vector-icons/FontAwesome';
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import headerStyles from '../styles/headerStyle';
import Colors from '../styles/Colors';

const Header = ({ name, navigation }) => (
    <View style={headerStyles.header}>
        <TouchableOpacity
            onPress={
                name == 'Hjem' ? navigation.toggleDrawer : navigation.goBack
            }>
            <Icon
                name={name == 'Hjem' ? 'bars' : 'angle-left'}
                size={32}
                color={Colors.dark}
            />
        </TouchableOpacity>
        <Text style={headerStyles.headerText}>{name}</Text>
        <Text style={{ width: 50 }} />
    </View>
);

export default Header;
