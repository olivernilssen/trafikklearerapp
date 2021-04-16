import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    SectionList,
    Text,
    SafeAreaView,
} from 'react-native';

import DrawerToggleItem from './DrawerToggleItem';
import DrawerItem from './DrawerItem';
import { Divider } from '../reusableComponents/';
import { Colors } from '../../styles';

/**
 * Component to display the menu as a flatlist in
 * the navigation drawer (will add all items that are in props.state.routes)
 * @namespace DrawerMenu
 * @category DrawerComponents
 * @prop {function} navigation functions for the drawer navigation
 */
const DrawerMenu = React.memo((props) => {
    const [drawerInfo, setDrawerInfo] = useState({});
    const [arrayFinished, setArrayFinished] = useState(false);

    useEffect(() => {
        if (!arrayFinished) {
            var newArray = [];
            var titles = [];
            props.state.routes.forEach((screen) => {
                const title = screen.params.section;
                if (titles.indexOf(title) === -1) {
                    titles.push(title);
                    newArray.push({ title: title, data: [] });
                }

                newArray.forEach((section) => {
                    if (section['title'] === title) {
                        section['data'].push({
                            name: screen.name,
                            nav: props.navigation,
                            params: screen.params,
                            key: screen.key,
                        });
                    }
                });
            });

            setDrawerInfo(newArray);
            setArrayFinished(true);
        }
    }, []);

    const SectionHeader = ({ title }) => {
        if (title == '') {
            return null;
        } else {
            return (
                <View style={styles.sectionView}>
                    <Text style={styles.sectionText}>{title}</Text>
                    <Divider
                        style={styles.divider}
                        borderColor={Colors.dividerPrimary}
                    />
                </View>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <DrawerToggleItem navigation={props.navigation} icon={'times'} />
            <Divider
                style={styles.firstDivider}
                borderColor={Colors.dividerPrimary}
            />
            {/* <Divider
                style={styles.divider}
                borderColor={Colors.dividerPrimary}
            /> */}
            {arrayFinished && (
                <SectionList
                    sections={drawerInfo}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <DrawerItem
                            navigation={item['nav']}
                            screenIndex={props.state.index}
                            screenName={item['name']}
                            params={item['params']}
                            key={item['key']}
                        />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader title={title} />
                    )}
                />
            )}

            {/* <FlatList
                data={props.state.routes}
                renderItem={({ item }) => (
                    <DrawerItem
                        navigation={props.navigation}
                        screenIndex={props.state.index}
                        screenName={item.name}
                        params={item.params}
                        key={item.key}
                    />
                )}
            /> */}
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.drawerBg,
        paddingTop: 15,
        // paddingHorizontal: 15,
    },
    sectionView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        alignContent: 'center',
    },
    sectionText: {
        // flex: 1,
        color: Colors.eraserIconActive,
        fontSize: 20,
    },
    divider: {
        alignContent: 'center',
        marginLeft: 10,
        width: '100%',
        flex: 1,
        height: 1,
        marginBottom: 10,
    },
    firstDivider: {
        marginBottom: 20,
    },
});

export default DrawerMenu;
