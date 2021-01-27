import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',

        // backgroundColor: 'black'
    },
    header: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#30475e',
    },
    headerText: {
        color: '#dddddd',
        fontSize: 20,
        fontWeight: '300',
    },
})

export default styles
