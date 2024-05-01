import { View, Text, Image, StyleSheet, Dimensions, TextInput, Platform, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import Button from 'react-native-button';
import Toast from 'react-native-simple-toast';
import {
    AstrologerCheckMobile,
    AsyncStorageSetUser,
    UserSignUp,
} from '../backend/Api';
import * as actions from '../redux/actions';
import { AsyncStorageSettoken } from '../backend/Api';
import Loader from '../utils/Loader';
import { validateEmail } from '../utils/utils';
import { BASE_URL } from '../backend/Config';
var validator = require('email-validator');
import GLobal, { data } from './GLobal';

const SignUp = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [VisiblePass, setVisiblePass] = useState(false)
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const makePassVisible = () => {
        setVisiblePass(prevState => !prevState);
    };
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const buttonClickListenerstarted = async () => {
        if (name == '') {
            Toast.show('Please enter Name');
        } else if (email == '') {
            Toast.show('Please enter Email');
        }
        else if (!validateEmail(email)) {
            Toast.show('Please enter your valid email address');
        }
        else if (mobile === '' || mobile.length !== 10) {
            Toast.show('Please enter your valid phone number');
        } else if (password == '') {
            Toast.show('Please enter Password');
        }
        else if (toggleCheckBox == false) {
            Toast.show('Please accept terms and conditions');
        }
        else {
            check()
        }
    };

    const check = () => {
        toggleLoading(true);
        let e = {
            "mobile": mobile
        };
        console.log(JSON.stringify(e));

        AstrologerCheckMobile(e)
            .then(data => {
                toggleLoading(false);
                if (data.signupstatus == 1) {                  // new user
                    // nn()
                    GLobal.user = {
                        name,
                        email,
                        mobile
                        , password,
                        type: 1
                    }
                    navigation.replace('Otp')
                } else {
                    Toast.show(data?.msg)                      // already register
                    return
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {state.loading && <Loader />}
            <ScrollView style={{ marginBottom: 40 }}>
                <Pressable onPress={() => navigation.replace('')}>
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
                    value={name}
                    onChangeText={(text) => setName(text)}
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
                    value={email}
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
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
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
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
                        value={password}
                        onChangeText={(text) => setPassword(text)}
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

                    buttonClickListenerstarted()
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