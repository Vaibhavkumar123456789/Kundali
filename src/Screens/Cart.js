

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Pressable, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { GetProfile, addtocardapi, getcartapi } from '../backend/Api';
import Button from 'react-native-button';
import Loader from '../utils/Loader';

const Cart = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [totalTaxPrice, setTotalTaxPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([])
  const [walletBalance, setWalletBalance] = useState(0);
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });


  useEffect(() => {
    productlistapi()
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

  const productlistapi = () => {
    toggleLoading(true);
    getcartapi()
      .then(data => {
        // console.log(data)
        // alert(JSON.stringify(data, null, 2))
        toggleLoading(false);
        if (data.status) {
          setCart(data.carts)
          setSubtotal(data?.sub_total)
          setCouponDiscount(data?.couponDiscount)
          setDeliveryPrice(data?.deliveryprice)
          setTotalTaxPrice(data?.total_tax_price)
          setTotal(data?.total)
        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  }

  const removeProductFromCart = async (product) => {

    let e = {
      type: "1",
      product_id: product.product_id,
      qty: "0",
      variant: product.variant,
    };
    console.log(JSON.stringify(e, null, 2))
    toggleLoading(true);
    addtocardapi(e)
      .then(res => {
        console.log('remove cart ', res);
        toggleLoading(false);
        if (res.status) {
          setCart(cart.filter(item => item.id !== product.id));
          productlistapi()
          // Alert.alert('Success', res.message);
        } else {
          Toast.show(data?.msg);
        }

      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });

  };

  const updateCartQuantity = async (product, quantity) => {

    let e = {
      type: "1",
      product_id: product.product_id,
      qty: quantity,
      variant: product.variant,
    };
    toggleLoading(true);
    addtocardapi(e)
      .then(res => {
        console.log('update cart......... ', res);
        toggleLoading(false);
        if (res.status) {

          setCart(cart.map(item => item.id === product.id ? { ...item, qty: quantity } : item));
          productlistapi()
        } else {
          Toast.show(data?.msg);
        }

      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });

  };

  const deleteProductFromCart = async (product) => {
    // alert(JSON.stringify(product, null, 2))
    let e = {
      type: "1",
      product_id: product?.product?.id,
      qty: '0',
      variant: product.variant,
    };
    console.log(JSON.stringify(e, null, 2))
    // alert(JSON.stringify(e, null, 2))
    // return
    toggleLoading(true);
    addtocardapi(e)
      .then(res => {
        console.log('delete product cart ', res);
        // alert(JSON.stringify(res, null, 2))
        toggleLoading(false);
        if (res.status) {
          productlistapi()
        } else {
          Toast.show(data?.msg);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });

  };


  const incrementQty = (item) => {
    const newQty = item.qty + 1;
    updateCartQuantity(item, newQty);
  };

  const decrementQty = (item) => {
    if (item.qty > 1) {
      const newQty = item.qty - 1;
      updateCartQuantity(item, newQty);
    } else {
      removeProductFromCart(item);
    }
  };


  const renderCartItem = ({ item, index }) => {

    const qualityRating = item?.product?.quality_rati1?.find(q => q.quality.toString() === item.variant.toString());

    return (
      <View style={{
        flexDirection: 'row',
        marginVertical: 8,
        marginHorizontal: 5,
        padding: 14,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 6,
      }}>
        <Image source={{ uri: item.cover_image_url }} style={{
          width: 60,
          height: 60,
          marginRight: 16,
        }} />
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'AvenirLTStd-Medium',
                color: '#333333',
                marginRight: 18,
              }}>
              {item?.product?.name}
            </Text>
            <Pressable onPress={() => { deleteProductFromCart(item) }}>
              <Image
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                }}
                source={require('../assets/delete1.png')}
              />
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            {qualityRating && (
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Medium',
                    color: '#333333',
                    marginTop: 2,
                  }}>
                  Price: {qualityRating?.discount_price > 0 ? qualityRating?.discount_price : qualityRating?.price}
                </Text>
                {qualityRating.discount_price > 0 && (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'AvenirLTStd-Medium',
                      color: '#33333390',
                      marginTop: 2,
                      marginLeft: 5,
                      textDecorationLine: 'line-through',
                      textDecorationColor: 'red',
                    }}>
                    {qualityRating.price}
                  </Text>
                )}
              </View>
            )}

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <TouchableOpacity onPress={() => decrementQty(item)} style={{
                padding: 8,
                backgroundColor: '#FFCC80',
                borderRadius: 4,
              }}>
                <Text style={{
                  fontSize: 16, fontFamily: 'AvenirLTStd-Medium',
                  color: '#333333',
                }}>-</Text>
              </TouchableOpacity>
              <Text style={{
                marginHorizontal: 8,
                fontSize: 16, fontFamily: 'AvenirLTStd-Medium',
                color: '#333333',
              }}>{item.qty}</Text>
              <TouchableOpacity onPress={() => incrementQty(item)} style={{
                padding: 8,
                backgroundColor: '#FFCC80',
                borderRadius: 4,
              }}>
                <Text style={{
                  fontSize: 16, fontFamily: 'AvenirLTStd-Medium',
                  color: '#333333',
                }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

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
            alignSelf: 'center', marginRight: 18
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
              ₹{walletBalance}
            </Text>
          </TouchableOpacity>


        </View>
      </View>
      {state.loading && <Loader />}
      {cart && cart?.length > "0" ?
        <>
          <ScrollView style={{ marginBottom: 70 }}>
            <View style={styles.container}>
              <FlatList
                data={cart}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
              />

              <View style={{
                paddingVertical: 15,
                backgroundColor: '#FFFFFF',
                marginTop: 20,
                borderRadius: 6,
                elevation: 5,
                marginHorizontal: 5,
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
                    Subtotal
                  </Text>
                  <Text style={{
                    marginRight: 10,
                    color: '#333333',
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Heavy',
                  }}>
                    ₹{subtotal}
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
                    Delivery Charge
                  </Text>
                  <Text style={{
                    marginRight: 10,
                    color: '#333333',
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Heavy',
                  }}>
                    ₹{deliveryPrice}
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
                    Discount
                  </Text>
                  <Text style={{
                    marginRight: 10,
                    color: '#333333',
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Heavy',
                  }}>
                    ₹{couponDiscount}
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
                    Tax
                  </Text>
                  <Text style={{
                    marginRight: 10,
                    color: '#333333',
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Heavy',
                  }}>
                    ₹{totalTaxPrice}
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
                    ₹{total}
                  </Text>
                </View>
              </View>
            </View>


          </ScrollView>
          <Button
            containerStyle={{
              width: '92%',
              bottom: 20,
              position: 'absolute',
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
        </>

        :
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Data Found</Text>
        </View>}
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 16,
  },

  summaryContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default Cart;





// import React from 'react';
// import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

// const Cart = ({ navigation }) => {

//   const planetData = [
//     {
//       "id": 0,
//       "name": "Sun",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 12.189540792464342,
//       "speed": 0.9537797443255392,
//       "isRetro": "false",
//       "sign": "Gemini",
//       "signLord": "Mercury",
//       "nakshatra": "Ardra",
//       "nakshatraLord": "Rahu",
//       "nakshatra_pad": 2,
//       "house": 9,
//       "is_planet_set": false,
//       "planet_awastha": "Yuva"
//     },
//     {
//       "id": 1,
//       "name": "Moon",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 11.72351598586304,
//       "speed": 13.920316198066743,
//       "isRetro": "false",
//       "sign": "Aries",
//       "signLord": "Mars",
//       "nakshatra": "Ashwini",
//       "nakshatraLord": "Ketu",
//       "nakshatra_pad": 4,
//       "house": 7,
//       "is_planet_set": false,
//       "planet_awastha": "Kumara"
//     },
//     {
//       "id": 2,
//       "name": "Mars",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 13.41992352157277,
//       "speed": 0.6649777633290916,
//       "isRetro": "false",
//       "sign": "Gemini",
//       "signLord": "Mercury",
//       "nakshatra": "Ardra",
//       "nakshatraLord": "Rahu",
//       "nakshatra_pad": 3,
//       "house": 9,
//       "is_planet_set": true,
//       "planet_awastha": "Yuva"
//     },
//     {
//       "id": 3,
//       "name": "Mercury",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 25.491713014068253,
//       "speed": -0.29467903633858694,
//       "isRetro": "true",
//       "sign": "Gemini",
//       "signLord": "Mercury",
//       "nakshatra": "Punarvasu",
//       "nakshatraLord": "Jupiter",
//       "nakshatra_pad": 2,
//       "house": 9,
//       "is_planet_set": false,
//       "planet_awastha": "Mrit"
//     },
//     {
//       "id": 4,
//       "name": "Jupiter",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 5.5300964666809875,
//       "speed": 0.2119922731034037,
//       "isRetro": "false",
//       "sign": "Taurus",
//       "signLord": "Venus",
//       "nakshatra": "Krittika",
//       "nakshatraLord": "Sun",
//       "nakshatra_pad": 3,
//       "house": 8,
//       "is_planet_set": false,
//       "planet_awastha": "Mrit"
//     },
//     {
//       "id": 5,
//       "name": "Venus",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 16.57181911264793,
//       "speed": 1.2289765385390012,
//       "isRetro": "false",
//       "sign": "Gemini",
//       "signLord": "Mercury",
//       "nakshatra": "Ardra",
//       "nakshatraLord": "Rahu",
//       "nakshatra_pad": 3,
//       "house": 9,
//       "is_planet_set": true,
//       "planet_awastha": "Yuva"
//     },
//     {
//       "id": 6,
//       "name": "Saturn",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 2.3970734633440216,
//       "speed": 0.10910000257030411,
//       "isRetro": "false",
//       "sign": "Taurus",
//       "signLord": "Venus",
//       "nakshatra": "Krittika",
//       "nakshatraLord": "Sun",
//       "nakshatra_pad": 2,
//       "house": 8,
//       "is_planet_set": false,
//       "planet_awastha": "Mrit"
//     },
//     {
//       "id": 7,
//       "name": "Rahu",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 1.7592615626991943,
//       "speed": -0.05299201968813196,
//       "isRetro": "true",
//       "sign": "Cancer",
//       "signLord": "Moon",
//       "nakshatra": "Punarvasu",
//       "nakshatraLord": "Jupiter",
//       "nakshatra_pad": 4,
//       "house": 10,
//       "is_planet_set": false,
//       "planet_awastha": "Mrit"
//     },
//     {
//       "id": 8,
//       "name": "Ketu",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 1.75926156269918,
//       "speed": -0.05299201968813196,
//       "isRetro": "true",
//       "sign": "Capricorn",
//       "signLord": "Saturn",
//       "nakshatra": "Uttra Shadha",
//       "nakshatraLord": "Sun",
//       "nakshatra_pad": 2,
//       "house": 4,
//       "is_planet_set": false,
//       "planet_awastha": "Mrit"
//     },
//     {
//       "id": 9,
//       "name": "Ascendant",
//       "fullDegree": Math.floor(Math.random() * 361),
//       "normDegree": 27.928685871204436,
//       "speed": 0,
//       "isRetro": false,
//       "sign": "Libra",
//       "signLord": "Venus",
//       "nakshatra": "Vishakha",
//       "nakshatraLord": "Jupiter",
//       "nakshatra_pad": 3,
//       "house": 1,
//       "is_planet_set": false,
//       "planet_awastha": "--"
//     }
//   ];

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.headerRow}>

//           <Text style={styles.headerText}>Name</Text>

//           <Text style={styles.headerText}>Degree</Text>
//           <Text style={styles.headerText}>Nakshatra</Text>
//           <Text style={styles.headerText}>Rashi</Text>
//         </View>

//         {planetData.map((item, index) => (
//           <View key={item.id}>
//             <View style={styles.dataRow}>

//               <Text style={styles.dataText}>{item.name}</Text>
//               <Text style={styles.dataText}>{item.fullDegree}</Text>
//               <Text style={styles.dataText}>{item.nakshatra}</Text>
//               <Text style={styles.dataText}>{item.nakshatraLord}</Text>
//             </View>

//             {index !== planetData.length - 1 && (
//               <View style={styles.separator}></View>
//             )}
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 18,
//     paddingVertical: 13,
//     backgroundColor: '#FFFFFF',
//     marginTop: 25,
//     borderRadius: 5,
//     elevation: 5,
//   },
//   headerRow: {
//     flex: 1,
//     backgroundColor: '#EBF3F3',
//     marginTop: -13,
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     height: 50,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#323232',
//     fontFamily: 'Montserrat-Medium',
//     fontWeight: '600',
//     marginTop: 15,
//   },
//   dataRow: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   dataText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#323232',
//     fontFamily: 'Montserrat-Regular',
//     fontWeight: '400',
//   },
//   separator: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//     marginTop: 10,
//   },

// });

// export default Cart;
