import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Illustrafikk',
                message:
                    'Illustrafikk spør om tillatelse til å bruke GPS koordinatene dine',
                buttonNeutral: 'Spør meg senere',
                buttonNegative: 'Avbryt',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location services');
        } else {
            console.log('location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};
