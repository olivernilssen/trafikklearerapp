import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
// import { ButtonGroup } from '../reusableComponents';
// import curriculumData from './curriculumData';
// import { Colors, Typography } from '../../styles';
import {
    fareSkilt,
    forbudsSkilt,
    markeringsSkilt,
    opplysningsSkilt,
    påbudsSkilt,
    serviceSkilt,
    underSkilt,
    veivisningsSkilt,
    vikepliktsSkilt,
} from '../../assets/sign_descriptions/index';

const RoadSignMenuContent = (props) => {
    const { handleSignType } = props;

    const testArray = [
        { typeName: 'Fareskilt', typeObject: fareSkilt },
        { typeName: 'ForbudsSkilt', typeObject: forbudsSkilt },
        { typeName: 'Markeringsskilt', typeObject: markeringsSkilt },
        { typeName: 'Opplysningsskilt', typeObject: opplysningsSkilt },
        { typeName: 'Påbudsskilt', typeObject: påbudsSkilt },
        { typeName: 'Serviceskilt', typeObject: serviceSkilt },
        { typeName: 'Underskilt', typeObject: underSkilt },
        { typeName: 'Veivisningsskilt', typeObject: veivisningsSkilt },
        { typeName: 'Vikepliktsskilt', typeObject: vikepliktsSkilt },
    ];

    const SignTypeButton = testArray.map((value, index) => {
        return (
            <View key={index}>
                <TouchableOpacity
                    onPress={() => handleSignType(value.typeObject)}>
                    <Text style={styles.textStyle}>{value.typeName}</Text>
                </TouchableOpacity>
            </View>
        );
    });

    return (
        <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
            {SignTypeButton}
        </View>
    );
};

const styles = StyleSheet.create({
    // container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    textStyle: {
        fontSize: 30,
        color: 'white',
    },
});

export default RoadSignMenuContent;
