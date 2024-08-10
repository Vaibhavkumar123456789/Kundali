

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Pressable, ScrollView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { GetProfile, addtocardapi, getcartapi } from '../backend/Api';
import Button from 'react-native-button';
import Loader from '../utils/Loader';

const Cart = ({ navigation }) => {
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
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
    let qualityRating;
    if (!item?.product?.quality_rati1 || item?.product?.quality_rati1.length === 0) {
      qualityRating = {
        discount_price: item?.product?.discounted_price,
        price: item?.product?.prices,
      };
    }
    else {
      // qualityRating = item?.product?.quality_rati1?.find(q => q.quality.toString() === item.variant.toString());
      qualityRating = {
        discount_price: item?.discount_price,
        price: item?.price,
      };
    }

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
        <Image source={{ uri: item?.cover_image_url }} style={{
          width: 60,
          height: 60,
          marginRight: 16,
          borderRadius: 35,
        }} />
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text numberOfLines={3}
              style={{
                fontSize: 16,
                fontFamily: 'AvenirLTStd-Medium',
                color: '#333333',
                marginRight: 18,
                width: window.width - 180,
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
              marginTop: 7,
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
        <View style={{ flexDirection: 'row' }}>
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
          <Text
            style={{
              fontSize: 17,
              color: '#333333',
              fontFamily: 'AvenirLTStd-Heavy',
              marginTop: 8,
              marginLeft: 15,
            }}>
            Cart
          </Text>
        </View>
        <View style={{ flexDirection: 'row', }}>

          <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('Wallet') }} style={{
            flexDirection: 'row', borderColor: '#333333', borderWidth: 1,
            paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4,
            alignSelf: 'center', marginRight: 18, marginTop: 3
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


