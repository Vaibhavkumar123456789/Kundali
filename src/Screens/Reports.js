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
import { Astroreport } from '../backend/Api';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../utils/Loader';
const Report = ({ navigation }) => {
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const { _member, _home } = stringsoflanguages
  const isFocused = useIsFocused();
  const [astro, setAstro] = useState([])
  const [report, setReport] = useState()
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });

  useEffect(() => {
    reportapi()
  }, [isFocused])

  const reportapi = () => {
    toggleLoading(true);
    Astroreport()
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        toggleLoading(false);
        if (data.status) {
          setAstro(data.data)
          setReport(data.path)
        } else {
          alert(data.msg);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
      <Header
        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/backtoback.png')}
        title={_home.astro}
      />
      {state.loading && <Loader />}

      {astro && astro.length > "0" ?
        <FlatList
          style={{ marginTop: 5, }}
          data={astro}
          renderItem={({ item, index }) => (

            <View
              style={{
                width: window.width - 36,
                paddingVertical: 11,
                alignSelf: 'center',
                backgroundColor: item.back_color,
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
                {item.report_name}
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
                    {item.about_report}
                  </Text>

                  <Text style={{
                    color: '#333333',
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 15,
                    marginLeft: 10,
                    marginTop: 5,
                    width: window.width - 170,
                  }}>
                    {_home.price} ₹{item.general_discount_price}&nbsp;
                    <Text

                      style={{
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Medium',
                        fontSize: 11,
                        textDecorationLine: 'line-through',
                      }}>
                      {item.general_price}&nbsp;
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
                  source={{ uri: `${report}/${item.image}` }}
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
                <Pressable onPress={() => { navigation.navigate('PremiumKundliDetailReport', item) }}>
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
        :
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Astro Reports</Text>
        </View>}

    </SafeAreaView >
  )
}

export default Report

const styles = StyleSheet.create({})