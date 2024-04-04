import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Button from 'react-native-button';

const PremiumKundliDetailReport = ({ navigation }) => {
  const { _member, _home, _kundali, _setting } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');

  const detail = [
    {
      title: "Kundli",
      color: "#FFEBEE",
      source: require("../assets/kundli-icon.png")
    },
    {
      title: "Match Making",
      color: "#EDE7F6",
      source: require("../assets/making-icon.png")
    },
    {
      title: "Lal Kitab",
      color: "#E1F5FF",
      source: require("../assets/lal-kitab-icon.png")
    },

  ];



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
      <CustomHeader
        title={_setting.reportdetail}
        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/back.png')}

      />

      <ScrollView>
        <Text
          style={{
            color: '#333333',
            fontFamily: 'AvenirLTStd-Heavy',
            fontSize: 20,
            alignSelf: 'center',
            marginTop: 18,
          }}>
          Natal Chart Reports{' '}
        </Text>

        <Image
          style={{
            width: 150,
            height: 167.95,
            marginTop: 24,
            marginBottom: 22.5,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={require('../assets/book.png')}
        />

        <View style={styles.ex_view}>
          <View style={styles.dt_view}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 2,
                marginTop: 4,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#1E1F20',
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 18,
                    marginLeft: 7,
                    marginTop: 0,
                    width: window.width - 210,
                  }}>
                  About Report
                </Text>
              </View>

            </View>
            <View style={styles.dt_view_1}>
              <View style={styles.dt_view_11}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 2,
                  }}>
                  <Text style={styles.dt_name}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        
        <View style={{
          marginTop: 20, backgroundColor: 'white', elevation: 5,
          marginHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
          borderRadius: 8
        }}>
          <View>
            <Text
              numberOfLines={1}
              style={{
                color: '#1E1F20',
                fontSize: 16,
                fontFamily: 'AvenirLTStd-Medium',
                marginLeft: 7,
                marginTop: 0,
              }}>
              General Price
            </Text>
            <Text
              style={{
                color: '#1E1F20',
                fontFamily: 'AvenirLTStd-Heavy',
                fontSize: 18,
                marginLeft: 7,
                marginTop: 0,
              }}>
              ₹ 599
            </Text>
          </View>

          <View>
            <Text
              numberOfLines={1}
              style={{
                color: '#1E1F20',
                fontSize: 16,
                fontFamily: 'AvenirLTStd-Medium',
                marginRight: 7,
                marginTop: 0,
              }}>
              Astrologer Price
            </Text>
            <Text
              style={{
                color: '#1E1F20',
                fontFamily: 'AvenirLTStd-Heavy',
                fontSize: 18,
                marginRight: 7,
                marginTop: 0,
                textAlign: 'right',
              }}>
              ₹ 599
            </Text>
          </View>

        </View>

        <View style={styles.ex_view}>
          <View style={styles.dt_view}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 2,
                marginTop: 4,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#1E1F20',
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 18,
                    marginLeft: 7,
                    marginTop: 0,
                    width: window.width - 210,
                  }}>
                  Inclusion
                </Text>
              </View>

            </View>
            <View style={styles.dt_view_1}>
              <View style={styles.dt_view_11}>
                <FlatList
                  data={detail}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 2,
                      }}>
                      <Text style={styles.dt_name}>
                        {`\u2022 Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}
                      </Text>
                    </View>
                  )}
                />

              </View>
            </View>

          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Button
            containerStyle={{
              width: '42%',

              borderColor: '#FFCC80',
              borderWidth: 1,
              marginLeft: 18,
              marginTop: 20,
              marginBottom: 20,
              height: 52,
              borderRadius: 12,
              overflow: 'hidden',
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
            style={{
              fontSize: 18,
              color: '#FFCC80',
              alignSelf: 'center',
              fontFamily: 'AvenirLTStd-Medium',
            }}

            onPress={() => {
            }}>
            {_kundali.viewsample}
          </Button>
          <Button
            containerStyle={{
              width: '42%',

              marginRight: 18,
              marginBottom: 20,
              marginTop: 20,
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
              navigation.navigate('Wallet')
            }}>
            {_kundali.buyNow}
          </Button>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

export default PremiumKundliDetailReport

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
    lineHeight: 20,
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