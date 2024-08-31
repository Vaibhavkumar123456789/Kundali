// import React, { useState, useEffect } from 'react';
// import {
//     Image,
//     StyleSheet,
//     View,
//     ImageBackground,
//     Text,
//     Platform,
//     TouchableOpacity,
//     Pressable,
//     TextInput,
//     Dimensions,
//     Alert, KeyboardAvoidingView,
//     FlatList,
//     SafeAreaView,
//     ScrollView,
//     StatusBar, Modal, Keyboard
// } from 'react-native';
// import Header from '../Custom/Header';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import stringsoflanguages from '../language/Language'
// import { RadioButton } from 'react-native-paper';
// import Toast from 'react-native-simple-toast';
// import { validateEmail } from '../utils/utils';
// import DatePicker from 'react-native-date-picker'
// import { useDispatch, useSelector, useStore } from 'react-redux';
// import moment from 'moment';
// import { Dropdown } from 'react-native-element-dropdown';
// import Button from 'react-native-button';
// import Loader from '../utils/Loader';
// import GLobal from './GLobal';
// import { useIsFocused } from '@react-navigation/native';
// import { Astroreport, Country, GetProfile, Homebanner, kundlireportgenerate } from '../backend/Api';
// import { BASE_URL_EXTERNAL } from '../backend/Config';
// import LocationIQ from 'react-native-locationiq';

// const KundaliForm = ({ navigation }) => {
//     const window = Dimensions.get('window');
//     const { width, height } = Dimensions.get('window');
//     const { _customlang, _kundali, _product } = stringsoflanguages
//     const isFocused = useIsFocused();
//     const [checked, setChecked] = React.useState(false);
//     const gender = [_kundali.male, _kundali.female]
//     const [checked1, setChecked1] = React.useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [should1, setShould1] = useState('')
//     const [type, setType] = useState(false)
//     const [date, setDate] = useState('')
//     const [pdate, setPDate] = useState('')
//     const [open, setOpen] = useState(false)
//     const [clist, setCList] = useState([])
//     const [type1, setType1] = useState(false)
//     const [date1, setDate1] = useState('')
//     const [pdate1, setPDate1] = useState('')
//     const [open1, setOpen1] = useState(false)
//     const [name, setName] = useState('')
//     const [number, setNumber] = useState('')
//     const [email, setEmail] = useState('')
//     const [mothername, setMotherName] = useState('')
//     const [fathername, setFatherName] = useState('')
//     const [caste, setCaste] = useState('')
//     const [gfather, setGFather] = useState('')
//     const [gotra, setGotra] = useState('')
//     const [search, setSearch] = useState('')
//     const [cityList, setCityList] = useState([])
//     const [selectedcity, setSelectedCity] = useState('')
//     const [report, setReport] = useState([])
//     const { plandetail } = useSelector(store => store.free);

//     const [searchQuery, setSearchQuery] = useState('');
//     const [showDropdown, setShowDropdown] = useState(true);
//     const [location, setLocation] = useState([]);
//     const [addtex, setTex] = useState()
//     const [state, setState] = useState({
//         loading: false,
//     });
//     const toggleLoading = bol => setState({ ...state, loading: bol });
//     const [should2, setShould2] = useState('')
//     const [taxstate, setTaxState] = useState('')
//     const [netamount, setNetAmount] = useState('')
//     const [totatamount, setTotalAmount] = useState('')
//     const [walletBalance, setWalletBalance] = useState(0);

//     useEffect(() => {
//         Countrysearch()
//         banner()
//         profile()
//     }, [isFocused == true])

//     // useEffect(() => {
//     //     if (searchQuery?.length > 1) { // Minimum 3 characters to trigger search
//     //         const debounceTimer = setTimeout(() => {
//     //             searchLocation();
//     //         }, 300); // Debounce time of 300ms

//     //         return () => clearTimeout(debounceTimer); // Clear the timer on cleanup
//     //     }
//     // }, [searchQuery]);

//     // const searchLocation = () => {
//     //     LocationIQ.init(GLobal.locationiq); // Replace with your LocationIQ token
//     //     LocationIQ.search(searchQuery)
//     //         .then(response => {
//     //             // alert(JSON.stringify(response, null, 2))
//     //             setLocation(response); // Assuming the first result is the most relevant

//     //         })
//     //         .catch(error => {
//     //             console.error(error);
//     //         });
//     // };

//     const profile = () => {
//         GetProfile()
//             .then(data => {
//                 // alert(JSON.stringify(data?.user_profile?.wallet, null, 2))
//                 if (data.status) {
//                     setWalletBalance(data?.user_profile?.wallet)
//                 } else {
//                     alert(data?.msg);
//                 }
//             })
//             .catch(error => {
//                 console.log('error', error);
//             });
//     }

//     const banner = () => {
//         toggleLoading(true);

//         Astroreport()
//             .then(data => {
//                 // alert(JSON.stringify(data, null, 2))
//                 toggleLoading(false);
//                 if (data.status) {
//                     let tempCArr = []
//                     data?.data.map((i) => {
//                         tempCArr.push({
//                             label: i.report_name,
//                             value: i,
//                         })
//                         setReport(tempCArr)
//                     })
//                 } else {
//                     alert(data?.msg);
//                 }
//             })
//             .catch(error => {
//                 toggleLoading(false);
//                 console.log('error', error);
//             });

//     }


//     const Countrysearch = () => {
//         Country()
//             .then(data => {
//                 // alert(JSON.stringify(data, null, 2))
//                 if (data.status) {
//                     let tempCArr = []
//                     data?.data.map((i) => {
//                         tempCArr.push({
//                             label: i.name,
//                             value: i.iso2,
//                         })
//                         setCList(tempCArr)
//                     })
//                 } else {
//                     alert(data?.msg);
//                 }
//             })
//             .catch(error => {
//                 toggleLoading(false);
//                 console.log('error', error);
//             });
//     }

//     useEffect(() => {
//         console.log(`${BASE_URL_EXTERNAL}Place/GetCity?CountryCode=${should1}&SearchText=${search}&Limit=50`)
//         const timeOut = setTimeout(async () => {
//             const res = await fetch(`${BASE_URL_EXTERNAL}Place/GetCity?CountryCode=${should1}&SearchText=${search}&Limit=50`, {
//                 method: 'GET',
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-Type": "application/json"
//                 },
//             });
//             const response1 = await res.json()
//             // alert(JSON.stringify(response1, null, 2))
//             setCityList(response1?.responseData?.data)
//         }, 1500)

//         return () => {
//             clearTimeout(timeOut)
//         }
//     }, [search])

//     const searchCity = async (value) => {
//         setSearch(value)
//     }

//     const taxdetail = (item) => {
//         // alert(JSON.stringify(item, null, 2))
//         let amount = item["value"]["price"];
//         let discount = item["value"]["discount_price"];
//         let taxable_amount = discount > 0 ? discount : amount;

//         let tax_amount = 0;
//         let total_amount = 0;
//         let tax_percentage = 0;
//         if (item["value"]["tax"] == null) {
//             tax_percentage = 0
//             total_amount = taxable_amount
//         } else {
//             tax_percentage = item["value"]["tax"]["tax_percentage"];
//             tax_amount = taxable_amount * tax_percentage / 100;
//             total_amount = taxable_amount + tax_amount;
//         }

//         setTaxState(tax_amount)
//         setNetAmount(taxable_amount)
//         setTotalAmount(total_amount)

//     }
//     // alert(JSON.stringify(plandetail.is_free, null, 2))
//     const kundliformdata = () => {
//         var txnid = new Date().getTime().toString();

//         if (should2 == '') {
//             Toast.show('Please Select Kundli Type');
//         }
//         else if (name == '') {
//             Toast.show('Please enter name');
//         }
//         else if (checked === false) {
//             Toast.show('Please Select Gender');
//         }
//         else if (date === '') {
//             Toast.show('Please Select Date of birth');
//         }
//         else if (date1 === '') {
//             Toast.show('Please Select Time of birth');
//         }
//         else if (should1 === '') {
//             Toast.show('Please Select Country');
//         }
//         else if (selectedcity === '') {
//             Toast.show('Please Select birth Place');
//         }
//         else if (fathername === '') {
//             Toast.show('Please enter Father Name');
//         }
//         else if (mothername === '') {
//             Toast.show('Please enter Mother Name');
//         }
//         else if (gfather === '') {
//             Toast.show('Please enter Grand Father Name');
//         }
//         else if (caste === '') {
//             Toast.show('Please enter Caste');
//         } else if (gotra === '') {
//             Toast.show('Please enter Gotra');
//         }
//         else if (number === '' || number.length !== 10) {
//             Toast.show('Please enter your valid phone number');
//         } else if (email == '') {
//             Toast.show('Please enter Email');
//         }
//         else if (!validateEmail(email)) {
//             Toast.show('Please enter your valid email address');
//         }
//         else if (plandetail.is_free == '0' && walletBalance <= totatamount) {          //paid membership  
//             Toast.show("Please Add Wallet Balance")
//         }

//         else {

//             let e = {
//                 "name": name,
//                 "gender": checked === 0 ? "Male" : checked === 1 ? "Female" : null,
//                 "dob": date == '' ? '' : moment(date).format('YYYY-MM-DD'),
//                 "tob": date1 == '' ? '' : moment(date1).format('hh:mm a'),
//                 "country": should1,
//                 "pob": `${selectedcity.cityName}`,
//                 "mobile": number,
//                 "email": email,
//                 "mother_name": mothername,
//                 "father_name": fathername,
//                 "grand_father_name": gfather,
//                 "caste": caste,
//                 "gotra": gotra,
//                 "latitude": selectedcity.latitude,
//                 "longitude": selectedcity.longitude,
//                 'Timezone': selectedcity.timezone,
//                 'cityid': selectedcity.cityId,
//                 "agree": "1",
//                 "package_id": addtex?.value?.id,
//                 "tax_amt": plandetail.is_free == '1' ? "0.00" : `${parseFloat(taxstate).toFixed(2)}`,
//                 "net_amount": plandetail.is_free == '1' ? "0.00" : `${parseFloat(netamount).toFixed(2)}`,
//                 "total_mrp": plandetail.is_free == '1' ? "0.00" : `${parseFloat(totatamount).toFixed(2)}`,
//                 "payment_id": txnid,
//             };

//             console.log("kundli Form", e)
//             toggleLoading(true);
//             kundlireportgenerate(e)
//                 .then(data => {
//                     // alert(JSON.stringify(data, null, 2))
//                     toggleLoading(false);
//                     if (data.status) {
//                         navigation.navigate('KundliGenerate', { item: `${data?.detail?.report}`, title: data?.detail?.email, number: "2" })

//                     } else {
//                         alert(data?.msg);
//                     }
//                 })
//                 .catch(error => {
//                     toggleLoading(false);
//                     console.log('error', error);
//                 });
//         }
//     }

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//             <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
//             <Header
//                 menuOption={() => navigation.goBack()}
//                 leftIcon={require('../assets/backtoback.png')}
//                 title={_kundali.kundali}
//             />
//             {state.loading && <Loader />}

//             <KeyboardAwareScrollView keyboardShouldPersistTaps="always"  >
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_product.kundli}
//                 </Text>
//                 <Dropdown
//                     style={{
//                         height: 50,
//                         marginHorizontal: 18, marginTop: 10, borderWidth: 1.5, borderColor: '#00000020',
//                         borderRadius: 10,
//                     }}
//                     placeholderStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, }}
//                     selectedTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, textTransform: 'capitalize' }}
//                     iconStyle={{
//                         width: 20,
//                         height: 20,
//                         marginRight: 12,
//                     }}
//                     itemTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', textTransform: 'capitalize' }}
//                     data={report
//                     }
//                     maxHeight={200}
//                     search
//                     searchPlaceholder={_product.kundli}
//                     inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333' }}
//                     labelField="label"
//                     valueField="value"
//                     placeholder={_product.kundli}
//                     value={should2}
//                     onChange={(item) => { setShould2(item), setTex(item), taxdetail(item) }}
//                 />
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.name}
//                 </Text>
//                 <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     placeholder={_kundali.name}
//                     value={name}
//                     onChangeText={(text) => setName(text)}
//                 />
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.gender}
//                 </Text>
//                 <FlatList
//                     data={gender}
//                     horizontal
//                     renderItem={({ item, index }) => (
//                         <TouchableOpacity onPress={() => {
//                             setChecked(index)
//                         }}>
//                             <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginTop: 5 }}>
//                                 <RadioButton
//                                     value={checked}
//                                     status={checked === index ? 'checked' : 'unchecked'}
//                                     onPress={() => {
//                                         setChecked(index)
//                                     }}
//                                     uncheckedColor='#69707F'
//                                     color='#FFCC80'
//                                 />
//                                 <Text style={{
//                                     fontSize: 16,
//                                     color: '#333333',
//                                     fontFamily: 'AvenirLTStd-Medium',
//                                 }}>
//                                     {item}
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                 />
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.dateofbirth}
//                 </Text>
//                 <TouchableOpacity activeOpacity={0.9} style={{
//                     borderRadius: 10,
//                     paddingHorizontal: 15,
//                     marginHorizontal: 18,
//                     marginTop: 10,
//                     borderColor: '#00000020',
//                     borderWidth: 1.5,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                 }} onPress={() => { setOpen(true), setType(false) }}>
//                     <TextInput
//                         style={{
//                             fontSize: 16,
//                             color: '#333333',
//                             fontFamily: 'AvenirLTStd-Medium',
//                             width: '90%',
//                         }}
//                         editable={false}
//                         value={date != '' ? moment(date).format('DD-MM-YYYY') : ''}
//                         placeholder={_kundali.dateofbirth}
//                         placeholderTextColor={'#333333'}
//                     />

//                 </TouchableOpacity>

//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.timeofbirth}
//                 </Text>

//                 <TouchableOpacity activeOpacity={0.9} style={{
//                     borderRadius: 10,
//                     paddingHorizontal: 15,
//                     marginHorizontal: 18,
//                     marginTop: 10,
//                     borderColor: '#00000020',
//                     borderWidth: 1.5,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                 }} onPress={() => { setOpen1(true), setType1(false) }}>
//                     <TextInput
//                         style={{
//                             fontSize: 16,
//                             color: '#333333',
//                             fontFamily: 'AvenirLTStd-Medium',
//                             width: '90%',
//                         }}
//                         editable={false}
//                         value={date1 != '' ? moment(date1).format('hh:mm a') : ''}
//                         placeholder={_kundali.timeofbirth}
//                         placeholderTextColor={'#333333'}
//                     />

//                 </TouchableOpacity>
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.country}
//                 </Text>
//                 <Dropdown
//                     style={{
//                         height: 50,
//                         marginHorizontal: 18, marginTop: 10, borderWidth: 1.5, borderColor: '#00000020',
//                         borderRadius: 10,
//                     }}
//                     placeholderStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, }}
//                     selectedTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', paddingHorizontal: 15, textTransform: 'capitalize' }}
//                     iconStyle={{
//                         width: 20,
//                         height: 20,
//                         marginRight: 12,
//                     }}
//                     itemTextStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', textTransform: 'capitalize' }}
//                     data={clist
//                     }
//                     maxHeight={200}
//                     search
//                     searchPlaceholder={_kundali.country}
//                     inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333' }}
//                     labelField="label"
//                     valueField="value"
//                     placeholder={_kundali.country}
//                     value={should1}
//                     onChange={(item) => setShould1(item.value)}
//                 />
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.birth}
//                 </Text>
//                 <Pressable onPress={() => setModalVisible(true)}>
//                     <Text
//                         style={{
//                             fontSize: 16,
//                             fontFamily: 'AvenirLTStd-Medium',
//                             borderRadius: 10,
//                             borderColor: '#00000020',
//                             borderWidth: 1.5,
//                             marginTop: 10,
//                             marginHorizontal: 18,
//                             paddingHorizontal: 15,
//                             paddingVertical: 14,
//                             color: '#333333',
//                         }}>
//                         {selectedcity == '' ? _kundali.birth : `${selectedcity.cityName},${selectedcity.state},${selectedcity.countryCode}`}
//                     </Text>
//                 </Pressable>

//                 {/* <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.birth}
//                 </Text> */}

//                 {/* <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     placeholder={_kundali.birth}
//                     value={searchQuery}
//                     onChangeText={text => setSearchQuery(text)}
//                     onFocus={() => setShowDropdown(true)}
//                 />

//                 {showDropdown && location?.length > 0 && searchQuery?.length > 1 && (
//                     <View style={{
//                         marginHorizontal: 18,
//                         paddingHorizontal: 8,
//                         borderRadius: 10,
//                         marginTop: 5,
//                         backgroundColor: 'white',
//                         elevation: 5,
//                     }}>
//                         <ScrollView >
//                             {location.map((item, index) => (
//                                 <Pressable style={{

//                                 }} onPress={() => { setSelectedCity(item), setShowDropdown(false), setSearchQuery(item.display_name); }}>
//                                     <View style={{
//                                         margin: 10,
//                                     }}>
//                                         <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
//                                             {item.display_name}
//                                         </Text>
//                                         <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
//                                             Lat:{item.lat} , Lon:{item.lon}
//                                         </Text>
//                                     </View>
//                                 </Pressable>
//                             ))}
//                         </ScrollView>
//                     </View>
//                 )} */}
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     Father Name
//                 </Text>
//                 <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     placeholder={'Father Name'}
//                     value={fathername}
//                     onChangeText={(text) => setFatherName(text)}
//                 />
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     Mother Name
//                 </Text>
//                 <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     placeholder={'Mother Name'}
//                     value={mothername}
//                     onChangeText={(text) => setMotherName(text)}
//                 />

//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     Grand Father Name
//                 </Text>
//                 <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     placeholder={'Grand Father Name'}
//                     value={gfather}
//                     onChangeText={(text) => setGFather(text)}
//                 />
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     Caste
//                 </Text>
//                 <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     placeholder={'Caste'}
//                     value={caste}
//                     onChangeText={(text) => setCaste(text)}
//                 />
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     Gotra
//                 </Text>
//                 <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     placeholder={'Gotra'}
//                     value={gotra}
//                     onChangeText={(text) => setGotra(text)}
//                 />

//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.mobile}
//                 </Text>
//                 <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     keyboardType='numeric'
//                     placeholder={_kundali.mobile}
//                     value={number}
//                     onChangeText={(text) => setNumber(text)}
//                     maxLength={10}
//                 />
//                 <Text
//                     style={{
//                         fontFamily: 'AvenirLTStd-Medium',
//                         color: '#ADADAD',
//                         fontSize: 18,
//                         letterSpacing: -0.2,
//                         marginTop: 19,
//                         marginHorizontal: 18,
//                     }}>
//                     {_kundali.email}
//                 </Text>
//                 <TextInput
//                     style={{
//                         fontSize: 16,
//                         fontFamily: 'AvenirLTStd-Medium',
//                         borderRadius: 10,
//                         borderColor: '#00000020',
//                         borderWidth: 1.5,
//                         marginTop: 10,
//                         marginHorizontal: 18,
//                         paddingHorizontal: 15,
//                         paddingVertical: 11,
//                         color: '#333333',
//                     }}
//                     placeholderTextColor={'#333333'}
//                     placeholder={_kundali.email}
//                     value={email}
//                     onChangeText={(text) => setEmail(text)}
//                 />
//                 <View style={{ flexDirection: 'row', marginTop: 19, marginLeft: 18, width: window.width - 36 }}>
//                     <Text
//                         style={{
//                             fontFamily: 'AvenirLTStd-Medium',
//                             color: '#333333',
//                             fontSize: 16,
//                             letterSpacing: -0.2,
//                         }}>
//                         Your total amount for kundli :
//                     </Text>
//                     {(totatamount &&
//                         <Text
//                             style={{
//                                 fontFamily: 'AvenirLTStd-Medium',
//                                 color: '#333333',
//                                 fontSize: 16,
//                                 letterSpacing: -0.2,
//                                 marginLeft: 1,
//                             }}>
//                             {plandetail.is_free == '1' ? "0.00" : `₹ ${parseFloat(totatamount).toFixed(2)}`}
//                         </Text>
//                     )}
//                 </View>


//                 <Button
//                     containerStyle={{
//                         width: '90%',
//                         marginTop: 20,
//                         marginBottom: 20,
//                         height: 52,
//                         borderRadius: 12,
//                         overflow: 'hidden',
//                         alignSelf: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: '#FFCC80',
//                     }}
//                     style={{
//                         fontSize: 18,
//                         color: '#333333',
//                         alignSelf: 'center',
//                         fontFamily: 'AvenirLTStd-Medium',
//                     }}
//                     onPress={() => {
//                         kundliformdata()
//                     }}>
//                     {_customlang.submit}
//                 </Button>


//             </KeyboardAwareScrollView>

//             <DatePicker
//                 modal
//                 open={open}
//                 mode={'date'}
//                 maximumDate={new Date()}
//                 date={date == '' ? new Date() : date}
//                 onConfirm={date => {
//                     setOpen(false);
//                     type == false ? setDate(date) : setPDate(date);
//                 }}
//                 onCancel={() => {
//                     setOpen(false);
//                 }}
//             />
//             <DatePicker
//                 modal
//                 mode={"time"}
//                 open={open1}
//                 date={date1 == '' ? new Date() : date1}
//                 onConfirm={(date) => {
//                     setOpen1(false)
//                     type1 == false ? setDate1(date) : setPDate1(date);
//                 }}
//                 onCancel={() => {
//                     setOpen1(false)
//                 }}
//             />

//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     setModalVisible(!modalVisible);
//                 }}
//             >
//                 <TouchableOpacity
//                     activeOpacity={0.8}
//                     onPress={() => {
//                         setModalVisible(false);
//                     }}
//                     style={{
//                         flex: 1,
//                         backgroundColor: '#00000099',
//                         justifyContent: 'center',
//                     }}>
//                     <View style={{
//                         margin: 15,
//                         padding: 20,
//                         backgroundColor: 'white',
//                         borderRadius: 10,
//                     }}>
//                         <TouchableOpacity
//                             activeOpacity={0.8}
//                             onPress={() => {

//                             }}>
//                             <View style={{ alignSelf: 'center' }}>

//                             </View>
//                             <TextInput
//                                 style={{
//                                     fontSize: 16,
//                                     fontFamily: 'AvenirLTStd-Medium',
//                                     borderRadius: 10,
//                                     borderColor: '#00000020',
//                                     borderWidth: 1.5,
//                                     paddingHorizontal: 15,
//                                     color: '#333333',
//                                 }}
//                                 placeholderTextColor={'#333333'}
//                                 placeholder={_kundali.birth}
//                                 onChangeText={(text) => { searchCity(text) }}
//                             />
//                             {cityList?.length > 0 && (
//                                 <FlatList
//                                     data={cityList}
//                                     renderItem={({ item, index }) => (
//                                         <Pressable style={{}} onPress={() => { setSelectedCity(item), setModalVisible(false) }}>
//                                             <View style={{ width: '100%', margin: 10 }}>
//                                                 <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
//                                                     {item.cityName} ,{item.state} ,{item.countryCode},
//                                                 </Text>
//                                                 <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
//                                                     Lat:{item.latitude} , Lon:{item.longitude}
//                                                 </Text>
//                                             </View>
//                                         </Pressable>
//                                     )}
//                                 />

//                             )}

//                         </TouchableOpacity>
//                     </View>
//                 </TouchableOpacity>
//             </Modal>
//         </SafeAreaView >
//     )
// }

// export default KundaliForm

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },

// })



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
    Alert, KeyboardAvoidingView,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar, Modal, Keyboard
} from 'react-native';
import Header from '../Custom/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stringsoflanguages from '../language/Language'
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { validateEmail } from '../utils/utils';
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector, useStore } from 'react-redux';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import Button from 'react-native-button';
import Loader from '../utils/Loader';
import GLobal from './GLobal';
import { useIsFocused } from '@react-navigation/native';
import { Astroreport, Country, GetProfile, Homebanner, kundlireportgenerate } from '../backend/Api';
import { BASE_URL_EXTERNAL } from '../backend/Config';
import LocationIQ from 'react-native-locationiq';
import FreePopUp from './component/FreePopUp';

const KundaliForm = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _customlang, _kundali, _product } = stringsoflanguages
    const isFocused = useIsFocused();
    const [checked, setChecked] = React.useState(false);
    const gender = [_kundali.male, _kundali.female]
    const [checked1, setChecked1] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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
    const [mothername, setMotherName] = useState('')
    const [fathername, setFatherName] = useState('')
    const [caste, setCaste] = useState('')
    const [gfather, setGFather] = useState('')
    const [gotra, setGotra] = useState('')
    const [search, setSearch] = useState('')
    const [cityList, setCityList] = useState([])
    const [selectedcity, setSelectedCity] = useState('')
    const [report, setReport] = useState([])
    const { plandetail } = useSelector(store => store.free);
    const [showFreePopUp, setShowFreePopUp] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');
    const [selectedSecond, setSelectedSecond] = useState('');
    const [selectedAmPm, setSelectedAmPm] = useState('');

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
    const seconds = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(true);
    const [location, setLocation] = useState([]);
    const [addtex, setTex] = useState()
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [should2, setShould2] = useState('')
    const [taxstate, setTaxState] = useState('')
    const [netamount, setNetAmount] = useState('')
    const [totatamount, setTotalAmount] = useState('')
    const [walletBalance, setWalletBalance] = useState(0);

    useEffect(() => {
        Countrysearch()
        banner()
        profile()
    }, [isFocused == true])

    // useEffect(() => {
    //     if (searchQuery?.length > 1) { // Minimum 3 characters to trigger search
    //         const debounceTimer = setTimeout(() => {
    //             searchLocation();
    //         }, 300); // Debounce time of 300ms

    //         return () => clearTimeout(debounceTimer); // Clear the timer on cleanup
    //     }
    // }, [searchQuery]);

    // const searchLocation = () => {
    //     LocationIQ.init(GLobal.locationiq); // Replace with your LocationIQ token
    //     LocationIQ.search(searchQuery)
    //         .then(response => {
    //             // alert(JSON.stringify(response, null, 2))
    //             setLocation(response); // Assuming the first result is the most relevant

    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };

    const profile = () => {
        GetProfile()
            .then(data => {
                // alert(JSON.stringify(data?.user_profile?.wallet, null, 2))
                if (data.status) {
                    setWalletBalance(data?.user_profile?.wallet)
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    const banner = () => {
        toggleLoading(true);

        Astroreport()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
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
                console.log('error', error);
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
        // alert(JSON.stringify(item, null, 2))
        let amount = item["value"]["price"];
        let discount = item["value"]["discount_price"];
        let taxable_amount = discount > 0 ? discount : amount;

        let tax_amount = 0;
        let total_amount = 0;
        let tax_percentage = 0;
        if (item["value"]["tax"] == null) {
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
    console.log({ selectedHour, selectedMinute, selectedSecond, selectedAmPm }, null, 2)
    // alert(JSON.stringify(plandetail.is_free, null, 2))
    const kundliformdata = () => {
        var txnid = new Date().getTime().toString();

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
        else if (selectedHour === '') {
            Toast.show('Please Select Hour');
        }
        else if (selectedMinute === '') {
            Toast.show('Please Select Minutes');
        }
        else if (selectedSecond === '') {
            Toast.show('Please Select Second');
        }
        else if (selectedAmPm === '') {
            Toast.show('Please Select AM/PM');
        }
        else if (should1 === '') {
            Toast.show('Please Select Country');
        }
        else if (selectedcity === '') {
            Toast.show('Please Select birth Place');
        }
        else if (fathername === '') {
            Toast.show('Please enter Father Name');
        }
        else if (mothername === '') {
            Toast.show('Please enter Mother Name');
        }
        else if (gfather === '') {
            Toast.show('Please enter Grand Father Name');
        }
        else if (caste === '') {
            Toast.show('Please enter Caste');
        } else if (gotra === '') {
            Toast.show('Please enter Gotra');
        }
        else if (number === '' || number.length !== 10) {
            Toast.show('Please enter your valid phone number');
        } else if (email == '') {
            Toast.show('Please enter Email');
        }
        else if (!validateEmail(email)) {
            Toast.show('Please enter your valid email address');
        }
        else if (walletBalance <= totatamount) {          //paid membership  
            Toast.show("Please Add Wallet Balance")
        }

        else {

            let e = {
                "name": name,
                "gender": checked === 0 ? "Male" : checked === 1 ? "Female" : null,
                "dob": date == '' ? '' : moment(date).format('YYYY-MM-DD'),
                "tob": `${selectedHour}:${selectedMinute}:${selectedSecond} ${selectedAmPm}`,
                "country": should1,
                "pob": `${selectedcity.cityName}`,
                "mobile": number,
                "email": email,
                "mother_name": mothername,
                "father_name": fathername,
                "grand_father_name": gfather,
                "caste": caste,
                "gotra": gotra,
                "latitude": selectedcity.latitude,
                "longitude": selectedcity.longitude,
                'Timezone': selectedcity.timezone,
                'cityid': selectedcity.cityId,
                "agree": "1",
                "package_id": addtex?.value?.id,
                "tax_amt": `${parseFloat(taxstate).toFixed(2)} `,
                "net_amount": `${parseFloat(netamount).toFixed(2)} `,
                "total_mrp": `${parseFloat(totatamount).toFixed(2)} `,
                "payment_id": txnid,
            };

            console.log("kundli Form", e)
            toggleLoading(true);
            kundlireportgenerate(e)
                .then(data => {
                    // alert(JSON.stringify(data, null, 2))
                    toggleLoading(false);
                    if (data.status) {
                        navigation.navigate('KundliGenerate', { item: `${data?.detail?.report} `, title: data?.detail?.email, number: "2" })

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

            <KeyboardAwareScrollView keyboardShouldPersistTaps="always"  >
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_product.kundli}
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
                    searchPlaceholder={_product.kundli}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333' }}
                    labelField="label"
                    valueField="value"
                    placeholder={_product.kundli}
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

                {/* <TouchableOpacity activeOpacity={0.9} style={{
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

                </TouchableOpacity> */}

                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    marginHorizontal: 18, marginTop: 10
                }}>
                    <TouchableOpacity style={{
                        width: 60,
                        height: 50,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        borderRadius: 10,
                    }} activeOpacity={0.9} onPress={() => setModalVisible4(true)}>
                        <TextInput
                            style={styles.input}
                            value={selectedHour}
                            maxLength={2}
                            editable={false}
                            onFocus={() => setModalVisible4(true)}
                            placeholderTextColor={'#333333'}
                            placeholder="HH"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 60,
                        height: 50,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        borderRadius: 10,
                    }} activeOpacity={0.9} onPress={() => setModalVisible1(true)}>
                        <TextInput
                            style={styles.input}
                            value={selectedMinute}
                            maxLength={2}
                            editable={false}
                            placeholderTextColor={'#333333'}
                            placeholder="MM"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 60,
                        height: 50,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        borderRadius: 10,
                    }} activeOpacity={0.9} onPress={() => setModalVisible2(true)}>
                        <TextInput
                            style={styles.input}
                            value={selectedSecond}
                            editable={false}
                            placeholderTextColor={'#333333'}
                            maxLength={2}
                            placeholder="SS"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 60,
                        height: 50,
                        borderColor: '#00000020',
                        borderWidth: 1.5,
                        borderRadius: 10,
                    }} activeOpacity={0.9} onPress={() => setModalVisible3(true)}>
                        <TextInput
                            style={styles.input}
                            value={selectedAmPm}
                            editable={false}
                            placeholderTextColor={'#333333'}
                            placeholder="AM/PM"
                        />
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
                        {selectedcity == '' ? _kundali.birth : `${selectedcity.cityName},${selectedcity.state},${selectedcity.countryCode} `}
                    </Text>
                </Pressable>

                {/* <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    {_kundali.birth}
                </Text> */}

                {/* <TextInput
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
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    onFocus={() => setShowDropdown(true)}
                />

                {showDropdown && location?.length > 0 && searchQuery?.length > 1 && (
                    <View style={{
                        marginHorizontal: 18,
                        paddingHorizontal: 8,
                        borderRadius: 10,
                        marginTop: 5,
                        backgroundColor: 'white',
                        elevation: 5,
                    }}>
                        <ScrollView >
                            {location.map((item, index) => (
                                <Pressable style={{

                                }} onPress={() => { setSelectedCity(item), setShowDropdown(false), setSearchQuery(item.display_name); }}>
                                    <View style={{
                                        margin: 10,
                                    }}>
                                        <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
                                            {item.display_name}
                                        </Text>
                                        <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
                                            Lat:{item.lat} , Lon:{item.lon}
                                        </Text>
                                    </View>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                )} */}
                <Text
                    style={{
                        fontFamily: 'AvenirLTStd-Medium',
                        color: '#ADADAD',
                        fontSize: 18,
                        letterSpacing: -0.2,
                        marginTop: 19,
                        marginHorizontal: 18,
                    }}>
                    Father Name
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
                    placeholder={'Father Name'}
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
                    Mother Name
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
                    placeholder={'Mother Name'}
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
                    Grand Father Name
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
                    placeholder={'Grand Father Name'}
                    value={gfather}
                    onChangeText={(text) => setGFather(text)}
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
                    Caste
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
                    placeholder={'Caste'}
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
                    Gotra
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
                    placeholder={'Gotra'}
                    value={gotra}
                    onChangeText={(text) => setGotra(text)}
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        style={{
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Medium',
                            borderRadius: 10,
                            borderColor: '#00000020',
                            borderWidth: 1.5,
                            marginTop: 10,
                            marginLeft: 18,
                            paddingHorizontal: 15,
                            paddingVertical: 11,
                            color: '#333333',
                        }}
                        placeholderTextColor={'#333333'}
                        placeholder={'+91'}
                        editable={false}
                    />
                    <TextInput
                        style={{
                            fontSize: 16,
                            fontFamily: 'AvenirLTStd-Medium',
                            borderRadius: 10,
                            borderColor: '#00000020',
                            borderWidth: 1.5,
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 18,
                            width: window.width - 105,
                            paddingHorizontal: 15,
                            paddingVertical: 11,
                            color: '#333333',
                        }}
                        placeholderTextColor={'#333333'}
                        keyboardType='numeric'
                        placeholder={_kundali.mobile}
                        value={number}
                        onChangeText={(text) => {
                            const texttt = text.replace(/[^0-9]/g, '');
                            setNumber(texttt);
                        }}
                        maxLength={10}
                    />


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
                <View style={{ flexDirection: 'row', marginTop: 19, marginLeft: 18, width: window.width - 36 }}>
                    <Text
                        style={{
                            fontFamily: 'AvenirLTStd-Medium',
                            color: '#333333',
                            fontSize: 16,
                            letterSpacing: -0.2,
                        }}>
                        Your total amount for kundli :
                    </Text>
                    {(totatamount &&
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#333333',
                                fontSize: 16,
                                letterSpacing: -0.2,
                                marginLeft: 1,
                            }}>
                            {`₹ ${parseFloat(totatamount).toFixed(2)} `}
                        </Text>
                    )}
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
                        if (plandetail?.is_free == "1") {
                            setShowFreePopUp(true);

                        } else {
                            kundliformdata()

                        }
                    }}>
                    {_customlang.submit}
                </Button>

                {showFreePopUp && <FreePopUp setShowFreePopUp={setShowFreePopUp} />}
            </KeyboardAwareScrollView>

            <DatePicker
                modal
                open={open}
                mode={'date'}
                maximumDate={new Date()}
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


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible4}
                onRequestClose={() => {
                    setModalVisible4(!modalVisible4);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible4(false);
                    }}
                    style={styles.first}>
                    <View style={styles.second}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {

                            }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {hours.map((hour, index) => (
                                    <TouchableOpacity key={index} onPress={() => { setSelectedHour(hour); setModalVisible4(false); }}>
                                        <Text style={styles.pickerItem}>{hour}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                    setModalVisible1(!modalVisible1);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible1(false);
                    }}
                    style={styles.first}>
                    <View style={styles.second}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {

                            }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {minutes.map((minute, index) => (
                                    <TouchableOpacity key={index} onPress={() => { setSelectedMinute(minute); setModalVisible1(false); }}>
                                        <Text style={styles.pickerItem}>{minute}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(!modalVisible2);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible2(false);
                    }}
                    style={styles.first}>
                    <View style={styles.second}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {

                            }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {seconds.map((second, index) => (
                                    <TouchableOpacity key={index} onPress={() => { setSelectedSecond(second); setModalVisible2(false); }}>
                                        <Text style={styles.pickerItem}>{second}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={() => {
                    setModalVisible3(!modalVisible3);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible3(false);
                    }}
                    style={styles.first}>
                    <View style={styles.second}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {

                            }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {['AM', 'PM'].map((ampm, index) => (
                                    <TouchableOpacity key={index} onPress={() => { setSelectedAmPm(ampm); setModalVisible3(false); }}>
                                        <Text style={styles.pickerItem}>{ampm}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView >
    )
}

export default KundaliForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    input: {
        fontFamily: 'AvenirLTStd-Medium',
        color: '#333333',
        textAlign: 'center',
        fontSize: 16,
    },
    pickerItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontSize: 18,
    },
    scrollContainer: {
        width: 60,
        maxHeight: 200,
    },
    first: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
    },
    second: {
        width: '40%',
        alignSelf: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    }

})
