import React, { useState, useContext } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';
import USER_KEYS from '../helpers/storageKeys';

import Colors from '../../styles/colors';
import { isSmallScreen } from '../helpers';
import {
    Divider,
    BottomMenuAnimated,
    ButtonGroup,
} from '../reusableComponents/index';

import { Typography, Buttons, Icons } from '../../styles';

const mapTypes = ['standard', 'terrain', 'satellite'];

/**
 * Component to render the bottom menu in maps for smaller screens
 * @namespace SmallScreenMenu
 * @category MapComponents
 * @prop {hook} markerToggle hook to mark or unmark the markers
 * @prop {hook} pin hook to set the coords of the pin/marker
 * @prop {string} snapshot the path for the snapshot
 * @prop {function} takeSnapshot call to function to take snapshot and save img
 * @prop {string} mapType the maptype being used
 * @prop {function} setMapType setstate function to set maptype
 */
const SmallScreenMenu = ({
    markerToggle,
    pin,
    snapshot,
    takeSnapshot,
    mapType,
    setMapType,
    bottomMenuVisible,
}) => {
    const appContext = useContext(AppContext);
    const navigation = useNavigation();

    const [buttonLayout, setButtonLayout] = useState(undefined);
    // console.log(snapshot);

    /** Save the pinned location to async storage
     * @memberof SmallScreenMenu
     */
    const savePinLocation = () => {
        appContext.saveNewSettings(
            JSON.stringify(pin.coords),
            appContext.setSavedLocation,
            USER_KEYS.SAVEDLOC_KEY
        );
        ToastAndroid.show(
            'Markør har blitt lagret på enheten',
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        );
    };

    return (
        <BottomMenuAnimated
            bottomSheetOpen={bottomMenuVisible}
            chevronColor={Colors.chevronColor}>
            <View style={styles.bottomSheet}>
                {/* GROUP OF BUTTONS IN MENU */}
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Innstillinger</Text>
                    <Divider color={Colors.dividerSecondary} />
                    {/* INNER GROUP OF BUTTONS */}
                    <View style={styles.innerGroup}>
                        {/* SAVE LOCATION BUTTON */}
                        <TouchableHighlight
                            onLayout={(e) =>
                                setButtonLayout(e.nativeEvent.layout)
                            }
                            style={styles.button}
                            onPress={savePinLocation}>
                            <Text style={styles.buttonText}>Lagre markør</Text>
                        </TouchableHighlight>

                        {/* MAKE MARKERS VISIBLE BUTTON */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                markerToggle.onToggle();
                            }}>
                            <Text style={styles.buttonText}>
                                {markerToggle.isToggled ? 'Gjem' : 'Vis'}{' '}
                                markør(er)
                            </Text>
                        </TouchableOpacity>

                        {/* SCREENSHOT BUTTON */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                ,
                                {
                                    flexDirection: 'row',
                                },
                            ]}
                            onPress={takeSnapshot}>
                            <Icon
                                name={'camera'}
                                size={Icons.medium}
                                color={Colors.textPrimary}
                            />
                            <Text
                                style={[
                                    styles.buttonText,
                                    { marginLeft: '5%' },
                                ]}>
                                Ta skjermdump
                            </Text>
                        </TouchableOpacity>

                        {/* USE PHOTO TO ILLUSTRATE BUTTON */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                navigation.navigate('MapSketchScreen')
                            }>
                            <Text style={styles.buttonText}>
                                Bruk skjermdump
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: 'transparent',
                                    elevation: 0,
                                },
                            ]}>
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* SCREENSHOTTEN IMAGE */}
                <Image
                    style={styles.image}
                    source={{
                        uri: snapshot != '' ? snapshot : null,
                    }}
                />
            </View>
            <View
                style={styles.buttonComp}
                onLayout={(e) => setButtonLayout(e.nativeEvent.layout)}>
                <Text style={styles.sectionText}>Karttype</Text>
                {buttonLayout && (
                    <ButtonGroup
                        selectedValue={mapType}
                        values={mapTypes}
                        width={buttonLayout.width - 50}
                        onSelect={(newValue) => setMapType(newValue)}
                        inactiveBackgroundColor={Colors.bottomMenyButtons}
                        // width={'100%'}
                    />
                )}
            </View>
        </BottomMenuAnimated>
    );
};

export default SmallScreenMenu;

const styles = StyleSheet.create({
    bottomSheet: {
        // backgroundColor: Colors.dividerPrimary + '50',
        height: 250,
        width: '100%',
        padding: '2%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        // opacity: 0.9,
    },
    buttonGroup: {
        flex: 2,
        flexDirection: 'column',
        marginRight: isSmallScreen ? '4%' : '5%',
    },
    innerGroup: {
        // flex: 1,
        height: '100%',
        paddingTop: '4%',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    sectionText: {
        ...Typography.section,
        color: Colors.textPrimary,
        marginBottom: isSmallScreen ? '2%' : '5%',
    },

    button: {
        // flex: 1,
        padding: '3%',
        backgroundColor: Colors.bottomMenyButtons,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.rounded,
        elevation: 10,
    },
    buttonComp: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
        // paddingTop: '7%',
    },
    buttonText: {
        color: Colors.textPrimary,
        fontSize: isSmallScreen ? 15 : 22,
    },
    image: {
        flex: 1,
        height: '80%',
        padding: '5%',
        resizeMode: 'cover',
        borderWidth: 2,
        alignSelf: 'center',
        borderColor: Colors.selectedBorder,
    },
});
