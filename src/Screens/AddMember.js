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
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';

const AddMember = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _setting, _customlang } = stringsoflanguages
    const [type, setType] = useState(false)
    const [date, setDate] = useState('')
    const [pdate, setPDate] = useState('')
    const [open, setOpen] = useState(false)
    const [should1, setShould1] = useState('')
    const [type1, setType1] = useState(false)
    const [date1, setDate1] = useState('')
    const [pdate1, setPDate1] = useState('')
    const [open1, setOpen1] = useState(false)


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/back.png')}
                title={_setting.addmember}
            />
            <ScrollView>
                <Image source={require('../assets/add.png')}
                    style={{ width: 110, height: 100, resizeMode: 'contain', alignSelf: 'center', marginTop: 20 }}
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
                        value={date != '' ? moment(date).format('DD-MM-YYYY') : ''}
                        placeholder={_kundali.dateofbirth}
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
                    {_member.whatsapp}
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
                    maxLength={10}
                    placeholder={_member.whatsapp}
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
                    {_setting.select}
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
                        { label: _kundali.male, value: _kundali.male },
                        { label: _kundali.female, value: _kundali.female },
                    ]
                    }
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    placeholder={_setting.select}
                    value={should1}
                    onChange={(item) => setShould1(item.value)}
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
                        navigation.navigate('GenerateReport')
                    }}>
                    {_setting.addmember}
                </Button>

            </ScrollView>
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
        </SafeAreaView >
    )
}

export default AddMember

const styles = StyleSheet.create({})