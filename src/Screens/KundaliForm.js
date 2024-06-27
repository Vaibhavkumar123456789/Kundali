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
    StatusBar, Modal
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { validateEmail } from '../utils/utils';
import DatePicker from 'react-native-date-picker'
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import Button from 'react-native-button';
import Loader from '../utils/Loader';
import GLobal from './GLobal';
import { useIsFocused } from '@react-navigation/native';
import { Country, Homebanner, kundlireportgenerate } from '../backend/Api';
import { BASE_URL_EXTERNAL } from '../backend/Config';

const KundaliForm = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _customlang, _kundali } = stringsoflanguages
    const isFocused = useIsFocused();
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [checked, setChecked] = React.useState(false);
    const gender = [_kundali.male, _kundali.female]
    const [checked1, setChecked1] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const payment = [_kundali.onine, _kundali.offline]
    const [should1, setShould1] = useState('')
    const [type, setType] = useState(false)
    const [date, setDate] = useState('')
    const [pdate, setPDate] = useState('')
    const [open, setOpen] = useState(false)
    const [clist, setCList] = useState([])
    const [type1, setType1] = useState(false)
    const [date1, setDate1] = useState('')
    const [pdate1, setPDate1] = useState('')
    const [open1, setOpen1] = useState(false)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [pincode, setPincode] = useState('')
    const [address, setAddress] = useState('')
    const [search, setSearch] = useState('')
    const [cityList, setCityList] = useState([])
    const [selectedcity, setSelectedCity] = useState('')
    const [report, setReport] = useState([])
    const [addtex, setTex] = useState()
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [localstate, SetLocalState] = useState(GLobal.kundliformdetail)
    const [should2, setShould2] = useState('')
    const [taxstate, setTaxState] = useState('')
    const [netamount, setNetAmount] = useState('')
    const [totatamount, setTotalAmount] = useState('')

    useEffect(() => {
        Countrysearch()
        banner()
    }, [isFocused == true])

    const banner = () => {
        toggleLoading(true);
        let e = {
            "device_id": '123',
            "device_token": GLobal.firebaseToken,
            "device_type": Platform.OS,
        };
        Homebanner(e)
            .then(data => {
                // alert(JSON.stringify(data.astro_report_detail, null, 2))
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.astro_report_detail.map((i) => {
                        tempCArr.push({
                            label: i.report_name,
                            value: i,
                        })
                        setReport(tempCArr)
                    })

                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('bannererror', error);
            });
    }


    const Countrysearch = () => {
        Country()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.iso2,
                        })
                        setCList(tempCArr)
                    })
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }
    useEffect(() => {
        console.log(`${BASE_URL_EXTERNAL}Place/GetCity?CountryCode=${should1}&SearchText=${search}&Limit=50`)
        const timeOut = setTimeout(async () => {
            const res = await fetch(`${BASE_URL_EXTERNAL}Place/GetCity?CountryCode=${should1}&SearchText=${search}&Limit=50`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });
            const response1 = await res.json()
            // alert(JSON.stringify(response1, null, 2))
            setCityList(response1?.responseData?.data)
        }, 1500)

        return () => {
            clearTimeout(timeOut)
        }
    }, [search])

    const searchCity = async (value) => {
        setSearch(value)
    }

    const taxdetail = (item) => {
        let amount = item["value"]["price"];
        let discount = item["value"]["discount_price"];
        let taxable_amount = discount > 0 ? discount : amount;

        let tax_amount = 0;
        let total_amount = 0;
        let tax_percentage = 0;
        if (item["value"]['tax'] == null) {
            tax_percentage = 0
            total_amount = taxable_amount
        } else {
            tax_percentage = item["value"]["tax"]["tax_percentage"];
            tax_amount = taxable_amount * tax_percentage / 100;
            total_amount = taxable_amount + tax_amount;
        }

        setTaxState(tax_amount)
        setNetAmount(taxable_amount)
        setTotalAmount(total_amount)

    }

    const kundliformdata = () => {

        if (should2 == '') {
            Toast.show('Please Select Kundli Type');
        }
        else if (name == '') {
            Toast.show('Please enter name');
        }
        else if (checked === false) {
            Toast.show('Please Select Gender');
        }
        else if (date === '') {
            Toast.show('Please Select Date of birth');
        }
        else if (date1 === '') {
            Toast.show('Please Select Time of birth');
        }
        else if (should1 === '') {
            Toast.show('Please Select Country');
        }
        else if (selectedcity === '') {
            Toast.show('Please Select birth Place');
        }
        else if (number === '' || number.length !== 10) {
            Toast.show('Please enter your valid phone number');
        } else if (email == '') {
            Toast.show('Please enter Email');
        }
        else if (!validateEmail(email)) {
            Toast.show('Please enter your valid email address');
        }
        else if (pincode == '') {
            Toast.show('Please enter Pincode');
        }
        else if (address == '') {
            Toast.show('Please enter Address');
        } else if (checked1 === false) {
            Toast.show('Please Select Payment Mode');
        }

        else {

            let e = {
                "name": name,
                "gender": checked === 0 ? "Male" : checked === 1 ? "Female" : null,
                "dob": date == '' ? '' : moment(date).format('YYYY-MM-DD'),
                "tob": date1 == '' ? '' : moment(date1).format('hh:mm a'),
                "country": should1,
                "pob": `${selectedcity.cityName}`,
                "mobile": number,
                "email": email,
                "pincode": pincode,
                "address": address,
                "latitude": selectedcity.latitude,
                "longitude": selectedcity.longitude,
                "agree": "1",
                "package_id": addtex?.value?.id,
                "tax_amt": taxstate,
                "net_amount": netamount,
                "total_mrp": totatamount,
                "payment_mode": checked1 === 0 ? "online" : checked1 === 1 ? "offline" : null
            };
            // alert(JSON.stringify(e, null, 2))
            // return
            toggleLoading(true);
            kundlireportgenerate(e)
                .then(data => {
                    // alert(JSON.stringify(data, null, 2))
                    toggleLoading(false);
                    if (data.status) {
                        navigation.navigate('ViewSample', { item: `${data?.detail?.report}` })

                    } else {
                        alert(data?.msg);
                    }
                })
                .catch(error => {
                    toggleLoading(false);
                    console.log('error', error);
                });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_kundali.kundali}
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
                    Kundli Type
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
                    data={report
                    }
                    maxHeight={200}
                    search
                    searchPlaceholder={'Kundli Type'}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333' }}
                    labelField="label"
                    valueField="value"
                    placeholder={'Kundli Type'}
                    value={should2}
                    onChange={(item) => { setShould2(item), setTex(item), taxdetail(item) }}
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
                    {_kundali.gender}
                </Text>
                <FlatList
                    data={gender}
                    horizontal
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => {
                            setChecked(index)
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginTop: 5 }}>
                                <RadioButton
                                    value={checked}
                                    status={checked === index ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(index)
                                    }}
                                    uncheckedColor='#69707F'
                                    color='#FFCC80'
                                />
                                <Text style={{
                                    fontSize: 16,
                                    color: '#333333',
                                    fontFamily: 'AvenirLTStd-Medium',
                                }}>
                                    {item}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 10,
                        marginHorizontal: 18,
                    }}>
                    {_kundali.dateofbirth}
                </Text>
                <TouchableOpacity activeOpacity={0.9} style={{
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    marginHorizontal: 18,
                    marginTop: 10,
                    borderColor: '#00000020',
                    borderWidth: 1.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }} onPress={() => { setOpen(true), setType(false) }}>
                    <TextInput
                        style={{
                            fontSize: 16,
                            color: '#333333',
                            fontFamily: 'AvenirLTStd-Medium',
                            width: '90%',
                        }}
                        editable={false}
                        value={date != '' ? moment(date).format('DD-MM-YYYY') : ''}
                        placeholder={_kundali.dateofbirth}
                        placeholderTextColor={'#333333'}
                    />

                </TouchableOpacity>

                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_kundali.timeofbirth}
                </Text>

                <TouchableOpacity activeOpacity={0.9} style={{
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    marginHorizontal: 18,
                    marginTop: 10,
                    borderColor: '#00000020',
                    borderWidth: 1.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }} onPress={() => { setOpen1(true), setType1(false) }}>
                    <TextInput
                        style={{
                            fontSize: 16,
                            color: '#333333',
                            fontFamily: 'AvenirLTStd-Medium',
                            width: '90%',
                        }}
                        editable={false}
                        value={date1 != '' ? moment(date1).format('hh:mm a') : ''}
                        placeholder={_kundali.timeofbirth}
                        placeholderTextColor={'#333333'}
                    />

                </TouchableOpacity>
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
                    data={clist
                    }
                    maxHeight={200}
                    search
                    searchPlaceholder={_kundali.country}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333' }}
                    labelField="label"
                    valueField="value"
                    placeholder={_kundali.country}
                    value={should1}
                    onChange={(item) => setShould1(item.value)}
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
                    {_kundali.birth}
                </Text>
                <Pressable onPress={() => setModalVisible(true)}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Medium',
                            borderRadius: 10,
                            borderColor: '#00000020',
                            borderWidth: 1.5,
                            marginTop: 10,
                            marginHorizontal: 18,
                            paddingHorizontal: 15,
                            paddingVertical: 14,
                            color: '#333333',
                        }}>
                        {selectedcity == '' ? _kundali.birth : `${selectedcity.cityName},${selectedcity.state},${selectedcity.countryCode}`}
                    </Text>
                </Pressable>

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
                    value={number}
                    onChangeText={(text) => setNumber(text)}
                    maxLength={10}
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
                    {_kundali.pincode}
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
                    placeholder={_kundali.pincode}
                    keyboardType='numeric'
                    maxLength={6}
                    value={pincode}
                    onChangeText={(text) => setPincode(text)}
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
                    {_kundali.address}
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
                    placeholder={_kundali.address}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />

                <View style={{ flexDirection: 'row', marginLeft: 14, marginTop: 15 }}>
                    <CheckBox
                        disabled={false}
                        boxType='square'
                        tintColors={{ true: '#FFC629', false: '#00000050' }}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={{
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Medium',
                        fontSize: 15,
                        marginLeft: 5,
                        marginTop: 5,
                        width: window.width - 70,
                        lineHeight: 20,
                    }}>
                        {_kundali.text}

                    </Text>

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
                    {_kundali.mode}
                </Text>
                <FlatList
                    data={payment}
                    horizontal
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => {
                            setChecked1(index)
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginTop: 5 }}>
                                <RadioButton
                                    value={checked1}
                                    status={checked1 === index ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked1(index)
                                    }}
                                    uncheckedColor='#69707F'
                                    color='#FFCC80'
                                />
                                <Text style={{
                                    fontSize: 16,
                                    color: '#333333',
                                    fontFamily: 'AvenirLTStd-Medium',
                                }}>
                                    {item}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
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
                        kundliformdata()
                    }}>
                    {_customlang.submit}
                </Button>


            </ScrollView>
            <DatePicker
                modal
                open={open}
                mode={'date'}
                // minimumDate={new Date()}
                date={date == '' ? new Date() : date}
                onConfirm={date => {
                    setOpen(false);
                    type == false ? setDate(date) : setPDate(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
            <DatePicker
                modal
                mode={"time"}
                open={open1}
                date={date1 == '' ? new Date() : date1}
                onConfirm={(date) => {
                    setOpen1(false)
                    type1 == false ? setDate1(date) : setPDate1(date);
                }}
                onCancel={() => {
                    setOpen1(false)
                }}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible(false);
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: '#00000099',
                        justifyContent: 'center',
                    }}>
                    <View style={{
                        margin: 15,
                        padding: 20,
                        backgroundColor: 'white',
                        borderRadius: 10,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {

                            }}>
                            <View style={{ alignSelf: 'center' }}>

                            </View>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    borderRadius: 10,
                                    borderColor: '#00000020',
                                    borderWidth: 1.5,
                                    paddingHorizontal: 15,
                                    color: '#333333',
                                }}
                                placeholderTextColor={'#333333'}
                                placeholder={_kundali.birth}
                                onChangeText={(text) => { searchCity(text) }}
                            />
                            {cityList?.length > 0 && (
                                <FlatList
                                    data={cityList}
                                    renderItem={({ item, index }) => (
                                        <Pressable style={{}} onPress={() => { setSelectedCity(item), setModalVisible(false) }}>
                                            <View style={{ width: '100%', margin: 10 }}>
                                                <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
                                                    {item.cityName} ,{item.state} ,{item.countryCode},
                                                </Text>
                                                <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
                                                    Lat:{item.latitude} , Lon:{item.longitude}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    )}
                                />

                            )}

                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView >
    )
}

export default KundaliForm

const styles = StyleSheet.create({})

