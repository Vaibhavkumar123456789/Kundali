import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Button from 'react-native-button';

const Cart = ({ navigation }) => {
  const { _member, _home, _productlist } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');

  const detail = [
    {

    },
    {

    },

  ];



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />

      <View
        style={{
          backgroundColor: '#FFCC80',
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

        }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity activeOpacity={0.9}
            style={{ paddingVertical: 6 }}
            onPress={() => { navigation.goBack() }}>
            <Image
              source={require('../assets/backtoback.png')}
              style={{
                height: 24,
                width: 24,
                resizeMode: 'contain',
                marginLeft: 18,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: '#333333',
              fontFamily: 'AvenirLTStd-Heavy',
              marginTop: 7,
              marginLeft: 10,
            }}>
            Cart
          </Text>
        </View>
        <View style={{ flexDirection: 'row', }}>

          <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('Wallet') }} style={{
            flexDirection: 'row', borderColor: '#333333', borderWidth: 1,
            paddingHorizontal: 5, paddingVertical: 5, borderRadius: 4,
            alignSelf: 'center', marginRight: 12
          }}>
            <Image
              source={require('../assets/wallet.png')}
              style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
              }}
            />
            <Text numberOfLines={1}
              style={{
                fontSize: 12,
                color: '#333333',
                fontFamily: 'AvenirLTStd-Heavy',
                marginLeft: 10,
                letterSpacing: -0.22,
              }}>
              ₹10,000
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9}
            style={{ paddingVertical: 6 }}
            onPress={() => { navigation.navigate('') }}>
            <Image
              source={require('../assets/cart.png')}
              style={{
                height: 24,
                width: 24,
                resizeMode: 'contain',
                marginRight: 18,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView style={{ flex: 1, }}>

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
              Amount
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
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', marginTop: 15,
          }}>
            <Text style={{
              marginLeft: 10,
              color: '#333333',
              fontSize: 14,
              fontFamily: 'AvenirLTStd-Roman',
            }}>
              18% Gst Charges
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

          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,
          }}>
            <Text style={{
              marginLeft: 10,
              color: '#333333',
              fontSize: 14,
              fontFamily: 'AvenirLTStd-Roman',
            }}>
              Talktime Value
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
              color: '#333333',
              fontSize: 12,
              letterSpacing: 0.2,
              fontFamily: 'AvenirLTStd-Heavy',
            }}>
              TOTAL AMOUNT
            </Text>
            <Text style={{
              marginRight: 10,
              color: '#333333',
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
          // position:'absolute',
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
          navigation.navigate('SelectAddress')
        }}>
        Submit
      </Button>

    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#FFFFFF',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Heavy',
    color: '#333333',
    textTransform: 'capitalize',
    marginHorizontal: 15,
  },
  indicatorStyle: {
    backgroundColor: '#FFCC80',
    height: 3,
  },

  ex_view: {
    flexDirection: 'row',
    margin: 7,
    marginTop: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    elevation: 5,

  },
  ex_proView: {
    padding: 7,

  },
  ex_proImage: {
    width: 95,
    height: 100,
    marginLeft: 0,
    marginTop: 3,
    borderRadius: 8
  },
  ex_starView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 8,
    borderColor: '#DD2476',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  ex_starImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginTop: 5,
    marginLeft: 3,
  },
  ex_starText: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontWeight: '400',
    fontSize: 12,
    color: '#6F6F7B90',
    textAlign: 'center',
    marginLeft: 3,
    marginTop: 2,
  },
  dt_view: {
    flex: 1,
  },
  dt_view_1: {
    flexDirection: 'row',
  },
  dt_view_11: {
    flex: 0.9,
  },

  dt_likeView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dt_likeImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  dt_name: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 14,
    marginTop: 2,
    color: '#A6A7A9',
    marginLeft: 9,
  },
  dt_viewOpt: {
    flexDirection: 'row',
    marginTop: 3,
  },
  dt_viewOptImage: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  dt_viewOptText: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 14,
    color: '#A6A7A9',
    paddingHorizontal: 9,
    marginTop: 2,
    width: Dimensions.get('window').width - 140,
  },
  dt_viewOptTexts: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 15,
    color: '#FCB69F',
    paddingHorizontal: 5,
  },
  dt_view_2: {
    flex: 1,
  },
  dt_view_21: {
    flex: 0.4,
  },

})