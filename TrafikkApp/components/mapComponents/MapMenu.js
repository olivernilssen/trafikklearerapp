import React, { useState, useRef, useContext, useEffect } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';
import USER_KEYS from '../helpers/storageKeys';
import Colors from '../../styles/colors';
import { useOpen } from '../helpers/useOpen';
import { isSmallScreen } from '../reusableComponents/globalFunctions';
import ButtonGroup from '../reusableComponents/ButtonGroup';
import { Divider, BottomMenuAnimated } from '../reusableComponents/index';

import { Typography, Buttons, Icons } from '../../styles';

const mapTypes = ['standard', 'terrain', 'satellite'];

const MapArea = ({
    markerToggle,
    pin,
    snapshot,
    takeSnapshot,
    mapType,
    setMapType,
}) => {
    const appContext = useContext(AppContext);
    const bottomMenuToggle = useOpen(true);
    const [buttonLayout, setButtonLayout] = useState(undefined);
    // console.log(snapshot);

    /** Save the pinned location to async storage */
    const savePinLocation = () => {
        appContext.saveNewSettings(
            JSON.stringify(pin.coords),
            appContext.setSavedLocation,
            USER_KEYS.SAVEDLOC_KEY
        );
    };

    return (
        <BottomMenuAnimated
            bottomSheetOpen={bottomMenuToggle}
            chevronColor={Colors.chevronColor}>
            <View style={styles.bottomSheet}>
                {/* GROUP OF BUTTONS ON MAP */}
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Innstillinger</Text>
                    <Divider color={Colors.dividerSecondary} />
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

                        {/* MAP TYPE BUTTON */}
                        {buttonLayout != undefined && (
                            <View
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: 'transparent',
                                        elevation: 0,
                                    },
                                ]}>
                                <ButtonGroup
                                    selectedValue={mapType}
                                    values={mapTypes}
                                    width={
                                        buttonLayout
                                            ? buttonLayout.width
                                            : undefined
                                    }
                                    height={
                                        buttonLayout
                                            ? buttonLayout.height
                                            : undefined
                                    }
                                    onSelect={(newValue) =>
                                        setMapType(newValue)
                                    }
                                    inactiveBackgroundColor={
                                        Colors.bottomMenyButtons
                                    }
                                    // width={'100%'}
                                />
                            </View>
                        )}
                    </View>
                    {/* MAKE MARKERS VISIBLE BUTTON */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            markerToggle.onToggle();
                        }}>
                        <Text style={styles.buttonText}>
                            {markerToggle.isToggled ? 'Gjem' : 'Vis'} markør(er)
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Skjermdump</Text>
                    <Divider color={Colors.dividerSecondary} />
                    <View style={styles.innerGroup}>
                        {/* SCREENSHOT BUTTON */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takeSnapshot}>
                            <Icon
                                name={'camera'}
                                size={Icons.medium}
                                color={Colors.textPrimary}
                            />
                            <Text style={styles.buttonText}>Ta skjermdump</Text>
                        </TouchableOpacity>

                        {/* USE PHOTO TO ILLUSTRATE BUTTON */}
                        <TouchableOpacity
                            style={[styles.button, { flexDirection: 'row' }]}
                            onPress={() => {}}>
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
        </BottomMenuAnimated>
    );
};

export default MapArea;

const styles = StyleSheet.create({
    bottomSheet: {
        // backgroundColor: Colors.dividerPrimary + '50',
        height: 300,
        width: '100%',
        padding: '2%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        // opacity: 0.9,
    },
    buttonGroup: {
        flex: isSmallScreen ? 2 : 4,
        flexDirection: 'column',
        marginRight: isSmallScreen ? '2%' : '5%',
    },
    innerGroup: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    sectionText: {
        ...Typography.section,
        color: Colors.textPrimary,
        marginBottom: isSmallScreen ? '2%' : '5%',
    },

    button: {
        padding: '3%',
        backgroundColor: Colors.bottomMenyButtons,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.rounded,
        elevation: 10,
    },
    buttonComp: {
        width: '100%',
        height: '100%',
        paddingTop: '7%',
    },

    buttonText: {
        color: 'white',
        fontSize: isSmallScreen ? 18 : 22,
    },
    image: {
        flex: isSmallScreen ? 1 : 2,
        height: '100%',
        width: '50%',
        padding: '5%',
        resizeMode: 'contain',
        borderColor: 'white',
        borderWidth: 2,
        borderColor: Colors.selectedBorder,
    },
});
