import { View, Text, Image, StyleSheet, Dimensions, FlatList, Modal, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


const Kundli = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [select, setSelect] = useState(0)

    const detail = [
        {

        },
        {

        }
    ]
    const detail1 = [
        {

        },
        {

        }
    ]
    const session = [
        {

        },
        {

        }
    ]

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <View style={{ flex: 1, }}>
                        <ScrollView
                            nestedScrollEnabled={true}
                            style={{ height: '100%', }}>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Full Name
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    Mohit
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Date
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    25/12/2011
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Year
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    2011
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Month
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    05
                                </Text>
                            </View>
                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Day
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    2011
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Hour
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    05
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Minute
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    2011
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Gender
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    MAle
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Place
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    2011
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Latitude
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Longitude
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Timezone
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Sunrise
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Sunset
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Tithi
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Paksha
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Sunsign
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>
                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Moonsign
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Rishi_akshar
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Chandramasa
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Tatva
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Prahar
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Nakshatra
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Vaar
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Varna
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Vashya
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Yoni
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Gana
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Nadi
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Yoga
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    karana
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>
                            <View style={styles.viewstyle2}>
                                <Text
                                    style={styles.textstyle1}>
                                    Ayanamsha
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                            <View style={styles.viewstyle1}>
                                <Text
                                    style={styles.textstyle1}>
                                    Yunja
                                </Text>
                                <Text
                                    style={styles.textstyle2}>
                                    0
                                </Text>
                            </View>

                        </ScrollView>
                    </View>
                )
            case 'second':
                return (
                    <View style={{ flex: 1, }}>
                        <FlatList
                            data={detail}
                            style={{ marginTop: 10, flexGrow: 0 }}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    width: window.width - 36,
                                    alignSelf: 'center',
                                    paddingVertical: 10,
                                    backgroundColor: 'white',
                                    elevation: 5,
                                    bottom: 8,
                                    marginTop: 10,
                                    borderRadius: 12,
                                }}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F7F7F7',
                                        marginTop: -10, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderRadius: 0, paddingVertical: 5
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                color: '#333333',
                                                marginLeft: 10,
                                                marginTop: 5,
                                            }}>
                                            Sun
                                        </Text>
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                resizeMode: 'contain',
                                                alignSelf: 'center',
                                                marginRight: 10,
                                            }}
                                            source={require('../assets/sun1.png')}
                                        />
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Name_lan
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Mohit
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Full_degree
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Speed
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Is_retro
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Is_combusted
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Longitude
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sign
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sign_no
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Rashi_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_pada
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_no
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sub_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Awastha
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            karakamsha
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            House
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Lord_of
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>

                                </View>

                            )}
                        />
                    </View>
                )
            case 'third':
                return (
                    <View style={{ flex: 1, }}>
                        <FlatList
                            data={detail1}
                            style={{ marginTop: 10, flexGrow: 0 }}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    width: window.width - 36,
                                    alignSelf: 'center',
                                    paddingVertical: 10,
                                    backgroundColor: 'white',
                                    elevation: 5,
                                    bottom: 8,
                                    marginTop: 10,
                                    borderRadius: 12,
                                }}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F7F7F7',
                                        marginTop: -10, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderRadius: 0, paddingVertical: 5
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                color: '#333333',
                                                marginLeft: 10,
                                                paddingVertical: 5,
                                            }}>
                                            Lucky Stone
                                        </Text>

                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Primary
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Diamond, Blue Sapphire
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Secondary
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            White Sapphire, Phenakite
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Day_to_wear
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Friday
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Finger_to_wear
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Ring Finger
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Time_to_wear
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Sunrise
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Mantra
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>

                                </View>

                            )}
                        />
                    </View>
                )

            case 'fourth':
                return (
                    <View style={{ flex: 1, }}>
                        <FlatList
                            data={detail1}
                            style={{ marginTop: 10, flexGrow: 0 }}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    width: window.width,
                                    alignSelf: 'center',
                                    paddingVertical: 10,
                                    backgroundColor: 'white',
                                    marginTop: 10,
                                }}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FEBD57B2',
                                        marginTop: -10, paddingVertical: 5
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                color: '#333333',
                                                marginHorizontal: 18,
                                                paddingVertical: 5,
                                            }}>
                                            Permanent Friendship
                                        </Text>

                                    </View>
                                    <View style={{
                                        width: window.width,
                                        paddingVertical: 13,
                                        backgroundColor: '#FFFFFF',
                                        // marginTop: 15,
                                    }}>
                                        <View style={{ flex: 1, backgroundColor: 'white', marginTop: -13, height: 50, flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ marginLeft: 63, }}>
                                                <Text style={styles.snotext}>SU</Text>
                                            </View>
                                            <Text style={styles.snotext}>MO</Text>
                                            <Text style={styles.snotext}>MA</Text>
                                            <Text style={styles.snotext}>ME</Text>
                                            <Text style={styles.snotext}>JU</Text>
                                            <Text style={styles.snotext}>VE</Text>
                                            <Text style={styles.snotext}>SA</Text>
                                        </View>

                                        {session.map((item, index) => {
                                            return (
                                                <View>
                                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: index % 2 === 0 ? '#FFF2D8' : 'white' }}>
                                                        <Text style={styles.multitext}>
                                                            SU
                                                        </Text>
                                                        <Text style={styles.multitext}>
                                                            S
                                                        </Text>
                                                        <Text style={styles.multitext}>
                                                            D
                                                        </Text>

                                                        <Text style={styles.multitext}>
                                                            D
                                                        </Text>
                                                        <Text style={styles.multitext}>
                                                            G
                                                        </Text>
                                                        <Text style={styles.multitext}>
                                                            R
                                                        </Text>
                                                        <Text style={styles.multitext}>
                                                            R
                                                        </Text>
                                                        <Text style={styles.multitext}>
                                                            R
                                                        </Text>


                                                    </View>

                                                </View>
                                            )
                                        })}

                                    </View>

                                </View>

                            )}
                        />
                    </View>
                )

            case 'fifth':
                return (
                    <View style={{ flex: 1, }}>
                        <FlatList
                            data={detail}
                            style={{ flexGrow: 0, marginTop: 10 }}
                            renderItem={({ item, index }) => (

                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 10,
                                        backgroundColor: 'white',
                                        borderRadius: 12,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 16,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginHorizontal: 10,
                                        }}>
                                            Manglik Alert !
                                        </Text>
                                    </View>

                                    <Text style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        lineHeight: 26,
                                        textAlign: 'justify',
                                        marginTop: 7,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        Manglik dosha has been detected in your horosocpe and the extent of mangal dosha present is effective and therefore needs due carefulness. You are manglik.
                                    </Text>
                                </View>
                            )
                            }
                        />
                    </View>
                )
            case 'sixth':
                return (
                    <View style={{ flex: 1, }}>
                        <FlatList
                            data={detail}
                            style={{ flexGrow: 0, marginTop: 10 }}
                            renderItem={({ item, index }) => (

                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 10,
                                        backgroundColor: 'white',
                                        borderRadius: 12,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 16,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginHorizontal: 10,
                                        }}>
                                            Your Kaal Sarpa Report
                                        </Text>
                                    </View>

                                    <Text style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        lineHeight: 26,
                                        textAlign: 'justify',
                                        marginTop: 7,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        Kalsarpa dosha is not detected in your horoscope.
                                    </Text>
                                </View>
                            )
                            }
                        />
                    </View>
                )
            case 'seventh':
                return (
                    <View style={{ flex: 1, }}>
                        <FlatList
                            data={detail}
                            style={{ flexGrow: 0, marginTop: 10 }}
                            renderItem={({ item, index }) => (

                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 10,
                                        backgroundColor: 'white',
                                        borderRadius: 12,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 16,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginHorizontal: 10,
                                        }}>
                                            Your Shadbala Report
                                        </Text>
                                    </View>

                                    <Text style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        lineHeight: 26,
                                        textAlign: 'justify',
                                        marginTop: 7,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        Shadbala is not detected in your horoscope.
                                    </Text>
                                </View>
                            )
                            }
                        />
                    </View>
                )

            case 'eight':
                return (
                    <View style={{ flex: 1, }}>


                    </View>
                )

            case 'nine':
                return (
                    <View style={{ flex: 1, }}>
                        <DashaAnalysis />
                        {/* <FlatList
                            horizontal
                            data={[{ title: 'Maha Dasha' }, { title: 'Antar Dasha' }, { title: 'Pratyantar Dasha' },]}
                            style={{ flexGrow: 0, marginTop: 10 }}
                            renderItem={({ item, index }) => (

                                <Pressable onPress={() => { setSelect(index) }}
                                    style={{
                                        marginLeft: 18,
                                        paddingVertical: 8,
                                        backgroundColor: 'white',
                                        borderColor: select === index ? "#FEBD57" : 'white',
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 14,
                                            paddingHorizontal: 10,
                                            color: select === index ? '#FEBD57' : '#000000',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                        }}>
                                            {item.title}
                                        </Text>
                                    </View>


                                </Pressable>
                            )
                            }
                        />
                        <FlatList
                            data={detail}
                            style={{ flexGrow: 0, marginTop: 10 }}
                            renderItem={({ item, index }) => (

                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 10,
                                        backgroundColor: 'white',
                                        borderRadius: 12,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 16,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginHorizontal: 10,
                                        }}>
                                            Career
                                        </Text>
                                    </View>

                                    <Text style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        lineHeight: 26,
                                        textAlign: 'justify',
                                        marginTop: 7,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        The Rahu Maha Dasha could bring significant changes in your career. You might feel attracted towards unconventional, foreign, and complex occupations that involve research, exploration, and even breaking rules.
                                    </Text>
                                </View>
                            )
                            }
                        /> */}
                    </View>
                )
            case 'tenth':
                return (
                    <View style={{ flex: 1, }}>

                        <SubPlanet />
                        {/* <FlatList
                            data={detail1}
                            style={{ marginTop: 10, flexGrow: 0 }}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    width: window.width - 36,
                                    alignSelf: 'center',
                                    paddingVertical: 10,
                                    backgroundColor: 'white',
                                    elevation: 5,
                                    bottom: 8,
                                    marginTop: 10,
                                    borderRadius: 12,
                                }}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F7F7F7',
                                        marginTop: -10, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderRadius: 0, paddingVertical: 5
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                color: '#333333',
                                                marginLeft: 10,
                                                paddingVertical: 5,
                                            }}>
                                            Dhuma
                                        </Text>

                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Name_lan
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Full_degree
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Longitude
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sign
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sign_no
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            2
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sign_name
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            House
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_pada
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_no
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Rashi_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sub_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sub_sub_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>


                                </View>

                            )}
                        /> */}
                    </View>
                )
            case 'eleventh':
                return (
                    <View style={{ flex: 1, }}>
                        <KPPlanetary />
                        {/* <FlatList
                            data={detail1}
                            style={{ marginTop: 10, flexGrow: 0 }}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    width: window.width - 36,
                                    alignSelf: 'center',
                                    paddingVertical: 10,
                                    backgroundColor: 'white',
                                    elevation: 5,
                                    bottom: 8,
                                    marginTop: 10,
                                    borderRadius: 12,
                                }}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F7F7F7',
                                        marginTop: -10, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderRadius: 0, paddingVertical: 5
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                color: '#333333',
                                                marginLeft: 10,
                                                paddingVertical: 5,
                                            }}>
                                            Sun
                                        </Text>

                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Full_degree
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Speed
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Is_retro
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Is_combusted
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            0
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Longitude
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            2
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sign
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sign_no
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Rashi_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_pada
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_no
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Nakshatra_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sub_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>
                                    <View style={styles.viewstyle3}>
                                        <Text
                                            style={styles.textstyle3}>
                                            Sub_sub_lord
                                        </Text>
                                        <Text
                                            style={styles.textstyle4}>
                                            Om
                                        </Text>
                                    </View>


                                </View>

                            )}
                        /> */}
                    </View>
                )

            case 'twelve':
                return (
                    <View style={{ flex: 1, }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F7F7F7',
                            marginTop: 15, borderRadius: 10, paddingVertical: 5, marginHorizontal: 18,
                        }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    color: '#333333',
                                    marginLeft: 10,
                                    marginTop: 5,
                                }}>
                                Scorpio
                            </Text>
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                    marginRight: 10,
                                }}
                                source={require('../assets/sun1.png')}
                            />
                        </View>
                        <FlatList
                            data={detail}
                            style={{ flexGrow: 0, marginTop: 10 }}
                            renderItem={({ item, index }) => (

                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 10,
                                        backgroundColor: 'white',
                                        borderRadius: 12,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 16,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginHorizontal: 10,
                                        }}>
                                            Personality
                                        </Text>
                                    </View>

                                    <Text style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        lineHeight: 26,
                                        textAlign: 'justify',
                                        marginTop: 7,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        As a Scorpio ascendant, you embody intensity and mystery, often leaving others intrigued. You have a strong desire for deep, transformative experiences and this urge may drive you towards self-discovery and growth.
                                    </Text>
                                </View>
                            )
                            }
                        />


                    </View>
                )

            case 'thirteen':
                return (
                    <View style={{ flex: 1, }}>

                        <View style={{
                            width: window.width - 36,
                            alignSelf: 'center',
                            paddingVertical: 10,
                            backgroundColor: 'white',
                            elevation: 5,
                            bottom: 8,
                            marginTop: 20,
                            borderRadius: 12,
                        }}>

                            <View style={styles.viewstyle3}>
                                <Text
                                    style={styles.textstyle3}>
                                    Planet
                                </Text>
                                <Text
                                    style={styles.textstyle4}>
                                    0
                                </Text>
                            </View>
                            <View style={styles.viewstyle3}>
                                <Text
                                    style={styles.textstyle3}>
                                    Sign
                                </Text>
                                <Text
                                    style={styles.textstyle4}>
                                    0
                                </Text>
                            </View>
                            <View style={styles.viewstyle3}>
                                <Text
                                    style={styles.textstyle3}>
                                    Sign_no
                                </Text>
                                <Text
                                    style={styles.textstyle4}>
                                    0
                                </Text>
                            </View>
                            <View style={styles.viewstyle3}>
                                <Text
                                    style={styles.textstyle3}>
                                    House
                                </Text>
                                <Text
                                    style={styles.textstyle4}>
                                    0
                                </Text>
                            </View>
                            <View style={styles.viewstyle3}>
                                <Text
                                    style={styles.textstyle3}>
                                    Longitude
                                </Text>
                                <Text
                                    style={styles.textstyle4}>
                                    2
                                </Text>
                            </View>
                            <View style={styles.viewstyle3}>
                                <Text
                                    style={styles.textstyle3}>
                                    Lord
                                </Text>
                                <Text
                                    style={styles.textstyle4}>
                                    Om
                                </Text>
                            </View>

                        </View>
                        <FlatList
                            data={detail}
                            style={{ flexGrow: 0, marginTop: 10 }}
                            renderItem={({ item, index }) => (

                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 10,
                                        backgroundColor: 'white',
                                        borderRadius: 12,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 16,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginHorizontal: 10,
                                        }}>
                                            Planet In House
                                        </Text>
                                    </View>

                                    <Text style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        lineHeight: 26,
                                        textAlign: 'justify',
                                        marginTop: 7,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        When the Moon is in the seventh house of a person's birth chart, it significantly influences their partnerships, relationships, and emotional connections.
                                    </Text>
                                </View>
                            )
                            }
                        />


                    </View>
                )

            case 'fourteen':
                return (
                    <View style={{ flex: 1, }}>

                        <YoginiDasha />

                    </View>
                )
            case 'fifteen':
                return (
                    <View style={{ flex: 1, }}>

                        <VimshottariDasha />

                    </View>
                )

        }
    }

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: "Basic" },
        { key: 'second', title: 'Planetry' },
        { key: 'third', title: 'Gemstone' },
        { key: 'fourth', title: 'Friendship' },
        { key: 'fifth', title: 'Manglik Dosha' },
        { key: 'sixth', title: 'Kaal Sarpa Dosha' },
        { key: 'seventh', title: 'Shadbala' },  //send
        { key: 'eight', title: 'Sadhe Sati' },
        { key: 'nine', title: 'Dasha Analysis' },
        { key: 'tenth', title: 'Sub Planet' },
        { key: 'eleventh', title: 'KP Planetary' },
        { key: 'twelve', title: 'Ascendant Report' },
        { key: 'thirteen', title: 'Planet Analysis' },
        { key: 'fourteen', title: 'Yogini Dasha' },
        { key: 'fifteen', title: 'Vimshottari Dasha' },
    ]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FEBD57" />

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
                        activeColor={'#FEBD57'}
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

export default Kundli

const styles = StyleSheet.create({
    style: {
        backgroundColor: '#FFF2D8',
    },
    labelStyle: {
        fontSize: 16,
        fontFamily: 'AvenirLTStd-Heavy',
        color: '#333333',
        textTransform: 'capitalize',
        marginHorizontal: 15,
    },
    indicatorStyle: {
        backgroundColor: '#FEBD57',
        height: 2,
    },
    viewstyle1: { backgroundColor: 'white', paddingVertical: 13, flexDirection: 'row', justifyContent: 'space-between' },
    textstyle1: {
        fontSize: 14,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Medium',
        marginLeft: 18,
    },
    textstyle2: {
        fontSize: 14,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Heavy',
        marginRight: 18,
        textAlign: 'right',
        width: Dimensions.get('window').width - 220,
    },
    viewstyle2: { backgroundColor: '#FFF2D8', paddingVertical: 13, flexDirection: 'row', justifyContent: 'space-between' },
    textstyle3: {
        fontSize: 14,
        color: '#191D2166',
        fontFamily: 'AvenirLTStd-Medium',
        marginLeft: 10,
    },
    textstyle4: {
        fontSize: 14,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Heavy',
        marginRight: 10,
        textAlign: 'right',
        width: Dimensions.get('window').width - 200,
    },
    viewstyle3: { backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' },
    snotext: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Medium',
        marginTop: 15,
    },
    multitext: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Roman',
    },
})