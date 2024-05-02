import { View, Text, SafeAreaView, StatusBar, Image, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import Header from '../Custom/Header';
import Button from 'react-native-button';
const Payment = ({ navigation, route }) => {

    const [checked, setChecked] = React.useState('first');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title='Payment'
            />
            <ScrollView style={{ height: '100%' }}>


                <View style={{
                    paddingVertical: 15,
                    backgroundColor: '#FFFFFF',
                    marginTop: 25,
                    borderRadius: 6,
                    shadowColor: '#000000',
                    elevation: 5,
                    width: '90%',
                    alignSelf: 'center',
                    bottom: 5,

                }}>
                    <Text style={{
                        marginHorizontal: 10,
                        color: '#333333',
                        fontSize: 14,
                        fontFamily: 'AvenirLTStd-Heavy',
                    }}>
                        Payment Options
                    </Text>
                    <View style={{ borderBottomColor: '#00000020', borderBottomWidth: 0.5, marginTop: 18 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 3 }}>
                            <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                                color='#FFC629'
                                uncheckedColor='#69707F'
                            />
                            <Text numberOfLines={1} style={{
                                marginLeft: 5,
                                fontSize: 14,
                                color: '#1E1F20',
                                width: '76%',
                                fontFamily: 'AvenirLTStd-Roman',
                                lineHeight: 33,
                                marginTop: 2,
                            }}>
                                Debit / Credit Card / Netbanking
                            </Text>
                        </View>
                        <Image
                            style={{
                                width: 24,
                                height: 16,
                                resizeMode: 'contain',
                                marginRight: 10,
                                marginTop: 20,
                            }}
                            source={require('../assets/card.png')} />
                    </View>
                    <View style={{ borderBottomColor: '#00000020', borderBottomWidth: 0.5, marginHorizontal: 10, marginTop: 15 }}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 3 }}>
                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                                color='#FFC629'
                                uncheckedColor='#69707F'
                            />
                            <Text style={{
                                marginLeft: 5,
                                fontSize: 14,
                                color: '#1E1F20',
                                width: '76%',
                                fontFamily: 'AvenirLTStd-Roman',
                                lineHeight: 33,
                                marginTop: 2,
                            }}>
                                Pay with UPI
                            </Text>
                        </View>
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                                marginRight: 10,
                                marginTop: 20,
                            }}
                            source={require('../assets/hand.png')} />
                    </View>
                </View>


                <View style={{
                    paddingVertical: 15,
                    backgroundColor: '#FFFFFF',
                    marginTop: 20,
                    borderRadius: 6,
                    elevation: 5,
                    width: '90%',
                    alignSelf: 'center',
                    bottom: 7,
                }}>
                    <Text style={{
                        marginHorizontal: 10,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Heavy',
                        fontSize: 14,
                        textTransform: 'uppercase'
                    }}>
                        PAYMENT DETAILS
                    </Text>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', marginTop: 15,
                    }}>
                        <Text style={{
                            marginLeft: 10,
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Roman',
                        }}>
                            MRP Total
                        </Text>
                        <Text style={{
                            marginRight: 10,
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Roman',
                        }}>
                            ₹10000.00
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,
                    }}>
                        <Text style={{
                            marginLeft: 10,
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            Total Amount
                        </Text>
                        <Text style={{
                            marginRight: 10,
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            ₹10000.00
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, backgroundColor: '#FFC62925', bottom: -15, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
                        <Text style={{
                            marginLeft: 10,
                            color: '#FFCC80',
                            fontSize: 12,
                            letterSpacing: 0.2,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            TOTAL AMOUNT PAY
                        </Text>
                        <Text style={{
                            marginRight: 10,
                            color: '#FFCC80',
                            fontSize: 14,
                            letterSpacing: 0.2,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            ₹10000.00
                        </Text>
                    </View>
                </View>

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
                    navigation.replace('PaymentSuccessfully')
                }}>
                Proceed to Pay
            </Button>


        </SafeAreaView>
    )
}

export default Payment
const styles = StyleSheet.create({})