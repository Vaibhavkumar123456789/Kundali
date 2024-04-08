import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Header from '../Custom/Header';

const NaamJaneReport = ({ navigation }) => {
    const { _member, _kundali } = stringsoflanguages
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');

    const detail = [
        {

        },
        {

        },

    ];

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <View style={{ flex: 1, }}>

                        <View style={{
                            marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                            borderRadius: 8
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    marginLeft: 10,
                                    marginTop: 0,
                                }}>
                                Birth Nakshatra
                            </Text>

                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    marginRight: 10,
                                    marginTop: 0,
                                }}>
                                Uttara-shadha
                            </Text>
                        </View>

                        <View style={{
                            marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                            backgroundColor: '#FFCC8080'
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    marginLeft: 10,
                                    marginTop: 0,
                                }}>
                                Gandmool
                            </Text>

                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    marginRight: 10,
                                    marginTop: 0,
                                }}>
                                Second
                            </Text>
                        </View>

                        <View style={{
                            marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    marginLeft: 10,
                                    marginTop: 0,
                                }}>
                                Charan
                            </Text>

                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    marginRight: 10,
                                    marginTop: 0,
                                }}>
                                No
                            </Text>
                        </View>

                        <View style={{
                            marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                            backgroundColor: '#FFCC8080'
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    marginLeft: 10,
                                    marginTop: 0,
                                }}>
                                Birth Letters
                            </Text>

                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    marginRight: 10,
                                    marginTop: 0,
                                }}>
                                bho, bhou
                            </Text>
                        </View>

                        <View style={{
                            marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    marginLeft: 10,
                                    marginTop: 0,
                                }}>
                                Birth Rashi
                            </Text>

                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    marginRight: 10,
                                    marginTop: 0,
                                }}>
                                Capricorn
                            </Text>
                        </View>

                        <View style={{
                            marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15,
                            backgroundColor: '#FFCC8080'
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    marginLeft: 10,
                                    marginTop: 0,
                                }}>
                                Raashi's other letters
                            </Text>

                            <Text
                                style={{
                                    color: '#1E1F20',
                                    fontSize: 16,
                                    width: window.width - 230,
                                    textAlign: 'right',
                                    fontFamily: 'AvenirLTStd-Medium',
                                    marginRight: 10,
                                    lineHeight: 20,
                                    marginTop: 0,
                                }}>
                                bho, bhou, ja, jaa,
                                ji, jii, ju, juu, jo, jou, je, jae, khi, khii, khu, khuu, kho, khou, khe, khae, ga, gaa, gi, gii
                            </Text>
                        </View>

                        <Text style={{
                            color: '#1E1F20',
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Heavy',
                            marginHorizontal: 10,
                            marginTop: 10,
                            lineHeight: 22,
                            textAlign: 'justify'
                        }}>
                            You are born in the Second charan of Uttara-shadha nakshatra. So as per astrological calculation your birthname's first letter is "bhou" and other recommended letters are "bho".
                            You are not born in Gandmool Nakshatra.
                        </Text>

                    </View>
                )
            case 'second':
                return (
                    <View style={{ flex: 1, }}>
                        <Text style={{
                            color: '#1E1F20',
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Heavy',
                            marginHorizontal: 10,
                            marginTop: 10,
                            lineHeight: 22,
                            textAlign: 'justify'
                        }}>
                            <Text style={{
                                color: 'red',
                                fontSize: 16,
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginHorizontal: 10,
                                marginTop: 10,
                                lineHeight: 22,
                                textAlign: 'justify'
                            }}>Physical features:</Text> Since you were born in Uttarashada Nakshatra you would have a balanced body. Your eyes would be bright and nose would be long or sharp. Your body would be tall and your face would be broad. You would be attractive and have a mesmerizing personality. Your color would be fair. Your hairs would be long, thick and smooth. Your forehead would be broad and you would have a well built body.
                        </Text>
                        <Text style={{
                            color: '#1E1F20',
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Heavy',
                            marginHorizontal: 10,
                            marginTop: 10,
                            lineHeight: 22,
                            textAlign: 'justify'
                        }}>
                            <Text style={{
                                color: 'red',
                                fontSize: 16,
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginHorizontal: 10,
                                marginTop: 10,
                                lineHeight: 22,
                                textAlign: 'justify'
                            }}>General and characteristic specialties:</Text>  Since you were born in Uttarashada Nakshatra hence you would be a devotee of God, a man of independent thoughts and a generous person. You would be smart, clear hearted and with natural appearance. Despite achieving success and high post in life and society, you would not have an iota of haughtiness or pride in you. Humility and simplicity would be your crowning glories. You would be respectful towards all. You would be a man of serious character and an introvert.
                        </Text>
                    </View>
                )

        }
    }

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: "Birth Specifications" },
        { key: 'second', title: "Nakshatra Result" },
    ]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title='Naam Jane'
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
                        tabStyle={{ height: 50, width: 'auto', }}
                        activeColor={'#FFCC80'}
                        inactiveColor={'#333333'}
                        inactiveOpacity={0.5}
                        {...props}
                        indicatorStyle={styles.indicatorStyle}
                    />
                )}
            />

        </SafeAreaView>
    )
}

export default NaamJaneReport

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

})