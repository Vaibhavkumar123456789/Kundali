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
//     Alert,
//     FlatList,
//     SafeAreaView,
//     ScrollView,
//     StatusBar
// } from 'react-native';
// import Header from '../Custom/Header';
// import stringsoflanguages from '../language/Language'
// import { RadioButton } from 'react-native-paper';
// import DatePicker from 'react-native-date-picker'
// import CheckBox from '@react-native-community/checkbox';
// import moment from 'moment';
// import { Dropdown } from 'react-native-element-dropdown';
// import Button from 'react-native-button';

// const NaamJane = ({ navigation }) => {
//     const window = Dimensions.get('window');
//     const { width, height } = Dimensions.get('window');
//     const { _customlang, _kundali } = stringsoflanguages
//     const [toggleCheckBox, setToggleCheckBox] = useState(false)
//     const [checked, setChecked] = React.useState(false);
//     const gender = [_kundali.male, _kundali.female]
//     const [checked1, setChecked1] = React.useState(false);
//     const payment = [_kundali.onine, _kundali.offline]
//     const [should1, setShould1] = useState('')
//     const [type, setType] = useState(false)
//     const [date, setDate] = useState('')
//     const [pdate, setPDate] = useState('')
//     const [open, setOpen] = useState(false)

//     const [type1, setType1] = useState(false)
//     const [date1, setDate1] = useState('')
//     const [pdate1, setPDate1] = useState('')
//     const [open1, setOpen1] = useState(false)


//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//             <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
//             <Header
//                 menuOption={() => navigation.goBack()}
//                 leftIcon={require('../assets/backtoback.png')}
//                 title='Naam Jane'
//             />
//             <ScrollView>
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
//                     data={[
//                         { label: 'Item 1', value: '1' },
//                         { label: 'Item 2', value: '2' },
//                         { label: 'Item 3', value: '3' }]
//                     }
//                     maxHeight={150}
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
//                     placeholder={_kundali.birth}
//                 />

//                 <View style={{ flexDirection: 'row', marginLeft: 14, marginTop: 15 }}>
//                     <CheckBox
//                         disabled={false}
//                         boxType='square'
//                         tintColors={{ true: '#FFC629', false: '#00000050' }}
//                         value={toggleCheckBox}
//                         onValueChange={(newValue) => setToggleCheckBox(newValue)}
//                     />
//                     <Text style={{
//                         color: '#333333',
//                         fontFamily: 'AvenirLTStd-Medium',
//                         fontSize: 15,
//                         marginLeft: 5,
//                         marginTop: 5,
//                         width: window.width - 70,
//                         lineHeight: 20,
//                     }}>
//                         Save Kundli

//                     </Text>

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
//                         navigation.navigate("NaamJaneReport")
//                     }}>
//                     Show Kundli
//                 </Button>


//             </ScrollView>
//             <DatePicker
//                 modal
//                 open={open}
//                 mode={'date'}
//                 // minimumDate={new Date()}
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
//         </SafeAreaView >
//     )
// }

// export default NaamJane

// const styles = StyleSheet.create({})


// // import React from 'react';
// // import { View, Text, StyleSheet, ScrollView } from 'react-native';

// // const NaamJane = () => {
// //   return (
// //     <ScrollView horizontal >
// //       <View style={styles.container}>
// //         <View style={[styles.row, styles.headerRow]}>
// //           <Text style={[styles.cell, styles.headerCell]}>Column 1</Text>
// //           <Text style={[styles.cell, styles.headerCell]}>Column 2</Text>
// //           <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>
// //           <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>
// //           <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>
// //           <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>

// //           <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>

// //           <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>
// //           <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>


// //         </View>
// //         <View style={styles.row}>
// //           <Text style={styles.cell}>Data 1</Text>
// //           <Text style={styles.cell}>Data 2</Text>
// //           <Text style={styles.cell}>Data 3</Text>
// //         </View>
// //         <View style={styles.row}>
// //           <Text style={styles.cell}>Data 4</Text>
// //           <Text style={styles.cell}>Data 5</Text>
// //           <Text style={styles.cell}>Data 6</Text>
// //         </View>
// //         {/* Add more rows as needed */}
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     borderWidth: 1,
// //     borderColor: 'black',
// //     margin: 10,
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     borderBottomWidth: 1,
// //     borderColor: 'gray',
// //   },
// //   headerRow: {
// //     backgroundColor: '#f2f2f2',
// //     borderTopWidth: 1,
// //   },
// //   cell: {
// //     flex: 1,
// //     padding: 10,
// //     textAlign: 'center',
// //     borderRightWidth: 1, // Add border to the right of each cell
// //     borderColor: 'gray', // Border color
// //   },
// //   headerCell: {
// //     fontWeight: 'bold',
// //   },
// // });

// // export default NaamJane;


import { View, Text, Image, StyleSheet, Modal, BackHandler, Animated, ActivityIndicator, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Button from 'react-native-button';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import Mailer from 'react-native-mail';

const NaamJane = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    console.log(JSON.stringify(route.params, null, 2))
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window')


    const downloadAndSharePDF = async () => {
        const pdfPath = route.params?.filePath; // This should be a valid file path
        const localFile = `file://${pdfPath}`; // Ensure this has the 'file://' protocol

        try {
            // Check if the file exists
            const fileExists = await RNFS.exists(pdfPath);

            if (fileExists) {
                // Share the existing PDF file via WhatsApp
                const shareOptions = {
                    title: 'Share PDF',
                    message: 'Here is your PDF file',
                    url: localFile,
                    type: 'application/pdf',
                    social: Share.Social.WHATSAPP,
                };

                Share.open(shareOptions)
                    .then((res) => console.log('Share successful', res))
                    .catch((err) => console.log('Share failed', err));
            } else {
                console.log('File does not exist', pdfPath);
            }
        } catch (error) {
            console.log('Error handling file', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Image
                source={{ uri: route.params?.uri }}
                style={{ width: "100%", height: window.height - 80, resizeMode: 'stretch' }}
            />

            <View style={{ flexDirection: 'row',alignSelf:'center', marginHorizontal: 18, justifyContent: 'space-between', bottom: 20, position: 'absolute' }}>

                <Pressable onPress={() => { navigation.goBack() }} style={{
                    width: '48%',
                    borderRadius: 8, paddingVertical: 14, backgroundColor: '#FFCC80',
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Medium',
                        textAlign: 'center',
                    }}>
                        Skip
                    </Text>
                </Pressable>

                <Pressable onPress={downloadAndSharePDF} style={{
                    width: '48%',
                    borderRadius: 8, paddingVertical: 14, backgroundColor: '#FFCC80',
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Medium',
                        textAlign: 'center',
                    }}>
                        Whatsapp
                    </Text>
                </Pressable>

            </View>


        </SafeAreaView>
    )
}

export default NaamJane

const styles = StyleSheet.create({})