import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../Screens/CustomDrawer';
import Home from '../Screens/Home';
import TabNavigator from './TabNavigator';
const Drawer = createDrawerNavigator();
const DrawerNavigator = ({ route }) => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false, }}
    useLegacyImplementation={true}
    initialRouteName="TabNavigator"
    drawerContent={props => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="TabNavigator" component={TabNavigator} />
  </Drawer.Navigator>
);
export default DrawerNavigator;
