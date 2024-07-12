import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import stringsoflanguages from '../language/Language'

function CustomHeader(props) {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    return (
        <SafeAreaView
            style={{
                backgroundColor: '#FFCC80',
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ paddingVertical: 6 }}
                    onPress={() => props.menuOption()}>
                    <Image
                        source={props.leftIcon}
                        style={{
                            height: 22,
                            width: 12,
                            resizeMode: 'contain',
                            marginLeft: 18,
                            marginTop:1,
                        }}
                    />
                </TouchableOpacity>
                <Text numberOfLines={1}
                    style={{
                        fontSize: 17,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Heavy',
                        marginTop: 8,
                        marginLeft: 15,
                        width: window.width - 140,
                    }}>
                    {props.title}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                    style={{ paddingVertical: 6 }}
                    onPress={() => props.rightOption()}>
                    <Image
                        source={props.secondRightIcon}
                        style={{
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ paddingVertical: 6 }}
                    onPress={() => props.right3Option()}>
                    <Image
                        source={props.thirdRightIcon}
                        style={{
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                            marginHorizontal: 18,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default CustomHeader;
const styles = StyleSheet.create({

});

