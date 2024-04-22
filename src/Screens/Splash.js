import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, } from 'react-native'
import React, { useEffect } from 'react'
import * as actions from '../redux/actions';
import { AsyncStorageGetLanguage, AsyncStorageGettoken, AsyncStorageGetUser, AsyncStorageSetFcmtoken } from '../backend/Api';
import store from '../redux/store';
import { _SetAuthToken } from '../backend/ApiSauce'
import GLobal from './GLobal';
import stringsoflanguages from '../language/Language';
import messaging from '@react-native-firebase/messaging';

const Splash = ({ navigation }) => {
    // useEffect(() => {
    //     // setTimeout(() => {
    //     //     navigation.reset({
    //     //         index: 0,
    //     //         routes: [{ name: 'SelectLanguage' }],
    //     //     });
    //     // }, 3000);
    // }, [navigation]);

    useEffect(async () => {
        setTimeout(async () => {
            actions.Login(JSON.parse(await AsyncStorageGetUser()));
            const a = actions.Token(await AsyncStorageGettoken());
            console.log('token', a.paylod)
            const user = store.getState().user;
            if (Object.keys(user).length === 0 && user.constructor === Object) {
                navigation.replace('SelectLanguage');

            } else {
                navigation.replace('DrawerNavigator');
            }
        }, 3000);
        setLanguage()
        requestUserPermission()
    }, [navigation]);


    const setLanguage = async () => {
        const lang = await AsyncStorageGetLanguage();

        if (lang == null) {
            stringsoflanguages.setLanguage('en');
        } else {
            if (lang == 'en') {
                stringsoflanguages.setLanguage('en');
            } else if (lang == 'hi') {
                stringsoflanguages.setLanguage('hi');
            }
            GLobal.language = lang;
        }
    };
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            getFcmToken();
        }
    }

    const getFcmToken = async () => {

        try {
            let fcmToken = await messaging().getToken();
            if (fcmToken) {
                // dispatch(actions.SetToken(fcmToken));
                AsyncStorageSetFcmtoken(fcmToken);
                // alert(JSON.stringify(fcmToken, null, 2));
                console.log('-------------fcmToken : ', fcmToken);
            }
        } catch (error) {
            console.log(error, '-------------fcmtokenerror');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Image
                style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: 'cover',

                }}
                source={require('../assets/splash1.png')} />
        </SafeAreaView>
    )
}

export default Splash
const styles = StyleSheet.create({})