import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import Button from 'react-native-button';
import { ReportDetailApi } from '../backend/Api';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../utils/Loader';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
const systemFonts = [
  ...defaultSystemFonts,
  'AvenirLTStd-Medium',
  'AvenirLTStd-Heavy',
];

const PremiumKundliDetailReport = ({ navigation, route }) => {
  // alert(JSON.stringify(route.params, null, 2))
  const { _member, _home, _kundali, _setting } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const isFocused = useIsFocused();
  const [astro, setAstro] = useState()
  const [report, setReport] = useState()
  const [generalprice, setGeneralPrice] = useState('')
  const [totatamount, setTotalAmount] = useState('')
  const [generalcutprice, setGeneralCutPrice] = useState()
  const [astrologercutprice, setAstrologerCutPrice] = useState()
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });
  useEffect(() => {
    banner()
  }, [isFocused == true])

  const banner = () => {
    toggleLoading(true);
    let e = {
      astro_id: route.params?.item?.id,
    };
    ReportDetailApi(e)
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        toggleLoading(false);
        if (data.status) {
          setReport(data?.data[0])
          setAstro(data)

          let amount = data?.data[0]?.price
          let discount = data?.data[0]?.discount_price
          let taxable_amount = discount > 0 ? discount : amount;

          let cutprice = discount == 0 ? discount : amount;       // astrologer cut price

          let tax_amount = 0;
          let total_amount = 0;
          let tax_percentage = 0;
          if (data?.data[0]?.tax == null) {
            tax_percentage = 0
            total_amount = taxable_amount
          } else {
            tax_percentage = data?.data[0]?.tax?.tax_percentage
            tax_amount = taxable_amount * tax_percentage / 100;
            total_amount = taxable_amount + tax_amount;
          }
          setTotalAmount(total_amount)
          setAstrologerCutPrice(cutprice)

          // general price
          let amount1 = data?.data[0]?.general_price
          let discount1 = data?.data[0]?.general_discount_price
          let taxable_amount1 = discount1 > 0 ? discount1 : amount1;

          let cutprice1 = discount1 == 0 ? discount1 : amount1;       // general cut price

          let tax_amount1 = 0;
          let total_amount1 = 0;
          let tax_percentage1 = 0;
          if (data?.data[0]?.tax == null) {
            tax_percentage1 = 0
            total_amount1 = taxable_amount1
          } else {
            tax_percentage1 = data?.data[0]?.tax?.tax_percentage
            tax_amount1 = taxable_amount1 * tax_percentage1 / 100;
            total_amount1 = taxable_amount1 + tax_amount1;
          }
          setGeneralPrice(total_amount1)
          setGeneralCutPrice(cutprice1)

        } else {
          alert(data?.msg);
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
      <CustomHeader
        title={_setting.reportdetail}
        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/backtoback.png')}

      />
      {state.loading && <Loader />}
      <ScrollView>
        {(report &&
          <Text
            style={{
              color: '#333333',
              fontFamily: 'AvenirLTStd-Heavy',
              fontSize: 20,
              alignSelf: 'center',
              marginTop: 18,
            }}>
            {report?.report_name}{' '}
          </Text>
        )}
        {(report && astro &&
          < Image
            style={{
              width: 150,
              height: 167.95,
              marginTop: 24,
              marginBottom: 22.5,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={{ uri: `${astro?.path}/${report?.image}` }}
          />
        )}
        <View style={styles.ex_view}>
          <View style={styles.dt_view}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 2,
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
                  {/* <Text style={styles.dt_name}> */}
                  {(report &&
                    <RenderHtml
                      containerStyle={{
                        marginTop: 20,
                        marginBottom: 10,
                        // width: window.width - 250,
                      }}
                      source={{ html: report?.about_report }}
                      systemFonts={systemFonts}
                      tagsStyles={{
                        p: {
                          fontFamily: 'AvenirLTStd-Medium',
                          fontSize: 14,
                          marginTop: 2,
                          lineHeight: 20,
                          color: '#A6A7A9',
                          marginLeft: 9,
                        },
                      }}
                    />
                  )}
                  {/* </Text> */}
                </View>
              </View>
            </View>
          </View>
        </View>


        <View style={{
          marginTop: 10, backgroundColor: 'white', elevation: 5,
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              {(generalprice &&
                <Text
                  style={{
                    color: '#1E1F20',
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 18,
                    marginLeft: 7,
                    marginTop: 3,
                  }}>
                  ₹ {generalprice}
                </Text>
              )}
              {generalcutprice && generalcutprice > 0 ?
                <Text
                  style={{
                    color: '#1E1F2090',
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 14,
                    marginLeft: 3,
                    marginTop: 6,
                    textDecorationLine: 'line-through',
                  }}>
                  ₹ {generalcutprice}
                </Text>
                : null}
            </View>
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              {(totatamount &&
                <Text
                  style={{
                    color: '#1E1F20',
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 18,
                    marginRight: 3,
                    marginTop: 3,
                    textAlign: 'right',
                  }}>
                  ₹ {totatamount}
                </Text>
              )}
              {astrologercutprice && astrologercutprice > 0 ?
                < Text
                  style={{
                    color: '#1E1F2090',
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 14,
                    marginRight: 7,
                    marginTop: 6,
                    textAlign: 'right',
                    textDecorationLine: 'line-through'
                  }}>
                  ₹ {astrologercutprice}
                </Text>
                : null}
            </View>
          </View>

        </View>

        <View style={styles.ex_view1}>
          <View style={styles.dt_view}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 2,
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

                {(report &&
                  <RenderHtml
                    containerStyle={{
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                    source={{ html: report?.inclusion }}
                    systemFonts={systemFonts}
                    tagsStyles={{
                      p: {
                        fontFamily: 'AvenirLTStd-Medium',
                        fontSize: 14,
                        marginTop: 2,
                        lineHeight: 20,
                        color: '#A6A7A9',
                        marginLeft: 9,
                      },
                    }}
                  />
                )}

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
              navigation.navigate('ViewSample', { item: `${astro?.path}/${report?.sample}`, title: "View Sample" })
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
              // navigation.navigate('Wallet')
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
  ex_view1: {
    flexDirection: 'row',
    margin: 7,
    marginTop: 18,
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