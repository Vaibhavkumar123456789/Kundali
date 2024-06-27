import React, { useState, useEffect, useRef } from 'react';
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
  ScrollView, PermissionsAndroid,
  StatusBar, Animated
} from 'react-native';
import Toast from 'react-native-simple-toast';
import stringsoflanguages from '../language/Language'
import Button from 'react-native-button';
import { useIsFocused } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import Loader from '../utils/Loader';
import { StatusBarLight } from '../utils/CustomStatusBar';
import { addtocardapi, productlist } from '../backend/Api';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
const systemFonts = [
  ...defaultSystemFonts,
  'AvenirLTStd-Medium',
  'AvenirLTStd-Heavy',
];

const ProductDetail = ({ navigation, route }) => {
  // alert(JSON.stringify(route.params, null, 2))
  const window = Dimensions.get('window');
  const isFocused = useIsFocused();
  const { width, height } = Dimensions.get('window');
  const { _customlang, _product } = stringsoflanguages
  const [should1, setShould1] = useState('')
  const [quality, setQuality] = useState([])
  const [astrologercutprice, setAstrologerCutPrice] = useState()
  const [astrologerprice, setAstrologerPrice] = useState()
  const [generalcutprice, setGeneralCutPrice] = useState()
  const [generalprice, setGeneralPrice] = useState()
  const [quantity, setQuantity] = useState(1);
  const [list, setNewList] = useState()
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });

  useEffect(() => {
    productlistapi()

  }, [isFocused == true])

  const productlistapi = () => {
    toggleLoading(true);
    let e = {

      "id": route.params?.id
    };
    productlist(e)
      .then(data => {
        // alert(JSON.stringify(JSON.parse(data?.data?.quality_rati), null, 2))
        // alert(JSON.stringify(data?.data, null, 2))
        toggleLoading(false);
        if (data.status) {
          setNewList(data?.data)

          const ratti = JSON.parse(data?.data?.quality_rati)
          let tempCArr = []
          ratti?.map((item) => {
            tempCArr.push({
              label: item?.quality,
              value: item,
            })
            setQuality(tempCArr)
          })
          if (tempCArr.length > 0) {
            setShould1(tempCArr[0]);
            taxdetail(tempCArr[0])
          }
        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  }

  const taxdetail = (item) => {
    // astrologer price
    let amount = item["value"]["price"];
    let discount = item["value"]["discount_price"];
    let taxable_amount = discount > 0 ? discount : amount;
    let tax_amount = discount == 0 ? discount : amount;                 //half cut text

    setAstrologerCutPrice(tax_amount)
    setAstrologerPrice(taxable_amount)


    //general price
    let amount1 = item["value"]["general_price"];
    let discount1 = item["value"]["discount_general_price"];
    let taxable_amount1 = discount1 > 0 ? discount1 : amount1;
    let tax_amount1 = discount1 == 0 ? discount1 : amount1;                 //half cut text

    setGeneralCutPrice(tax_amount1)
    setGeneralPrice(taxable_amount1)

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>

        {state.loading && <Loader />}
        {(list &&
          <ImageBackground resizeMode='cover' style={{ width: '100%', height: 300 }}
            source={{ uri: list?.image }} >
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image
                source={require('../assets/back.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  marginTop: 18,
                  marginLeft: 18,
                }}
              />
            </Pressable>
          </ImageBackground>

        )}
        <View style={{
          backgroundColor: 'white',
          marginTop: -15,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderRadius: 0,
          width: '100%',
          padding: 10,

        }}>
          {(list &&
            <Text
              style={{
                fontSize: 24,
                color: '#333333',
                fontFamily: 'AvenirLTStd-Heavy',
                marginLeft: 2,
              }}>
              {list?.name}
            </Text>
          )}
          <Text
            style={{
              marginTop: 8,
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Medium',
              color: '#000521',
              marginLeft: 2,
            }}>
            {_product.description}
          </Text>

          {(list &&
            <View style={{ marginLeft: 2 }}>
              <RenderHtml
                containerStyle={{
                  marginTop: 20,
                }}
                source={{ html: list?.description }}
                systemFonts={systemFonts}
                tagsStyles={{
                  p: {
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Medium',
                    lineHeight: 20,
                    color: '#33333380',
                  },
                }}
              />
            </View>
          )}

          <Text
            style={{
              marginTop: 8,
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Medium',
              color: '#000521',
              marginLeft: 2,
            }}>
            {_product.quality}
          </Text>

          <Dropdown
            style={{
              height: 50,
              marginTop: 10, borderWidth: 1.5, borderColor: '#00000020',
              borderRadius: 10, marginHorizontal: 5,
            }}
            placeholderStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, }}
            selectedTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, textTransform: 'capitalize' }}
            iconStyle={{
              width: 20,
              height: 20,
              marginRight: 12,
            }}
            itemTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', textTransform: 'capitalize' }}
            data={quality}
            search
            searchPlaceholder={_product.quality}
            inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={_product.quality}
            value={should1}
            onChange={(item) => { setShould1(item), taxdetail(item) }}
          />
          <View style={{
            marginTop: 10,
            flexDirection: 'row', justifyContent: 'space-between',
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
                {(astrologerprice &&
                  <Text
                    style={{
                      color: '#1E1F20',
                      fontFamily: 'AvenirLTStd-Heavy',
                      fontSize: 18,
                      marginRight: 3,
                      marginTop: 3,
                      textAlign: 'right',
                    }}>
                    ₹ {astrologerprice}
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

        </View>


        <Button
          containerStyle={{
            width: '90%',
            marginTop: 20,
            marginBottom: 20,
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

            let e = {
              "type": "1",
              "product_id": list?.id,
              "qty": quantity.toString(),
              "variant": should1?.value?.quality
            };

            toggleLoading(true);
            addtocardapi(e)
              .then(data => {
                // alert(JSON.stringify(data, null, 2))
                console.log('add to card ..............', data)
                toggleLoading(false);
                if (data.status) {
                  Toast.show(data?.message)
                  navigation.navigate('Cart')
                } else {
                  Toast.show(data?.msg);
                }

              })
              .catch(error => {
                toggleLoading(false);
                console.log('error', error);
              });
          }}>
          {_product.cart}
        </Button>

      </ScrollView>
    </SafeAreaView >

  )
}

export default ProductDetail

const styles = StyleSheet.create({})


