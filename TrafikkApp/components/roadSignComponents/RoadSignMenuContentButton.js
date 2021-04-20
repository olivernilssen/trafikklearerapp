import React, { useState, useEffect } from 'react';
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
    Modal,
} from 'react-native';

const RoadSignMenuContentButton = (props) => {
    return (
        <TouchableOpacity onPress={() => handleSignType(fareSkilt)}>
            <Text style={styles.textStyle}>Fareskilt</Text>
        </TouchableOpacity>
    );
};
