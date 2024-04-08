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
    StatusBar,
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import Button from 'react-native-button';

const Profile = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _setting, _customlang } = stringsoflanguages



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_setting.profile}
            />
            <ScrollView>
                <Image source={require('../assets/add.png')}
                    style={{ width: 110, height: 100, resizeMode: 'contain', alignSelf: 'center', marginTop: 20 }}
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
                    {_kundali.name}
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
                    placeholder={_kundali.name}
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
                    {_kundali.email}
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
                    placeholder={_kundali.email}
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
                />

                <Button
                    containerStyle={{
                        width: '90%',
                        marginTop: 20,
                        marginBottom: 20,
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
                    }}>
                    {_customlang.submit}
                </Button>

            </ScrollView>
        </SafeAreaView >
    )
}

export default Profile

const styles = StyleSheet.create({})