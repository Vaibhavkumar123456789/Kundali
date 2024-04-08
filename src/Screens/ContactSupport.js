import React, { useState, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Platform,
    TouchableOpacity,
    Pressable,
    TextInput,
    Dimensions,
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import Button from 'react-native-button';

const ContactSupport = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _invoice, _kundali, _drawer, _setting } = stringsoflanguages

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_drawer.contact}
            />
            <View style={{ alignSelf: 'center', marginTop: 50 }}>
                <Image
                    source={require('../assets/support.png')}
                    style={{
                        height: 130,
                        width: 130,
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <Text
                style={{
                    fontSize: 24,
                    fontFamily: 'AvenirLTStd-Heavy',
                    color: '#333333',
                    textAlign: 'center',
                    marginTop: 30,
                }}>
                {_setting.support} 24/7
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: 'AvenirLTStd-Medium',
                    color: '#33333360',
                    textAlign: 'center',
                    lineHeight: 26,
                    marginTop: 15,
                    marginHorizontal: 20
                }}>
                {_setting.title}

            </Text>

            <Text
                style={{
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Heavy',
                    color: '#333333',
                    textAlign: 'center',
                    marginTop: height / 6,
                    marginHorizontal: 20
                }}>
                {_setting.callus} - +91 9424XXXXXX

            </Text>
            <Text
                style={{
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Heavy',
                    color: '#333333',
                    textAlign: 'center',
                    marginTop: 10,
                    marginHorizontal: 20
                }}>
                {_setting.mail} - astrology@gmail.com

            </Text>


        </SafeAreaView >
    )
}

export default ContactSupport

const styles = StyleSheet.create({
    tx_icon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        resizeMode: 'contain',
    },
    tx_input: {
        fontSize: 16,
        fontFamily: 'AvenirLTStd-Medium',
        color: '#333333',
        marginTop: 4,
        marginLeft: 10,
    },
    tx_icon1: {
        width: 15,
        height: 15,
        marginRight: 15,
        resizeMode: 'contain',
        // marginTop: 10,
        alignSelf: 'center',
    }
})