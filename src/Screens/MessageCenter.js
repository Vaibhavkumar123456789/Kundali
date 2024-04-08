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
    StatusBar
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'

const MessageCenter = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member } = stringsoflanguages

    const data = [
        {

        },
        {

        },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_member.message}
            />
            <FlatList
                data={data}
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

                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginLeft: 10,
                                width: window.width - 195,
                            }}>
                                {_member.id}: #5914
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: '#33333340',
                                fontFamily: 'AvenirLTStd-Medium',
                                marginRight: 10,
                            }}>
                                {_member.dob}: 06/02/1980
                            </Text>
                        </View>

                        <Text style={{
                            fontSize: 14,
                            color: '#333333',
                            marginTop: 3,
                            fontFamily: 'AvenirLTStd-Heavy',
                            marginHorizontal: 10,
                        }}>
                            Deepak Kumar
                        </Text>
                        <View style={{ borderBottomColor: '#36363610', borderBottomWidth: 1, marginTop: 7, }}></View>

                        <Text style={{
                            fontSize: 16,
                            color: '#36363660',
                            marginTop: 7,
                            fontFamily: 'AvenirLTStd-Medium',
                            marginHorizontal: 10,
                        }}>
                            Venus (in Uttara Ashada) - Remove a block from your relationship.
                        </Text>

                        <Pressable onPress={() => { navigation.navigate('MessageCenterDetail') }} style={{
                            marginLeft: 10, paddingHorizontal: 13, backgroundColor: '#FFCC80',
                            borderRadius: 20, paddingVertical: 4, alignSelf: 'flex-start', marginTop: 5
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Medium',
                                textAlign: 'center',
                            }}>
                                {_member.view}
                            </Text>
                        </Pressable>
                    </View>
                )
                }
            />
        </SafeAreaView >
    )
}

export default MessageCenter

const styles = StyleSheet.create({})