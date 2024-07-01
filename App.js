import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, Linking, LogBox, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import StackNavigator from './src/Navigator/StackNavigator';
import store from './src/redux/store';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { Provider } from 'react-redux';
import Orientation from 'react-native-orientation-locker';
LogBox.ignoreAllLogs();

const App = () => {

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      if (state.isConnected == false) {
        alert('No Internet Available.Please connect to internet')
      }
    });
    unsubscribe()
    requestCameraPermission()

    Orientation.lockToPortrait();    // Lock to portrait
    return () => {
      Orientation.unlockAllOrientations(); // Unlock when unmounting
    };
  }, [])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');

      } else {
        console.log('Camera permission denied');

      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (

    <Provider store={store}>
      <StackNavigator />
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({})
