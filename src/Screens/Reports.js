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
  StatusBar,
  useWindowDimensions
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import { Astroreport, Homebanner } from '../backend/Api';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../utils/Loader';
import GLobal from './GLobal';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
const systemFonts = [
  ...defaultSystemFonts,
  'AvenirLTStd-Medium',
  'AvenirLTStd-Heavy',
];

const Report = ({ navigation }) => {
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const { _member, _home } = stringsoflanguages
  const { width: contentWidth } = useWindowDimensions();
  const isFocused = useIsFocused();
  const [astro, setAstro] = useState()
  const [report, setReport] = useState([])
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });

  const limitHtmlContent = (htmlContent, maxLength) => {
    const textContent = htmlContent.replace(/<[^>]+>/g, ''); // Remove HTML tags
    if (textContent.length > maxLength) {
      return textContent.substring(0, maxLength) + '...';
    }
    return textContent;
  };


  useEffect(() => {
    banner()
  }, [isFocused])

  const banner = () => {
    toggleLoading(true);

    Astroreport()
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        toggleLoading(false);
        if (data.status) {
          setReport(data?.data)
          setAstro(data)

          calculateTaxDetails(data?.data)
        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  }

  const calculateTaxDetails = (listed) => {

    const updatedReport = listed?.map((item) => {
      let amount = item["price"];
      let discount = item["discount_price"];
      let taxable_amount = discount > 0 ? discount : amount;

      let cutprice = discount == 0 ? discount : amount;       // astrologer cut price

      let tax_amount = 0;
      let total_amount = 0;
      let tax_percentage = 0;

      if (item["tax"] == null) {
        tax_percentage = 0;
        total_amount = taxable_amount;
      } else {
        tax_percentage = item["tax"]["tax_percentage"];
        tax_amount = taxable_amount * tax_percentage / 100;
        total_amount = taxable_amount + tax_amount;
      }
      return {
        ...item,
        cutprice,
        total_amount
      };

    })
    setReport(updatedReport);

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

      {report && report.length > "0" ?
        <FlatList
          style={{ marginTop: 5, }}
          data={report}
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
                {item?.report_name}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <View style={{ width: window.width - 175, marginLeft: 10 }}>
                  <RenderHtml
                    contentWidth={contentWidth}
                    containerStyle={{
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                    source={{ html: limitHtmlContent(item?.inclusion, 150) }}
                    systemFonts={systemFonts}
                    tagsStyles={{
                      p: {
                        fontSize: 13,
                        fontFamily: 'AvenirLTStd-Medium',
                        lineHeight: 20,
                        marginLeft: 10,
                        color: '#33333380',
                      },
                    }}
                  />

                  <Text style={{
                    color: '#333333',
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 15,
                    // marginLeft: 10,
                    marginTop: 5,
                    width: window.width - 170,
                  }}>
                    {_home.price} ₹{item.total_amount}&nbsp;
                    <>
                      {item.cutprice > 0 && item.cutprice !== item.total_amount ? (
                        <Text

                          style={{
                            color: '#333333',
                            fontFamily: 'AvenirLTStd-Medium',
                            fontSize: 11,
                            textDecorationLine: 'line-through',
                          }}>
                          ₹{item.cutprice}&nbsp;
                        </Text>
                      ) : null}
                    </>

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
                  source={{ uri: `${astro?.path}/${item.image}` }}
                />
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Pressable onPress={() => { navigation.navigate('ViewSample', { item: `${astro?.path}/${item.sample}`, title: "View Sample" }) }} style={{
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
                <Pressable onPress={() => { navigation.navigate('PremiumKundliDetailReport', { item, astro }) }}>
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