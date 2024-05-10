import { View, Text, Image, StyleSheet, Dimensions, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from 'react-native-button';
import stringsoflanguages from '../language/Language'
import Loader from '../utils/Loader';
import { Passwordforgot } from '../backend/Api';
import Toast from 'react-native-simple-toast';
import GLobal, { data } from './GLobal';

const ForgotPassword = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _astrologerForm, _kundali, _customlang } = stringsoflanguages
    const [mobile, setMobile] = useState('')
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    const passwordapi = () => {
        if (mobile === '' || mobile.length !== 10) {
            Toast.show('Please enter your valid phone number');
        }
        else {
            toggleLoading(true);
            let e = {
                mobile: mobile
            };
            Passwordforgot(e)
                .then(data => {
                    toggleLoading(false);
                    // alert(JSON.stringify(data, null, 2))
                    console.log(data)
                    if (data.status) {
                        GLobal.user_id = data.user_id
                        GLobal.statusid = data.id
                        navigation.replace('Otp')
                    } else {
                        alert(data?.msg);
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
                    {_astrologerForm.forgotp}
                </Text>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 16,
                        marginTop: 10,
                        marginHorizontal: 18,
                    }}>
                    {_astrologerForm.forgottext}
                </Text>

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 50,
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
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
                    placeholder={_kundali.mobile}
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
                    passwordapi()
                }}>
                {_customlang.submit}
            </Button>

        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    checkboxtext: {
        color: '#FFCC80',
        fontFamily: 'AvenirLTStd-Heavy',
        fontSize: 14,
    },
})