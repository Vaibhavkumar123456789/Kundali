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
    Linking
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import { useIsFocused } from '@react-navigation/native';
import { getorderhistory } from '../backend/Api';
import moment from 'moment';
import Loader from '../utils/Loader';

const MyInvoice = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice } = stringsoflanguages
    const isFocused = useIsFocused();
    const [orderdetail, setOrderDetail] = useState([])
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        OrderHistory()
    }, [isFocused == true])

    const OrderHistory = () => {
        toggleLoading(true);

        getorderhistory()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    setOrderDetail(data?.order)

                } else {

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
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_invoice.myinvoice}
            />
            {state.loading && <Loader />}
            {orderdetail && orderdetail?.length > "0" ?
                <FlatList
                    data={orderdetail}
                    style={{ flexGrow: 0, marginTop: 10 }}
                    renderItem={({ item, index }) => (

                        <View
                            style={{
                                marginHorizontal: 18,
                                paddingVertical: 10,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 12,
                                elevation: 5,
                                bottom: 10,
                                marginTop: 15,
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../assets/invoice.png')}
                                        style={{ width: 50, height: 50, resizeMode: 'contain', marginLeft: 10 }}
                                    />
                                    <View>
                                        <Text numberOfLines={1}
                                            style={{
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                color: '#333333',
                                                fontSize: 16,
                                                marginLeft: 10,
                                                marginTop: 5,
                                                width: window.width - 165,
                                            }}>
                                            {_invoice.invoice} #{item?.id}
                                        </Text>

                                        <Text numberOfLines={1}
                                            style={{
                                                fontFamily: 'AvenirLTStd-Medium',
                                                color: '#33333360',
                                                fontSize: 14,
                                                marginLeft: 10,
                                                marginTop: 3,
                                                width: window.width - 165,
                                            }}>
                                            {`${moment(item?.created_at).format('DD MMM YYYY')}`}
                                        </Text>

                                    </View>
                                </View>
                                <Text onPress={() => { Linking.openURL(item?.invoiceurl) }}
                                    style={{
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: '#FFCC80',
                                        fontSize: 14,
                                        marginRight: 10,
                                        alignSelf: 'center',
                                        textDecorationLine: 'underline',
                                    }}>
                                    {_member.view}
                                </Text>
                            </View>

                        </View>
                    )
                    }
                />

                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'AvenirLTStd-Medium' }}>No Invoice Available</Text>
                </View>}
        </SafeAreaView >
    )
}

export default MyInvoice

const styles = StyleSheet.create({})