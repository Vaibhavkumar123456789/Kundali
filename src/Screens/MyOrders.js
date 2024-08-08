import { View, Text, Image, StyleSheet, Modal, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Loader from '../utils/Loader';
import { useIsFocused } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Kundlireporthistory, getorderhistory, prashnalaganapi } from '../backend/Api';
import moment from 'moment';

const MyOrders = ({ navigation }) => {
    const { _member, _home, _order } = stringsoflanguages
    const window = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { width, height } = Dimensions.get('window');
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [modalOpen, setModalOpen] = useState(false);
    const [checked, setChecked] = useState('all');
    const [reportdetail, setReportDetail] = useState([])
    const [orderdetail, setOrderDetail] = useState([])
    const [prashna, setPrashna] = useState([])
    const [data, setData] = useState()

    useEffect(() => {
        banner()
        OrderHistory()
        prashankundli()
    }, [isFocused == true])

    const banner = (filter = 'all') => {

        let e = {

            "condition": filter,  // all , lastweek ,lastmonth
        };

        toggleLoading(true);

        Kundlireporthistory(e)
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

    const OrderHistory = () => {
        toggleLoading(true);

        getorderhistory()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    setOrderDetail(data?.order)

                } else {
                    // alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }

    const prashankundli = () => {
        toggleLoading(true);

        prashnalaganapi()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    setPrashna(data?.list)
                    setData(data)
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }


    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <View style={{ flex: 1, }}>
                        {reportdetail && reportdetail.length > 0 ?
                            <FlatList
                                data={reportdetail}
                                style={{ marginTop: 10, flexGrow: 0 }}
                                renderItem={({ item, index }) => (

                                    <View style={styles.ex_view}>

                                        <View style={styles.dt_view}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 2, marginTop: 4 }}>
                                                <View style={{ flexDirection: 'row' }}>

                                                    <Text numberOfLines={1} style={{ color: '#1E1F20', fontFamily: 'AvenirLTStd-Heavy', fontSize: 16, marginLeft: 7, marginTop: 0, width: window.width - 210 }}>
                                                        {item?.maindetail?.name}
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: 12, marginTop: 20 }}>
                                                    <Text style={{ color: '#FFCC80', fontFamily: 'AvenirLTStd-Medium', fontSize: 14, textDecorationLine: 'underline', }} onPress={() => navigation.navigate('NetalReportDetail', item)}>{_order.view}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.dt_view_1}>
                                                <View style={styles.dt_view_11}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row', marginTop: -15,
                                                        }}>
                                                        <Text numberOfLines={1}
                                                            style={styles.dt_name}>{`${moment(item?.maindetail?.updated_at).format('YYYY-MM-DD hh:mm a')}`}</Text>

                                                    </View>


                                                </View>
                                            </View>
                                            <View style={styles.dt_view_2}>
                                                <View style={styles.dt_viewOpt}>
                                                    <Text numberOfLines={1} style={styles.dt_viewOptText}>
                                                        {_order.amount} : ₹ {item?.total_mrp}/-
                                                    </Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                            : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'AvenirLTStd-Medium' }}>No Kundali Report</Text>
                            </View>}
                    </View>
                )
            case 'second':
                return (
                    <View style={{ flex: 1, }}>
                        {orderdetail && orderdetail?.length > "0" ?
                            <FlatList
                                data={orderdetail}
                                style={{ marginTop: 10, flexGrow: 0 }}
                                renderItem={({ item, index }) => (
                                    <Pressable onPress={() => { navigation.navigate('MyOrderProductDetail', item) }}>
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
                                                    {_order.orderid} #{item?.id}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        fontFamily: 'AvenirLTStd-Medium',
                                                        color: '#33333360',
                                                        marginRight: 10,
                                                        marginTop: 2,
                                                    }}>
                                                    {`${moment(item?.created_at).format('YYYY-MM-DD hh:mm a')}`}
                                                </Text>
                                            </View>
                                            <View style={{ marginHorizontal: 10, marginTop: 10, borderStyle: 'dashed', borderBottomColor: '#33333360', borderBottomWidth: 1 }}></View>
                                            <FlatList
                                                data={item?.products}
                                                style={{ marginTop: 0, flexGrow: 0 }}
                                                renderItem={({ item, index }) => (
                                                    <View style={{ flexDirection: 'row', marginHorizontal: 10, paddingVertical: 10, borderStyle: 'dashed', borderBottomColor: '#33333360', borderBottomWidth: 1 }}>
                                                        <Image style={{ width: 80, height: 80, borderRadius: 50, resizeMode: 'contain' }}
                                                            source={{ uri: item?.image }} />
                                                        <View>
                                                            <Text numberOfLines={3}
                                                                style={{
                                                                    fontSize: 13,
                                                                    fontFamily: 'AvenirLTStd-Heavy',
                                                                    color: '#333333',
                                                                    marginLeft: 10,
                                                                    lineHeight: 18,
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
                                                                    {`₹ ${(item?.price - (item?.total_tax / item?.qty)).toFixed(2)}`}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontFamily: 'AvenirLTStd-Heavy',
                                                        color: '#000521',
                                                        marginLeft: 10,
                                                        marginTop: 5,
                                                    }}>
                                                    {_order.totalorder}:
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontFamily: 'AvenirLTStd-Heavy',
                                                        color: '#FFCC80',
                                                        marginLeft: 5,
                                                        marginTop: 5,
                                                    }}>
                                                    ₹{item?.net_amount}
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                )}
                            />
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'AvenirLTStd-Medium' }}>No Order Detail</Text>
                            </View>}
                    </View>
                )

            case 'third':
                return (
                    <View style={{ flex: 1, }}>
                        {prashna && prashna.length > 0 ?
                            <FlatList
                                data={prashna}
                                style={{ marginTop: 10, flexGrow: 0 }}
                                renderItem={({ item, index }) => (

                                    <View style={styles.ex_view}>

                                        <View style={styles.dt_view}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 2, marginTop: 4 }}>
                                                <View style={{ flexDirection: 'row' }}>

                                                    <Text numberOfLines={1} style={{ color: '#1E1F20', fontFamily: 'AvenirLTStd-Heavy', fontSize: 16, marginLeft: 7, marginTop: 0, width: window.width - 210 }}>
                                                        {item?.name}
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: 12, marginTop: 10 }}>
                                                    <Text style={{ color: '#FFCC80', fontFamily: 'AvenirLTStd-Medium', fontSize: 14, textDecorationLine: 'underline', }} onPress={() => navigation.navigate('PrashnaReport', { item, data1: data?.path })}>{_order.view}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.dt_view_1}>
                                                <View style={styles.dt_view_11}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row', marginTop: -5
                                                        }}>
                                                        <Text numberOfLines={1}
                                                            style={styles.dt_name}>{`${moment(item?.updated_at).format('YYYY-MM-DD hh:mm a')}`}</Text>

                                                    </View>


                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                )}
                            />
                            : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'AvenirLTStd-Medium' }}>No Prashna Kundali Report</Text>
                            </View>}
                    </View>
                )
        }
    }

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: _home.myorderTab1 },
        { key: 'second', title: _home.myorderTab2 },
        { key: 'third', title: "Prashna Lagan Report" },
    ]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <CustomHeader
                title={_order.order}

                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}

                thirdRightIcon={index === 0 ? require('../assets/filter.png') : null}
                right3Option={() => {
                    index === 0 ? setModalOpen(true) : null
                }}
            />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props => (
                    <TabBar
                        style={styles.style}
                        labelStyle={styles.labelStyle}
                        scrollEnabled={true}
                        tabStyle={{ height: 50, width: 'auto' }}
                        activeColor={'#FFCC80'}
                        inactiveColor={'#333333'}
                        inactiveOpacity={0.5}
                        {...props}
                        indicatorStyle={styles.indicatorStyle}
                    />
                )}
            />
            {state.loading && <Loader />}
            <Modal
                visible={modalOpen}
                transparent={true}
                onRequestClose={() => setModalOpen(false)}>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setModalOpen(false);
                        }}>
                        <View style={styles.mdtop}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => { setChecked('all'); banner('all'); setModalOpen(false); }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.modalText}>{_order.all}</Text>
                                    <View style={{ marginLeft: 'auto', marginHorizontal: 10 }}>
                                        <RadioButton
                                            value="all"
                                            status={checked === 'all' ? 'checked' : 'unchecked'}
                                            onPress={() => { setChecked('all'), banner('all'), setModalOpen(false); }}
                                            uncheckedColor={'#8D92A3'}
                                            color={'#FFCC80'}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => { setChecked('lastweek'); banner('lastweek'); setModalOpen(false); }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.modalText}>{_order.weekly}</Text>
                                    <View style={{ marginLeft: 'auto', marginHorizontal: 10 }}>
                                        <RadioButton
                                            value="lastweek"
                                            status={checked === 'lastweek' ? 'checked' : 'unchecked'}
                                            onPress={() => { setChecked('lastweek'), banner('lastweek'), setModalOpen(false); }}
                                            uncheckedColor={'#8D92A3'}
                                            color={'#FFCC80'}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => { setChecked('lastmonth'); banner('lastmonth'); setModalOpen(false); }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.modalText}>{_order.monthly}</Text>
                                    <View style={{ marginLeft: 'auto', marginHorizontal: 10 }}>
                                        <RadioButton
                                            value="lastmonth"
                                            status={checked === 'lastmonth' ? 'checked' : 'unchecked'}
                                            onPress={() => { setChecked('lastmonth'), banner('lastmonth'), setModalOpen(false); }}
                                            uncheckedColor={'#8D92A3'}
                                            color={'#FFCC80'}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default MyOrders

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