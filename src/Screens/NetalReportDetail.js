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
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'

const NetalReportDetail = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _setting, _customlang, _order } = stringsoflanguages


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_setting.reportdetail}
            />
            <ScrollView>

                <View style={styles.ex_view}>
                    <View style={styles.ex_proView}>
                        <Image style={{ width: 80, height: 80, resizeMode: 'contain' }}
                            source={require('../assets/defaultimage.png')} />

                    </View>
                    <View style={styles.dt_view}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 2, marginTop: 4 }}>
                            <View style={{ flexDirection: 'row' }}>

                                <Text numberOfLines={1} style={{ color: '#1E1F20', fontFamily: 'AvenirLTStd-Heavy', fontSize: 16, marginLeft: 7, marginTop: 0, width: window.width - 210 }}>
                                    {route.params?.maindetail?.name}
                                </Text>
                            </View>

                        </View>
                        <View style={styles.dt_view_1}>
                            <View style={styles.dt_view_11}>
                                <View
                                    style={{
                                        flexDirection: 'row', marginTop: 2,
                                    }}>
                                    <Text numberOfLines={1}
                                        style={styles.dt_name}>{route.params?.maindetail?.gender}</Text>

                                </View>

                                <View style={styles.dt_viewOpt}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontFamily: 'AvenirLTStd-Medium',
                                            color: '#A6A7A9',
                                            marginTop: 2,
                                            marginLeft: 9,
                                        }}>
                                        {_member.tob} :{route.params?.maindetail?.tob}
                                    </Text>

                                </View>
                            </View>
                        </View>
                        <View style={styles.dt_view_2}>
                            <View style={styles.dt_viewOpt}>
                                <Text numberOfLines={1} style={styles.dt_viewOptText}>
                                    {_member.pob} :{route.params?.maindetail?.pob}
                                </Text>
                            </View>
                            <View style={styles.dt_viewOpt}>
                                <Text numberOfLines={1} style={styles.dt_viewOptText}>
                                    {_member.whatsapp}:{route.params?.maindetail?.mobile}
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>


                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Heavy',
                        color: '#333333',
                        fontSize: 20,
                        marginTop: 25,
                        marginHorizontal: 10,
                        textAlign: 'center',
                    }}>
                    {route.params?.astrodetail?.report_name}
                </Text>

                <Pressable onPress={() => { navigation.navigate('KundliGenerate', { item: `${route.params?.maindetail?.report}`, title: route.params?.maindetail?.email, number: "1" }) }}>
                    <Image style={{ width: 240, height: 160, resizeMode: 'contain', alignSelf: 'center', marginTop: 20 }}
                        source={require('../assets/reportimage.png')} />
                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Heavy',
                            color: '#333333',
                            fontSize: 18,
                            marginTop: 15,
                            marginHorizontal: 10,
                            textAlign: 'center',
                        }}>
                        {_order.viewreport}
                    </Text>
                </Pressable>



            </ScrollView>



        </SafeAreaView >
    )
}

export default NetalReportDetail

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
        marginTop: 15,
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
})