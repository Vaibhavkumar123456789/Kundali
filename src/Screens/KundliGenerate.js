// import { View, Text, Image, StyleSheet, Modal, ActivityIndicator, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import stringsoflanguages from '../language/Language'
// import { useIsFocused } from '@react-navigation/native';
// import Header from '../Custom/Header';
// import { WebView } from 'react-native-webview';
// import Button from 'react-native-button';
// import Share from 'react-native-share';

// const KundliGenerate = ({ navigation, route }) => {
//     // alert(JSON.stringify(route.params.item, null, 2))
//     const window = Dimensions.get('window');
//     const isFocused = useIsFocused();
//     const { width, height } = Dimensions.get('window');
//     const [state, setState] = useState({
//         loading: false,
//     });
//     const toggleLoading = bol => setState({ ...state, loading: bol });

//     const shareFile = () => {
//         const shareOptions = {
//             title: 'Share via',
//             url: 'http://zedcredit.zedfinance.com/Kundali/content/astro_report/Sample.pdf',  // Replace with the actual file path
//             social: Share.Social.WHATSAPP,
//         };

//         Share.open(shareOptions)
//             .then((res) => console.log(res))
//             .catch((err) => {
//                 err && console.log(err);
//             });
//     };


//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//             <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
//             <Header
//                 menuOption={() => navigation.goBack()}
//                 leftIcon={require('../assets/backtoback.png')}
//                 title={"kundli"}
//             />
//             <View style={{ width: window.width, height: window.height - 150 }}>
//                 <WebView
//                     source={{ uri: 'https://docs.google.com/viewer?url=http://zedcredit.zedfinance.com/Kundali/content/astro_report/Sample.pdf' }}
//                     style={{ flex: 1, }}
//                     renderLoading={() => (
//                         <View style={{
//                             flex: 1,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                         }}>
//                             <ActivityIndicator size="large" color="#FFCC80" />
//                         </View>
//                     )}
//                     startInLoadingState={true}
//                 />
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
//                 <Button
//                     containerStyle={{
//                         width: '30%',
//                         height: 52,
//                         borderRadius: 12,
//                         overflow: 'hidden',
//                         alignSelf: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: '#FFCC80',
//                     }}
//                     style={{
//                         fontSize: 16,
//                         color: '#333333',
//                         alignSelf: 'center',
//                         fontFamily: 'AvenirLTStd-Medium',
//                     }}

//                     onPress={() => {

//                     }}>
//                     Print
//                 </Button>
//                 <Button
//                     containerStyle={{
//                         width: '30%',
//                         height: 52,
//                         borderRadius: 12,
//                         overflow: 'hidden',
//                         alignSelf: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: '#FFCC80',
//                     }}
//                     style={{
//                         fontSize: 16,
//                         color: '#333333',
//                         alignSelf: 'center',
//                         fontFamily: 'AvenirLTStd-Medium',
//                     }}

//                     onPress={() => {

//                     }}>
//                     Email
//                 </Button>
//                 <Button
//                     containerStyle={{
//                         width: '30%',
//                         height: 52,
//                         borderRadius: 12,
//                         overflow: 'hidden',
//                         alignSelf: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: '#FFCC80',
//                     }}
//                     style={{
//                         fontSize: 16,
//                         color: '#333333',
//                         alignSelf: 'center',
//                         fontFamily: 'AvenirLTStd-Medium',
//                     }}

//                     onPress={shareFile}>
//                     Whatsapp
//                 </Button>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default KundliGenerate

// const styles = StyleSheet.create({
//     style: {
//         backgroundColor: '#FFFFFF',
//     },
//     labelStyle: {
//         fontSize: 16,
//         fontFamily: 'AvenirLTStd-Heavy',
//         color: '#333333',
//         textTransform: 'capitalize',
//         marginHorizontal: 15,
//     },
//     indicatorStyle: {
//         backgroundColor: '#FFCC80',
//         height: 3,
//     },

//     ex_view: {
//         flexDirection: 'row',
//         margin: 7,
//         marginTop: 10,
//         paddingVertical: 10,
//         alignSelf: 'center',
//         width: '90%',
//         borderRadius: 10,
//         overflow: 'hidden',
//         backgroundColor: '#FFFFFF',
//         shadowColor: '#000000',
//         elevation: 5,

//     },
//     ex_proView: {
//         padding: 7,

//     },
//     ex_proImage: {
//         width: 95,
//         height: 100,
//         marginLeft: 0,
//         marginTop: 3,
//         borderRadius: 8
//     },
//     ex_starView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         alignSelf: 'center',
//         borderWidth: 0,
//         borderRadius: 8,
//         borderColor: '#DD2476',
//         paddingHorizontal: 5,
//         marginTop: 10,
//     },
//     ex_starImage: {
//         width: 12,
//         height: 12,
//         resizeMode: 'contain',
//         marginTop: 5,
//         marginLeft: 3,
//     },
//     ex_starText: {
//         fontFamily: 'AvenirLTStd-Heavy',
//         fontWeight: '400',
//         fontSize: 12,
//         color: '#6F6F7B90',
//         textAlign: 'center',
//         marginLeft: 3,
//         marginTop: 2,
//     },
//     dt_view: {
//         flex: 1,
//     },
//     dt_view_1: {
//         flexDirection: 'row',
//     },
//     dt_view_11: {
//         flex: 0.9,
//     },

//     dt_likeView: {
//         flex: 0.1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dt_likeImage: {
//         height: 20,
//         width: 20,
//         resizeMode: 'contain',
//     },
//     dt_name: {
//         fontFamily: 'AvenirLTStd-Medium',
//         fontSize: 14,
//         marginTop: 2,
//         color: '#A6A7A9',
//         marginLeft: 9,
//     },
//     dt_viewOpt: {
//         flexDirection: 'row',
//         marginTop: 3,
//     },
//     dt_viewOptImage: {
//         height: 10,
//         width: 10,
//         resizeMode: 'contain',
//     },
//     dt_viewOptText: {
//         fontFamily: 'AvenirLTStd-Medium',
//         fontSize: 14,
//         color: '#A6A7A9',
//         paddingHorizontal: 9,
//         marginTop: 2,
//         width: Dimensions.get('window').width - 140,
//     },
//     dt_viewOptTexts: {
//         fontFamily: 'AvenirLTStd-Medium',
//         fontSize: 15,
//         color: '#FCB69F',
//         paddingHorizontal: 5,
//     },
//     dt_view_2: {
//         flex: 1,
//     },
//     dt_view_21: {
//         flex: 0.4,
//     },
//     mdtop: {
//         backgroundColor: '#FFFFFF',
//         marginTop: 50,
//         marginLeft: 'auto',
//         marginHorizontal: 30,
//         elevation: 5,
//         width: '50%',
//         borderRadius: 8,
//     },
//     modalText: {
//         fontFamily: 'AvenirLTStd-Medium',
//         fontSize: 14,
//         color: '#242A37',
//         marginTop: 8,
//         marginLeft: 10,
//     },
//     centerText: {
//         fontFamily: 'AvenirLTStd-Medium',
//         fontSize: 16,
//         color: '#000',
//         textAlign: 'center',
//     },

// })

import React from 'react';
import { Button, View, Platform } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const KundliGenerate = () => {
    const downloadAndSharePDF = async () => {
        const pdfUrl = 'https://www.example.com/sample.pdf';  // Replace with your PDF URL
        const localFile = '`${RNFS.DocumentDirectoryPath}/sample.pdf`';

        try {
            // Download the PDF file
            const download = RNFS.downloadFile({
                fromUrl: pdfUrl,
                toFile: localFile,
            });

            const result = await download.promise;
            if (result) {
                // Share the downloaded PDF file via WhatsApp
                const shareOptions = {
                    title: 'Share PDF',
                    url: `file://${localFile}`,
                    social: Share.Social.WHATSAPP,
                };

                Share.open(shareOptions)
                    .then((res) => console.log('Share successful', res))
                    .catch((err) => console.log('Share failed', err));
            } else {
                console.log('Failed to download file');
            }
        } catch (error) {
            console.log('Error downloading file', error);
        }
    };

    return (
        <View>
            <Button title="Share PDF on WhatsApp" onPress={downloadAndSharePDF} />
        </View>
    );
};

export default KundliGenerate;