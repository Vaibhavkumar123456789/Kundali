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
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment';
import Loader from '../utils/Loader';
import { mesagecenterapi } from '../backend/Api';

const MessageCenter = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member } = stringsoflanguages
    const focus = useIsFocused()
    const [messagetext, setMessageText] = useState([])
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        messapi()
    }, [focus])

    const messapi = () => {
        toggleLoading(true);
        mesagecenterapi()
            .then(data => {
                toggleLoading(false);
                // alert(JSON.stringify(data, null, 2))
                if (data.status) {
                    setMessageText(data.data?.data)
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_member.message}
            />
            {state.loading && <Loader />}

            {messagetext && messagetext?.length > "0" ?
                <FlatList
                    data={messagetext}
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

                                <Text numberOfLines={1} style={{
                                    fontSize: 14,
                                    color: '#333333',
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    marginLeft: 10,
                                    width: window.width - 195,
                                }}>
                                    {_member.id}: #{item?.userId}
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#33333340',
                                    fontFamily: 'AvenirLTStd-Medium',
                                    marginRight: 10,
                                }}>
                                    {_member.dob}: {`${moment(item?.dateofBirth).format('DD-MMM-YYYY')}`}
                                </Text>
                            </View>

                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                marginTop: 4,
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginHorizontal: 10,
                            }}>
                                {item?.userName}
                            </Text>
                            <View style={{ borderBottomColor: '#36363610', borderBottomWidth: 1, marginTop: 7, }}></View>

                            <Text style={{
                                fontSize: 16,
                                color: '#36363660',
                                marginTop: 7,
                                fontFamily: 'AvenirLTStd-Medium',
                                marginHorizontal: 10,
                            }}>
                                {item?.content}
                            </Text>

                            <Pressable onPress={() => { navigation.navigate('MessageCenterDetail') }} style={{
                                marginLeft: 10, paddingHorizontal: 13, backgroundColor: '#FFCC80',
                                borderRadius: 20, paddingVertical: 4, alignSelf: 'flex-start', marginTop: 7
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
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Message Center</Text>
                </View>}
        </SafeAreaView >
    )
}

export default MessageCenter

const styles = StyleSheet.create({})