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
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-element-dropdown';
import Button from 'react-native-button';

const KundaliForm = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _customlang, _kundali } = stringsoflanguages
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [checked, setChecked] = React.useState(false);
    const gender = [_kundali.male, _kundali.female]
    const [checked1, setChecked1] = React.useState(false);
    const payment = [_kundali.onine, _kundali.offline]
    const [should1, setShould1] = useState('')
    const [type, setType] = useState(false)
    const [date, setDate] = useState('')
    const [pdate, setPDate] = useState('')
    const [open, setOpen] = useState(false)
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [timeofbirth, settimeofbirth] = useState(new Date());

    const showDatePicker1 = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker1 = () => {
        setTimePickerVisibility(false);
    };
    const handleConfirm1 = date => {
        console.warn('A date has been picked: ', date);
        settimeofbirth(moment(date).format('hh:mm:a'));
        hideDatePicker1();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/back.png')}
                title={_kundali.kundali}
            />
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

                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        paddingHorizontal: 15,
                        marginHorizontal: 18,
                        marginTop: 10,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    activeOpacity={0.9}
                    onPress={() => {

                        showDatePicker1();
                    }}>
                    <TextInput
                        style={{
                            fontSize: 16,
                            color: '#333333',
                            fontFamily: 'AvenirLTStd-Medium',
                            width: '90%',
                        }}
                        value={
                            !timeofbirth
                                ? moment(timeofbirth).format('hh:mm:a')
                                : timeofbirth
                        }
                        placeholderTextColor="#333333"
                        editable={false}
                        placeholder={_kundali.timeofbirth}
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
                    data={[
                        { label: 'Item 1', value: '1' },
                        { label: 'Item 2', value: '2' },
                        { label: 'Item 3', value: '3' }]
                    }
                    maxHeight={150}
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
                    placeholder={_kundali.birth}
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
            {/* <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                display="spinner"
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
            /> */}

        </SafeAreaView >
    )
}

export default KundaliForm

const styles = StyleSheet.create({})

