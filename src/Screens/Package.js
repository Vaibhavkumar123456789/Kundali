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

const Package = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');

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
                leftIcon={require('../assets/back.png')}
                title='Package'
            />
            <FlatList
                data={data}
                style={{ flexGrow: 0, marginTop: 10 }}
                renderItem={({ item, index }) => (
                    <View>

                        <Pressable onPress={() => { navigation.navigate('Payment') }}>
                            <View
                                style={{
                                    marginHorizontal: 18,
                                    paddingVertical: 12,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 12,
                                    borderColor: '#D0D0D0',
                                    borderWidth: 2,
                                    elevation: 5,
                                    bottom: 10,
                                    marginTop: 15,
                                }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                    <Text style={{
                                        fontSize: 18,
                                        color: '#333333',
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        marginLeft: 10,
                                    }}>
                                        Free Trial
                                    </Text>
                                    <Text style={{
                                        fontSize: 18,
                                        color: '#333333',
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        marginRight: 10,
                                    }}>
                                        1 Day
                                    </Text>
                                </View>

                                <Text style={{
                                    fontSize: 13,
                                    color: '#36363660',
                                    lineHeight: 17,
                                    marginTop: 5,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    marginHorizontal: 10,
                                }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </Text>
                            </View>
                        </Pressable>

                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Package

const styles = StyleSheet.create({})