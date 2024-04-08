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
import Button from 'react-native-button';

const Settings = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _drawer, _setting } = stringsoflanguages

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_drawer.setting}
            />
            <ScrollView>

                <View
                    style={{
                        width: window.width - 36,
                        paddingVertical: 20,
                        backgroundColor: '#FFFFFF',
                        elevation: 5,
                        borderRadius: 15,
                        alignSelf: 'center',
                        bottom: 5,
                        marginTop: 20,
                    }}>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={styles.tx_icon}
                                    source={require('../assets/about.png')}
                                />
                                <Text
                                    style={styles.tx_input}>
                                    {_setting.about}
                                </Text>
                            </View>
                            <Image
                                style={styles.tx_icon1}
                                source={require('../assets/arrow.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={styles.tx_icon}
                                    source={require('../assets/notification.png')}
                                />
                                <Text
                                    style={styles.tx_input}>
                                    {_setting.notification}
                                </Text>
                            </View>
                            <Image
                                style={styles.tx_icon1}
                                source={require('../assets/arrow.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={styles.tx_icon}
                                    source={require('../assets/privacy.png')}
                                />
                                <Text
                                    style={styles.tx_input}>
                                    {_setting.privacy}
                                </Text>
                            </View>
                            <Image
                                style={styles.tx_icon1}
                                source={require('../assets/arrow.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={styles.tx_icon}
                                    source={require('../assets/terms.png')}
                                />
                                <Text
                                    style={styles.tx_input}>
                                    {_setting.terms}
                                </Text>
                            </View>
                            <Image
                                style={styles.tx_icon1}
                                source={require('../assets/arrow.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignIn' }],
                        })
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={styles.tx_icon}
                                    source={require('../assets/logout.png')}
                                />
                                <Text
                                    style={styles.tx_input}>
                                    {_setting.logout}
                                </Text>
                            </View>
                            <Image
                                style={styles.tx_icon1}
                                source={require('../assets/arrow.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView >
    )
}

export default Settings

const styles = StyleSheet.create({
    tx_icon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        resizeMode: 'contain',
    },
    tx_input: {
        fontSize: 16,
        fontFamily: 'AvenirLTStd-Medium',
        color: '#333333',
        marginTop: 4,
        marginLeft: 10,
    },
    tx_icon1: {
        width: 15,
        height: 15,
        marginRight: 15,
        resizeMode: 'contain',
        // marginTop: 10,
        alignSelf: 'center',
    }
})