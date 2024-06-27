import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { productdatalist } from '../backend/Api';
import FastImage from 'react-native-fast-image'
import Loader from '../utils/Loader';

const Astromart = ({ navigation }) => {
  const { _member, _home, _productlist } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [data, setData] = useState({});
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });



  useEffect(() => {
    banner()
  }, [])

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
            <Pressable onPress={() => { navigation.navigate('ProductDetail', item) }} >
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
                  <FastImage style={{ width: 30, height: 30, marginLeft: 7, }}

                    source={{
                      uri: item?.image,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#1E1F20', marginTop: 2,
                      fontFamily: 'AvenirLTStd-Heavy', fontSize: 15,
                      marginLeft: 7, width: window.width - 175
                    }}>
                    {item?.name}
                  </Text>
                </View>
                <View style={{ alignSelf: 'center' }}>
                  <Text
                    style={{ color: '#F44336', fontSize: 14, fontFamily: 'AvenirLTStd-Medium', marginRight: 7, }}
                  >
                    View More
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
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
            Product List
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

      {routes && routes?.length > 0 && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar
              style={styles.style}
              labelStyle={styles.labelStyle}
              scrollEnabled={true}
              tabStyle={{ height: 50, width: 'auto' }}
              activeColor={'#FFCC80'}
              inactiveColor={'#333333'}
              inactiveOpacity={0.5}
              {...props}
              indicatorStyle={styles.indicatorStyle}
            />
          )}
        />
      )}
      {state.loading && <Loader />}

    </SafeAreaView>
  )
}

export default Astromart

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#FFFFFF',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Heavy',
    color: '#333333',
    textTransform: 'capitalize',
    marginHorizontal: 10,
  },
  indicatorStyle: {
    backgroundColor: '#FFCC80',
    height: 3,
  },


})

