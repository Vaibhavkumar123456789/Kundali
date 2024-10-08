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
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { _RemoveAuthToken } from '../backend/ApiSauce';
import { AsyncStorageClear, AsyncStorageSettoken } from '../backend/Api';

const Settings = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _drawer, _setting } = stringsoflanguages

    const onLogoutHandler = () => {
        actions.Logout({});
        navigation.reset({
            index: 0,
            routes: [{ name: 'SelectType' }],
        });
        // setTimeout(() => {
        //     _RemoveAuthToken();
        //     AsyncStorageSettoken('');
        //     AsyncStorageClear()
        // }, 2000)
    }

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
                    <TouchableOpacity activeOpacity={0.8}>
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
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => navigation.navigate('Notification')}>
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
                    <TouchableOpacity activeOpacity={0.8}>
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
                    <TouchableOpacity activeOpacity={0.8}>
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
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {

                        Alert.alert(
                            'Logout',
                            `Do you want to logout.`,
                            [
                                {
                                    text: 'No',
                                    style: 'cancel',
                                },
                                { text: 'Yes', onPress: onLogoutHandler },
                            ],
                            { cancelable: false },
                        );

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


