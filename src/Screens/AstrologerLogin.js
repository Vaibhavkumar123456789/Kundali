import { View, Text, Image, StyleSheet, Dimensions, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Platform, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from 'react-native-button';
import stringsoflanguages from '../language/Language'
import Loader from '../utils/Loader';
import * as actions from '../redux/actions';
import { AstrologerUserApi, AsyncStorageSetUser, AsyncStorageSettoken, SkipHome } from '../backend/Api';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import GLobal from './GLobal';

const AstrologerLogin = ({ navigation }) => {
    const { _astrologerForm, _kundali } = stringsoflanguages
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [VisiblePass, setVisiblePass] = useState(false)
    const makePassVisible = () => {
        setVisiblePass(prevState => !prevState);
    };
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const astologerlogin = () => {
        if (mobile === '' || mobile.length !== 10) {
            Toast.show('Please enter your valid phone number');
        }
        else if (password.trim() == '') {
            Toast.show('Please enter Password');
        }
        else {
            toggleLoading(true);
            let e = {
                "device_id": '123',
                "device_token": GLobal.firebaseToken,
                "device_type": Platform.OS,
                "loginTime": "123123",
                mobile: mobile,
                password: password,
            };
            console.log(JSON.stringify(e));
            AstrologerUserApi(e)
                .then(data => {
                    // alert(JSON.stringify(data, null, 2))
                    console.log('token..........', data?.token)
                    toggleLoading(false);
                    if (data) {
                        actions.Login(data?.user_detail);
                        actions.Token(data?.token);
                        AsyncStorageSettoken(data?.token);
                        AsyncStorageSetUser(data?.user_detail);
                        // navigation.replace('DrawerNavigator')
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'DrawerNavigator' }],
                        });
                    } else {
                        Toast.show(data?.msg);
                    }
                })
                .catch(error => {
                    toggleLoading(false);
                    console.log('error', error);
                });
        }
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {state.loading && <Loader />}
            <ScrollView>

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Heavy',
                        color: '#333333',
                        fontSize: 24,
                        marginTop: 30,
                        marginHorizontal: 18,
                    }}>
                    {_astrologerForm.signuptitle}
                </Text>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 16,
                        marginTop: 10,
                        marginHorizontal: 18,
                    }}>
                    {_astrologerForm.welcometext}
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
                    {_kundali.mobile}
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
                    placeholder={_kundali.mobile}
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
                    {_astrologerForm.password}
                </Text>
                <View style={{ flexDirection: 'row', }}>
                    <TextInput
                        placeholderTextColor={'#333333'}
                        placeholder={_astrologerForm.password}
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
                <Pressable onPress={() => { navigation.navigate('ForgotPassword') }}>
                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#333333',
                            fontSize: 16,
                            marginTop: 15,
                            textAlign: 'right',
                            marginRight: 18,
                        }}>
                        {_astrologerForm.forgot}
                    </Text>
                </Pressable>
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
                    astologerlogin()
                }}>
                {_astrologerForm.signin}
            </Button>

            <Pressable onPress={() => { navigation.navigate('AstrologerForm') }}
                style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 18, bottom: 15, }}>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#333333',
                        fontSize: 18,
                        letterSpacing: -0.2,
                    }}>
                    {_astrologerForm.dont}
                </Text>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Heavy',
                        color: '#FFCC80',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginLeft: 4,
                    }}>
                    {_astrologerForm.signup}
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default AstrologerLogin

const styles = StyleSheet.create({
    checkboxtext: {
        color: '#FFCC80',
        fontFamily: 'AvenirLTStd-Heavy',
        fontSize: 14,
    },
})