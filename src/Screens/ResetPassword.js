import { View, Text, Image, StyleSheet, Dimensions, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from 'react-native-button';
import stringsoflanguages from '../language/Language'
import Loader from '../utils/Loader';
import { PasswordReset } from '../backend/Api';
import Toast from 'react-native-simple-toast';
import GLobal, { data } from './GLobal';

const ResetPassword = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _astrologerForm, _kundali, _customlang, _otp } = stringsoflanguages
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    const resetpasswordapi = () => {
        if (password == '') {
            Toast.show('Please enter new password');
        }
        else if (conPassword == '') {
            Toast.show('Please enter your confirm New password');
        }
        else if (password != conPassword) {
            Toast.show('Password and Confirm new password not match');
        }
        else {
            toggleLoading(true);
            let e = {
                user_id: GLobal.user_id,
                password: password
            };
            console.log('....... Reset Password body', e)
            PasswordReset(e)
                .then(data => {
                    toggleLoading(false);
                    // alert(JSON.stringify(data, null, 2))
                    console.log('....... Reset Password response', data)
                    if (data.status) {
                        Toast.show(data.msg)
                        navigation.replace('SignIn')
                    } else {
                        alert(data.msg);
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
                        marginTop: 60,
                        marginHorizontal: 18,
                    }}>
                    {_otp.setnewpassword}
                </Text>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 16,
                        marginTop: 10,
                        marginHorizontal: 18,
                    }}>
                    {_otp.newtext}
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
                    {_otp.newpassword}
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
                    value={password}
                    onChangeText={value => setPassword(value)}
                    placeholder={_otp.newpassword}
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
                    {_otp.cpassword}
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
                    value={conPassword}
                    onChangeText={value => setConPassword(value)}
                    placeholder={_otp.cpassword}
                />

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
                    resetpasswordapi()
                }}>
                {_customlang.submit}
            </Button>

        </SafeAreaView>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    checkboxtext: {
        color: '#FFCC80',
        fontFamily: 'AvenirLTStd-Heavy',
        fontSize: 14,
    },
})