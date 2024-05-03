import { View, Text, Image, StyleSheet, Dimensions, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from 'react-native-button';
import stringsoflanguages from '../language/Language'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import GLobal, { data } from './GLobal';
const Otp = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _otp, _customlang } = stringsoflanguages


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView>

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Heavy',
                        color: '#333333',
                        fontSize: 24,
                        marginTop: 60,
                        marginHorizontal: 18,
                    }}>
                    {_otp.phoneverify}
                </Text>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 16,
                        marginTop: 10,
                        marginHorizontal: 18,
                    }}>
                    {_otp.enterotp}
                </Text>

                <OTPInputView
                    style={{
                        height: 150,
                        marginVertical: 20,
                        marginHorizontal: 18,
                    }}
                    pinCount={4}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Heavy',
                        color: '#242A37',
                        fontSize: 14,
                        marginTop: -35,
                        textAlign: 'center',
                        marginHorizontal: 18,
                    }}>
                    {_otp.didnt}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 18, marginTop: 7 }}>
                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Heavy',
                            color: '#242A37',
                            fontSize: 14,
                            textAlign: 'center',
                        }}>
                        {_otp.resend}
                    </Text>
                    <Pressable>
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Heavy',
                                color: '#FFCC80',
                                fontSize: 14,
                                textAlign: 'center',
                                marginLeft: 3,
                            }}>
                            {_otp.resend}
                        </Text>
                    </Pressable>
                </View>


            </ScrollView>
            <Button
                containerStyle={{
                    width: '90%',
                    bottom: 20,
                    height: 52,
                    borderRadius: 12,
                    overflow: 'hidden',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFCC80',
                }}
                style={{
                    fontSize: 18,
                    color: '#333333',
                    alignSelf: 'center',
                    fontFamily: 'AvenirLTStd-Medium',
                }}
                onPress={() => {
                    if ([1, 2].includes(GLobal.user.type)) {
                        navigation.replace('Package')
                    }
                    else {
                        navigation.replace('ResetPassword')
                    }
                }}>
                {_customlang.submit}
            </Button>

        </SafeAreaView>
    )
}

export default Otp

const styles = StyleSheet.create({
    underlineStyleBase: {
        width: 60,
        height: 60,
        borderWidth: 1.5,
        borderRadius: 10,
        fontSize: 24,
        color: '#1E1F20',
        fontFamily: 'AvenirLTStd-Heavy',
    },

    underlineStyleHighLighted: {
        borderColor: "#00000020",
    },
})