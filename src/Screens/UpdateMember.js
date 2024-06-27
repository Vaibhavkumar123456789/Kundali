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
import StepIndicator from 'react-native-step-indicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper';
import Button from 'react-native-button';
import SelectMultiple from 'react-native-select-multiple'
import Header from '../Custom/Header';
import { useIsFocused } from '@react-navigation/native';
import stringsoflanguages from '../language/Language'
import { Dropdown } from 'react-native-element-dropdown';
import { validateEmail } from '../utils/utils';
import { consultancylist, updatememberlist } from '../backend/Api';
const UpdateMember = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    const { _kundali, _customlang } = stringsoflanguages
    const window = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { width, height } = Dimensions.get('window');
    const [checked, setChecked] = React.useState(route.params?.maindetailuser?.gender === "Male" ? 0 : route.params?.maindetailuser?.gender === "Female" ? 1 : null);
    const [checked1, setChecked1] = React.useState(route.params?.maindetailuser?.marital_status === "Married" ? 0 : route.params?.maindetailuser?.marital_status === "Unmarried" ? 1 : "Divorce");
    const gender = [_kundali.male, _kundali.female]
    const married = [_kundali.married, _kundali.unmarried, _kundali.divorce]
    const service = [_kundali.business, _kundali.service]
    const [checked2, setChecked2] = React.useState(route.params?.maindetailuser?.occupation === "Business" ? 0 : route.params?.maindetailuser?.occupation === "Service" ? 1 : null);
    const goverment = [_kundali.private, _kundali.government]
    const [checked3, setChecked3] = React.useState(route.params?.maindetailuser?.service_type === "Private" ? 0 : route.params?.maindetailuser?.service_type === "Government" ? 1 : null);
    const [type, setType] = useState(false)
    const [date, setDate] = useState(route.params?.maindetailuser?.dob || '');
    const [pdate, setPDate] = useState('')
    const [open, setOpen] = useState(false)
    const [currentPosition, setCurrentPosition] = React.useState(0);

    const [consultlist, setConsultancyList] = useState([])
    const [type1, setType1] = useState(false)
    const [date1, setDate1] = useState(route.params?.maindetailuser?.tob ? moment(route.params.maindetailuser.tob, 'hh:mm a').toDate() : new Date())
    const [pdate1, setPDate1] = useState('')
    const [open1, setOpen1] = useState(false)
    const [selected, setSelected] = useState(route.params?.maindetailuser?.consultancy_for?.split('|') || [])
    const [name, setName] = useState(route.params?.maindetailuser?.name)
    const [hindiname, setHindiName] = useState(route.params?.maindetailuser?.name_hindi)
    const [number, setNumber] = useState(route.params?.maindetailuser?.mobile)
    const [email, setEmail] = useState(route.params?.maindetailuser?.email)
    const [address, setAddress] = useState(route.params?.maindetailuser?.address)
    const [placebitrh, setPlaceBirth] = useState(route.params?.maindetailuser?.pob)
    const [caste, setCaste] = useState(route.params?.maindetailuser?.caste)
    const [gotra, setGotra] = useState(route.params?.maindetailuser?.gotra)
    const [fathername, setFatherName] = useState(route.params?.maindetailuser?.father_name)
    const [mothername, setMotherName] = useState(route.params?.maindetailuser?.mother_name)
    const [grandfathername, setGrandFatherName] = useState(route.params?.maindetailuser?.grandfather_name)
    const [noofchildren, setNoChildren] = useState(route.params?.maindetailuser?.no_of_childern)
    const [filedbusiness, setFiledBusiness] = useState(route.params?.maindetailuser?.filled_of_business)
    const [key2, setKey2] = useState(0)
    const [other, setOther] = useState(route.params?.maindetailuser?.others)
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        listconsultancy()
    }, [isFocused == true])


    const proficiencies = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ];

    const [languages, setLanguages] = useState([{
        age: '',
        gender: '',
    }])

    const addInputFieldLang = () => {
        if (languages.length >= 3) {
            Toast.show('You can only add three your details');
            return;
        }
        setLanguages([...languages, {
            age: '',
            gender: '',
        }])
    }

    const deleteLanguage = (index) => {
        if (languages.length <= 1) {
            Toast.show('You can exist  one details');
            return;
        }
        setKey2(key2 + 1)
        languages.pop(index);
        console.log(languages)
        setLanguages(languages)
    }

    useEffect(() => {
        let Acarray = [];
        const childDetail = route.params?.maindetailuser?.child_detail;

        if (childDetail) {
            try {
                const parsedDetails = JSON.parse(childDetail);
                for (let lang of parsedDetails) {
                    let dict = {
                        age: lang.age,
                        gender: lang.gender,
                    };
                    Acarray.push(dict);
                }
            } catch (error) {
                console.error("Failed to parse child_detail JSON string:", error);
            }
        }

        setLanguages(Acarray);
    }, [route.params?.maindetailuser?.child_detail]);

    const handleChangeForLang = (index, evnt) => {

        const list = [...languages];
        list[index]['gender'] = evnt;
        setLanguages(list);
    }
    const handleChangeForLangth = (index, evnt) => {
        // alert(JSON.stringify(languages, null, 2))
        const list = [...languages];
        list[index]['age'] = evnt;
        setLanguages(list);
    }


    const listconsultancy = () => {
        toggleLoading(true);
        consultancylist()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.title,
                            value: i.title,
                        })
                        setConsultancyList(tempCArr)
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


    const addmembership = () => {
        let jj = selected.map(i => {
            return i.value;
        });

        let e = {
            "id": route.params?.id,
            "name": name,
            "name_hindi": hindiname,
            "gender": checked === 0 ? "Male" : checked === 1 ? "Female" : null,
            "mobile": number,
            "email": email,
            "address": address,
            "dob": date == '' ? '' : moment(date).format('YYYY-MM-DD'),
            "tob": date1 == '' ? '' : moment(date1).format('hh:mm a'),
            "pob": placebitrh,
            "caste": caste,
            "gotra": gotra,
            "father_name": fathername,
            "mother_name": mothername,
            "grandfather_name": grandfathername,
            "marital_status": checked1 === 0 ? "Married" : checked1 === 1 ? "Unmarried" : "Divorce",
            "no_of_childern": noofchildren,
            "child_detail": languages,
            "occupation": checked2 === 0 ? "Business" : checked === 1 ? "Service" : null,
            "filled_of_business": filedbusiness,
            "service_type": checked3 === 0 ? "Private" : checked === 1 ? "Government" : null,
            "consultancy_for": jj[0] == undefined || null ? selected : jj.join('|'),
            "others": other,
        };

        toggleLoading(true);
        updatememberlist(e)
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    Toast.show('Updated Member Profile')
                    navigation.goBack()
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }



    const labels = [
        '',
        '',
        '',
        '',
    ];
    const customStyles = {
        stepIndicatorSize: 35,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 3,
        currentStepStrokeWidth: 2,
        stepStrokeCurrentColor: '#FFCC80',
        stepStrokeWidth: 1,
        stepStrokeFinishedColor: '#FFCC80',
        stepStrokeUnFinishedColor: '#F5F5F5',
        separatorFinishedColor: '#FFCC80',
        separatorUnFinishedColor: '#D3D3D3',
        stepIndicatorFinishedColor: '#FFCC80',
        stepIndicatorUnFinishedColor: '#EEEEEE',
        stepIndicatorCurrentColor: '#FFCC80',
        stepIndicatorLabelFontSize: 13,

        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#735685',
        stepIndicatorLabelFinishedColor: '#333333',
        stepIndicatorLabelUnFinishedColor: '#212221',
        labelColor: '#212221',
        labelSize: 11,
        labelFontFamily: 'AvenirLTStd-Medium',
        currentStepLabelColor: '#333333',
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_kundali.membership}
            />
            <View style={{ marginHorizontal: 5, marginTop: 15 }}>
                <StepIndicator
                    stepIndicatorLabelUnFinishedColor={0}
                    stepCount={labels.length}
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    labels={labels}
                />
            </View>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">

                {currentPosition == 0 && (

                    <View>
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 5,
                                marginHorizontal: 18,
                            }}>
                            {_kundali.nameenglish}
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
                            placeholder={_kundali.nameenglish}
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
                            {_kundali.namehindi}
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
                            placeholder={_kundali.namehindi}
                            value={hindiname}
                            onChangeText={(text) => setHindiName(text)}
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 13, marginTop: 5 }}>
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
                            {_kundali.emailid}
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
                            placeholder={_kundali.emailid}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />


                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 12,
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

                    </View>

                )}
                {currentPosition == 1 && (
                    <View>
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 5,
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
                                value={date ? moment(date).format('DD-MM-YYYY') : ''}
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
                                value={date1 ? moment(date1).format('hh:mm a') : ''}
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
                            {_kundali.placeofbirth}
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
                            placeholder={_kundali.placeofbirth}
                            value={placebitrh}
                            onChangeText={(text) => setPlaceBirth(text)}
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
                            {_kundali.caste}
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
                            placeholder={_kundali.caste}
                            value={caste}
                            onChangeText={(text) => setCaste(text)}
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
                            {_kundali.gotre}
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
                            placeholder={_kundali.gotre}
                            value={gotra}
                            onChangeText={(text) => setGotra(text)}
                        />


                    </View>
                )}

                {currentPosition == 2 && (
                    <View>
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 5,
                                marginHorizontal: 18,
                            }}>
                            {_kundali.fathername}
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
                            placeholder={_kundali.fathername}
                            value={fathername}
                            onChangeText={(text) => setFatherName(text)}
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
                            {_kundali.mothername}
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
                            placeholder={_kundali.mothername}
                            value={mothername}
                            onChangeText={(text) => setMotherName(text)}
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
                            {_kundali.grandfathername}
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
                            placeholder={_kundali.grandfathername}
                            value={grandfathername}
                            onChangeText={(text) => setGrandFatherName(text)}
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
                            {_kundali.martialstatus}
                        </Text>

                        <FlatList
                            data={married}
                            horizontal
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => {
                                    setChecked1(index)
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 13, marginTop: 5 }}>
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

                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 19,
                                marginHorizontal: 18,
                            }}>
                            {_kundali.numofchildren}
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
                            placeholder={_kundali.numofchildren}
                            value={noofchildren}
                            onChangeText={(text) => setNoChildren(text)}
                        />
                        <View key={key2}>
                            {languages.map((data, index) => (
                                <>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    color: '#ADADAD',
                                                    fontSize: 18,
                                                    letterSpacing: -0.2,
                                                    marginTop: 19,
                                                    marginLeft: 18,
                                                }}>
                                                {_kundali.childage}
                                            </Text>
                                            <TextInput
                                                style={{
                                                    fontSize: 16,
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    borderRadius: 10,
                                                    borderColor: '#00000020',
                                                    borderWidth: 1.5,
                                                    marginTop: 10,
                                                    width: window.width - 220,
                                                    marginLeft: 18,
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 11,
                                                    color: '#333333',
                                                }}
                                                placeholderTextColor={'#333333'}
                                                placeholder={_kundali.childage}
                                                value={data.age}
                                                onChangeText={(evnt) => handleChangeForLangth(index, evnt)}
                                            />
                                        </View>
                                        <View >
                                            <Text
                                                style={{
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                    color: '#ADADAD',
                                                    fontSize: 18,
                                                    letterSpacing: -0.2,
                                                    marginTop: 19,
                                                }}>
                                                {_kundali.chilegender}
                                            </Text>
                                            <Dropdown
                                                style={{
                                                    height: 52,
                                                    width: window.width - 200, marginTop: 10, borderWidth: 1.5, borderColor: '#00000020',
                                                    borderRadius: 10, marginRight: 18,
                                                }}
                                                placeholderStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, }}
                                                selectedTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, textTransform: 'capitalize' }}
                                                iconStyle={{
                                                    width: 20,
                                                    height: 20,
                                                    marginRight: 12,
                                                }}
                                                itemTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', textTransform: 'capitalize' }}
                                                data={proficiencies
                                                }
                                                maxHeight={150}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={_kundali.chilegender}
                                                value={data.gender}
                                                onChange={(evnt) => { handleChangeForLang(index, evnt.value) }}
                                            />

                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => { deleteLanguage() }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: 'red',
                                            fontFamily: 'AvenirLTStd-Medium',
                                            lineHeight: 18,
                                            marginRight: 18,
                                            marginTop: 5,
                                            textAlign: 'right',
                                        }}>Remove
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            ))}
                        </View>

                        <TouchableOpacity onPress={addInputFieldLang}>
                            <Text
                                style={{
                                    marginTop: 5,
                                    fontSize: 14,
                                    color: '#FFCC80',
                                    fontFamily: 'AvenirLTStd-Medium',
                                    lineHeight: 18,
                                    marginHorizontal: 18,
                                }}>
                                + Add Another Language
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {currentPosition == 3 && (
                    <View>
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 5,
                                marginHorizontal: 18,
                            }}>
                            {_kundali.occupation}
                        </Text>
                        <FlatList
                            data={service}
                            horizontal
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => {
                                    setChecked2(index)
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 13, marginTop: 5 }}>
                                        <RadioButton
                                            value={checked2}
                                            status={checked2 === index ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setChecked2(index)
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
                                marginTop: 19,
                                marginHorizontal: 18,
                            }}>
                            {_kundali.specific}
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
                            placeholder={_kundali.specific}
                            value={filedbusiness}
                            onChangeText={(text) => setFiledBusiness(text)}
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
                            {_kundali.servicetype}
                        </Text>

                        <FlatList
                            data={goverment}
                            horizontal
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => {
                                    setChecked3(index)
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 13, marginTop: 5 }}>
                                        <RadioButton
                                            value={checked3}
                                            status={checked3 === index ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setChecked3(index)
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
                                marginTop: 19,
                                marginHorizontal: 18,
                            }}>
                            {_kundali.addtext}
                        </Text>


                        <SelectMultiple
                            items={consultlist}
                            style={{
                                backgroundColor: '#fff',
                                marginLeft: 10,

                            }}
                            labelStyle={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#333333',
                                fontSize: 15,
                                marginLeft: 3,
                            }}
                            rowStyle={{ borderWidth: 0, borderBottomColor: '#fff' }}
                            selectedCheckboxStyle={{ color: 'red' }}
                            selectedItems={selected}
                            onSelectionsChange={setSelected}
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
                            {_kundali.other}
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
                            placeholder={_kundali.other}
                            value={other}
                            onChangeText={(text) => setOther(text)}
                        />
                    </View>
                )}



                {currentPosition == 0 && (
                    <Button
                        containerStyle={{
                            width: '90%',
                            // position: 'absolute',
                            marginBottom: 20,
                            marginTop: 20,
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
                            else if (hindiname == '') {
                                Toast.show('Please enter Name(Hindi)');
                            }

                            else if (number === '' || number.length !== 10) {
                                Toast.show('Please enter your valid phone number');
                            }
                            else if (email == '') {
                                Toast.show('Please enter Email');
                            }
                            else if (!validateEmail(email)) {
                                Toast.show('Please enter your valid email address');
                            }
                            else if (address == '') {
                                Toast.show('Please enter Address');
                            }

                            else {
                                setCurrentPosition(currentPosition + 1)

                            }
                        }}>
                        {_customlang.button}
                    </Button>
                )}

                {currentPosition == 1 && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            containerStyle={{
                                width: '42%',
                                // position: 'absolute',
                                marginBottom: 20,
                                borderColor: '#333333',
                                borderWidth: 1,
                                marginLeft: 18,
                                marginTop: 20,
                                height: 52,
                                borderRadius: 12,
                                overflow: 'hidden',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                            }}
                            style={{
                                fontSize: 18,
                                color: '#333333',
                                alignSelf: 'center',
                                fontFamily: 'AvenirLTStd-Medium',
                            }}

                            onPress={() => {

                                setCurrentPosition(currentPosition - 1)
                            }}>
                            {_kundali.previous}
                        </Button>
                        <Button
                            containerStyle={{
                                width: '42%',
                                // position: 'absolute',
                                marginRight: 18,
                                marginBottom: 20,
                                marginTop: 20,
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
                                if (placebitrh === '') {
                                    Toast.show('Please enter place of birth');
                                }
                                else if (caste === '') {
                                    Toast.show('Please enter caste');
                                } else if (gotra === '') {
                                    Toast.show('Please enter gotra');
                                } else {
                                    setCurrentPosition(currentPosition + 1)
                                }
                            }}>
                            {_customlang.button}
                        </Button>
                    </View>
                )}


                {currentPosition == 2 && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            containerStyle={{
                                width: '42%',
                                // position: 'absolute',
                                marginBottom: 20,
                                borderColor: '#333333',
                                borderWidth: 1,
                                marginLeft: 18,
                                marginTop: 20,
                                height: 52,
                                borderRadius: 12,
                                overflow: 'hidden',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                            }}
                            style={{
                                fontSize: 18,
                                color: '#333333',
                                alignSelf: 'center',
                                fontFamily: 'AvenirLTStd-Medium',
                            }}

                            onPress={() => {
                                setCurrentPosition(currentPosition - 1)
                            }}>
                            {_kundali.previous}
                        </Button>
                        <Button
                            containerStyle={{
                                width: '42%',
                                // position: 'absolute',
                                marginRight: 18,
                                marginBottom: 20,
                                marginTop: 20,
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

                                if (fathername === '') {
                                    Toast.show('Please enter father name');
                                }
                                else if (mothername === '') {
                                    Toast.show('Please enter mother name');
                                }
                                else if (grandfathername === '') {
                                    Toast.show('Please enter Grand father name');
                                }
                                else if (noofchildren === '') {
                                    Toast.show('Please enter no of children');
                                }
                                else if (languages == '') {
                                    Toast.show('Please enter your details first');
                                }
                                else if (languages.some((input) => input.age === '')) {
                                    Toast.show('Please enter Age');
                                }
                                else if (languages.some((input) => input.gender === '')) {
                                    Toast.show('Please Select gender');
                                } else {
                                    setCurrentPosition(currentPosition + 1)
                                }
                            }}>
                            {_customlang.button}
                        </Button>
                    </View>
                )}

                {currentPosition == 3 && (

                    <Button
                        containerStyle={{
                            width: '90%',
                            // position: 'absolute',
                            marginRight: 18,
                            marginBottom: 20,
                            marginTop: 20,
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

                            if (filedbusiness === '') {
                                Toast.show('Please enter filed of business');
                            }

                            else if (selected.length === 0) {
                                Toast.show('Please select Consultancy required');
                            }
                            else if (other === '') {
                                Toast.show('Please enter other details');
                            } else {
                                addmembership()
                            }
                        }}>
                        {_customlang.submit}
                    </Button>
                )}

            </KeyboardAwareScrollView>

            <DatePicker
                modal
                open={open}
                mode={'date'}
                date={date ? new Date(date) : new Date()}
                onConfirm={date => {
                    setOpen(false);
                    type === false ? setDate(date) : setPDate(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />

            <DatePicker
                modal
                mode={"time"}
                open={open1}
                date={date1 || new Date()}
                onConfirm={(date) => {
                    setOpen1(false)
                    type1 === false ? setDate1(date) : setPDate1(date);
                }}
                onCancel={() => {
                    setOpen1(false)
                }}
            />
        </SafeAreaView>
    );
};
export default UpdateMember;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    container: {
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 10,
        height: 50,
        marginTop: 12,
        borderWidth: 1,

        borderColor: '#B8B8D2',
    },
    dropdown1BtnStyle: {
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 10,
        height: 50,
        marginTop: 12,
        borderWidth: 1,
        width: '100%',

        borderColor: '#B8B8D2',
    },
    dropdown1BtnTxtStyle: {
        color: '#1C1C24',
        textAlign: 'left',
        fontSize: 16,
        marginLeft: 5,
        fontFamily: 'AvenirLTStd-Medium',
        fontWeight: '500',
    },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#B8B8D2' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

    dropdown2BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#444',
    },
    dropdown2BtnTxtStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dropdown2DropdownStyle: {
        backgroundColor: '#444',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#B8B8D2' },
    dropdown2RowTxtStyle: {
        color: '#B8B8D2',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    dropdown3BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 0,
        borderWidth: 4,
        borderRadius: 8,
        borderColor: '#444',
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
    dropdown3BtnTxt: {
        color: '#444',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 12,
    },
    dropdown3DropdownStyle: { backgroundColor: 'slategray' },
    dropdown3RowStyle: {
        backgroundColor: 'slategray',
        borderBottomColor: '#B8B8D2',
        height: 50,
    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
    dropdown3RowTxt: {
        color: '#F1F1F1',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 12,
    },

    dropdown4BtnStyle: {
        width: '50%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 4,
        borderColor: '#444',
    },
});
