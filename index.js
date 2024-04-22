/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // alert(JSON.stringify(remoteMessage,null,2))
});
messaging().getInitialNotification(async remoteMessage => {
    console.log('Message handled in the Kill State!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);
    