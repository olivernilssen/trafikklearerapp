import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    SectionList,
    Text,
    SafeAreaView,
} from 'react-native';

import DrawerToggle from './DrawerToggle';
import DrawerItem from './DrawerItem';
import { Divider } from '../reusableComponents';
import { Colors, Typography } from '../../styles';

/**
 * Component to display the menu as a section list in
 * the navigation drawer (will add all items that are in props.state.routes).
 * @namespace DrawerMenu
 * @category NavigationComponents
 * @prop {function} navigation Functions for the drawer navigation
 */
const DrawerMenu = React.memo((props) => {
    const [drawerInfo, setDrawerInfo] = useState({});
    const [arrayFinished, setArrayFinished] = useState(false);

    /**
     * @memberof DrawerMenu
     * @typedef {function} useEffect
     * @description useEffect that runs on mount and checks if it has already been run or not.
     * If it has not, then it creates an array with the info for the drawers to create sections.
     */
    useEffect(() => {
        if (!arrayFinished) {
            var newArray = [];
            var titles = [];
            props.state.routes.forEach((screen) => {
                const title = screen.params.section;
                if (titles.indexOf(title) === -1) {
                    if (title != 'ingen') {
                        titles.push(title);
                        newArray.push({ title: title, data: [] });
                    }
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

    /**
     * Section header Component for the SectionList
     * @memberof DrawerMenu
     * @param {string} title The name of the section
     * @returns A section header
     */
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
            <DrawerToggle
                icon={'times'}
                toggleDrawer={() => props.navigation.toggleDrawer()}
            />
            <Divider
                style={styles.firstDivider}
                borderColor={Colors.dividerPrimary}
            />
            {arrayFinished && (
                <SectionList
                    sections={drawerInfo}
                    initialNumToRender={5}
                    persistentScrollbar={true}
                    renderItem={({ item }) => (
                        <DrawerItem
                            navigateTo={() =>
                                props.navigation.navigate(`${item['name']}`, {
                                    isStatusBarHidden: false,
                                })
                            }
                            isActive={
                                props.state.index === item['params'].value
                            }
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
        paddingTop: 5,
        // paddingHorizontal: 15,
    },
    sectionView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 2,
        alignItems: 'center',
        alignContent: 'center',
    },
    sectionText: {
        // flex: 1,
        color: Colors.eraserIconActive,
        // fontSize: 20,
        ...Typography.section,
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
