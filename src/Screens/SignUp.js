import { View, Text, Image, StyleSheet, Dimensions, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import Button from 'react-native-button';

const SignUp = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [VisiblePass, setVisiblePass] = useState(false)
    const makePassVisible = () => {
        setVisiblePass(prevState => !prevState);
    };
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView style={{ marginBottom: 40 }}>
                <Pressable>
                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#333333',
                            fontSize: 16,
                            marginTop: 15,
                            marginRight: 18,
                            alignSelf: 'flex-end',
                        }}>
                        SKIP
                    </Text>
                </Pressable>

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Heavy',
                        color: '#333333',
                        fontSize: 24,
                        marginTop: 14,
                        marginHorizontal: 18,
                    }}>
                    Let’s Sign You Up
                </Text>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 16,
                        marginTop: 10,
                        marginHorizontal: 18,
                    }}>
                    Welcome to You !
                </Text>

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 30,
                        marginHorizontal: 18,
                    }}>
                    Name
                </Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        fontFamily: 'AvenirLTStd-Medium',
                        borderRadius: 10,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        marginTop: 10,
                        marginHorizontal: 18,
                        paddingHorizontal: 15,
                        paddingVertical: 11,
                        color: '#333333',
                    }}
                    placeholderTextColor={'#333333'}
                    placeholder={'Name'}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    Email Address
                </Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        fontFamily: 'AvenirLTStd-Medium',
                        borderRadius: 10,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        marginTop: 10,
                        marginHorizontal: 18,
                        paddingHorizontal: 15,
                        paddingVertical: 11,
                        color: '#333333',
                    }}
                    placeholderTextColor={'#333333'}
                    placeholder={'Email Address'}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    Mobile No.
                </Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        fontFamily: 'AvenirLTStd-Medium',
                        borderRadius: 10,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        marginTop: 10,
                        marginHorizontal: 18,
                        paddingHorizontal: 15,
                        paddingVertical: 11,
                        color: '#333333',
                    }}
                    placeholderTextColor={'#333333'}
                    keyboardType='numeric'
                    maxLength={10}
                    placeholder={'Mobile No.'}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    Password
                </Text>
                <View style={{ flexDirection: 'row', }}>
                    <TextInput
                        placeholderTextColor={'#333333'}
                        placeholder={'Password'}
                        maxLength={20}
                        secureTextEntry={VisiblePass ? false : true}
                        style={{
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Medium',
                            borderRadius: 10,
                            borderColor: '#00000020',
                            borderWidth: 1.5,
                            marginTop: 10,
                            marginHorizontal: 18,
                            paddingHorizontal: 15,
                            paddingVertical: 11,
                            color: '#333333',
                            width: "90%",
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ marginLeft: -60, padding: 5, paddingTop: 28 }}
                        onPress={() => {
                            makePassVisible();
                        }}>
                        {VisiblePass ? (
                            <Image
                                style={{ width: 18, height: 18, resizeMode: 'contain', alignSelf: 'center', }}
                                source={require('../assets/eye.png')}
                            />
                        ) : (
                            <Image
                                style={{ width: 18, height: 18, resizeMode: 'contain', alignSelf: 'center', }}
                                source={require('../assets/hide.png')}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 14, marginTop: 15 }}>
                    <CheckBox
                        disabled={false}
                        boxType='square'
                        tintColors={{ true: '#FFC629', false: '#00000050' }}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={{
                        color: '#2D2627',
                        fontFamily: 'AvenirLTStd-Roman',
                        fontSize: 14,
                        marginLeft: 5,
                        marginTop: 5,
                        width: window.width - 70,
                        lineHeight: 20,
                    }}>
                        I agree to Astrology&nbsp;
                        <Text
                            onPress={() => {
                            }}
                            style={[styles.checkboxtext, { color: '#FFCC80' }]}>
                            Terms and services&nbsp;
                        </Text>
                        & &nbsp;
                        <Text
                            onPress={() => {
                            }}
                            style={[styles.checkboxtext, { color: '#FFCC80' }]}>
                            Privacy Policy.&nbsp;
                        </Text>

                    </Text>

                </View>
            </ScrollView>
            <Button
                containerStyle={{
                    width: '90%',
                    bottom: 30,
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
                    navigation.navigate('Otp')
                }}>
                Sign Up
            </Button>

            <Pressable onPress={() => { navigation.navigate('SignIn') }}
                style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 18, bottom: 15, }}>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#333333',
                        fontSize: 18,
                        letterSpacing: -0.2,
                    }}>
                    Already have an account?
                </Text>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Heavy',
                        color: '#FFCC80',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginLeft: 4,
                    }}>
                    Sign In
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    checkboxtext: {
        color: '#FFCC80',
        fontFamily: 'AvenirLTStd-Heavy',
        fontSize: 14,
    },
})