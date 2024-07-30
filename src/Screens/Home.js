import { View, Text, Image, StyleSheet, Dimensions, FlatList, Modal, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Platform, BackHandler, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-banner-carousel';
import stringsoflanguages from '../language/Language'
import { TabActions } from '@react-navigation/native';
import { Astroreport, Homebanner } from '../backend/Api';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../utils/Loader';
import store from '../redux/store';
import GLobal from './GLobal';
import AstroReportList from './component/AstroReportList';
import NoInterner from './NoInterner';
const Home = ({ navigation }) => {
    const window = Dimensions.get('window');

    const { width, height } = Dimensions.get('window');
    const isFocused = useIsFocused();
    const [bannerimage, setBannerImage] = useState([])
    const [astro, setAstro] = useState()
    const [report, setReport] = useState([])
    const [message, setMessage] = useState([])
    const { _home } = stringsoflanguages
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', handler);
        });
        navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', handler);
        });
    }, []);

    const handler = () => {
        Alert.alert('Kundali', 'Are you sure you want to close this App?', [
            {
                text: 'Cancel',
                onPress: () => {
                    return true;
                },
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    BackHandler.exitApp();
                    return false;
                },
            },
        ]);
        return true;
    };


    useEffect(() => {
        let timer;

        const callback = async () => {
            let ms = 5000;
            banner()
            timer = setTimeout(callback, ms);
        };
        if (isFocused == true) {
            console.log('focused');
            callback();
        } else {
            console.log('unfocused');
            clearTimeout(timer);
        }
        return () => {
            console.log('unmount main component');
            clearTimeout(timer);
        };
    }, [isFocused == true])

    const banner = () => {
        toggleLoading(true);
        let e = {
            "device_id": '123',
            "device_token": GLobal.firebaseToken,
            "device_type": Platform.OS,
        }
        Homebanner(e)
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false)
                if (data.status) {
                    setBannerImage(data?.topbanners)
                    setReport(data?.astro_report_detail)
                    setMessage(data?.message_center)
                    setAstro(data)
                    GLobal.deliveryday = data?.settings?.delivery_day
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('bannererror', error);
            });
    }

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
                    source={{ uri: item?.banner_image }}
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
                                width: 22,
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
                            marginTop: 8,
                            marginLeft: 13,
                        }}>
                        Kundli App
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', }}>

                    <Pressable onPress={() => {
                        navigation.navigate('Wallet')
                    }} style={{
                        flexDirection: 'row', borderColor: '#333333', borderWidth: 1,
                        paddingHorizontal: 5, paddingVertical: 4, borderRadius: 4,
                        alignSelf: 'center', marginRight: 12, marginTop: 1
                    }}>
                        <Image
                            source={require('../assets/wallet.png')}
                            style={{
                                height: 14,
                                width: 14,
                                resizeMode: 'contain',
                            }}
                        />
                        {(astro &&
                            <Text numberOfLines={1}
                                style={{
                                    fontSize: 12,
                                    color: '#333333',
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    marginLeft: 10,
                                    letterSpacing: -0.22,
                                }}>
                                {astro !== undefined ? `₹${parseFloat(astro?.data?.wallet).toFixed(2)}` : '₹0.00'}
                            </Text>
                        )}
                    </Pressable>

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
            {/* {state.loading && <Loader />} */}
            <NoInterner />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'center', marginTop: 15 }}>
                    <Carousel autoplay autoplayTimeout={5000} loop={true} index={0}>
                        {bannerimage.map((image, index) => renderPage(image, index))}
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
                                    {item?.title}
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
                    {message && message.length > 0 ?
                        <FlatList
                            data={message?.slice(0, 5)}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', paddingVertical: 7 }}>
                                    <View
                                        style={{
                                            width: 5, height: 5, borderRadius: 4, backgroundColor: '#FFCC80',
                                            marginLeft: 10, marginTop: 5,
                                        }}>
                                    </View>

                                    <Text numberOfLines={2}
                                        style={{
                                            fontSize: 12,
                                            marginLeft: 7,
                                            fontFamily: 'AvenirLTStd-Medium',
                                            color: '#33333390',
                                            width: window.width - 65,
                                        }}>
                                        {item?.description}
                                    </Text>
                                </View>
                            )}
                        />
                        : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'AvenirLTStd-Medium' }}>No Message Available</Text>
                        </View>}
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

                <AstroReportList data={report} astro={astro?.path} />


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
                                    {item?.title}
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

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
    },
    modalView: {
        marginHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },

})