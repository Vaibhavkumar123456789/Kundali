import { View, Text, Image, StyleSheet, Dimensions, StatusBar, SafeAreaView, ImageBackground, Pressable, } from 'react-native'
import React, { useEffect } from 'react'
import stringsoflanguages from '../language/Language'

const SelectType = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _astrologerForm } = stringsoflanguages
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
                    <Pressable onPress={() => { navigation.navigate('AstrologerRegister') }}>
                        <Image
                            style={{
                                width: window.width / 2 - 18,
                                height: 115,
                                resizeMode: 'contain',

                            }}
                            source={require('../assets/astrologer1.png')} />
                    </Pressable>
                    <Pressable onPress={() => { navigation.navigate('SignUp') }}>
                        <Image
                            style={{
                                width: window.width / 2 - 18,
                                height: 115,
                                resizeMode: 'contain',

                            }}
                            source={require('../assets/user1.png')} />
                    </Pressable>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SelectType

const styles = StyleSheet.create({})
