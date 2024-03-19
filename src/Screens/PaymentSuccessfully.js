import { View, Text, SafeAreaView, StatusBar, Image, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
const PaymentSuccessfully = ({ navigation, route }) => {

  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFCC80' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />

      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: height / 4,
        }}
        source={require('../assets/check.png')} />

      <Text style={{
        marginHorizontal: 10,
        fontSize: 18,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Roman',
        letterSpacing: 0.45,
        marginTop: 13,
        textAlign: 'center',
      }}>
        Ref Id: 12345
      </Text>

      <Text style={{
        marginHorizontal: 10,
        fontSize: 24,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Medium',
        letterSpacing: 0.6,
        marginTop: 5,
        textAlign: 'center',
      }}>
        Payment Successful !
      </Text>

      <Text style={{
        marginHorizontal: 10,
        fontSize: 16,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Roman',
        letterSpacing: 0.4,
        marginTop: 8,
        textAlign: 'center',
      }}>
        We are delighted to inform you that
        we received your payments
      </Text>

      <Button
        containerStyle={{
          paddingHorizontal: 20,
          height: 40,
          marginTop: 22,
          borderRadius: 30,
          borderColor: '#333333',
          borderWidth: 1,
          overflow: 'hidden',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFCC80',
        }}
        style={{
          fontSize: 14,
          color: '#333333',
          alignSelf: 'center',
          fontFamily: 'AvenirLTStd-Medium',
        }}
        onPress={() => {
          navigation.replace('DrawerNavigator')
        }}>
        Go to Homepage
      </Button>


    </SafeAreaView>
  )
}

export default PaymentSuccessfully
const styles = StyleSheet.create({})