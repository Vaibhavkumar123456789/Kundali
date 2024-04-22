import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, } from 'react-native'
import React, { useEffect } from 'react'
import * as actions from '../redux/actions';
import { AsyncStorageGetLanguage, AsyncStorageGettoken, AsyncStorageGetUser } from '../backend/Api';
import store from '../redux/store';
import { _SetAuthToken } from '../backend/ApiSauce'
import GLobal from './GLobal';
import stringsoflanguages from '../language/Language';

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
    }, []);

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