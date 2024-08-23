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
import StepIndicator from 'react-native-step-indicator';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import Button from 'react-native-button';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import Loader from '../utils/Loader';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker, { types } from 'react-native-document-picker';
import {
    AsyncStorageGettoken,
    City1,
    Consultant,
    Country,
    Language,
    Skill,
    Specialization,
    State1,
    StepFourtheditprofile,
    StepOneditprofile,
    StepSecondeditprofile,
    StepThirdeditprofile,
} from '../backend/Api';
var validator = require('email-validator');
import { BASE_URL } from '../backend/Config';
import { validateEmail } from '../utils/utils';

const AstrologerRegister = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    const { _kundali, _astrologerForm, _customlang } = stringsoflanguages

    const isFocused = useIsFocused();
    const [checked, setChecked] = React.useState(route.params?.user_profile?.gender === null
        ? false
        : route.params?.user_profile?.gender === "Male"
            ? 0
            : route.params?.user_profile?.gender === "Female" ? 1 : null);
    const [checked1, setChecked1] = React.useState(route.params?.user_profile?.astrologer_you_are === null
        ? false
        : route.params?.user_profile?.astrologer_you_are === "Full Time"
            ? 0
            : route.params?.user_profile?.astrologer_you_are === "Part Time" ? 1 : null);
    const gender = [_kundali.male, _kundali.female]
    const astrologertype = ["Full Time", "Part Time"]
    const [type, setType] = useState(false)
    const [date, setDate] = useState(route.params?.user_profile?.dob === null ? "" : route.params?.user_profile?.dob)
    const [pdate, setPDate] = useState('')
    const [open, setOpen] = useState(false)
    const [currentPosition, setCurrentPosition] = React.useState(0);
    const [should1, setShould1] = useState('')
    const [should2, setShould2] = useState('')
    const [should3, setShould3] = useState('')
    const [should4, setShould4] = useState('')
    const [should5, setShould5] = useState('')
    const [should6, setShould6] = useState('')
    const [should7, setShould7] = useState('')
    const [banktype, setBankType] = useState('')
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [name, setName] = React.useState(route.params?.user_profile?.name);
    const [email, setEmail] = React.useState(route.params?.user_profile?.email);
    const [mobile, setMobile] = useState(route.params?.user_profile?.mobile)
    const [experience, setExperience] = useState(route.params?.user_profile?.experience.toString())
    const [hour, setHour] = useState(route.params?.user_profile?.contribute_daily == null ? "" : route.params?.user_profile?.contribute_daily.toString())
    const [bankname, setBankName] = useState(route.params?.user_profile?.getdocs == null ? "" : route.params?.user_profile?.getdocs?.bank_name)
    const [accountnumber, setAccountNumber] = useState(route.params?.user_profile?.getdocs == null ? "" : route.params?.user_profile?.getdocs?.bank_account_number.toString())
    const [ifsc, setIFSC] = useState(route.params?.user_profile?.getdocs == null ? "" : route.params?.user_profile?.getdocs?.ifsc_code)
    const [holdername, setHolderName] = useState(route.params?.user_profile?.getdocs == null ? "" : route.params?.user_profile?.getdocs?.account_holder_name)
    const [input, setInput] = useState([])
    const [skill, setSkill] = useState([])
    const [specilization, setSpecilization] = useState([])
    const [languagelisted, setLanguageListed] = useState([])
    const [passport1Full, setPassport1Full] = useState('')
    const [passport2Full, setPassport2Full] = useState('')
    const [resumeFull, setResumeFull] = useState('')
    const [pancard, setPanCard] = useState(route.params?.user_profile?.getdocs?.pancard == null ? "" : route.params?.user_profile?.getdocs?.pancard)
    const [aadharcard, setAadhar] = useState(route.params?.user_profile?.getdocs?.aadhar_number == null ? "" : route.params?.user_profile?.getdocs?.aadhar_number.toString())
    const [academicqual, setAcademicQual] = useState(route.params?.user_profile?.getdocs?.qualification == null ? "" : route.params?.user_profile?.getdocs?.qualification)
    const [astroqualification, setAstroQualification] = useState(route.params?.user_profile?.getdocs?.astrologer_qualification == null ? "" : route.params?.user_profile?.getdocs?.astrologer_qualification)
    const [acadmic, setAcadmic] = useState('')
    const [astrological, setAstrological] = useState('')
    const [picture, setPicture] = useState('')
    const [biography, setBiography] = useState(route.params?.user_profile?.getdocs?.biography == null ? "" : route.params?.user_profile?.getdocs?.biography)
    const [clist, setCList] = useState([])
    const [statelist1, setStateList] = useState([])
    const [cityname, setCityName] = useState([])
    const [address, setAddress] = useState(route.params?.user_profile?.address == null ? "" : route.params?.user_profile?.address)
    const [centrename, setCentreName] = useState(route.params?.user_profile?.institute_centre_name)
    const [pincode, setPincode] = useState(route.params?.user_profile?.pincode == null ? "" : route.params?.user_profile?.pincode.toString())
    const labels = [
        '',
        '',
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

    useEffect(() => {
        Skillset()
        custom()
        mainset()
        languagelist()
        Countrysearch()
    }, [isFocused])
    const custom = () => {
        toggleLoading(true);
        Consultant()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.name,
                        })
                        setInput(tempCArr)
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
    const Skillset = () => {
        toggleLoading(true);
        Skill()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.name,
                        })
                        setSkill(tempCArr)
                    })
                } else {
                    alert(data?.msg)
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }
    const mainset = () => {
        toggleLoading(true);
        Specialization()
            .then(data => {
                // alert(JSON.stringify(data,null,2))
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.name,
                        })
                        setSpecilization(tempCArr)
                    })
                } else {
                    alert(data?.msg)
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }

    const languagelist = () => {
        toggleLoading(true);
        Language()
            .then(data => {
                toggleLoading(false);
                // alert(JSON.stringify(data,null,2))
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.name,
                        })
                        setLanguageListed(tempCArr)
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
                        setCList(tempCArr)
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

    const getPassport = async (item) => {
        try {
            const response = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            })
            if (response) {
                console.log("document picker response ==", response)
                if (item == "1") {
                    setPassport1Full(response)
                }
                else if (item == "2") {
                    setPassport2Full(response)
                } else if (item == "3") {
                    setResumeFull(response)
                } else if (item == "4") {
                    setAcadmic(response)
                }
                else if (item == "5") {
                    setAstrological(response)
                }
                else if (item == "6") {
                    setPicture(response)
                }

            }
        } catch (error) {
            console.log(error)
        }
    }


    // const Freepackage = async () => {
    //     try {
    //         let formData = new FormData();
    //         formData.append('newsignup', 1)
    //         formData.append('user_type', field.type)             //astrologer == 2 , user == 1
    //         formData.append('name', name)
    //         formData.append('email', email)
    //         formData.append('mobile', mobile)
    //         formData.append('status', 1)
    //         formData.append('password', password)
    //         formData.append('gender', checked === 0 ? "male" : checked === 1 ? "female" : null)
    //         formData.append('dob', date == '' ? '' : moment(date).format('YYYY-MM-DD'))
    //         formData.append('create_profile ', 1)
    //         formData.append('consultation_id', should1)
    //         formData.append('skill_id', should2)
    //         formData.append('specialization_id', should3)
    //         formData.append('langugae_id', should4)
    //         formData.append('experience', experience)
    //         formData.append('contribute_daily', hour)
    //         formData.append('bank_account_number', accountnumber)
    //         formData.append('bank_name', bankname)
    //         formData.append('ifsc_code', ifsc)
    //         formData.append('address', address)
    //         formData.append('country', should5)
    //         formData.append('state', should6)
    //         formData.append('city', should7)
    //         formData.append('pincode', pincode)
    //         formData.append('pancard', pancard)
    //         formData.append('aadhar_number', aadharcard)
    //         formData.append('aadharcard_image', {
    //             uri: passport1Full[0].uri,
    //             type: passport1Full[0].type,
    //             name: passport1Full[0].name,
    //         });
    //         formData.append('aadharcard_back_image', {
    //             uri: passport2Full[0].uri,
    //             type: passport2Full[0].type,
    //             name: passport2Full[0].name,
    //         })
    //         formData.append('pancard_image', {
    //             uri: resumeFull[0].uri,
    //             type: resumeFull[0].type,
    //             name: resumeFull[0].name,
    //         })
    //         formData.append('academic_qualification', academicqual)
    //         formData.append('astrologer_qualification', astroqualification)
    //         formData.append('academic_certificate', {
    //             uri: acadmic[0].uri,
    //             type: acadmic[0].type,
    //             name: acadmic[0].name,
    //         });

    //         formData.append('astrologer_certificate', {
    //             uri: astrological[0].uri,
    //             type: astrological[0].type,
    //             name: astrological[0].name,
    //         })

    //         formData.append('profile_picture', {
    //             uri: picture[0].uri,
    //             type: picture[0].type,
    //             name: picture[0].name,
    //         })
    //         formData.append('biography', biography)

    //         console.log('complete astrologer profile', formData)
    //         toggleLoading(true);
    //         axios
    //             .post(
    //                 `${BASE_URL}astrologer/signup`,
    //                 formData,
    //                 {
    //                     headers: {
    //                         'Content-Type': 'multipart/form-data',
    //                         // Add any additional headers as needed
    //                     },
    //                 },
    //             )
    //             .then(response => {
    //                 toggleLoading(false);
    //                 // alert(JSON.stringify(response.data, null, 2))
    //                 navigation.goBack()
    //             })
    //             .catch(error => {
    //                 toggleLoading(true);
    //                 axios
    //                     .post(
    //                         `${BASE_URL}astrologer/signup`,
    //                         formData,
    //                         {
    //                             headers: {
    //                                 'Content-Type': 'multipart/form-data',
    //                                 // Add any additional headers as needed
    //                             },
    //                         },
    //                     )
    //                     .then(response => {
    //                         toggleLoading(false);
    //                         navigation.goBack()

    //                     })
    //                     .catch(error => {
    //                         // Handle errors
    //                         toggleLoading(false);
    //                         console.error('Error uploading files', error);
    //                     });
    //                 // Handle errors
    //                 toggleLoading(false);
    //                 console.error('Error uploading files1', error);
    //             });

    //     } catch (error) {
    //         toggleLoading(false)
    //         console.log(error)
    //     }
    // }

    const setsubmit = async () => {
        try {
            if (pancard == '') {
                Toast.show('Please enter your Pan Card No.');
            }
            else if (pancard.length !== 10) {
                Toast.show('Please enter your valid Pan Card No.');
            }
            else if (aadharcard == '') {
                Toast.show('Please enter your Aadhar Card No.');
            }
            else if (aadharcard.length !== 12) {
                Toast.show('Please enter your valid Aadhar Card No.');
            }
            else if (passport1Full == '' && route.params?.user_profile?.getdocs?.aadharcard_frontimage == null) {
                Toast.show('Please upload your Aadhar card');
            }
            else if (passport2Full == '' && route.params?.user_profile?.getdocs?.aadharcard_backimage == null) {
                Toast.show('Please upload your Aadhar card');
            } else if (resumeFull == '' && route.params?.user_profile?.getdocs?.pancard_image == null) {
                Toast.show('Please upload your Pan card');
            }

            else {
                toggleLoading(true)
                let formData = new FormData();
                formData.append('pancard', pancard)
                formData.append('aadhar_number', aadharcard)

                formData.append('aadharcard_frontimage',
                    passport1Full === ""
                        ?
                        (route.params?.user_profile?.getdocs?.aadharcard_frontimage == null
                            ? ""
                            // : `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.aadharcard_frontimage}`
                            : ""
                        )
                        :
                        {
                            uri: passport1Full[0].uri,
                            type: passport1Full[0].type,
                            name: passport1Full[0].name,
                        }
                );
                formData.append('aadharcard_fbackimage',
                    passport2Full === ""
                        ?
                        (route.params?.user_profile?.getdocs?.aadharcard_backimage == null
                            ? ""
                            // : `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.aadharcard_backimage}`
                            : ""
                        )
                        :
                        {
                            uri: passport2Full[0].uri,
                            type: passport2Full[0].type,
                            name: passport2Full[0].name,
                        }
                );
                formData.append('pancard_image',
                    resumeFull === ""
                        ?
                        (route.params?.user_profile?.getdocs?.pancard_image == null
                            ? ""
                            // : `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.pancard_image}`
                            : ""
                        )
                        :
                        {
                            uri: resumeFull[0].uri,
                            type: resumeFull[0].type,
                            name: resumeFull[0].name,
                        }
                );

                // alert(JSON.stringify(formData, null, 2))
                // return
                console.log(JSON.stringify(formData))

                const token = (await AsyncStorageGettoken() || '')
                const btoken = `Bearer ${token}`;

                const res = await fetch(`${BASE_URL}astrologer/edit-profile-five`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": btoken,
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData,
                });
                const response1 = await res.json()
                toggleLoading(false)
                // console.log(response1)
                // alert(JSON.stringify(response1, null, 2))
                if (response1.status) {
                    setCurrentPosition(currentPosition + 1)
                } else {
                    alert(response1.msg);
                }
            }
        } catch (error) {
            toggleLoading(false)
            console.log(error)
        }
    };

    const removeItem2 = () => {
        setPassport1Full('');
    };
    const removeItem3 = () => {
        setPassport2Full('');
    };
    const removeItem4 = () => {
        setResumeFull('');
    };

    const finalSubmit = async () => {
        try {
            if (academicqual == '') {
                Toast.show('Please enter your Acadmic Qualification');
            }
            else if (astroqualification == '') {
                Toast.show('Please enter your Astrological Qualifications');
            }
            else if (acadmic == '' && route.params?.user_profile?.getdocs?.academic_certificate == null) {
                Toast.show('Please upload your Acadmic Certificate');
            }
            else if (astrological == '' && route.params?.user_profile?.getdocs?.astrologer_certificate == null) {
                Toast.show('Please upload your Astrological Certificate');
            } else if (picture == '' && route.params?.user_profile?.image == null) {
                Toast.show('Please upload your Profile Picture');
            }
            else if (biography == '') {
                Toast.show('Please enter Biography');
            }
            else {
                toggleLoading(true)
                let formData = new FormData();
                formData.append('qualification', academicqual)
                formData.append('astrologer_qualification', astroqualification)

                formData.append('academic_certificate',
                    acadmic === ""
                        ?
                        (route.params?.user_profile?.getdocs?.academic_certificate == null
                            ? ""
                            // : `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.academic_certificate}`
                            : ""
                        )
                        :
                        {
                            uri: acadmic[0].uri,
                            type: acadmic[0].type,
                            name: acadmic[0].name,
                        }
                );
                formData.append('astrologer_certificate',
                    astrological === ""
                        ?
                        (route.params?.user_profile?.getdocs?.astrologer_certificate == null
                            ? ""
                            // : `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.astrologer_certificate}`
                            : ""
                        )
                        :
                        {
                            uri: astrological[0].uri,
                            type: astrological[0].type,
                            name: astrological[0].name,
                        }
                );
                formData.append('profile_picture',
                    picture === ""
                        ?
                        (route.params?.user_profile?.image == null
                            ? ""
                            // : `${route.params?.path}/${route.params?.user_profile?.image}`
                            : ""
                        )
                        :
                        {
                            uri: picture[0].uri,
                            type: picture[0].type,
                            name: picture[0].name,
                        }
                );

                formData.append('biography', biography)
                // alert(JSON.stringify(formData, null, 2))
                // return
                console.log(JSON.stringify(formData))
                const token = (await AsyncStorageGettoken() || '')
                const btoken = `Bearer ${token}`;
                // alert(JSON.stringify(btoken, null, 2))
                // return
                const res = await fetch(`${BASE_URL}astrologer/edit-profile-six`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        'Content-Type': "multipart/form-data",
                        "Authorization": btoken,
                    },
                    body: formData,
                });
                const response1 = await res.json()
                // alert(JSON.stringify(response1, null, 2))
                console.log('Step6', response1)
                toggleLoading(false)
                if (response1.status) {
                    Toast.show('Profile Updated')
                    navigation.goBack()
                } else {
                    // alert(response1?.msg);
                }
            }
        } catch (error) {
            toggleLoading(false)
            console.log(error)
        }
    };

    const removeItem5 = () => {
        setAcadmic('');
    };
    const removeItem6 = () => {
        setAstrological('');
    };
    const removeItem7 = () => {
        setPicture('');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={'Your Professional Profile'}
            />
            {state.loading && <Loader />}
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
                            editable={false}
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
                            editable={false}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize='none'
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
                            editable={false}
                            maxLength={10}
                            value={mobile}
                            onChangeText={(text) => setMobile(text)}
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
                                marginTop: 12,
                                marginHorizontal: 18,
                            }}>
                            {_kundali.dateofbirth}
                        </Text>

                        <TouchableOpacity activeOpacity={0.9} style={{
                            marginHorizontal: 18,
                            borderRadius: 10,
                            borderColor: '#00000020',
                            borderWidth: 1.5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 52,
                            marginTop: 10,
                        }} onPress={() => { setOpen(true), setType(false) }}>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    color: '#333333',
                                    fontFamily: 'AvenirLTStd-Medium',
                                    paddingHorizontal: 15,
                                }}
                                editable={false}
                                placeholderTextColor={'#333333'}
                                value={date ? moment(date).format('DD-MM-YYYY') : ''}
                                placeholder={_kundali.dateofbirth}
                            />
                            <Image
                                source={require('../assets/calendar.png')}
                                style={{
                                    padding: 10,
                                    marginRight: 12,
                                    marginTop: 13,
                                    height: 20,
                                    width: 20,
                                    resizeMode: 'stretch',
                                    alignItems: 'center',
                                }}
                            />
                        </TouchableOpacity>

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
                            {_astrologerForm.consulatant}
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
                            data={input}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={should1 === ''
                                ? (route.params?.user_profile?.consultation == null
                                    ? _astrologerForm.consulatant
                                    : route.params?.user_profile?.consultation)
                                : should1}
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
                            {_astrologerForm.skill}
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
                            data={skill}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={should2 === ''
                                ? (route.params?.user_profile?.skills == null
                                    ? _astrologerForm.skill
                                    : route.params?.user_profile?.skills)
                                : should2}
                            value={should2}
                            onChange={(item) => setShould2(item.value)}
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
                            {_astrologerForm.main}
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
                            data={specilization}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={should3 === ''
                                ? (route.params?.user_profile?.specialization == null
                                    ? _astrologerForm.main
                                    : route.params?.user_profile?.specialization)
                                : should3}
                            value={should3}
                            onChange={(item) => setShould3(item.value)}
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
                            {_astrologerForm.language}
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
                            data={languagelisted}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={should4 === ''
                                ? (route.params?.user_profile?.language == null
                                    ? _astrologerForm.language
                                    : route.params?.user_profile?.language)
                                : should4}
                            value={should4}
                            onChange={(item) => setShould4(item.value)}
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
                            {_astrologerForm.experience}
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
                            placeholder={_astrologerForm.experience}
                            keyboardType='numeric'
                            value={experience}
                            onChangeText={(text) => setExperience(text)}
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
                            Which type of astrologer you are?
                        </Text>

                        <FlatList
                            data={astrologertype}
                            horizontal
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => {
                                    setChecked1(index)
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 13, marginTop: 5 }}>
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
                            {_astrologerForm.bankname}
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
                            placeholder={_astrologerForm.bankname}
                            value={bankname}
                            onChangeText={(text) => setBankName(text)}
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
                            {_astrologerForm.bankaccountnumber}
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
                            placeholder={_astrologerForm.bankaccountnumber}
                            value={accountnumber}
                            onChangeText={(text) => setAccountNumber(text)}
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
                            {_astrologerForm.Ifsc}
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
                            autoCapitalize='characters'
                            placeholderTextColor={'#333333'}
                            placeholder={_astrologerForm.Ifsc}
                            value={ifsc}
                            onChangeText={(text) => setIFSC(text)}
                        />

                        {/* <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 19,
                                marginHorizontal: 18,
                            }}>
                            Account Holder Name
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
                            autoCapitalize='characters'
                            placeholderTextColor={'#333333'}
                            placeholder={'Account Holder Name'}
                            value={holdername}
                            onChangeText={(text) => setHolderName(text)}
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
                            Account Type
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
                            data={[
                                { label: 'Saving', value: 'Saving' },
                                { label: 'Current', value: 'Current' }
                            ]}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={banktype === ''
                                ? (route.params?.user_profile?.getdocs == null || route.params?.user_profile?.getdocs?.account_type == null
                                    ? "Account Type"
                                    : route.params?.user_profile?.getdocs?.account_type)
                                : banktype}
                            value={banktype}
                            onChange={(item) => setBankType(item.value)}
                        /> */}

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
                            {_astrologerForm.address}
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
                            placeholder={_astrologerForm.address}
                            value={address}
                            onChangeText={(text) => setAddress(text)}
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
                            {_astrologerForm.country}
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
                            searchPlaceholder={_astrologerForm.country}
                            inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                            labelField="label"
                            valueField="value"
                            placeholder={should5 === ''
                                ? (route.params?.user_profile?.country_name == ""
                                    ? _astrologerForm.country
                                    : route.params?.user_profile?.country_name)
                                : should5}
                            value={should5}
                            onChange={(item) => {
                                setShould5(item.value), statelist(item.value)
                                setShould6(""), setShould7("")
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
                            search
                            searchPlaceholder={_astrologerForm.statename}
                            inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={should6 === ''
                                ? (route.params?.user_profile?.state_name == ""
                                    ? _astrologerForm.statename
                                    : route.params?.user_profile?.state_name)
                                : should6}
                            value={should6}
                            onChange={(item) => { setShould6(item.value), citylist(item.value), setShould7("") }}
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
                            search
                            searchPlaceholder={_astrologerForm.city}
                            inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={should7 === ''
                                ? (route.params?.user_profile?.city_name == ""
                                    ? _astrologerForm.city
                                    : route.params?.user_profile?.city_name)
                                : should7}
                            value={should7}
                            onChange={(item) => setShould7(item.value)}
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
                            {_astrologerForm.pincode}
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
                            maxLength={6}
                            placeholder={_astrologerForm.pincode}
                            value={pincode}
                            onChangeText={(text) => setPincode(text)}
                        />


                    </View>
                )}

                {currentPosition == 4 && (
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
                            {_astrologerForm.pancardno}
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
                            maxLength={10}
                            placeholder={_astrologerForm.pancardno}
                            autoCapitalize='characters'
                            value={pancard}
                            onChangeText={(text) => setPanCard(text)}
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
                            {_astrologerForm.aadharcardno}
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
                            maxLength={12}
                            placeholder={_astrologerForm.aadharcardno}
                            value={aadharcard}
                            onChangeText={(text) => setAadhar(text)}
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
                            {_astrologerForm.uploadaadhar}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable onPress={() => { getPassport("1") }} >
                                <ImageBackground
                                    resizeMode='cover'
                                    style={{
                                        width: 100,
                                        height: 80,
                                        overflow: 'hidden',
                                        marginLeft: 18,
                                        borderRadius: 8,
                                    }}
                                    source={passport1Full === "" ?
                                        route.params?.user_profile?.getdocs?.aadharcard_frontimage == null ?
                                            require('../assets/upload.png') :
                                            { uri: `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.aadharcard_frontimage}` } :
                                        { uri: `${passport1Full[0].uri}` }}
                                >

                                    {(passport1Full &&
                                        <Pressable onPress={() => { removeItem2() }} style={{ alignSelf: 'flex-end', marginTop: 3, marginRight: 5 }}>
                                            <Image
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    resizeMode: 'contain',

                                                }}
                                                source={require('../assets/close1.png')} />
                                        </Pressable>
                                    )}
                                </ImageBackground>

                            </Pressable>

                            <Pressable onPress={() => { getPassport("2") }} >
                                <ImageBackground
                                    resizeMode='cover'
                                    style={{
                                        width: 100,
                                        height: 80,
                                        overflow: 'hidden',
                                        marginLeft: 15,
                                        borderRadius: 8,
                                    }}

                                    source={passport2Full === "" ?
                                        route.params?.user_profile?.getdocs?.aadharcard_backimage == null ?
                                            require('../assets/upload.png') :
                                            { uri: `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.aadharcard_backimage}` } :
                                        { uri: `${passport2Full[0].uri}` }}>

                                    {(passport2Full &&
                                        <Pressable onPress={() => { removeItem3() }} style={{ alignSelf: 'flex-end', marginTop: 3, marginRight: 5 }}>
                                            <Image
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    resizeMode: 'contain',
                                                }}
                                                source={require('../assets/close1.png')} />
                                        </Pressable>
                                    )}
                                </ImageBackground>
                            </Pressable>
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
                            {_astrologerForm.uploadpan}
                        </Text>
                        <Pressable onPress={() => { getPassport("3") }} >
                            <ImageBackground
                                resizeMode='cover'
                                style={{
                                    width: 100,
                                    height: 80,
                                    marginLeft: 18,
                                    marginTop: 10,
                                    overflow: 'hidden',
                                    borderRadius: 8,
                                }}
                                source={resumeFull === "" ?
                                    route.params?.user_profile?.getdocs?.pancard_image == null ?
                                        require('../assets/upload.png') :
                                        { uri: `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.pancard_image}` } :
                                    { uri: `${resumeFull[0].uri}` }}>

                                {(resumeFull &&
                                    <Pressable onPress={() => { removeItem4() }} style={{ alignSelf: 'flex-end', marginTop: 3, marginRight: 5 }}>
                                        <Image
                                            style={{
                                                width: 18,
                                                height: 18,
                                                resizeMode: 'contain',
                                            }}
                                            source={require('../assets/close1.png')} />
                                    </Pressable>
                                )}
                            </ImageBackground>
                        </Pressable>

                    </View>
                )}

                {currentPosition == 5 && (
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
                            {_astrologerForm.acadmicqualification}
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
                            placeholder={_astrologerForm.acadmicqualification}
                            value={academicqual}
                            onChangeText={(text) => setAcademicQual(text)}
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
                            {_astrologerForm.astrological}
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
                            placeholder={_astrologerForm.astrological}
                            value={astroqualification}
                            onChangeText={(text) => setAstroQualification(text)}
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
                            {_astrologerForm.uploadacademic}
                        </Text>
                        <Pressable onPress={() => { getPassport("4") }}>
                            <ImageBackground
                                resizeMode='cover'
                                style={{
                                    width: 100,
                                    height: 80,
                                    marginLeft: 18,
                                    marginTop: 10,
                                    overflow: 'hidden',
                                    borderRadius: 8,
                                }}
                                // source={acadmic ? { uri: `${acadmic[0].uri}` } : require('../assets/upload.png')}>
                                source={acadmic === "" ?
                                    route.params?.user_profile?.getdocs?.academic_certificate == null ?
                                        require('../assets/upload.png') :
                                        { uri: `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.academic_certificate}` } :
                                    { uri: `${acadmic[0].uri}` }}>
                                {(acadmic &&
                                    <Pressable onPress={() => { removeItem5() }} style={{ alignSelf: 'flex-end', marginTop: 3, marginRight: 5 }}>
                                        <Image
                                            style={{
                                                width: 18,
                                                height: 18,
                                                resizeMode: 'contain',
                                            }}
                                            source={require('../assets/close1.png')} />
                                    </Pressable>
                                )}
                            </ImageBackground>
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
                            {_astrologerForm.uploadastrological}
                        </Text>
                        <Pressable onPress={() => { getPassport("5") }}>
                            <ImageBackground
                                resizeMode='cover'
                                style={{
                                    width: 100,
                                    height: 80,
                                    marginLeft: 18,
                                    marginTop: 10,
                                    overflow: 'hidden',
                                    borderRadius: 8,
                                }}
                                // source={astrological ? { uri: `${astrological[0].uri}` } : require('../assets/upload.png')}>
                                source={astrological === "" ?
                                    route.params?.user_profile?.getdocs?.astrologer_certificate == null ?
                                        require('../assets/upload.png') :
                                        { uri: `${route.params?.docpath}/${route.params?.user_profile?.getdocs?.astrologer_certificate}` } :
                                    { uri: `${astrological[0].uri}` }}>
                                {(astrological &&
                                    <Pressable onPress={() => { removeItem6() }} style={{ alignSelf: 'flex-end', marginTop: 3, marginRight: 5 }}>
                                        <Image
                                            style={{
                                                width: 18,
                                                height: 18,
                                                resizeMode: 'contain',
                                            }}
                                            source={require('../assets/close1.png')} />
                                    </Pressable>
                                )}
                            </ImageBackground>
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
                            {_astrologerForm.uploadprofile}
                        </Text>
                        <Pressable onPress={() => { getPassport("6") }}>
                            <ImageBackground
                                resizeMode='cover'
                                style={{
                                    width: 100,
                                    height: 80,
                                    marginLeft: 18,
                                    marginTop: 10,
                                    overflow: 'hidden',
                                    borderRadius: 8,
                                }}
                                // source={picture ? { uri: `${picture[0].uri}` } : require('../assets/upload.png')}>
                                source={picture === "" ?
                                    route.params?.user_profile?.image == null ?
                                        require('../assets/upload.png') :
                                        { uri: `${route.params?.path}/${route.params?.user_profile?.image}` } :
                                    { uri: `${picture[0].uri}` }}>
                                {(picture &&
                                    <Pressable onPress={() => { removeItem7() }} style={{ alignSelf: 'flex-end', marginTop: 3, marginRight: 5 }}>
                                        <Image
                                            style={{
                                                width: 18,
                                                height: 18,
                                                resizeMode: 'contain',
                                            }}
                                            source={require('../assets/close1.png')} />
                                    </Pressable>
                                )}
                            </ImageBackground>
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
                            {_astrologerForm.biography}
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
                                height: 120,
                                color: '#333333',
                            }}
                            textAlignVertical='top'
                            multiline
                            placeholderTextColor={'#333333'}
                            placeholder={_astrologerForm.writesomething}
                            value={biography}
                            onChangeText={(text) => setBiography(text)}
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
                            else if (email == '') {
                                Toast.show('Please enter Email');
                            }
                            else if (!validateEmail(email)) {
                                Toast.show('Please enter your valid email address');
                            }
                            else if (mobile === '' || mobile.length !== 10) {
                                Toast.show('Please enter your valid phone number');
                            } else if (centrename == '') {
                                Toast.show('Please enter Centre Name');
                            }
                            else if (checked === false) {
                                Toast.show('Please Select Gender');
                            }
                            else if (date == '') {
                                Toast.show('Please Select Date');
                            }
                            else {

                                let e = {
                                    "name": name,
                                    "email": email,
                                    "mobile": mobile,
                                    "gender": checked === 0 ? "Male" : checked === 1 ? "Female" : null,
                                    "institute_centre_name": centrename,
                                    "dob": date == '' ? '' : moment(date).format('YYYY-MM-DD')
                                };
                                // alert(JSON.stringify(e, null, 2))
                                // return
                                toggleLoading(true);
                                StepOneditprofile(e)
                                    .then(data => {
                                        // console.log(JSON.stringify(data, null, 2))
                                        toggleLoading(false);
                                        if (data.status) {
                                            setCurrentPosition(currentPosition + 1)
                                        } else {
                                            alert(data?.msg);
                                        }
                                    })
                                    .catch(error => {
                                        toggleLoading(false);
                                        console.log('error', error);
                                    });
                            }

                        }}>
                        {_customlang.button}
                    </Button>
                )}

                {currentPosition == 1 && (
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
                            if (should1 == '' && route.params?.user_profile?.consultation == null) {
                                Toast.show('Please select consultant');
                            } else if (should2 == '' && route.params?.user_profile?.skills == null) {
                                Toast.show('Please select skill');
                            } else if (should3 == '' && route.params?.user_profile?.specialization == null) {
                                Toast.show('Please selct Main Specialization');
                            } else if (should4 == '' && route.params?.user_profile?.language == null) {
                                Toast.show('Please select Language');
                            }
                            else if (experience == '') {
                                Toast.show('Please enter Experience');
                            }
                            else if (checked1 === false) {
                                Toast.show('Please select which type of atrologer you are');
                            }
                            else {

                                let e = {
                                    "experience": experience,
                                    "language": should4 === ''
                                        ? (route.params?.user_profile?.language == null
                                            ? ""
                                            : route.params?.user_profile?.language)
                                        : should4,
                                    "skills": should2 === ''
                                        ? (route.params?.user_profile?.skills == null
                                            ? ""
                                            : route.params?.user_profile?.skills)
                                        : should2,
                                    "consultation": should1 === ''
                                        ? (route.params?.user_profile?.consultation == null
                                            ? ""
                                            : route.params?.user_profile?.consultation)
                                        : should1,
                                    "astrologer_you_are": checked1 === 0 ? "Full Time" : checked1 === 1 ? "Part Time" : null,
                                    "specialization": should3 === ''
                                        ? (route.params?.user_profile?.specialization == null
                                            ? ""
                                            : route.params?.user_profile?.specialization)
                                        : should3
                                };
                                // alert(JSON.stringify(e, null, 2))
                                // return
                                toggleLoading(true);
                                StepSecondeditprofile(e)
                                    .then(data => {
                                        // alert(JSON.stringify(data, null, 2))
                                        toggleLoading(false);
                                        if (data.status) {
                                            setCurrentPosition(currentPosition + 1)
                                        } else {
                                            alert(data?.msg);
                                        }
                                    })
                                    .catch(error => {
                                        toggleLoading(false);
                                        console.log('error', error);
                                    });
                            }

                        }}>
                        {_customlang.button}
                    </Button>
                )}

                {currentPosition == 5 && (
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
                            finalSubmit()

                        }}>
                        {_customlang.button}
                    </Button>
                )}


            </KeyboardAwareScrollView>

            {
                currentPosition == 2 && (
                    <Button
                        containerStyle={{
                            width: '90%',
                            position: 'absolute',
                            bottom: 20,
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
                            if (bankname == '') {
                                Toast.show('Please enter Bank Name');
                            } else if (accountnumber == '') {
                                Toast.show('Please enter Bank Account Number');
                            } else if (ifsc == '') {
                                Toast.show('Please enter IFSC Code');
                            }
                            // else if (holdername == '') {
                            //     Toast.show('Please enter account Holder Name');
                            // } else if (banktype == '' && route.params?.user_profile?.getdocs == null) {
                            //     Toast.show('Please Select Accont Type');
                            // }
                            else {
                                let e = {
                                    "bank_account_number": accountnumber,
                                    "ifsc_code": ifsc,
                                    "bank_name": bankname,
                                    // "account_holder_name": holdername,
                                    // "account_type": banktype === ''
                                    //     ? (route.params?.user_profile?.getdocs == null
                                    //         ? ""
                                    //         : route.params?.user_profile?.getdocs?.account_type)
                                    //     : banktype,
                                };
                                // alert(JSON.stringify(e, null, 2))
                                // return
                                toggleLoading(true);
                                StepThirdeditprofile(e)
                                    .then(data => {
                                        // alert(JSON.stringify(data, null, 2))
                                        toggleLoading(false);
                                        if (data.status) {
                                            setCurrentPosition(currentPosition + 1)
                                        } else {
                                            alert(data?.msg);
                                        }
                                    })
                                    .catch(error => {
                                        toggleLoading(false);
                                        console.log('error', error);
                                    });
                            }
                        }}>
                        {_customlang.button}
                    </Button>
                )
            }

            {
                currentPosition == 3 && (
                    <Button
                        containerStyle={{
                            width: '90%',
                            position: 'absolute',
                            bottom: 20,
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
                            if (address == '') {
                                Toast.show('Please enter your address');
                            } else if (should5 == '' && route.params?.user_profile?.country_name == "") {
                                Toast.show('Please select your country');
                            } else if (should6 == '' && route.params?.user_profile?.state_name == "") {
                                Toast.show('Please select your state');
                            } else if (should7 == '' && route.params?.user_profile?.city_name == "") {
                                Toast.show('Please select your city');
                            } else if (pincode == '') {
                                Toast.show('Please enter your pincode');
                            } else if (pincode.length !== 6) {
                                Toast.show('Please enter valid pincode');
                            }
                            else {
                                let e = {
                                    "address": address,
                                    "country_id": should5 === ''
                                        ? (route.params?.user_profile?.country_name == ""
                                            ? ""
                                            : route.params?.user_profile?.country_id)
                                        : should5,
                                    "state_id": should6 === ''
                                        ? (route.params?.user_profile?.state_name == ""
                                            ? ""
                                            : route.params?.user_profile?.state_id)
                                        : should6,
                                    "city_id": should7 === ''
                                        ? (route.params?.user_profile?.city_name == ""
                                            ? ""
                                            : route.params?.user_profile?.city_id)
                                        : should7,
                                    "pincode": pincode
                                };
                                // alert(JSON.stringify(e, null, 2))
                                // return
                                toggleLoading(true);
                                StepFourtheditprofile(e)
                                    .then(data => {
                                        // alert(JSON.stringify(data, null, 2))
                                        toggleLoading(false);
                                        if (data.status) {
                                            setCurrentPosition(currentPosition + 1)
                                        } else {
                                            alert(data?.msg);
                                        }
                                    })
                                    .catch(error => {
                                        toggleLoading(false);
                                        console.log('error', error);
                                    });
                            }
                        }}>
                        {_customlang.button}
                    </Button>
                )
            }

            {
                currentPosition == 4 && (
                    <Button
                        containerStyle={{
                            width: '90%',
                            position: 'absolute',
                            bottom: 20,
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

                            setsubmit()
                        }}>
                        {_customlang.button}
                    </Button>
                )
            }


            <DatePicker
                modal
                open={open}
                mode={'date'}
                maximumDate={new Date()}
                date={date ? new Date(date) : new Date()}
                onConfirm={date => {
                    setOpen(false);
                    type === false ? setDate(date) : setPDate(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />


        </SafeAreaView >
    );
};
export default AstrologerRegister;

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
