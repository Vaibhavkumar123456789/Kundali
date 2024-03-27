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
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper';
import Button from 'react-native-button';
import CheckBox from '@react-native-community/checkbox';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import { Dropdown } from 'react-native-element-dropdown';
const MembershipForm = ({ navigation }) => {
    const { _kundali, _customlang } = stringsoflanguages
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [checked, setChecked] = React.useState(false);
    const [checked1, setChecked1] = React.useState(false);
    const gender = [_kundali.male, _kundali.female]
    const married = [_kundali.married, _kundali.unmarried, _kundali.divorce]
    const service = [_kundali.business, _kundali.service]
    const [checked2, setChecked2] = React.useState(false);
    const goverment = [_kundali.private, _kundali.government]
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const [type, setType] = useState(false)
    const [date, setDate] = useState('')
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

    const [select, setSelect] = useState()
    const [type1, setType1] = useState(false)
    const [date1, setDate1] = useState('')
    const [pdate1, setPDate1] = useState('')
    const [open1, setOpen1] = useState(false)
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    const [data, setData] = useState([
        { id: '1', title: 'Education', checked4: false },
        { id: '2', title: 'Finace', checked4: false },
        { id: '3', title: 'Health', checked4: false },
        { id: '4', title: 'Marriage', checked4: false },
        { id: '5', title: 'Business', checked4: false },
        { id: '6', title: 'Happy Life', checked4: false },
        { id: '7', title: 'Service', checked4: false },
        { id: '8', title: 'All the above', checked4: false },
        { id: '9', title: 'Career', checked4: false },
        { id: '10', title: 'Other', checked4: false },

    ]);
    const data1 = [
        {

        },
        {

        },
    ]

    const labels = [
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/back.png')}
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
                        />

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
                                    data={[
                                        { label: 'Item 1', value: '1' },
                                        { label: 'Item 2', value: '2' },
                                        { label: 'Item 3', value: '3' }]
                                    }
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={_kundali.chilegender}
                                    value={should1}
                                    onChange={(item) => setShould1(item.value)}
                                />

                            </View>
                        </View>

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
                                    data={[
                                        { label: 'Item 1', value: '1' },
                                        { label: 'Item 2', value: '2' },
                                        { label: 'Item 3', value: '3' }]
                                    }
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={_kundali.chilegender}
                                    value={should2}
                                    onChange={(item) => setShould2(item.value)}
                                />

                            </View>
                        </View>

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
                                    data={[
                                        { label: 'Item 1', value: '1' },
                                        { label: 'Item 2', value: '2' },
                                        { label: 'Item 3', value: '3' }]
                                    }
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={_kundali.chilegender}
                                    value={should3}
                                    onChange={(item) => setShould3(item.value)}
                                />

                            </View>
                        </View>

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

                        <FlatList
                            numColumns={2}
                            data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: window.width / 2 - 50, marginLeft: 12, marginTop: 10 }}>
                                    <CheckBox
                                        value={item.checked4}
                                        tintColors={{ true: '#FFC629', false: '#00000050' }}
                                        onValueChange={(newValue) =>
                                            setData((prevData) =>
                                                prevData.map((dataItem) =>
                                                    dataItem.id === item.id ? { ...dataItem, checked4: newValue } : dataItem
                                                )
                                            )
                                        }
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'AvenirLTStd-Medium',
                                            color: '#333333',
                                            fontSize: 16,
                                            marginLeft: 5,
                                        }}>
                                        {item.title}
                                    </Text>
                                </View>
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
                        />
                    </View>
                )}

                {currentPosition == 4 && (
                    <View>
                        <FlatList
                            data={data1}

                            renderItem={({ item, index }) => (
                                <Pressable style={{
                                    marginHorizontal: 18,
                                    paddingVertical: 12,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 12,
                                    borderColor: index == select ? '#FFCC80' : '#D0D0D0',
                                    borderWidth: 2,
                                    elevation: 5,
                                    bottom: 10,
                                    marginTop: 15,
                                }} onPress={() => { setSelect(index) }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 18,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginLeft: 10,
                                        }}>
                                            Free Trial
                                        </Text>
                                        <Text style={{
                                            fontSize: 18,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginRight: 10,
                                        }}>
                                            ₹1100/mo
                                        </Text>
                                    </View>

                                    <Text style={{
                                        fontSize: 13,
                                        color: '#36363660',
                                        lineHeight: 17,
                                        marginTop: 5,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </Text>
                                </Pressable>

                            )}
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
                            setCurrentPosition(currentPosition + 1)
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
                                setCurrentPosition(currentPosition + 1)
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
                                setCurrentPosition(currentPosition + 1)
                            }}>
                            {_customlang.button}
                        </Button>
                    </View>
                )}

                {currentPosition == 3 && (
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
                                setCurrentPosition(currentPosition + 1)
                            }}>
                            {_customlang.button}
                        </Button>
                    </View>
                )}

            </KeyboardAwareScrollView>





            {currentPosition == 4 && (
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
                            navigation.navigate('Payment')
                        }}>
                        {_kundali.paynow}
                    </Button>
                </View>
            )}


            <DatePicker
                modal
                open={open}
                mode={'date'}
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
        </SafeAreaView>
    );
};
export default MembershipForm;

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
