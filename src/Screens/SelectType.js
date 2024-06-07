import { View, Text, Image, StyleSheet, Dimensions, StatusBar, SafeAreaView, ImageBackground, Pressable, } from 'react-native'
import React, { useEffect } from 'react'
import stringsoflanguages from '../language/Language'

const SelectType = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _astrologerForm, _type } = stringsoflanguages
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ImageBackground resizeMode='stretch' style={{ width: '100%', height: '100%' }}
                source={require('../assets/background.png')}>

                  <Text style={{
                    marginTop: height / 3.2,
                    fontSize: 30,
                    color: '#333333',
                    fontFamily: 'AvenirLTStd-Heavy',
                    textAlign: 'center',
                }}>
                    {_astrologerForm.selectusertype}
                </Text>
                <View style={{ flexDirection: 'row', marginLeft: 18, marginTop: 20 }}>
                    {/* <Pressable onPress={() => { navigation.navigate('AstrologerRegister') }}> */}
                    <Pressable onPress={() => { navigation.navigate('AstrologerForm') }}>
                        <ImageBackground
                            resizeMode='contain'
                            style={{
                                width: window.width / 2 - 18,
                                height: 115,

                            }}
                            source={require('../assets/astrologer1.png')} >
                            <Text numberOfLines={1}
                                style={{
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    color: '#333333',
                                    fontSize: 20,
                                    textAlign: 'center',
                                    position: 'absolute',
                                    bottom: 14,
                                    alignSelf: 'center',
                                }}>
                                {_type.astrologer}
                            </Text>
                        </ImageBackground>
                    </Pressable>
                    <Pressable onPress={() => { navigation.navigate('SignUp') }}>
                        <ImageBackground
                            resizeMode='contain'
                            style={{
                                width: window.width / 2 - 18,
                                height: 115,
                            }}
                            source={require('../assets/user1.png')} >
                            <Text numberOfLines={1}
                                style={{
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    color: '#333333',
                                    fontSize: 20,
                                    position: 'absolute',
                                    bottom: 14,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                }}>
                                {_type.user}
                            </Text>
                        </ImageBackground>
                    </Pressable>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

export default SelectType

const styles = StyleSheet.create({})
