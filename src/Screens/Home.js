import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-banner-carousel';
import stringsoflanguages from '../language/Language'
import { TabActions } from '@react-navigation/native';

const Home = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _home } = stringsoflanguages

    const images = [
        {
            source: require('../assets/banner.png'),
        },
        {
            source: require('../assets/banner.png'),
        },
        {
            source: require('../assets/banner.png'),
        },
    ];

    const data = [
        {
            source: require('../assets/kundali-form.png'),
            title: _home.kundli,
            color: '#FDE4EC',
        },
        {
            source: require('../assets/members.png'),
            title: _home.member,
            color: '#E0F7FA',
        },
        {
            source: require('../assets/upcoming-events.png'),
            title: _home.upcoming,
            color: '#F1F8E9',
        },
    ];
    const bottomicon = [
        {
            source: require('../assets/kundali-form.png'),
            title: _home.membership,
            color: '#FDE4EC',
        },
        {
            source: require('../assets/my-orders.png'),
            title: _home.order,
            color: '#E0F7FA',
        },
        {
            source: require('../assets/jyotish.png'),
            title: _home.online,
            color: '#F1F8E9',
        },
    ];
    const onPressHandler1 = title => {

        switch (title) {
            case _home.membership:
                navigation.navigate('MembershipForm')
                break;
            case _home.order:
                navigation.navigate('MyOrders')
                break;
            case _home.online:
                navigation.navigate('OnlineJyotish')
                break;
            default:
        }
    }
    const data1 = [
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
    ]

    const data2 = [
        {

        },
        {

        },
        {

        },

    ]
    const renderPage = (item, index) => {
        return (
            <View key={index}>
                <Image
                    style={{
                        width: Dimensions.get('window').width - 36,
                        height: 80,
                        resizeMode: 'stretch',
                        alignSelf: 'center',
                        borderRadius: 8,
                    }}
                    source={item.source}
                />
            </View>
        );
    };
    const onPressHandler = title => {

        switch (title) {
            case _home.kundli:
                navigation.navigate('KundaliForm')
                break;
            case _home.member:
                navigation.dispatch(TabActions.jumpTo('Members'))
                break;
            case _home.upcoming:
                navigation.navigate('UpcomingEvent')
                break;
            default:
        }
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
                        onPress={() => { navigation.openDrawer() }}>
                        <Image
                            source={require('../assets/menu.png')}
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
                        Astro Logo
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
                        onPress={() => { navigation.navigate('Cart') }}>
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
            <ScrollView >
                <View style={{ justifyContent: 'center', marginTop: 15 }}>
                    <Carousel autoplay autoplayTimeout={5000} loop={false} index={0}>
                        {images.map((image, index) => renderPage(image, index))}
                    </Carousel>
                </View>


                <FlatList
                    numColumns={3}
                    data={data}
                    renderItem={({ item, index }) => (
                        <Pressable
                            onPress={() => { onPressHandler(item.title) }}>
                            <View
                                style={{
                                    width: window.width / 3 - 24.5,
                                    paddingVertical: 10,
                                    alignSelf: 'center',
                                    backgroundColor: item.color,
                                    elevation: 5,
                                    bottom: 5,
                                    borderRadius: 8,
                                    marginTop: 20,
                                    marginLeft: 18,
                                }}>
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                        resizeMode: 'contain',
                                        alignSelf: 'center',
                                        marginTop: 7,
                                    }}
                                    source={item.source}
                                />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        marginTop: 5,
                                        fontSize: 12,
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        color: '#333333',
                                        lineHeight: 17,
                                    }}>
                                    {item.title}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#333333',
                            marginLeft: 18,
                        }}>
                        {_home.message}
                    </Text>
                    <Pressable onPress={() => { navigation.navigate('MessageCenter') }}>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#333333',
                                marginRight: 18,
                                marginTop: 2,
                                textDecorationLine: 'underline',
                            }}>
                            {_home.view}
                        </Text>
                    </Pressable>
                </View>

                <View
                    style={{
                        marginHorizontal: 18,
                        paddingVertical: 10,
                        backgroundColor: '#FFF7F0',
                        elevation: 5,
                        bottom: 5,
                        borderRadius: 8,
                        marginTop: 20,
                    }}>
                    <FlatList
                        data={data1}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', paddingVertical: 7 }}>
                                <View
                                    style={{
                                        width: 5, height: 5, borderRadius: 4, backgroundColor: '#FFCC80',
                                        marginLeft: 10, marginTop: 5,
                                    }}>
                                </View>

                                <Text
                                    style={{
                                        fontSize: 12,
                                        marginLeft: 7,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: '#33333390',
                                        width: window.width - 65,
                                    }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                </Text>
                            </View>
                        )}
                    />

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#333333',
                            marginLeft: 18,
                        }}>
                        {_home.astro}
                    </Text>
                    <Pressable onPress={() => { navigation.dispatch(TabActions.jumpTo('Reports')) }}>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#333333',
                                marginRight: 18,
                                marginTop: 2,
                                textDecorationLine: 'underline',
                            }}>
                            {_home.view}
                        </Text>
                    </Pressable>
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        // style={{ marginTop: 10, }}
                        data={data2}
                        renderItem={({ item, index }) => (

                            <View
                                style={{
                                    width: window.width - 60,
                                    paddingVertical: 11,
                                    alignSelf: 'center',
                                    backgroundColor: '#FFEBEE',
                                    elevation: 2,
                                    bottom: 5,
                                    borderRadius: 20,
                                    marginTop: 20,
                                    marginLeft: 8,
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: '#F44336',
                                    }}>
                                    {_home.premium}
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
                                                width: window.width - 200,
                                            }}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy.
                                        </Text>

                                        <Text style={{
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            fontSize: 15,
                                            marginLeft: 10,
                                            marginTop: 5,
                                            width: window.width - 200,
                                        }}>
                                            {_home.price} ₹18000&nbsp;
                                            <Text
                                                onPress={() => {
                                                }}
                                                style={{
                                                    color: '#333333',
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    fontSize: 11,
                                                    textDecorationLine: 'line-through',
                                                }}>
                                                20000&nbsp;
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
                                        source={require('../assets/book.png')}
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
                                    <Pressable onPress={() => navigation.navigate("PremiumKundliDetailReport")}>
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
                </View>

                <FlatList
                    numColumns={3}
                    data={bottomicon}
                    renderItem={({ item, index }) => (
                        <Pressable
                            onPress={() => { onPressHandler1(item.title) }}>
                            <View
                                style={{
                                    width: window.width / 3 - 24.5,
                                    paddingVertical: 10,
                                    alignSelf: 'center',
                                    backgroundColor: item.color,
                                    elevation: 5,
                                    bottom: 5,
                                    borderRadius: 8,
                                    marginTop: 20,
                                    marginLeft: 18,
                                }}>
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                        resizeMode: 'contain',
                                        alignSelf: 'center',
                                        marginTop: 7,
                                    }}
                                    source={item.source}
                                />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        marginTop: 5,
                                        fontSize: 12,
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        color: '#333333',
                                        lineHeight: 17,
                                    }}>
                                    {item.title}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                />

            </ScrollView>
        </SafeAreaView>

    )
}

export default Home

const styles = StyleSheet.create({})