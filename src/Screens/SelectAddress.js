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
import Button from 'react-native-button';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';

const SelectAddress = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _setting, _customlang } = stringsoflanguages
    const [should1, setShould1] = useState('')
    const [checked, setChecked] = React.useState(false);
    const gender = [{}, {}]


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/back.png')}
                title={_setting.selectaddress}
            />
            <ScrollView>
                <FlatList
                    data={gender}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={() => {
                            setChecked(index)
                        }}>

                            <View style={{
                                paddingVertical: 10,
                                elevation: 5,
                                bottom: 5,
                                borderRadius: 6,
                                marginTop: 20,
                                backgroundColor: 'white',
                                marginHorizontal: 18,
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: '#333333',
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        marginTop: 7,
                                        width: window.width - 110,
                                    }}>
                                        Jagjeet Singh
                                    </Text>
                                    <RadioButton
                                        value={checked}
                                        status={checked === index ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked(index)
                                        }}
                                        uncheckedColor='#69707F'
                                        color='#FFCC80'
                                    />

                                </View>
                                <Text
                                    style={{
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: '#33333370',
                                        fontSize: 14,
                                        lineHeight: 18,
                                        marginTop: 5,
                                        marginHorizontal: 10,
                                    }}>
                                    195, South Avenue Apartment, Sector-04 Dwarka, New Delhi-110075
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        color: '#333333',
                                        fontSize: 14,
                                        marginTop: 5,
                                        marginHorizontal: 10,
                                    }}>
                                    {_kundali.mobile} 9717274597
                                </Text>

                                <Pressable>
                                    <Text
                                        style={{
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            color: '#FFCC80',
                                            fontSize: 13,
                                            marginTop: 8,
                                            marginHorizontal: 10,
                                        }}>
                                        {_setting.change}
                                    </Text>
                                </Pressable>
                            </View>

                        </Pressable>
                    )}
                />

                <Pressable onPress={() => { navigation.navigate('AddAddress') }} style={{
                    backgroundColor: '#FFCC8030',
                    borderRadius: 12,
                    paddingHorizontal: 30,
                    paddingVertical: 12,
                    marginTop: 30,
                    borderWidth: 1,
                    borderColor: '#FFCC80',
                    borderStyle: 'dashed',
                    alignSelf: 'center',
                }}>
                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Heavy',
                            color: '#333333',
                            fontSize: 14,
                        }}>
                        + {_setting.addnewaddress}
                    </Text>
                </Pressable>
            </ScrollView>

            <Button
                containerStyle={{
                    width: '90%',
                    marginBottom: 20,
                    height: 52,
                    borderRadius: 12,
                    overflow: 'hidden',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFCC80',
                }}
                style={{
                    fontSize: 18,
                    color: '#333333',
                    alignSelf: 'center',
                    fontFamily: 'AvenirLTStd-Medium',
                }}
                onPress={() => {
                    navigation.replace('Payment')
                }}>
                {_customlang.submit}
            </Button>


        </SafeAreaView >
    )
}

export default SelectAddress

const styles = StyleSheet.create({})


