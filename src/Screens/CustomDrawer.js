import { View, Text, StatusBar, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import stringsoflanguages from '../language/Language'
import { TabActions } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { GetProfile } from '../backend/Api'
const CustomDrawer = ({ navigation }) => {
    const { _drawer } = stringsoflanguages
    const isFocused = useIsFocused();
    const [pathurl, setPathurl] = useState('')
    const data = [
        {
            icon: require('../assets/sidebar-home.png'),
            input: _drawer.home
        },
        {
            icon: require('../assets/sidebar-history.png'),
            input: _drawer.order,
        },
        {
            icon: require('../assets/sidebar-kundli.png'),
            input: _drawer.kundli,
        },
        {
            icon: require('../assets/sidebar-wallet.png'),
            input: _drawer.wallet,
        },
        {
            icon: require('../assets/sidebar-invoice.png'),
            input: _drawer.invoice,
        },
        {
            icon: require('../assets/sidebar-manage-footer.png'),
            input: _drawer.manage,
        },
        {
            icon: require('../assets/sidebar-header-preview.png'),
            input: _drawer.header,
        },
        {
            icon: require('../assets/sidebar-massage-center.png'),
            input: _drawer.message,
        },
        {
            icon: require('../assets/sidebar-customer-support.png'),
            input: _drawer.contact,
        },
        {
            icon: require('../assets/sidebar-settings.png'),
            input: _drawer.setting
        },
    ];
    useEffect(() => {
        GetProfile()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                if (data.status) {
                    setPathurl(data)
                } else {
                    alert(data.msg);
                }
            })
            .catch(error => {

                console.log('error', error);
            });
    }, [isFocused])


    const onPressHandler = input => {
        navigation.closeDrawer();
        switch (input) {
            case _drawer.home:
                navigation.closeDrawer();
                break;
            case _drawer.order:
                navigation.navigate('MyOrders');
                break;
            case _drawer.kundli:
                navigation.navigate('KundaliForm');
                break;
            case _drawer.wallet:
                navigation.navigate('Wallet');
                break;
            case _drawer.invoice:
                navigation.navigate('MyInvoice');
                break;
            case _drawer.manage:
                navigation.navigate('ManageHeaderFooter');
                break;

            case _drawer.header:
                navigation.navigate('HeaderFooterPreview');
                break;

            case _drawer.message:

                navigation.navigate('MessageCenter')
                break;

            case _drawer.contact:
                navigation.navigate('ContactSupport');
                break;

            case _drawer.setting:
                navigation.navigate('Settings');
                break;

            default:
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFCC80' }}>

            <ScrollView style={{ height: '100%' }}>
                <View style={{ flexDirection: 'row' }}>
                    {(pathurl &&
                        <Image
                            style={{
                                width: 75,
                                height: 75,
                                resizeMode: 'contain',
                                marginTop: 20,
                                marginLeft: 20,
                                borderRadius: 50,
                            }}
                            source={pathurl?.data?.profile_picture?.length > 0 ? { uri: `${pathurl?.path}/${pathurl?.data?.profile_picture}` } : require('../assets/defaultimage.png')}
                        />
                    )}
                    <View style={{ marginLeft: 15, width: '50%' }}>
                        {(pathurl &&
                            <Text numberOfLines={1}
                                style={{
                                    marginTop: 30,
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    color: '#1E1F20',
                                }}>
                                {pathurl?.data?.name}
                            </Text>
                        )}
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => navigation.navigate('Profile', pathurl)}>
                            <Text
                                style={{
                                    marginTop: 5,
                                    fontSize: 14,
                                    fontFamily: 'AvenirLTStd-Roman',
                                    color: '#1E1F20',
                                }}>
                                {_drawer.view}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => { onPressHandler(item.input) }}>
                            <View style={{
                                marginTop: 30,
                                flexDirection: 'row',
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: 'contain',
                                        marginLeft: 20,
                                    }}
                                    source={item.icon}
                                />
                                <Text numberOfLines={1}
                                    style={{
                                        fontSize: 18,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: '#333333',
                                        marginLeft: 20,
                                        width: '75%',
                                    }}>
                                    {item.input}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            <Text
                style={{
                    fontSize: 15,
                    fontFamily: 'AvenirLTStd-Medium',
                    color: '#1E1F2050',
                    textAlign: 'center',
                    marginBottom: 20,
                }}>
                {_drawer.version} 1.0
            </Text>
        </SafeAreaView >
    )
}

export default CustomDrawer;
const styles = StyleSheet.create({});

