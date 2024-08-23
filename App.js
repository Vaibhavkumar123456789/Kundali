import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, Linking, LogBox, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import StackNavigator from './src/Navigator/StackNavigator';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import ForegroundHandler from './src/Screens/ForegroundHandler';
LogBox.ignoreAllLogs();
import PushNotification from 'react-native-push-notification';

const App = () => {

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

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

  useEffect(() => {

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // GLOBAL.firebaseToken = token.token
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {

      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, [])

  return (
    <Provider store={store}>
      <StackNavigator />
      <ForegroundHandler />
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({})
