import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, } from 'react-native'
import React, { useEffect } from 'react'
const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'SelectLanguage' }],
            });
        }, 3000);
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Image
                style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: 'cover',

                }}
                source={require('../assets/splash.png')} />
        </SafeAreaView>
    )
}

export default Splash
const styles = StyleSheet.create({})