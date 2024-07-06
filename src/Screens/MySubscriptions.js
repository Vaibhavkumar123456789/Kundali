import { View, Text, Image, StyleSheet, Modal, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Loader from '../utils/Loader';
import { useIsFocused } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Kundlireporthistory, activepackageapi, getorderhistory } from '../backend/Api';
import moment from 'moment';

const MySubscriptions = ({ navigation }) => {
    const { _member, _home, _order } = stringsoflanguages
    const window = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { width, height } = Dimensions.get('window');
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [reportdetail, setReportDetail] = useState([])

    useEffect(() => {
        banner()
    }, [isFocused == true])

    const banner = () => {
        toggleLoading(true);

        activepackageapi()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    setReportDetail(data.list)

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
                title="Package Details"

                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}

            />

            {state.loading && <Loader />}

            <FlatList
                data={reportdetail}
                style={{ marginTop: 10, flexGrow: 0 }}
                renderItem={({ item, index }) => (

                    <View style={styles.ex_view}>

                        <View style={styles.dt_view}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 2, marginTop: 4 }}>

                                <Text numberOfLines={1} style={{ color: '#1E1F20', fontFamily: 'AvenirLTStd-Heavy', fontSize: 16, marginLeft: 7, marginTop: 0, width: window.width - 180 }}>
                                    {item?.plandetail?.package_name}
                                </Text>
                                <View style={{ alignSelf: 'flex-end', marginRight: 12, marginTop: 3, backgroundColor: '#00c04b', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 30 }}>
                                    <Text style={{ color: 'white', fontFamily: 'AvenirLTStd-Medium', fontSize: 13, textAlign: 'center' }} >{item.status === 1 ? "Active" : item.status === 2 ? "Inactive" : null}</Text>
                                </View>
                            </View>
                            <View style={styles.dt_view_1}>
                                <View style={styles.dt_view_11}>
                                    {item?.plandetail?.is_free == "1" ?

                                        <Text numberOfLines={1}
                                            style={{
                                                fontFamily: 'AvenirLTStd-Medium',
                                                fontSize: 18,
                                                marginTop: 5,
                                                color: '#1E1F20',
                                                marginLeft: 9,
                                            }}>Free</Text>
                                        :
                                        <Text numberOfLines={1}
                                            style={styles.dt_name}>{item.total_mrp}</Text>

                                    }

                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                <View>

                                    <Text numberOfLines={1}
                                        style={{
                                            fontFamily: 'AvenirLTStd-Medium',
                                            fontSize: 14,
                                            color: '#1E1F20',
                                            marginLeft: 9,
                                        }}>Start Date</Text>
                                    <Text numberOfLines={1}
                                        style={{
                                            fontFamily: 'AvenirLTStd-Medium',
                                            fontSize: 16,
                                            color: '#1E1F20',
                                            marginTop: 3,
                                            marginLeft: 9,
                                        }}>{`${moment(item?.created_at).format('YYYY-MM-DD')}`}</Text>
                                </View>
                                <View style={{ marginRight: 12 }}>
                                    {item.totaldays == 0 || item.totaldays > 0 ?
                                        <View style={{ alignSelf: 'flex-end', marginTop: 6, backgroundColor: '#00c04b', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5 }}>
                                            <Text style={{ color: 'white', fontFamily: 'AvenirLTStd-Medium', fontSize: 13, textAlign: 'center' }} onPress={() => navigation.navigate('Package')}>Upgrade Plan</Text>
                                        </View>
                                        :
                                        <>
                                            <Text numberOfLines={1}
                                                style={{
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    fontSize: 14,
                                                    color: '#1E1F20',
                                                    marginLeft: 9,
                                                    textAlign: 'right',
                                                }}>Next Billing Date</Text>
                                            <Text numberOfLines={1}
                                                style={{
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    fontSize: 16,
                                                    color: '#1E1F20',
                                                    marginTop: 3,
                                                    textAlign: 'right',
                                                    marginLeft: 9,
                                                }}>{`${moment(item?.expiry_date).format('YYYY-MM-DD')}`}</Text>
                                        </>
                                    }
                                </View>
                            </View>
                        </View>

                    </View>
                )
                }
            />

        </SafeAreaView >
    )
}

export default MySubscriptions

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
        borderColor: '#FFCC80',
        borderWidth: 2,
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
        fontSize: 18,
        marginTop: 5,
        color: '#1E1F20',
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