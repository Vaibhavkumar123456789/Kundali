import React, { useEffect, useState, useRef, createRef } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    FlatList,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Share,
    Pressable,
    SafeAreaView,
} from 'react-native';
import stringsoflanguages from '../language/Language'
const { height, width } = Dimensions.get('window');
import { useIsFocused } from '@react-navigation/native';
const Search = ({ navigation, route }) => {
    const { _setting, _customlang } = stringsoflanguages

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>

            <View
                style={{
                    backgroundColor: '#FFCC80',
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Pressable
                    style={{ paddingVertical: 6 }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/back.png')}
                        style={{
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                            marginLeft: 18,
                        }}
                    />
                </Pressable>
                <View style={{ height: 40, zIndex: 6 }}>
                    <View
                        style={{
                            width: '87%',
                            height: 45,
                            backgroundColor: '#FFFFFF',
                            alignSelf: 'center',
                            borderRadius: 8,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Image
                            style={{ width: 20, height: 20, alignSelf: 'center', marginLeft: 12 }}
                            source={require('../assets/search.png')}
                        />

                        <TextInput
                            placeholderTextColor="#33333370"
                            style={{
                                width: '70%',
                                height: 45,
                                marginLeft: 10,
                                fontSize: 16,
                                color: '#33333370',
                                fontFamily: 'AvenirLTStd-Medium',
                            }}
                            placeholder={_setting.search}

                        />
                        <Pressable style={{ alignSelf: 'center' }}
                            onPress={() => {
                            }}>
                            <Image
                                style={{ width: 13, height: 13, alignSelf: 'center', marginRight: 12 }}
                                source={require('../assets/close.png')}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>


        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({

});
