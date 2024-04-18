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
import * as actions from '../redux/actions';
import { Packagelist, AsyncStorageSetUser, AsyncStorageSettoken } from '../backend/Api';
import Loader from '../utils/Loader';
import GLobal, { data } from './GLobal';
import { BASE_URL } from '../backend/Config';

const Package = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [input, setInput] = useState([])
    const [field, setField] = useState(GLobal.user)

    useEffect(() => {
        toggleLoading(true);
        Packagelist()
            .then(data => {
                toggleLoading(false);

                if (data.status) {
                    setInput(data.data)
                } else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }, [])

    const Freepackage = async () => {
        try {
            let formData = new FormData();
            formData.append('newsignup', 1)
            formData.append('user_type', 2)           //astrologer
            formData.append('name', field.name)
            formData.append('email', field.email)
            formData.append('mobile', field.mobile)
            formData.append('status', 1)
            formData.append('password', field.password)
            formData.append('gender', field.gender)
            formData.append('dob', field.dob)
            formData.append('create_profile ', 1)
            formData.append('consultation_id', field.should1)
            formData.append('skill_id', field.should2)
            formData.append('specialization_id', field.should3)
            formData.append('langugae_id', field.should4)
            formData.append('experience', field.experience)
            formData.append('contribute_daily', field.hour)
            formData.append('bank_account_number', field.accountnumber)
            formData.append('bank_name', field.bankname)
            formData.append('ifsc_code', field.ifsc)
            formData.append('address', field.address)
            formData.append('country', field.should5)
            formData.append('state', field.should6)
            formData.append('city', field.should7)
            formData.append('pincode', field.pincode)
            formData.append('pancard', field.name)
            formData.append('pancard', field.pancard)
            formData.append('aadhar_number', field.aadharcard)
            formData.append('aadharcard_image', {
                uri: field.aadharcard_image?.uri,
                type: field.aadharcard_image?.type,
                name: field.aadharcard_image?.name,
            });
            formData.append('aadharcard_back_image', {
                uri: field.aadharcard_back_image?.uri,
                type: field.aadharcard_back_image?.type,
                name: field.aadharcard_back_image?.name,
            })
            formData.append('pancard_image', {
                uri: field.pancard_image?.uri,
                type: field.pancard_image?.type,
                name: field.pancard_image?.name,
            })
            formData.append('academic_qualification', field.academicqual)
            formData.append('astrologer_qualification', field.astroqualification)
            formData.append('academic_certificate', {
                uri: field.academic_certificate?.uri,
                type: field.academic_certificate?.type,
                name: field.academic_certificate?.name,
            });

            formData.append('astrologer_certificate', {
                uri: field.astrologer_certificate?.uri,
                type: field.astrologer_certificate?.type,
                name: field.astrologer_certificate?.name,
            })

            formData.append('profile_picture', {
                uri: field.profile_picture?.uri,
                type: field.profile_picture?.type,
                name: field.profile_picture?.name,
            })
            formData.append('biography', field.biography)
            formData.append('package_id', input[0].id)
            formData.append('amount', input[0].amount)

            const res = await fetch(`${BASE_URL}astrologer/signup`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                },
                body: formData,
            });
            const response1 = await res.json()
            console.log('free Package', response1)
            if (response1.status) {
                actions.Login(response1.user_detail);
                actions.Token(response1.token);
                AsyncStorageSettoken(response1.token);
                AsyncStorageSetUser(response1.user_detail);
                navigation.replace('DrawerNavigator')
            } else {
                alert(response1.msg);
            }

        } catch (error) {
            toggleLoading(false)
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title='Package'
            />
            {state.loading && <Loader />}

            {input && input.length > "0" ?
                <FlatList
                    data={input}
                    style={{ flexGrow: 0, marginTop: 10 }}
                    renderItem={({ item, index }) => (
                        <View>
                            <Pressable onPress={() => {
                                if (item.is_free == 1) {
                                    Freepackage()                                         //free

                                } else if (item.is_free == 0) {
                                    GLobal.id = item.id
                                    GLobal.amount = item.amount
                                    navigation.navigate('Payment')                           //membership
                                }
                            }}>
                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 12,
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 12,
                                        borderColor: '#D0D0D0',
                                        borderWidth: 2,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text numberOfLines={1} style={{
                                            fontSize: 18,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginLeft: 10,
                                            width: window.width - 170,
                                        }}>
                                            {item.package_name}
                                        </Text>
                                        {(item.is_free == 1 &&                 // free
                                            <Text style={{
                                                fontSize: 18,
                                                color: '#333333',
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                marginRight: 10,
                                            }}>
                                                {item.days} {item.name}
                                            </Text>
                                        )}
                                        {(item.is_free == 0 &&                       // membership
                                            <Text style={{
                                                fontSize: 18,
                                                color: '#333333',
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                marginRight: 10,
                                            }}>
                                                ₹{item.amount}
                                            </Text>
                                        )}
                                    </View>

                                    <Text style={{
                                        fontSize: 13,
                                        color: '#36363660',
                                        lineHeight: 17,
                                        marginTop: 5,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        {item.title}
                                    </Text>
                                </View>
                            </Pressable>

                        </View>
                    )}
                />
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Package Available</Text>
                </View>}
        </SafeAreaView>
    )
}

export default Package

const styles = StyleSheet.create({})