import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity, Dimensions, Modal, FlatList, ScrollView, StatusBar, StyleSheet, Alert, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment';
import Loader from '../utils/Loader';
import { notificationapi } from '../backend/Api';
import Header from '../Custom/Header';
const Notification = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const focus = useIsFocused()
    const [list, setList] = useState([])
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        notify()
    }, [focus])

    const notify = () => {
        toggleLoading(true);
        notificationapi()
            .then(data => {
                toggleLoading(false);
                // alert(JSON.stringify(data, null, 2))
                if (data.status) {
                    setList(data.data)
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title='Notification'
            />
            {state.loading && <Loader />}
            
            {list && list?.length > "0" ?
                <FlatList
                    data={list}
                    style={{ flexGrow: 0, marginTop: 10 }}

                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                marginHorizontal: 18,
                                paddingVertical: 11,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                elevation: 5,
                                bottom: 10,
                                marginTop: 15,
                            }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain',
                                        marginLeft: 13,
                                    }}
                                    source={item?.image?.length > 0 ? { uri: item?.image } : require('../assets/notification1.png')} />
                                <View style={{ width: window.width - 110, marginTop: 2, alignSelf: 'center' }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#333333',
                                        fontFamily: 'AvenirLTStd-Medium',
                                        lineHeight: 19,
                                        marginLeft: 10,

                                    }}>
                                        {item?.title}
                                    </Text>
                                    <Text numberOfLines={1} style={{
                                        fontSize: 13,
                                        color: '#333333',
                                        fontFamily: 'AvenirLTStd-Roman',
                                        marginLeft: 10,
                                        marginTop: 2,
                                    }}>
                                        {`${moment(item?.updated_at).format('DD-MMM-YYYY hh:mm a')}`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Notification</Text>
                </View>}
        </SafeAreaView>
    )
}

export default Notification
const styles = StyleSheet.create({

})

