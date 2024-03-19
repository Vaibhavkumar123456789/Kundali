import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import stringsoflanguages from '../language/Language'

function CustomHeader(props) {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    return (
        <View
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
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                            marginLeft: 18,
                        }}
                    />
                </TouchableOpacity>
                <Text numberOfLines={1}
                    style={{
                        fontSize: 18,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Heavy',
                        marginTop: 6,
                        marginLeft: 10,
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
        </View>
    );
}
export default CustomHeader;
const styles = StyleSheet.create({

});

