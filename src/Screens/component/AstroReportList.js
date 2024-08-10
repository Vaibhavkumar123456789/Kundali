import { View, Text, Image, StyleSheet, Dimensions, FlatList, Modal, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Platform, } from 'react-native'
import React, { useState, useEffect } from 'react';
import stringsoflanguages from '../../language/Language'
import * as actions from '../../redux/actions';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Button from 'react-native-button';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
const systemFonts = [
    ...defaultSystemFonts,
    'AvenirLTStd-Medium',
    'AvenirLTStd-Heavy',
];

function AstroReportList({ data, astro }) {
    // alert(JSON.stringify(data, null, 2))
    const [report, setReport] = useState(data)
    const navigation = useNavigation();
    const window = Dimensions.get('window');
    const { width: contentWidth } = useWindowDimensions();
    const { width, height } = Dimensions.get('window');
    const { _astrologerForm, _home } = stringsoflanguages

    useEffect(() => {
        if (data && data.length > 0) {
            calculateTaxDetails(data);
        }
    }, [data]);


    const calculateTaxDetails = (listed) => {
        // alert(JSON.stringify(item, null, 2))
        // return
        const updatedReport = listed?.map((item) => {
            let amount = item["price"];
            let discount = item["discount_price"];
            let taxable_amount = discount > 0 ? discount : amount;

            let cutprice = discount == 0 ? discount : amount;       // astrologer cut price

            let tax_amount = 0;
            let total_amount = 0;
            let tax_percentage = 0;

            if (item["tax"] == null) {
                tax_percentage = 0;
                total_amount = taxable_amount;
            } else {
                tax_percentage = item["tax"]["tax_percentage"];
                tax_amount = taxable_amount * tax_percentage / 100;
                total_amount = taxable_amount + tax_amount;
            }
            return {
                ...item,
                cutprice,
                total_amount
            };

        })
        setReport(updatedReport);
    }


    const limitHtmlContent = (htmlContent, maxLength) => {
        const textContent = htmlContent.replace(/<[^>]+>/g, ''); // Remove HTML tags
        if (textContent.length > maxLength) {
            return textContent.substring(0, maxLength) + '...';
        }
        return textContent;
    };

    return (
        <SafeAreaView >
            {report && report.length > 0 ?
                <View style={{ marginHorizontal: 10 }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={report?.slice(0, 5)}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    width: window.width - 60,
                                    paddingVertical: 11,
                                    alignSelf: 'center',
                                    backgroundColor: item.back_color,
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
                                    {item?.report_name}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                                    <View style={{ width: window.width - 200, marginLeft: 10 }}>

                                        <RenderHtml
                                            contentWidth={contentWidth}
                                            containerStyle={{
                                                marginTop: 20,
                                                marginBottom: 10,
                                            }}
                                            source={{ html: limitHtmlContent(item?.inclusion, 150) }}
                                            systemFonts={systemFonts}
                                            tagsStyles={{
                                                p: {
                                                    fontSize: 13,
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    lineHeight: 20,

                                                    color: '#33333380',
                                                },
                                                a: {
                                                    fontSize: 13,
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    lineHeight: 20,

                                                    color: '#33333380',
                                                },
                                            }}
                                        />

                                        <Text style={{
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            fontSize: 15,
                                            // marginLeft: 10,
                                            marginTop: 5,
                                            width: window.width - 200,
                                        }}>
                                            {_home.price} ₹{item?.total_amount}&nbsp;
                                            <>
                                                {item.cutprice > 0 && item.cutprice !== item.total_amount ? (
                                                    <Text
                                                        style={{
                                                            color: '#333333',
                                                            fontFamily: 'AvenirLTStd-Medium',
                                                            fontSize: 11,
                                                            textDecorationLine: 'line-through',
                                                        }}>
                                                        ₹{item?.cutprice}&nbsp;
                                                    </Text>
                                                ) : null}
                                            </>

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
                                        source={{ uri: `${astro}/${item?.image}` }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Pressable onPress={() => { navigation.navigate('ViewSample', { item: `${astro}/${item?.sample}`, title: "View Sample" }) }} style={{
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
                                    <Pressable onPress={() => { navigation.navigate('PremiumKundliDetailReport', { item, astro }) }}>
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                resizeMode: 'contain',
                                                alignSelf: 'center',
                                            }}
                                            source={require('../../assets/circle-arrow.png')}
                                        />
                                    </Pressable>
                                </View>

                            </View>
                        )}
                    />
                </View>

                : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingVertical: 20 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'AvenirLTStd-Medium' }}>No Astro Report</Text>
                </View>}
        </SafeAreaView>
    );
}
export default AstroReportList;
