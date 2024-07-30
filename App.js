import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, Linking, LogBox, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import StackNavigator from './src/Navigator/StackNavigator';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import ForegroundHandler from './src/Screens/ForegroundHandler';
LogBox.ignoreAllLogs();

const App = () => {

  useEffect(() => {
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
      <ForegroundHandler />
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({})
