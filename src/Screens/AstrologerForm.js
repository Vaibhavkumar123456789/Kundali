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
    BackHandler
} from 'react-native';
var randomstring = require("randomstring");
import Header from '../Custom/Header';
import Toast from 'react-native-simple-toast';
import stringsoflanguages from '../language/Language'
import { Dropdown } from 'react-native-element-dropdown';
import Button from 'react-native-button';
import { useIsFocused } from '@react-navigation/native';
import { AstrologerCheckMobile, City1, Country, State1 } from '../backend/Api';
import Loader from '../utils/Loader';
var validator = require('email-validator');
import { BASE_URL } from '../backend/Config';
import { validateEmail } from '../utils/utils';
import GLobal from './GLobal';


const AstrologerForm = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { _customlang, _kundali, _astrologerForm } = stringsoflanguages
    const [countrylist, setCountryList] = useState([])
    const [cityname, setCityName] = useState([])
    const [statelist1, setStateList] = useState([])
    const [should7, setShould7] = useState('')
    const [should1, setShould1] = useState('')
    const [should6, setShould6] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [centrename, setCentreName] = useState('')
    const [VisiblePass, setVisiblePass] = useState(false)
    const makePassVisible = () => {
        setVisiblePass(prevState => !prevState);
    };
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        Countrysearch()

    }, [isFocused == true])

    const Countrysearch = () => {
        toggleLoading(true);
        Country()
            .then(data => {
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.id,
                        })
                        setCountryList(tempCArr)
                    })
                } else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }
    const statelist = (id) => {
        toggleLoading(true);
        let e = {
            "country_id": id
        };
        State1(e)
            .then(data => {
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.id,
                        })
                        setStateList(tempCArr)
                    })
                } else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }
    const citylist = (id) => {
        toggleLoading(true);
        let e = {
            "state_id": id
        };
        City1(e)
            .then(data => {
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.id,
                        })
                        setCityName(tempCArr)
                    })
                } else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }

    const verifyuser = () => {
        let astrologer = {
            name,
            email,
            number,
            centrename,
            password,
            should1,
            should6,
            should7,
        };
        console.log('astrologerform', astrologer)
        GLobal.user = astrologer
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_astrologerForm.astologerform}
            />
            {state.loading && <Loader />}
            <ScrollView>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_kundali.name}
                </Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        fontFamily: 'AvenirLTStd-Medium',
                        borderRadius: 10,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        marginTop: 10,
                        marginHorizontal: 18,
                        paddingHorizontal: 15,
                        paddingVertical: 11,
                        color: '#333333',
                    }}
                    placeholderTextColor={'#333333'}
                    placeholder={_kundali.name}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_kundali.email}
                </Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        fontFamily: 'AvenirLTStd-Medium',
                        borderRadius: 10,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        marginTop: 10,
                        marginHorizontal: 18,
                        paddingHorizontal: 15,
                        paddingVertical: 11,
                        color: '#333333',
                    }}
                    placeholderTextColor={'#333333'}
                    placeholder={_kundali.email}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_kundali.mobile}
                </Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        fontFamily: 'AvenirLTStd-Medium',
                        borderRadius: 10,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        marginTop: 10,
                        marginHorizontal: 18,
                        paddingHorizontal: 15,
                        paddingVertical: 11,
                        color: '#333333',
                    }}
                    placeholderTextColor={'#333333'}
                    keyboardType='numeric'
                    placeholder={_kundali.mobile}
                    maxLength={10}
                    value={number}
                    onChangeText={(text) => setNumber(text)}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_astrologerForm.password}
                </Text>
                <View style={{ flexDirection: 'row', }}>
                    <TextInput
                        placeholderTextColor={'#333333'}
                        placeholder={_astrologerForm.password}
                        maxLength={20}
                        secureTextEntry={VisiblePass ? false : true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={{
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Medium',
                            borderRadius: 10,
                            borderColor: '#00000020',
                            borderWidth: 1.5,
                            marginTop: 10,
                            marginHorizontal: 18,
                            paddingHorizontal: 15,
                            paddingVertical: 11,
                            color: '#333333',
                            width: "90%",
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ marginLeft: -60, padding: 5, paddingTop: 28 }}
                        onPress={() => {
                            makePassVisible();
                        }}>
                        {VisiblePass ? (
                            <Image
                                style={{ width: 18, height: 18, resizeMode: 'contain', alignSelf: 'center', }}
                                source={require('../assets/eye.png')}
                            />
                        ) : (
                            <Image
                                style={{ width: 18, height: 18, resizeMode: 'contain', alignSelf: 'center', }}
                                source={require('../assets/hide.png')}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_astrologerForm.institutename}
                </Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        fontFamily: 'AvenirLTStd-Medium',
                        borderRadius: 10,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        marginTop: 10,
                        marginHorizontal: 18,
                        paddingHorizontal: 15,
                        paddingVertical: 11,
                        color: '#333333',
                    }}
                    placeholderTextColor={'#333333'}
                    placeholder={_astrologerForm.institutename}
                    value={centrename}
                    onChangeText={(text) => setCentreName(text)}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_kundali.country}
                </Text>
                <Dropdown
                    style={{
                        height: 50,
                        marginHorizontal: 18, marginTop: 10, borderWidth: 1.5, borderColor: '#00000020',
                        borderRadius: 10,
                    }}
                    placeholderStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, }}
                    selectedTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, textTransform: 'capitalize' }}
                    iconStyle={{
                        width: 20,
                        height: 20,
                        marginRight: 12,
                    }}
                    itemTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', textTransform: 'capitalize' }}
                    data={countrylist
                    }
                    maxHeight={200}
                    search
                    searchPlaceholder={_kundali.country}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                    labelField="label"
                    valueField="value"
                    placeholder={_kundali.country}
                    value={should1}
                    onChange={(item) => {
                        setShould1(item.value), statelist(item.value),
                            setShould6('');
                        setShould7('');
                    }}
                />
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_astrologerForm.statename}
                </Text>
                <Dropdown
                    style={{
                        height: 50,
                        marginHorizontal: 18, marginTop: 10, borderWidth: 1.5, borderColor: '#00000020',
                        borderRadius: 10,
                    }}
                    placeholderStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, }}
                    selectedTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, textTransform: 'capitalize' }}
                    iconStyle={{
                        width: 20,
                        height: 20,
                        marginRight: 12,
                    }}
                    itemTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', textTransform: 'capitalize' }}
                    data={statelist1}
                    maxHeight={200}
                    search
                    searchPlaceholder={_astrologerForm.statename}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                    labelField="label"
                    valueField="value"
                    placeholder={_astrologerForm.statename}
                    value={should6}
                    onChange={(item) => {
                        setShould6(item.value), citylist(item.value),
                            setShould7('');
                    }}
                />

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_astrologerForm.city}
                </Text>
                <Dropdown
                    style={{
                        height: 50,
                        marginHorizontal: 18, marginTop: 10, borderWidth: 1.5, borderColor: '#00000020',
                        borderRadius: 10,
                    }}
                    placeholderStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, }}
                    selectedTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, textTransform: 'capitalize' }}
                    iconStyle={{
                        width: 20,
                        height: 20,
                        marginRight: 12,
                    }}
                    itemTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', textTransform: 'capitalize' }}
                    data={cityname}
                    maxHeight={200}
                    search
                    searchPlaceholder={_astrologerForm.city}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                    labelField="label"
                    valueField="value"
                    placeholder={_astrologerForm.city}
                    value={should7}
                    onChange={(item) => setShould7(item.value)}
                />


                <Button
                    containerStyle={{
                        width: '90%',
                        marginTop: 20,
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
                        if (name == '') {
                            Toast.show('Please enter Name');
                        }
                        else if (email == '') {
                            Toast.show('Please enter Email');
                        }
                        else if (!validateEmail(email)) {
                            Toast.show('Please enter your valid email address');
                        }
                        else if (number === '' || number.length !== 10) {
                            Toast.show('Please enter your valid phone number');
                        } else if (centrename == '') {
                            Toast.show('Please enter Instiute/Centre Name');
                        }
                        else if (should1 == '') {
                            Toast.show('Please Select Country');
                        }
                        else if (should6 == '') {
                            Toast.show('Please Select State');
                        }
                        else if (should7 == '') {
                            Toast.show('Please Select City');
                        }
                        else {
                            toggleLoading(true);
                            var x = randomstring.generate({
                                length: 4,
                                charset: 'numeric',
                                letters: false,
                                special: false,

                            });

                            let e = {
                                "mobile": number,
                                "email": email,
                                "otp": x,
                                "country_code": "+91"
                            };
                            console.log(JSON.stringify(e));

                            AstrologerCheckMobile(e)
                                .then(data => {
                                    // alert(JSON.stringify(data, null, 2))
                                    toggleLoading(false);
                                    if (data.status == true) {
                                        verifyuser()
                                        navigation.navigate("Otp", e)
                                    } else {
                                        Toast.show(data?.msg);
                                        return
                                    }

                                })
                                .catch(error => {
                                    toggleLoading(false);
                                    console.log('error', error);
                                });
                        }

                    }}>
                    {_customlang.submit}
                </Button>


            </ScrollView>

        </SafeAreaView >
    )
}

export default AstrologerForm

const styles = StyleSheet.create({})

