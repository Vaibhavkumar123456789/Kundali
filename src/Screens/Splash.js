import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, PermissionsAndroid } from 'react-native'
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
        requestLocationPermission()
        requestNotificationPermission()
    }, [navigation]);

    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'This App needs access to your location ' +
                        'so we can know where you are.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use locations ")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    async function requestNotificationPermission() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    {
                        title: 'Notification Permission',
                        message: 'This app needs access to show notifications.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the notifications');
                } else {
                    console.log('Notification permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }


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
                GLobal.firebaseToken = fcmToken
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




// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     SafeAreaView,
//     Alert,
//     Platform,
//     StatusBar,
//     ScrollView,
//     TextInput,
//     TouchableOpacity, PermissionsAndroid,
//     Linking
// } from "react-native";
// import GetLocation from 'react-native-get-location';
// import { check, request, PERMISSIONS } from 'react-native-permissions';
// const Splash = ({ navigation }) => {

//     const [location, setLocation] = useState(null);
//     useEffect(() => {

//     }, []);
//     alert(JSON.stringify(location, null, 2))


//     const showLocationConsent = async () => {
//         Alert.alert(
//             "Location permission required",
//             "K-PRO collects location data to enable employee tracking, mark attendance, checking in/out at client's addressed & adding addresses even when the app is closed or not in use.",
//             [
//                 {
//                     text: "Grant Permission",
//                     onPress: async () => {
//                         const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//                         if (status !== "granted") {
//                             showOneButtonAlert(
//                                 "Error!",
//                                 "Location permission denied, Please grant location access to go online! Open app settings and grant location permission"
//                             );
//                             // return;
//                         }
//                     },
//                     style: "default",
//                 },
//                 {
//                     text: "Open Settings",
//                     onPress: () => Linking.openSettings(),
//                     style: "default",
//                 },
//                 {
//                     text: "Cancel",
//                     onPress: () => console.log("OK Pressed"),
//                     style: "cancel",
//                 },
//             ]
//         );
//     };


//     const onSaveClicked = async () => {
//         const permissions = [
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//         ];
//         for (const permission of permissions) {
//             const result = await request(permission);
//             console.log(result);
//             if (result != "granted") {
//                 showLocationConsent();
//                 return;
//             }
//         }

//         GetLocation.getCurrentPosition({
//             enableHighAccuracy: true,
//             timeout: 15000,
//         })
//             .then(location => {
//                 // alert(JSON.stringify(location, null, 2));
//                 setLocation(location)

//                 console.log(location);
//             })
//             .catch(error => {
//                 showOneButtonAlert("Error!", error.message);
//                 const { code, message } = error;
//                 console.warn(code, message);
//             });
//     };

//     const showOneButtonAlert = (title, message) => {
//         Alert.alert(title, message, [
//             {
//                 text: "OK",
//                 onPress: () => console.log("OK Pressed"),
//             },
//         ]);
//     };

//     return (
//         <View
//             style={{

//                 flex: 1,
//             }}
//         >
//             <SafeAreaView style={{ flex: 1 }}>

//                 <ScrollView
//                     style={{
//                         height: "100%",
//                         paddingStart: 16,
//                         paddingEnd: 16,
//                     }}
//                 >
//                     <View style={{ flex: 1, marginBottom: 100 }}>


//                         <TouchableOpacity
//                             onPress={onSaveClicked}
//                             style={{
//                                 backgroundColor: 'red',
//                                 height: 60,
//                                 marginTop: 24,
//                                 justifyContent: "center",
//                                 borderRadius: 8,
//                             }}
//                         >
//                             <Text
//                                 style={{
//                                     alignSelf: "center",
//                                     fontSize: 16,
//                                     fontWeight: "700",
//                                     color: "#FFF",
//                                 }}
//                             >
//                                 Save
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </View>
//     );
// };

// export default Splash;

// const styles = StyleSheet.create({});
