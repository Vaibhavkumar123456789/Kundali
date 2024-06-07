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
import DatePicker from 'react-native-date-picker'
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import Button from 'react-native-button';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Toast from 'react-native-simple-toast';
import {
    Country,
    LalkitabForm
} from '../backend/Api';
import Loader from '../utils/Loader';
import GLobal from './GLobal';
import { BASE_URL_EXTERNAL } from '../backend/Config';

const LalKitab = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _customlang, _kundali, _onlinejyotish } = stringsoflanguages
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [checked, setChecked] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const gender = [_kundali.male, _kundali.female]
    const [selectedcity, setSelectedCity] = useState('')
    const [should1, setShould1] = useState('')
    const [type, setType] = useState(false)
    const [date, setDate] = useState('')
    const [pdate, setPDate] = useState('')
    const [open, setOpen] = useState(false)
    const [type1, setType1] = useState(false)
    const [date1, setDate1] = useState('')
    const [pdate1, setPDate1] = useState('')
    const [open1, setOpen1] = useState(false)
    const [name, setName] = useState('')
    const [clist, setCList] = useState([])
    const [cityList, setCityList] = useState([])
    const [search, setSearch] = useState('')
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        Countrysearch()
    }, [])

    const Countrysearch = () => {
        Country()
            .then(data => {
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
                    alert(data.msg);
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

    const setsubmit = () => {
        if (name == '') {
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
        else {
            let e = {
                "Name": name,
                "Gender": checked === 0 ? "Male" : checked === 1 ? "Female" : null,
                "Day": date == '' ? '' : moment(date).format('DD'),
                "Month": date == '' ? '' : moment(date).format('MM'),
                "Year": date == '' ? '' : moment(date).format('YYYY'),
                "Hours": date1 == '' ? '' : moment(date1).format('hh'),
                "Minutes": date1 == '' ? '' : moment(date1).format('mm'),
                "Seconds": date1 == '' ? '' : moment(date1).format('ss'),
                "Latitude": selectedcity.latitude,
                "Longitude": selectedcity.longitude,
            };

            console.log(JSON.stringify(e))
            GLobal.userDetails = e
            navigation.navigate('LalKitabDetail')
            return

            LalkitabForm(e)
                .then(data => {
                    toggleLoading(false);

                    if (data) {

                    } else {
                        alert(data.msg);
                    }
                })
                .catch(error => {
                    toggleLoading(false);
                    console.log('error', error);
                });
        }
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <View style={{ flex: 1, }}>
                        <ScrollView
                            nestedScrollEnabled={true}
                            style={{ height: '100%', }}>
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
                                    value={date != '' ? moment(date).format('DD-MMM-YYYY') : ''}
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
                                    value={date1 != '' ? moment(date1).format('hh:mm:ss a') : ''}
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
                                    Save Kundli

                                </Text>

                            </View>

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
                                    setsubmit()
                                }}>
                                Show Kundli
                            </Button>


                        </ScrollView>
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
                    </View>
                )
            case 'second':
                return (
                    <View style={{ flex: 1, }}>

                    </View>
                )

        }
    }

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: _onlinejyotish.newkundli },
        { key: 'second', title: _onlinejyotish.savedkundli },

    ]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_onlinejyotish.lal}
            />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props => (
                    <TabBar
                        style={styles.style}
                        labelStyle={styles.labelStyle}
                        // scrollEnabled={true}
                        tabStyle={{ height: 50 }}
                        activeColor={'#FFCC80'}
                        inactiveColor={'#333333'}
                        inactiveOpacity={0.5}
                        {...props}
                        indicatorStyle={styles.indicatorStyle}
                    />
                )}
            />
            {state.loading && <Loader />}

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
        </SafeAreaView >
    )
}

export default LalKitab

const styles = StyleSheet.create({
    style: {
        backgroundColor: '#FFFFFF',
    },
    labelStyle: {
        fontSize: 16,
        fontFamily: 'AvenirLTStd-Heavy',
        color: '#333333',
        textTransform: 'capitalize',
        marginHorizontal: 15,
    },
    indicatorStyle: {
        backgroundColor: '#FFCC80',
        height: 3,
    },
})

