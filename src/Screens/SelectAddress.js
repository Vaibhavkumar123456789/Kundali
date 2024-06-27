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
import { RadioButton } from 'react-native-paper';
import { addresslist, deletedaddress } from '../backend/Api';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../utils/Loader';

const SelectAddress = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { _member, _invoice, _kundali, _setting, _customlang } = stringsoflanguages
    const [should1, setShould1] = useState('')
    const [checked, setChecked] = React.useState(false);
    const gender = [{}, {}]
    const [address, setAddressList] = useState([])
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        list()
    }, [isFocused == true])

    const list = () => {
        toggleLoading(true);

        addresslist()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    setAddressList(data.addresses)

                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }

    const deleteselectaddress = (id) => {
        let e = {
            "address_id": id
        };
        deletedaddress(e)
            .then(data => {
                // alert(JSON.stringify(data, null, 2))

                if (data.status) {
                    list()

                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                console.log('error', error);
            });
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_setting.selectaddress}
            />
            {state.loading && <Loader />}
            <ScrollView>
                <FlatList
                    data={address}
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
                                        {item?.name}
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
                                    {item?.address},{item?.city_name},{item?.state_name},{item?.country_name}-{item.pincode}
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        color: '#333333',
                                        fontSize: 14,
                                        marginTop: 5,
                                        marginHorizontal: 10,
                                    }}>
                                    {_kundali.mobile}-{item?.mobile}
                                </Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Pressable style={{
                                        width: '45%',
                                        borderRadius: 4,
                                        backgroundColor: '#FFCC8090',
                                        paddingVertical: 10,
                                        marginTop: 10,
                                        marginLeft: 10,
                                    }} onPress={() => { navigation.navigate('EditAddress', item) }} >

                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: 'black',
                                                fontFamily: 'AvenirLTStd-Medium',
                                                textAlign: 'center',
                                            }}>
                                            Edit
                                        </Text>
                                    </Pressable>
                                    <Pressable style={{
                                        width: '45%',
                                        borderRadius: 4,
                                        marginRight: 10,
                                        backgroundColor: '#FFCC8090',
                                        paddingVertical: 10,
                                        marginTop: 10,
                                    }} onPress={() => {
                                        Alert.alert(
                                            'Are you sure want to Delete Address ?',
                                            item?.name,
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                },

                                                { text: 'Delete', onPress: () => deleteselectaddress(item.id) },
                                            ],
                                            { cancelable: false },
                                        )
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: 'black',
                                                fontFamily: 'AvenirLTStd-Medium',
                                                textAlign: 'center',
                                            }}>
                                            DELETE
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                        </Pressable>
                    )}
                />


            </ScrollView>
            <Pressable onPress={() => { navigation.navigate('AddAddress') }} style={{
                backgroundColor: '#FFCC8030',
                borderRadius: 12,
                width: '90%',
                paddingVertical: 12,
                marginBottom: 20,
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
                        textAlign: 'center',
                    }}>
                    + {_setting.addnewaddress}
                </Text>
            </Pressable>
            {/* <Button
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
            </Button> */}


        </SafeAreaView >
    )
}

export default SelectAddress

const styles = StyleSheet.create({})


