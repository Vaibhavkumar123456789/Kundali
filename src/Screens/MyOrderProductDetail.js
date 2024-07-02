import { View, Text, Image, StyleSheet, Modal, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import Loader from '../utils/Loader';
import { useIsFocused } from '@react-navigation/native';
import { Kundlireporthistory, getorderhistory, postorderhistory } from '../backend/Api';
import moment from 'moment';

const MyOrderProductDetail = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    const { _member, _home, _order } = stringsoflanguages
    const window = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { width, height } = Dimensions.get('window');
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [address, setAddress] = useState()
    const [orderdetail, setOrderDetail] = useState([])

    useEffect(() => {
        OrderHistory()
    }, [isFocused == true])


    const OrderHistory = () => {
        let e = {
            "order_id": route.params?.id,
        }
        toggleLoading(true);

        postorderhistory(e)
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    setOrderDetail(data?.order)
                    setAddress(data?.orderAddress)
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
                title={_home.myOrder}

                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}

            />

            {state.loading && <Loader />}
            <ScrollView>
                <FlatList
                    data={orderdetail}
                    style={{ marginTop: 10, flexGrow: 0 }}
                    renderItem={({ item, index }) => (
                        <View style={{
                            marginHorizontal: 18,
                            paddingVertical: 10,
                            backgroundColor: 'white',
                            elevation: 5,
                            bottom: 8,
                            marginTop: 10,
                            borderRadius: 10,
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        color: '#333333',
                                        marginLeft: 10,
                                    }}>
                                    {_order.orderid} #{item?.order_id}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: '#33333360',
                                        marginRight: 10,
                                        marginTop: 2,
                                    }}>
                                    {`${moment(item?.created_at).format('YYYY-MM-DD-hh:mm a')}`}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10, }}>
                                <Image style={{ width: 80, height: 80, borderRadius: 5, resizeMode: 'contain' }}
                                    source={{ uri: item?.image }} />
                                <View>
                                    <Text numberOfLines={2}
                                        style={{
                                            fontSize: 13,
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            color: '#333333',
                                            marginLeft: 10,
                                            width: window.width - 150,
                                        }}>
                                        {item?.product_name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            color: '#33333360',
                                            marginLeft: 10,
                                            marginTop: 5,
                                        }}>
                                        {_order.quantity} :{item?.qty}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                color: '#33333360',
                                                marginLeft: 10,
                                                marginTop: 5,
                                            }}>
                                            {_order.mrp}:
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                color: '#FFCC80',
                                                marginLeft: 5,
                                                marginTop: 5,
                                                width: window.width - 150,
                                            }}>
                                            ₹{item?.total_price}
                                        </Text>
                                    </View>
                                </View>
                            </View>


                        </View>
                    )}
                />

                <View style={{
                    paddingVertical: 15,
                    backgroundColor: '#FFFFFF',
                    marginTop: 15,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    elevation: 5,
                    bottom: 8,
                }}>
                    <Text style={{
                        marginHorizontal: 10,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Heavy',
                        fontSize: 14,
                        textTransform: 'uppercase'
                    }}>
                        {_order.payment}
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
                            {_order.subtotal}
                        </Text>
                        <Text style={{
                            marginRight: 10,
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            ₹{route.params?.total_mrp}
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
                            {_order.delivery}
                        </Text>
                        <Text style={{
                            marginRight: 10,
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            ₹{route.params?.delivery_price}
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
                            {_order.discount}
                        </Text>
                        <Text style={{
                            marginRight: 10,
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            ₹{route.params?.coupon_discount}
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
                            {_order.tax}
                        </Text>
                        <Text style={{
                            marginRight: 10,
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            ₹{route.params?.tax_amt}
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
                            {_order.totalamount}
                        </Text>
                        <Text style={{
                            marginRight: 10,
                            color: '#333333',
                            fontSize: 14,
                            letterSpacing: 0.2,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            ₹{route.params?.net_amount}
                        </Text>
                    </View>
                </View>

                {(address &&
                    <View style={{
                        paddingVertical: 15,
                        backgroundColor: '#FFFFFF',
                        marginTop: 15,
                        marginHorizontal: 18,
                        borderRadius: 10,
                        elevation: 5,
                        bottom: 8,
                    }}>
                        <Text style={{
                            marginHorizontal: 10,
                            color: '#333333',
                            fontFamily: 'AvenirLTStd-Heavy',
                            fontSize: 14,
                            textTransform: 'uppercase'
                        }}>
                            {_order.shipping}:
                        </Text>

                        <Text style={{
                            marginHorizontal: 10,
                            color: '#33333390',
                            fontSize: 13,
                            marginTop: 2,
                            letterSpacing: 0.18,
                            lineHeight: 20,
                            fontFamily: 'AvenirLTStd-Roman',
                        }}>
                            {address?.address},{address?.city},{address?.state},{address?.country}-{address?.pincode}
                        </Text>
                        <Text style={{
                            marginHorizontal: 10,
                            color: '#33333390',
                            fontSize: 13,
                            marginTop: 2,
                            letterSpacing: 0.18,
                            lineHeight: 20,
                            fontFamily: 'AvenirLTStd-Roman',
                        }}>
                            {address?.state},{address?.country}-{address?.pincode}
                        </Text>
                        <Text style={{
                            marginHorizontal: 10,
                            color: '#33333390',
                            fontSize: 13,
                            marginTop: 2,
                            letterSpacing: 0.18,
                            lineHeight: 20,
                            fontFamily: 'AvenirLTStd-Roman',
                        }}>
                            Mobile No: {address?.mobile}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyOrderProductDetail

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
    mdtop: {
        backgroundColor: '#FFFFFF',
        marginTop: 50,
        marginLeft: 'auto',
        marginHorizontal: 30,
        elevation: 5,
        width: '50%',
        borderRadius: 8,
    },
    modalText: {
        fontFamily: 'AvenirLTStd-Medium',
        fontSize: 14,
        color: '#242A37',
        marginTop: 8,
        marginLeft: 10,
    },
    centerText: {
        fontFamily: 'AvenirLTStd-Medium',
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },

})