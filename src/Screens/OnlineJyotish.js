import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Header from '../Custom/Header';

const OnlineJyotish = ({ navigation }) => {
  const { _member, _home, _onlinejyotish } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');



  const detail = [
    {
      title: _onlinejyotish.kundli,
      color: "#FFEBEE",
      source: require("../assets/kundli-icon.png")
    },
    {
      title: _onlinejyotish.match,
      color: "#EDE7F6",
      source: require("../assets/making-icon.png")
    },
    {
      title: _onlinejyotish.lal,
      color: "#E1F5FF",
      source: require("../assets/lal-kitab-icon.png")
    },
    {
      title: _onlinejyotish.kp,
      color: "#E8F5E9",
      source: require("../assets/kp-icon.png")
    },
    {
      title: _onlinejyotish.varsh,
      color: "#FFFDE7",
      source: require("../assets/varsh-kundli-icon.png")
    },
    {
      title: _onlinejyotish.panchang,
      color: "#FBE9E7",
      source: require("../assets/panchang-icon.png")
    },
    {
      title: _onlinejyotish.paaye,
      color: "#E0F7FA",
      source: require("../assets/paaye-icon.png")
    },
    {
      title: _onlinejyotish.calculator,
      color: "#F1F8E9",
      source: require("../assets/calculator-icon.png")
    },
    {
      title: _onlinejyotish.naam,
      color: "#E8EAF6",
      source: require("../assets/naam-icon.png")
    },
    {
      title: _onlinejyotish.gandmool,
      color: "#EFEBE9",
      source: require("../assets/gandmool-icon.png")
    },
    {
      title: _onlinejyotish.sadesati,
      color: "#F3E5F5",
      source: require("../assets/sadesati-icon.png")
    },
    {
      title: _onlinejyotish.apke,
      color: "#FFF8E1",
      source: require("../assets/apke-ratna-icon.png")
    },
    {
      title: _onlinejyotish.kaalsarp,
      color: "#E3F2FD",
      source: require("../assets/kaalsarp-icon.png")
    },


  ];

  const onPressHandler1 = title => {

    switch (title) {
      case _onlinejyotish.naam:
        navigation.navigate('NaamJane')
        break;
      case _onlinejyotish.varsh:
        navigation.navigate('VarshKundli')
        break;
      case _onlinejyotish.lal:
        navigation.navigate('LalKitab')
        break;

      default:
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />

      <Header
        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/backtoback.png')}
        title={_home.onlineJyotish}
      />


      <FlatList
        numColumns={3}
        style={{ marginTop: 10 }}
        data={detail}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.9}
            onPress={() => { onPressHandler1(item.title) }}>
            <View
              style={{
                width: window.width / 3 - 27,
                height: 88,
                alignSelf: 'center',
                backgroundColor: item.color,
                elevation: 5,
                bottom: 10,
                borderRadius: 10,
                marginTop: 15,
                marginLeft: 20,
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginTop: 15,
                }}
                source={item.source}
              />
              <Text numberOfLines={2}
                style={{
                  textAlign: 'center',
                  marginTop: 5,
                  fontSize: 14,
                  fontFamily: 'AvenirLTStd-Heavy',
                  color: '#1E1F20',
                }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

export default OnlineJyotish

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