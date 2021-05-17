import { PermissionsAndroid } from 'react-native';

/**
 * Function to check the location permission on the device for this app.
 * @memberof Helpers
 */
const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Illustrafikk',
                message:
                    'Illustrafikk spør om tillatelse til å bruke lokasjonen din',
                buttonNeutral: 'Spør meg senere',
                buttonNegative: 'Ikke tillat',
                buttonPositive: 'Tillat',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.info('You can use the location services');
        } else {
            console.info('location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

export default requestLocationPermission;
