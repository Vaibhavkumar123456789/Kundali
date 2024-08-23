import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { GetProfile, productdatalist } from '../backend/Api';
import FastImage from 'react-native-fast-image'
import Loader from '../utils/Loader';
import GLobal from './GLobal';

const Astromart = ({ navigation }) => {
  const { _member, _home, _productlist } = stringsoflanguages
  const isFocused = useIsFocused();
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [data, setData] = useState({});

  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });

  useEffect(() => {
    banner()
    profile()
  }, [isFocused == true])

  const profile = () => {
    GetProfile()
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        if (data.status) {
          setWalletBalance(data?.user_profile?.wallet)

        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {

        console.log('error', error);
      });
  }

  const banner = () => {
    toggleLoading(true)
    productdatalist()
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        toggleLoading(false)
        if (data.status) {

          const mentorRoutes = data?.data.map((item, index) => ({
            key: `${item.id}`,
            title: item?.name,
            products: item?.product
          }));
          setRoutes(mentorRoutes);
          setData(data?.data.reduce((acc, item) => {
            acc[item.id] = item?.product;
            return acc;
          }, {}));

        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {
        toggleLoading(false)
        console.log('error', error);
      });
  }


  const renderScene = ({ route }) => {

    if (!route) return null;
    const products = data[route?.key] || [];

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 10, flexGrow: 0 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => { navigation.navigate('ProductDetail', { item, tabName: route.title }) }} >
              <View style={{
                flexDirection: 'row',
                marginTop: 10,
                paddingVertical: 10,
                alignSelf: 'center',
                width: '90%',
                bottom: 8,
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                shadowColor: '#000000',
                elevation: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>

                <View style={{ flexDirection: 'row' }}>

                  <FastImage style={{ width: 39, height: 39, marginLeft: 9, borderRadius: 25, alignSelf: 'center' }}

                    source={{
                      uri: item?.image,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <View style={{ alignSelf: 'center' }}>
                    <Text
                      numberOfLines={3}
                      style={{
                        color: '#1E1F20', marginTop: 2,
                        fontFamily: 'AvenirLTStd-Medium', fontSize: 13,
                        marginLeft: 8, width: window.width - 180,
                        lineHeight: 22,
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                </View>
                <View style={{ alignSelf: 'center' }}>
                  <Text
                    style={{ color: '#F44336', fontSize: 12, fontFamily: 'AvenirLTStd-Medium', lineHeight: 18, marginRight: 7, }}
                  >
                    View More
                  </Text>
                </View>
              </View>
            </Pressable>
          )
          }
        />
      </View >
    );
  };


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
                height: 22,
                width: 12,
                resizeMode: 'contain',
                marginLeft: 18,
                marginTop: 1,
              }}
            />
          </TouchableOpacity>
          <Text numberOfLines={1}
            style={{
              fontSize: 17,
              color: '#333333',
              fontFamily: 'AvenirLTStd-Heavy',
              marginTop: 8,
              marginLeft: 15,
            }}>
            Product List
          </Text>
        </View>
        <View style={{ flexDirection: 'row', }}>

          <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('Wallet') }} style={{
            flexDirection: 'row', borderColor: '#333333', borderWidth: 1,
            paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4,
            alignSelf: 'center', marginRight: 12, marginTop: 1
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
              ₹{`${parseFloat(walletBalance).toFixed(2)}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9}
            style={{ paddingVertical: 6 }}
            onPress={() => { navigation.navigate('Cart') }}>
            {GLobal?.count > 0 ?
              <>
                <Image
                  source={require('../assets/cart.png')}
                  style={{
                    height: 24,
                    width: 24,
                    resizeMode: 'contain',
                    marginRight: 18,
                  }}
                />
                <View style={{
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  backgroundColor: 'red',
                  borderRadius: 30,
                  width: 21,
                  height: 21,
                }}>
                  <Text numberOfLines={1} style={{
                    fontSize: 9,
                    color: 'white',
                    fontFamily: 'AvenirLTStd-Heavy',
                    marginTop: 4.2,
                    marginLeft: 1.1,
                    textAlign: 'center',
                  }}>
                    {GLobal.count}
                  </Text>
                </View>
              </>
              :
              <Image
                source={require('../assets/cart.png')}
                style={{
                  height: 24,
                  width: 24,
                  resizeMode: 'contain',
                  marginRight: 18,
                }}
              />
            }
          </TouchableOpacity>
        </View>
      </View>


      {routes && routes?.length > "0" ?
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar
              style={{ backgroundColor: '#FFFFFF', }}
              labelStyle={{
                fontSize: 16,
                fontFamily: 'AvenirLTStd-Heavy',
                color: '#333333',
                textTransform: 'capitalize',
                marginHorizontal: 10,
              }}
              scrollEnabled={true}
              tabStyle={{ height: 50, width: 'auto' }}
              activeColor={'#FFCC80'}
              inactiveColor={'#333333'}
              inactiveOpacity={0.5}
              {...props}
              indicatorStyle={{
                backgroundColor: '#FFCC80',
                height: 3,
              }}
            />
          )}
        />
        : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Product List</Text>
        </View>}
      {state.loading && <Loader />}

    </SafeAreaView>
  )
}

export default Astromart

const styles = StyleSheet.create({

})

