import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Button from 'react-native-button';

const ReportDetails = ({ navigation }) => {
  const { _member, _home } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const [select, setSelect] = useState()
  const [custom, setCustom] = useState(false)

  const detail1 = [
    {
        number: '100',
    },
    {
        number: '200',
    },
    {
        number: '500',
    },
    {
        number: '1000',
    },
    {
        number: '1500',
    },
    {
        number: '2000',
    },
];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
      <CustomHeader
        title={_home.reportDetails}

        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/back.png')}
        // secondRightIcon={require('../assets/search.png')}
        // thirdRightIcon={require('../assets/filter.png')}
        rightOption={() => {
          navigation.navigate('');
        }}
        right3Option={() => {
          navigation.navigate('');
        }}
      />

<ScrollView>
      <View style={{backgroundColor:'#FFF7F0', height:115, marginHorizontal:18, marginTop:10, borderRadius:20, paddingLeft:24}}>
        <Text style={{
          color:'black',
          fontSize: 18,
          marginTop:25,
          fontFamily: 'AvenirLTStd-Heavy',
          }}>
        AVAILABLE BALANCE
        </Text>
        <Text style={{color:'black',
        fontSize: 25,
        marginTop:10,
        fontFamily: 'AvenirLTStd-Heavy',
      }}>
        ₹120.00
        </Text>
      </View>

      <Text style={{color:'#333333',
        fontSize: 15,
        marginLeft:18,
        marginTop:10,
        fontFamily: 'AvenirLTStd-Heavy',
      }}>
      Recharge Wallet
      </Text>

              <FlatList
                    numColumns={3}
                    data={detail1}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ width: window.width / 3 - 27, marginLeft: 18, }}
                            onPress={() => {
                                setSelect(index)
                                setCustom(item)
                            }}>
                            <View style={{
                                paddingVertical: 15,
                                marginTop: 13,
                                borderColor: '#00000010',
                                borderWidth: 1,
                                borderRadius: 5,
                                backgroundColor: index == select ? '#FFCC80' : '#FFFFFF',
                            }}>

                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        color: '#6F6F7B',
                                        color: index == select ? '#1E1F20' : '#6F6F7B',
                                    }}>
                                    ₹{item.number}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

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
                    // navigation.navigate('Otp')
                }}>
                Proceed
            </Button>
    </SafeAreaView>
  )
}

export default ReportDetails

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