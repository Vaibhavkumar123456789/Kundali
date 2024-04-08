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

const HeaderFooterPreview = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _drawer } = stringsoflanguages

    const data = [
        {

        },

    ]


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_invoice.preview}
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

                            <Text style={{
                                fontSize: 14,
                                color: '#ADADAD',
                                fontFamily: 'AvenirLTStd-Medium',
                                marginLeft: 10,
                            }}>
                                {_invoice.companyname}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginRight: 10,
                                width: window.width - 180,
                                textAlign: 'right',
                            }}>
                                Xyz Pvt Ltd.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>

                            <Text style={{
                                fontSize: 14,
                                color: '#ADADAD',
                                fontFamily: 'AvenirLTStd-Medium',
                                marginLeft: 10,
                            }}>
                                {_invoice.companyaddress}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginRight: 10,
                                width: window.width - 180,
                                textAlign: 'right',
                            }}>
                                C-9/21 Rohini Sector-7
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>

                            <Text style={{
                                fontSize: 14,
                                color: '#ADADAD',
                                fontFamily: 'AvenirLTStd-Medium',
                                marginLeft: 10,
                            }}>
                                {_invoice.astrologername}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginRight: 10,
                                width: window.width - 180,
                                textAlign: 'right',
                            }}>
                                Rajat Nayar
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>

                            <Text style={{
                                fontSize: 14,
                                color: '#ADADAD',
                                fontFamily: 'AvenirLTStd-Medium',
                                marginLeft: 10,
                            }}>
                                {_kundali.mobile}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginRight: 10,
                                width: window.width - 180,
                                textAlign: 'right',
                            }}>
                                +91 9885678347
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>

                            <Text style={{
                                fontSize: 14,
                                color: '#ADADAD',
                                fontFamily: 'AvenirLTStd-Medium',
                                marginLeft: 10,
                            }}>
                                {_kundali.email}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginRight: 10,
                                width: window.width - 180,
                                textAlign: 'right',
                            }}>
                                xyz@gmail.com
                            </Text>
                        </View>

                    </View>
                )
                }
            />

        </SafeAreaView >
    )
}

export default HeaderFooterPreview

const styles = StyleSheet.create({})