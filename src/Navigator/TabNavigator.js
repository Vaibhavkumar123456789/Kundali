import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import stringsoflanguages from '../language/Language';
import Reports from '../Screens/Reports';
import Astromart from '../Screens/Astromart';
import Members from '../Screens/Members';
import Prashna from '../Screens/Prashna';
import Home from '../Screens/Home';
import ProductList from '../Screens/ProductList';
const iconPath = {
    h: require('../assets/footer-home.png'),
    ha: require('../assets/footer-home1.png'),
    s: require('../assets/footer-report.png'),
    sa: require('../assets/footer-report1.png'),
    se: require('../assets/footer-member.png'),
    sea: require('../assets/footer-member1.png'),
    broad: require('../assets/footer-astromart1.png'),
    broad1: require('../assets/footer-astromart.png'),
    se1: require('../assets/footer-prashna.png'),
    sea1: require('../assets/footer-prashna1.png'),
};

const Tab = createBottomTabNavigator();
const TabIcon = source => <Image source={source} style={styles.tabIcon} />;
const TabIcon1 = source => <Image source={source} style={styles.tabIcon1} />;
const { _drawer, _tab } = stringsoflanguages;
const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                labelStyle: {
                    paddingBottom: 2,
                    fontSize: 12,
                    fontFamily: 'AvenirLTStd-Medium',
                },
                activeTintColor: '#FFCC80',
                activeBackgroundColor: '#FFFFFF',
                inactiveBackgroundColor: '#FFFFFF',
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: _drawer.home,
                    tabBarIcon: ({ focused }) =>
                        TabIcon(focused ? iconPath.ha : iconPath.h),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Reports"
                component={Reports}
                options={{
                    tabBarLabel: _tab.report,
                    tabBarIcon: ({ focused }) =>
                        TabIcon(focused ? iconPath.sa : iconPath.s),
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#7BAAED',
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'AvenirLTStd-Medium',
                    },
                }}
            />
            <Tab.Screen
                name="ProductList"
                component={ProductList}
                options={{
                    tabBarLabel: _tab.astromart,
                    tabBarIcon: ({ focused }) =>
                        TabIcon(focused ? iconPath.broad : iconPath.broad1),
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#7BAAED',
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontFamily: 'AvenirLTStd-Medium',
                    },
                }}
            />
            <Tab.Screen
                name="Members"
                component={Members}
                options={{
                    tabBarLabel: _tab.member,
                    tabBarIcon: ({ focused }) =>
                        TabIcon(focused ? iconPath.sea : iconPath.se),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Prashna"
                component={Prashna}
                options={{
                    tabBarLabel: _tab.prashna,
                    tabBarIcon: ({ focused }) =>
                        TabIcon(focused ? iconPath.sea1 : iconPath.se1),
                    headerShown: false,
                }}
            />

        </Tab.Navigator>
    );
};
export default TabNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
    },
    tabIcon1: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
    },
});
