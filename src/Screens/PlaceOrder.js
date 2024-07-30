import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Pressable, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { addorderapi, addtocardapi, getcartapi, GetProfile } from '../backend/Api';
import stringsoflanguages from '../language/Language'
import Toast from 'react-native-simple-toast';
import Button from 'react-native-button';
import Loader from '../utils/Loader';
const PlaceOrder = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    const isFocused = useIsFocused();
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [totalTaxPrice, setTotalTaxPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState([])
    const [qty, setQty] = useState()
    const [walletBalance, setWalletBalance] = useState(0);
    const { _member, _invoice, _kundali, _setting, _customlang } = stringsoflanguages
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
                // alert(JSON.stringify(data?.user_profile?.wallet, null, 2))
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
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    setQty(data)
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


    const order = () => {
        if (walletBalance <= total) {
            Toast.show("Please Add Wallet Balance")
        } else {

            let list = cart.map(item => item.id)
            var txnid = new Date().getTime().toString();
            let e = {
                "sub_total": subtotal,
                "tax_amt": totalTaxPrice,
                "total": total,
                "delivery_price": deliveryPrice,
                "discount_amount": couponDiscount,
                "addressid": route.params?.id,
                "total_qty": qty?.total_qty,
                "cart_id": list,
                "payment_mode": "online",
                "currency": "inr",
                "trxn_id": txnid,
            };
            
            toggleLoading(true);
            addorderapi(e)
                .then(data => {
                    console.log('add order ...', data)
                    // alert(JSON.stringify(data, null, 2))
                    toggleLoading(false);
                    if (data.status) {
                        navigation.navigate('ProductPaymentSuccessful', data?.order)
                    } else {
                        Toast.show(data?.msg);
                    }
                })
                .catch(error => {
                    toggleLoading(false);
                    console.log('error', error);
                });
        }
    }

    const renderCartItem = ({ item, index }) => {
        let qualityRating;
      
        if (!item?.product?.quality_rati1 || item?.product?.quality_rati1.length === 0) {
            qualityRating = {
                discount_price: item?.product?.discounted_price,
                price: item?.product?.prices,
            };
        } else {
            qualityRating = item?.product?.quality_rati1?.find(q => q.quality.toString() === item.variant.toString());
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
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#333333',
                            marginRight: 18,
                        }}>
                        {item?.product?.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#333333',
                            marginTop: 2,
                        }}>
                        Qty: {item?.qty}
                    </Text>

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
                    <Text numberOfLines={1}
                        style={{
                            fontSize: 18,
                            color: '#333333',
                            fontFamily: 'AvenirLTStd-Heavy',
                            marginTop: 7,
                            marginLeft: 10,
                        }}>
                        Place Order
                    </Text>
                </View>

            </View>
            {state.loading && <Loader />}
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
                                fontSize: 18,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginHorizontal: 10,
                            }}>
                                {route.params?.name}
                            </Text>

                            <Text
                                style={{
                                    fontFamily: 'AvenirLTStd-Medium',
                                    color: '#33333370',
                                    fontSize: 14,
                                    lineHeight: 18,
                                    marginTop: 5,
                                    marginHorizontal: 10,
                                }}>
                                {route.params?.address},{route.params?.city_name},{route.params?.state_name},{route.params?.country_name}-{route.params.pincode}
                            </Text>

                            <Text
                                style={{
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    color: '#333333',
                                    fontSize: 14,
                                    marginTop: 5,
                                    marginHorizontal: 10,
                                }}>
                                {_kundali.mobile}-{route.params?.mobile}
                            </Text>

                        </View>

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
            </>
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
                    order()
                }}>
                Place Order
            </Button>
        </SafeAreaView>
    )
}

export default PlaceOrder

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
})

// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'

// const PlaceOrder = () => {
//     const [result, setResult] = useState(null);

//     const getRandomNumberWithTimestamp = () => {
//         const randomInteger = Math.floor(Math.random() * 1001);
//         const timestamp = Date.now();
//         const combined = `${randomInteger}+${timestamp}`;
//         return combined;
//     };

//     const handlePress = () => {
//         const combined = getRandomNumberWithTimestamp();
//         const [randomInteger, timestamp] = combined.split('+').map(Number);
//         const sum = randomInteger + timestamp;
//         setResult(sum);
//         alert(JSON.stringify(sum, null, 2));
//     };

//     useEffect(() => {
//         handlePress()
//     }, [])

//     return (
//         <View>
//             <Text>PlaceOrder</Text>
//         </View>
//     )
// }

// export default PlaceOrder

// const styles = StyleSheet.create({})