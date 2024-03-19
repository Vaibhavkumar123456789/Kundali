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
import StepIndicator from 'react-native-step-indicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper';
import { ButtonStyle } from '../Custom/CustomView';
import Button from 'react-native-button';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import { Dropdown } from 'react-native-element-dropdown';

const MembershipForm = ({ navigation }) => {
    const { _kundali, _customlang } = stringsoflanguages

    const [checked, setChecked] = React.useState(false);
    const gender = [_kundali.male, _kundali.female]
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
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

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



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/back.png')}
                title='Astrologer Register'
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
                            Mobile No.
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
                            placeholder={'Mobile No.'}
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
                            Consultant
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
                                { label: 'Item 1', value: '1' },
                                { label: 'Item 2', value: '2' },
                                { label: 'Item 3', value: '3' }]
                            }
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder="Consultant"
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
                            Skill (Expertise)
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
                                { label: 'Item 1', value: '1' },
                                { label: 'Item 2', value: '2' },
                                { label: 'Item 3', value: '3' }]
                            }
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder="Skill (Expertise)"
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
                            Main Specialization
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
                                { label: 'Item 1', value: '1' },
                                { label: 'Item 2', value: '2' },
                                { label: 'Item 3', value: '3' }]
                            }
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder="Main Specialization"
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
                            Language
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
                                { label: 'Item 1', value: '1' },
                                { label: 'Item 2', value: '2' },
                                { label: 'Item 3', value: '3' }]
                            }
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder="Language"
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
                            Experience
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
                            placeholder={'Experience'}
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
                            How many hours can contribute daily?
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
                            placeholder={'Daily hours'}
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
                            Bank Name
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
                            placeholder={'Bank Name'}
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
                            Bank Account Number
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
                            placeholder={'Bank Account Number'}
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
                            IFSC Code
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
                            placeholder={'IFSC Code'}
                        />


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
                            Address
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
                            placeholder={'Address'}
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
                            Country
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
                                { label: 'Item 1', value: '1' },
                                { label: 'Item 2', value: '2' },
                                { label: 'Item 3', value: '3' }]
                            }
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder="Country"
                            value={should5}
                            onChange={(item) => setShould5(item.value)}
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
                            State
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
                                { label: 'Item 1', value: '1' },
                                { label: 'Item 2', value: '2' },
                                { label: 'Item 3', value: '3' }]
                            }
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder="State"
                            value={should6}
                            onChange={(item) => setShould6(item.value)}
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
                            City
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
                                { label: 'Item 1', value: '1' },
                                { label: 'Item 2', value: '2' },
                                { label: 'Item 3', value: '3' }]
                            }
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder="City"
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
                            Pincode
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
                            placeholder={'Pincode'}
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
                            PAN Card No.
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
                            placeholder={'PAN Card No.'}
                            autoCapitalize='characters'
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
                            Aadhar Card No.
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
                            placeholder={'Aadhar Card No.'}
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
                            Upload Aadhar Card
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Pressable >
                                <Image
                                    style={{
                                        width: 100,
                                        height: 80,
                                        resizeMode: 'contain',
                                        marginLeft: 18,
                                    }}
                                    source={require('../assets/upload.png')} />
                            </Pressable>
                            <Pressable>
                                <Image
                                    style={{
                                        width: 100,
                                        height: 80,
                                        resizeMode: 'contain',
                                        marginLeft: 15,
                                    }}
                                    source={require('../assets/upload.png')} />
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
                            Upload PAN Card
                        </Text>
                        <Pressable >
                            <Image
                                style={{
                                    width: 100,
                                    height: 80,
                                    resizeMode: 'contain',
                                    marginLeft: 18,
                                    marginTop: 10,
                                }}
                                source={require('../assets/upload.png')} />
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
                            Academic Qualification
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
                            placeholder={'Academic Qualification'}
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
                            Astrological Qalifications
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
                            placeholder={'Astrological Qalifications'}
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
                            Upload Academic Certificate
                        </Text>
                        <Pressable >
                            <Image
                                style={{
                                    width: 100,
                                    height: 80,
                                    resizeMode: 'contain',
                                    marginLeft: 18,
                                    marginTop: 10,
                                }}
                                source={require('../assets/upload.png')} />
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
                            Upload Astrological Certificate
                        </Text>
                        <Pressable >
                            <Image
                                style={{
                                    width: 100,
                                    height: 80,
                                    resizeMode: 'contain',
                                    marginLeft: 18,
                                    marginTop: 10,
                                }}
                                source={require('../assets/upload.png')} />
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
                            Upload Profile Picture
                        </Text>
                        <Pressable >
                            <Image
                                style={{
                                    width: 100,
                                    height: 80,
                                    resizeMode: 'contain',
                                    marginLeft: 18,
                                    marginTop: 10,
                                }}
                                source={require('../assets/upload.png')} />
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
                            Biography
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
                            placeholder={'Write something…'}
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
                        Next
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
                            navigation.navigate('Package')
                        }}>
                        Next
                    </Button>
                )}


            </KeyboardAwareScrollView>

            {currentPosition == 2 && (
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
                        setCurrentPosition(currentPosition + 1)
                    }}>
                    Next
                </Button>
            )}

            {currentPosition == 3 && (
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
                        setCurrentPosition(currentPosition + 1)
                    }}>
                    Next
                </Button>
            )}

            {currentPosition == 4 && (
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
                        setCurrentPosition(currentPosition + 1)
                    }}>
                    Next
                </Button>
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
