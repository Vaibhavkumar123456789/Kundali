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
    StatusBar
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import Button from 'react-native-button';
import { validateEmail } from '../utils/utils';
import { contactsupportapi } from '../backend/Api';
import Toast from 'react-native-simple-toast';

const ContactSupport = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _invoice, _kundali, _drawer, _setting } = stringsoflanguages
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_drawer.contact}
            />
            <ScrollView>
                <View style={{ alignSelf: 'center', marginTop: 50 }}>
                    <Image
                        source={require('../assets/support.png')}
                        style={{
                            height: 130,
                            width: 130,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 24,
                        fontFamily: 'AvenirLTStd-Heavy',
                        color: '#333333',
                        textAlign: 'center',
                        marginTop: 30,
                    }}>
                    {_setting.support} 24/7
                </Text>


                <View style={{
                    backgroundColor: 'white', color: 'white', flex: 1, margin: 10, borderRadius: 10,
                    width: window.width - 30, shadowColor: '#000', alignSelf: 'center', marginTop: 30,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 5,
                    flexDirection: 'row',
                }}>
                    <Image
                        source={require('../assets/messageicon.png')}
                        style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', resizeMode: 'contain' }}

                    />
                    <View >
                        <Text numberOfLines={1} style={{
                            margin: 10, color: '#333333',
                            fontSize: 16, fontFamily: 'AvenirLTStd-Medium',
                            marginTop: 10, width: window.width - 120,
                        }}>
                            Email
                        </Text>

                        <Text numberOfLines={1} style={{
                            margin: 10, color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Medium',
                            marginTop: -10,
                            width: window.width - 120,
                        }}>
                            astrology@gmail.com
                        </Text>
                    </View>

                </View>

                <View style={{
                    backgroundColor: 'white', color: 'white', flex: 1, margin: 10, borderRadius: 10,
                    width: window.width - 30, shadowColor: '#000', alignSelf: 'center', marginTop: 15,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 5,
                    flexDirection: 'row',
                }}>
                    <Image
                        source={require('../assets/callicon.png')}
                        style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', resizeMode: 'contain' }}

                    />
                    <View >
                        <Text numberOfLines={1} style={{
                            margin: 10, color: '#333333',
                            fontSize: 16, fontFamily: 'AvenirLTStd-Medium',
                            marginTop: 10, width: window.width - 120,
                        }}>
                            Mobile Number
                        </Text>

                        <Text numberOfLines={1} style={{
                            margin: 10, color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Medium',
                            marginTop: -10,
                            width: window.width - 120,
                        }}>
                            0123456789
                        </Text>
                    </View>

                </View>

                <View style={{
                    backgroundColor: 'white', color: 'white', flex: 1, margin: 10, borderRadius: 10,
                    width: window.width - 30, shadowColor: '#000', alignSelf: 'center', marginTop: 15,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    paddingVertical: 10,
                    shadowRadius: 2,
                    elevation: 5,

                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Image
                            source={require('../assets/emilicon.png')}
                            style={{ width: 30, height: 30, marginLeft: 10, alignSelf: 'center', resizeMode: 'contain' }}

                        />
                        <Text numberOfLines={1} style={{
                            margin: 10, color: '#333333',
                            fontSize: 16, fontFamily: 'AvenirLTStd-Medium',
                            marginTop: 10,
                            width: window.width - 120,
                        }}>
                            Get in Touch
                        </Text>
                    </View>
                    <Text style={{
                        margin: 10, color: '#333333',
                        fontSize: 16, fontFamily: 'AvenirLTStd-Medium',
                        marginTop: 3,
                        lineHeight: 20,

                    }}>
                        Please give us in between 12 to 24 working
                        hours to address your issues.
                    </Text>

                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#ADADAD',
                            fontSize: 16,
                            letterSpacing: -0.2,
                            marginTop: 8,
                            marginHorizontal: 10,
                        }}>
                        {_kundali.name}
                    </Text>

                    <TextInput
                        style={{
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Medium',
                            borderRadius: 10,
                            borderWidth: 1.5,
                            borderTopColor: 'white',
                            borderLeftColor: 'white',
                            borderRightColor: 'white',
                            borderBottomColor: '#00000020',
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
                            color: '#333333',
                        }}
                        placeholderTextColor={'#333333'}
                        placeholder={_kundali.name}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#ADADAD',
                            fontSize: 16,
                            letterSpacing: -0.2,
                            marginTop: 15,
                            marginHorizontal: 10,
                        }}>
                        {_kundali.email}
                    </Text>

                    <TextInput
                        style={{
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Medium',
                            borderRadius: 10,
                            borderWidth: 1.5,
                            borderTopColor: 'white',
                            borderLeftColor: 'white',
                            borderRightColor: 'white',
                            borderBottomColor: '#00000020',
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
                            color: '#333333',
                        }}
                        placeholderTextColor={'#333333'}
                        placeholder={_kundali.email}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#ADADAD',
                            fontSize: 16,
                            letterSpacing: -0.2,
                            marginTop: 15,
                            marginHorizontal: 10,
                        }}>
                        Message
                    </Text>

                    <TextInput
                        style={{
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Medium',
                            borderRadius: 10,
                            borderWidth: 1.5,
                            borderTopColor: 'white',
                            borderLeftColor: 'white',
                            borderRightColor: 'white',
                            borderBottomColor: '#00000020',
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
                            color: '#333333',
                            marginBottom: 15,
                        }}
                        placeholderTextColor={'#333333'}
                        placeholder={'Tyep your message here...'}
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                </View>

                <Button
                    containerStyle={{
                        margin: 10,
                        width: window.width - 30,
                        marginBottom: 20,
                        height: 52,
                        marginTop: 20,
                        borderRadius: 10,
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
                        if (name == '') {
                            Toast.show('Please enter Name');
                        }
                        else if (email == '') {
                            Toast.show('Please enter Email');
                        }
                        else if (!validateEmail(email)) {
                            Toast.show('Please enter your valid email address');
                        }
                        else if (message == '') {
                            Toast.show('Please enter Message');
                        }
                        else {

                            let e = {
                                "name": name,
                                "email": email,
                                "message": message
                            };
                            console.log(JSON.stringify(e));

                            contactsupportapi(e)
                                .then(data => {
                                    // alert(JSON.stringify(data, null, 2))
                                    if (data.status == true) {
                                        navigation.goBack()
                                    } else {
                                        Toast.show(data?.msg);
                                    }
                                })
                                .catch(error => {
                                    console.log('error', error);
                                });
                        }
                    }}>
                    Send
                </Button>
            </ScrollView>
        </SafeAreaView >
    )
}

export default ContactSupport

const styles = StyleSheet.create({
    tx_icon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        resizeMode: 'contain',
    },
    tx_input: {
        fontSize: 16,
        fontFamily: 'AvenirLTStd-Medium',
        color: '#333333',
        marginTop: 4,
        marginLeft: 10,
    },
    tx_icon1: {
        width: 15,
        height: 15,
        marginRight: 15,
        resizeMode: 'contain',
        // marginTop: 10,
        alignSelf: 'center',
    }
})

