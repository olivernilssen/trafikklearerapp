import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    SectionList,
    Text,
    SafeAreaView,
} from 'react-native';

import DrawerToggleItem from './DrawerToggleItem';
import DrawerItem from './DrawerItem';
import { Divider } from '../reusableComponents/';
import { Colors, Typography } from '../../styles';

/**
 * Component to display the menu as a section list in
 * the navigation drawer (will add all items that are in props.state.routes).
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
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.drawerBg,
        paddingBottom: 10,
    },
    firstDivider: {
        paddingBottom: 20,
    },
    sectionView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 2,
        alignItems: 'center',
        alignContent: 'center',
    },
    sectionText: {
        color: Colors.eraserIconActive,
        ...Typography.section,
    },
    divider: {
        alignContent: 'center',
        marginLeft: 10,
        flex: 1,
        height: 1,
        alignSelf: 'center',
    },
});

export default DrawerMenu;
