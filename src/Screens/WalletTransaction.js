import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Image,
    FlatList,
    Alert,
    Pressable,
    Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import moment from 'moment';
import CustomHeader from '../Custom/CustomHeader';
import { wallethistory } from '../backend/Api';
import Loader from '../utils/Loader';
import { useIsFocused } from '@react-navigation/native';

const WalletTransaction = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const isFocused = useIsFocused();
    const [history, setHistory] = useState([]);
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        banner()
    }, [isFocused == true])

    const banner = () => {
        toggleLoading(true);

        wallethistory()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    setHistory(data?.data)

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
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <CustomHeader
                title={"Wallet Transaction"}
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}

            />
            {state.loading && <Loader />}
            {history && history?.length > "0" ?
                <FlatList
                    data={history}
                    style={{ marginTop: 7 }}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                padding: 10,
                                marginHorizontal: 15,
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                elevation: 5,
                                marginTop: 10,
                                marginBottom: 5,
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain',
                                    }}
                                    source={require('../assets/walleticon.png')}
                                />
                                <View style={{ alignSelf: 'center' }}>
                                    <Text numberOfLines={2}
                                        style={{
                                            color: '#17302C',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            fontSize: 14,
                                            marginLeft: 10,
                                            marginTop: 0,
                                            width: Dimensions.get('window').width - 190,
                                        }}>
                                        {item?.txn_name}
                                    </Text>

                                    <Text numberOfLines={1}
                                        style={{
                                            color: '#17302C',
                                            fontFamily: 'AvenirLTStd-Medium',
                                            fontSize: 12,
                                            marginLeft: 10,
                                            width: Dimensions.get('window').width - 190,
                                            marginTop: 3,
                                        }}>
                                        {moment(item.created_at).format('DD MMM YYYY hh:mm:a')}
                                    </Text>
                                </View>

                                {item.status == 1 ?
                                    <View
                                        style={{
                                            marginLeft: 'auto',
                                            alignSelf: 'center',
                                            // marginTop: 25,
                                        }}>
                                        <Text numberOfLines={1}
                                            style={{
                                                color: item.type == "credit" ? '#17302C' : 'red',
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                fontSize: 16,
                                                marginLeft: 10,
                                                marginTop: 0,
                                                textAlign: 'right',
                                                width: window.width - 290,
                                            }}>
                                            {item.type === "credit" ? `+ ₹${item?.price}` : `- ₹${item?.price}`}
                                        </Text>

                                    </View>
                                    :
                                    <View
                                        style={{
                                            marginLeft: 'auto',
                                            alignSelf: 'center',
                                        }}>
                                        <Text numberOfLines={1}
                                            style={{
                                                color: 'red',
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                fontSize: 16,
                                                marginLeft: 10,
                                                marginTop: 0,
                                                textAlign: 'right',
                                                width: window.width - 290,
                                            }}>
                                            ₹{`${item?.price}`}
                                        </Text>
                                        <Text numberOfLines={1}
                                            style={{
                                                color: 'red',
                                                fontFamily: 'AvenirLTStd-Medium',
                                                fontSize: 14,
                                                marginLeft: 10,
                                                marginTop: 1,
                                                textAlign: 'right',
                                                width: window.width - 290,
                                            }}>
                                            Failed
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    )}
                />
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Wallet Transaction</Text>
                </View>}

        </View>
    );
};

export default WalletTransaction;

const styles = StyleSheet.create({
    style: { backgroundColor: 'white', elevation: 5 },
    labelStyle: {
        fontSize: 14,
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        color: '#ACB1C0',
    },
    indicatorStyle: {
        backgroundColor: '#3DC6C6',
        height: 4,
        // width: '25%',
        // marginHorizontal: 20,
    },
});
