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

const Report = ({ navigation }) => {
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const { _member, _home } = stringsoflanguages

  const data2 = [
    {

    },
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
        title={_home.astro}
      />
      <FlatList
        style={{ marginTop: 10, }}
        data={data2}
        renderItem={({ item, index }) => (

          <View
            style={{
              width: window.width - 36,
              paddingVertical: 11,
              alignSelf: 'center',
              backgroundColor: '#FFEBEE',
              elevation: 2,
              bottom: 5,
              borderRadius: 20,
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontFamily: 'AvenirLTStd-Medium',
                color: '#F44336',
              }}>
              {_home.premium}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <View >

                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'AvenirLTStd-Medium',
                    lineHeight: 20,
                    marginLeft: 10,
                    color: '#33333380',
                    width: window.width - 170,
                  }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy.
                </Text>

                <Text style={{
                  color: '#333333',
                  fontFamily: 'AvenirLTStd-Heavy',
                  fontSize: 15,
                  marginLeft: 10,
                  marginTop: 5,
                  width: window.width - 170,
                }}>
                  {_home.price} ₹18000&nbsp;
                  <Text
                    onPress={() => {
                    }}
                    style={{
                      color: '#333333',
                      fontFamily: 'AvenirLTStd-Medium',
                      fontSize: 11,
                      textDecorationLine: 'line-through',
                    }}>
                    20000&nbsp;
                  </Text>

                </Text>

              </View>
              <Image
                style={{
                  width: 114,
                  height: 128,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginRight: 8,
                }}
                source={require('../assets/book.png')}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Pressable style={{
                backgroundColor: '#333333',
                paddingHorizontal: 10, borderRadius: 20, paddingVertical: 7, marginHorizontal: 10
              }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'AvenirLTStd-Medium',
                    color: '#FFFFFF',
                  }}>
                  {_home.viewsample}
                </Text>
              </Pressable>
              <Pressable>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={require('../assets/circle-arrow.png')}
                />
              </Pressable>
            </View>

          </View>
        )}
      />


    </SafeAreaView >
  )
}

export default Report

const styles = StyleSheet.create({})