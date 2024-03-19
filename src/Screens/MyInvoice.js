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

const MyInvoice = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice } = stringsoflanguages

    const data = [
        {

        },
        {

        },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/back.png')}
                title={_invoice.myinvoice}
            />
            <FlatList
                data={data}
                style={{ flexGrow: 0, marginTop: 10 }}
                renderItem={({ item, index }) => (

                    <View
                        style={{
                            marginHorizontal: 18,
                            paddingVertical: 10,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 12,
                            elevation: 5,
                            bottom: 10,
                            marginTop: 15,
                        }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/invoice.png')}
                                    style={{ width: 50, height: 50, resizeMode: 'contain', marginLeft: 10 }}
                                />
                                <View>
                                    <Text numberOfLines={1}
                                        style={{
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            color: '#333333',
                                            fontSize: 16,
                                            marginLeft: 10,
                                            marginTop: 5,
                                            width: window.width - 165,
                                        }}>
                                        {_invoice.invoice} #234
                                    </Text>

                                    <Text numberOfLines={1}
                                        style={{
                                            fontFamily: 'AvenirLTStd-Medium',
                                            color: '#33333360',
                                            fontSize: 14,
                                            marginLeft: 10,
                                            marginTop: 3,
                                            width: window.width - 165,
                                        }}>
                                        10 Mar 2023
                                    </Text>

                                </View>
                            </View>
                            <Text
                                 style={{
                                    fontFamily: 'AvenirLTStd-Medium',
                                    color: '#FFCC80',
                                    fontSize: 14,
                                    marginRight: 10,
                                    alignSelf: 'center',
                                    textDecorationLine: 'underline',
                                }}>
                                {_member.view}
                            </Text>
                        </View>

                    </View>
                )
                }
            />
        </SafeAreaView >
    )
}

export default MyInvoice

const styles = StyleSheet.create({})