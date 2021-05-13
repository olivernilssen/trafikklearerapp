import React, { useState, useContext } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';
import USER_KEYS from '../helpers/storageKeys';
import { isSmallScreen } from '../helpers';
import ButtonGroup from '../reusableComponents/ButtonGroup';
import { Divider, BottomMenuAnimated } from '../reusableComponents/index';

import { Typography, Buttons, Icons, Colors } from '../../styles';

const mapTypes = {
    Standard: 'standard',
    Terreng: 'terrain',
    Satellitt: 'satellite',
};

/**
 * Component to render the bottom menu in maps for larger screens
 * @namespace LargeScreenMenu
 * @category MapComponents
 * @prop {hook} markerToggle hook to mark or unmark the markers
 * @prop {hook} pin hook to set the coords of the pin/marker
 * @prop {string} snapshot the path for the snapshot
 * @prop {function} takeSnapshot call to function to take snapshot and save img
 * @prop {string} mapType the maptype being used
 * @prop {function} setMapType setstate function to set maptype
 */
const LargeScreenMenu = ({
    markerToggle,
    pin,
    snapshot,
    takeSnapshot,
    mapType,
    setMapType,
    bottomMenuVisible,
}) => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);
    const [buttonLayout, setButtonLayout] = useState(undefined);

    const mapKeys = Object.keys(mapTypes);

    /** Save the pinned location to async storage
     * @memberof LargeScreenMenu
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
                {/* GROUP OF BUTTONS ON MAP */}
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Innstillinger</Text>
                    <Divider borderColor={Colors.dividerPrimary} />
                    {/* SAVE LOCATION BUTTON */}
                    <View style={styles.innerGroup}>
                        <TouchableOpacity
                            onLayout={(e) =>
                                setButtonLayout(e.nativeEvent.layout)
                            }
                            style={styles.button}
                            onPress={savePinLocation}>
                            <Text style={styles.buttonText}>Lagre pin</Text>
                        </TouchableOpacity>

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
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Skjermdump</Text>
                    <Divider borderColor={Colors.dividerPrimary} />
                    <View style={styles.innerGroup}>
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
                                size={Icons.small}
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
                            style={[styles.button, { flexDirection: 'row' }]}
                            onPress={() =>
                                navigation.navigate('MapSketchScreen')
                            }>
                            <Icon
                                name={'pen'}
                                size={Icons.small}
                                color={Colors.textPrimary}
                            />
                            <Text
                                style={[
                                    styles.buttonText,
                                    { marginLeft: '5%' },
                                ]}>
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
                style={styles.buttonGroupComponent}
                onLayout={(e) => setButtonLayout(e.nativeEvent.layout)}>
                <Text style={styles.sectionText}>Karttype:</Text>
                {buttonLayout && (
                    <ButtonGroup
                        selectedValue={mapKeys.find(
                            (key) => mapTypes[key] === mapType
                        )}
                        values={mapKeys}
                        width={buttonLayout.width - 80}
                        height={50}
                        onSelect={(newValue) => setMapType(mapTypes[newValue])}
                        inactiveBackgroundColor={Colors.bottomMenyButtons}
                        // width={'100%'}
                    />
                )}
            </View>
        </BottomMenuAnimated>
    );
};

export default LargeScreenMenu;

const styles = StyleSheet.create({
    bottomSheet: {
        // backgroundColor: Colors.dividerPrimary + '50',
        height: 300,
        width: '100%',
        paddingHorizontal: '2%',
        paddingTop: '2%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    buttonGroup: {
        flex: isSmallScreen() ? 2 : 4,
        flexDirection: 'column',
        marginRight: isSmallScreen() ? '2%' : '5%',
        height: '90%',
    },
    innerGroup: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    sectionText: {
        ...Typography.section,
        color: Colors.textPrimary,
        marginBottom: isSmallScreen() ? '2%' : '3%',
    },
    buttonGroupComponent: {
        flex: 1,
        width: '90%',
        height: '60%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
    },
    button: {
        padding: '5%',
        backgroundColor: Colors.bottomMenyButtons,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.rounded,
        elevation: 5,
    },
    buttonText: {
        color: Colors.textPrimary,
        ...Typography.body,
    },
    image: {
        flex: isSmallScreen() ? 1 : 2,
        height: '90%',
        width: '50%',
        padding: '5%',
        resizeMode: 'contain',
        borderWidth: 2,
        borderColor: Colors.selectedBorder,
    },
});
