import { View, Text, Image, StyleSheet, Dimensions, FlatList, Modal, Linking, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Platform, BackHandler, Alert, LogBox, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-banner-carousel';
import stringsoflanguages from '../language/Language'
import { TabActions } from '@react-navigation/native';
import { activepackageapi, Astroreport, Homebanner } from '../backend/Api';
import { useIsFocused } from '@react-navigation/native';
import * as actions from '../redux/actions';
import store from '../redux/store';
import { useDispatch, useSelector, useStore } from 'react-redux';
import GLobal from './GLobal';
import AstroReportList from './component/AstroReportList';
import NoInterner from './NoInterner';

const Home = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { free } = useSelector(store => store);
    const [modalVisible, setModalVisible] = useState(false);
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
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

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
            let ms = 10000;
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

    useEffect(() => {
        Subscriptionsapi()

        if (free?.plandetail?.is_free == "1" && free?.totaldays == 0 || free?.totaldays > 0) {
            setModalVisible(true)
        }
    }, [isFocused == true])

    const Subscriptionsapi = () => {

        activepackageapi()
            .then(data => {
                // alert(JSON.stringify(data?.list[0], null, 2))
                if (data.status) {
                    actions.FreePackage(data?.list[0]);

                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    const banner = () => {
        toggleLoading(true);
        let e = {
            "device_id": '123',
            "device_token": GLobal.firebaseToken,
            "device_type": Platform.OS,
        }
        Homebanner(e)
            .then(data => {
                // alert(JSON.stringify(data.carts, null, 2))
                toggleLoading(false)
                if (data.status) {
                    setBannerImage(data?.topbanners)
                    setReport(data?.astro_report_detail)
                    setMessage(data?.message_center?.data)
                    setAstro(data)
                    GLobal.deliveryday = data?.settings?.delivery_day
                    GLobal.count = data.carts
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
    const onPressHandler1 = async title => {

        switch (title) {
            case _home.membership:
                navigation.navigate('MembershipForm')
                break;
            case _home.order:
                navigation.navigate('MyOrders')
                break;
            case _home.online:

                const appScheme = 'com.astromyntra.app';
                const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.astromyntra.app';

                try {
                    const supported = await Linking.canOpenURL(`${appScheme}://`)
                    if (supported) {
                        // App is installed, open it
                        await Linking.openURL(`${appScheme}://`);
                    } else {
                        // App is not installed, open the respective store
                        if (Platform.OS === 'android') {
                            await Linking.openURL(playStoreUrl);

                        } else {
                            Alert.alert('Error', 'Unsupported platform.');
                        }
                    }
                } catch (error) {
                    Alert.alert('Error', 'An error occurred while trying to open the app.');
                }
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
                        {astro?.carts > 0 ?
                            <>
                                <Image
                                    source={require('../assets/cart.png')}
                                    style={{
                                        height: 24,
                                        width: 24,
                                        resizeMode: 'contain',
                                        marginRight: 18,
                                    }}
                                />
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 10,
                                    backgroundColor: 'red',
                                    borderRadius: 30,
                                    width: 21,
                                    height: 21,
                                }}>
                                    <Text numberOfLines={1} style={{
                                        fontSize: 9,
                                        color: 'white',
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        marginTop: 4.2,
                                        marginLeft: 1.1,
                                        textAlign: 'center',
                                    }}>
                                        {astro?.carts}
                                    </Text>
                                </View>
                            </>
                            :
                            <Image
                                source={require('../assets/cart.png')}
                                style={{
                                    height: 24,
                                    width: 24,
                                    resizeMode: 'contain',
                                    marginRight: 18,
                                }}
                            />
                        }
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
                    {message && message?.length > 0 ?
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
                                        {item?.content}
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


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible(false);
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: '#00000099',
                        justifyContent: 'center',
                    }}>
                    <View style={{
                        margin: 15,
                        paddingVertical: 20,
                        backgroundColor: 'white',
                        borderRadius: 10,
                    }}>
                        <View style={{ backgroundColor: '#FFCC80', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 13, marginTop: -20, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                            <Text style={{
                                fontSize: 15,
                                color: 'black',
                                fontFamily: 'AvenirLTStd-Medium',
                                marginLeft: 15,
                            }}>
                                Your plan is expired
                            </Text>
                            <Pressable onPress={() => { setModalVisible(false) }}>
                                <Image
                                    style={{
                                        width: 13,
                                        height: 13,
                                        resizeMode: 'contain',
                                        marginRight: 15,
                                        marginTop: 3,
                                    }}
                                    source={require('../assets/close.png')}
                                />
                            </Pressable>
                        </View>
                        <Text style={{
                            fontSize: 15,
                            color: 'black',
                            fontFamily: 'AvenirLTStd-Medium',
                            marginHorizontal: 15,
                            textAlign: 'center',
                            marginTop: 10,
                            lineHeight: 20,
                        }}>
                            Become a member today and unlock exclusive benefits.Enjoy special discounts and more.
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{
                                backgroundColor: '#FFCC80',
                                borderRadius: 8,
                                padding: 15,
                                alignSelf: 'center',
                                marginTop: 13,
                            }} onPress={() => { navigation.navigate('Package'), setModalVisible(false) }}>

                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                textAlign: 'center',
                            }}>

                                Update Plan
                            </Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>


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