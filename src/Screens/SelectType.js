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
                    <Pressable onPress={() => { navigation.replace('AstrologerLogin') }}>
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
                    <Pressable onPress={() => { navigation.replace('SignUp') }}>
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

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const SelectType = () => {
//     const [randomNumber, setRandomNumber] = useState(null);
//     useEffect(() => {
//         generateRandomNumber()
//     }, [])

//     const generateRandomNumber = () => {
//         const min = 1000;
//         const max = 9999;
//         const rand = Math.floor(min + Math.random() * (max - min + 1));
//         setRandomNumber(rand);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.number}>
//                 {randomNumber !== null ? randomNumber : 'Press the button to generate a number'}
//             </Text>
//             {/* <Button title="Generate Random Number" onPress={generateRandomNumber} /> */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     number: {
//         fontSize: 30,
//         marginBottom: 20,
//     },
// });

// export default SelectType;

