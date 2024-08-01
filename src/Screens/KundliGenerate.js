import { View, Text, Image, StyleSheet, Modal, BackHandler, Animated, ActivityIndicator, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import stringsoflanguages from '../language/Language'
import Header from '../Custom/Header';
import { WebView } from 'react-native-webview';
import Button from 'react-native-button';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import Mailer from 'react-native-mail';
import RNPrint from 'react-native-print';
import Pdf from 'react-native-pdf';

const KundliGenerate = ({ navigation, route }) => {
    console.log(JSON.stringify(route.params, null, 2))
    const window = Dimensions.get('window');
    const [totalPages, setTotalPages] = useState(0);
    const { width, height } = Dimensions.get('window');
    const [selectedPage, setSelectedPage] = useState(null);
    const pdfRef = useRef(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePageChange = (page) => {
        if (pdfRef.current) {
            pdfRef.current.setPage(page);
            setSelectedPage(page);
            Animated.spring(scaleAnim, {
                toValue: 1.2,
                friction: 2,
                useNativeDriver: true,
            }).start(() => {
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 2,
                    useNativeDriver: true,
                }).start();
            });
        }
    };


    const downloadAndSharePDF = async () => {                             //whatsapp
        const pdfUrl = route.params?.item || 'https://www.example.com/sample.pdf'; // Fallback URL
        const fileName = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
        const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        try {
            // Download the PDF file
            const download = RNFS.downloadFile({
                fromUrl: pdfUrl,
                toFile: localFile,
            });

            const result = await download.promise;
            if (result) {
                const fileExists = await RNFS.exists(localFile);
                // Share the downloaded PDF file via WhatsApp
                if (fileExists) {
                    // Share the downloaded PDF file via WhatsApp
                    const shareOptions = {
                        title: 'Share PDF',
                        message: 'Here is your PDF file',
                        url: `file://${localFile}`,
                        filename: fileName,
                        social: Share.Social.WHATSAPP,
                    };

                    Share.open(shareOptions)
                        .then((res) => console.log('Share successful', res))
                        .catch((err) => console.log('Share failed', err));
                } else {
                    console.log('Failed to download file', localFile);
                }
            } else {
                console.log('Failed to download file');
                console.log('Result:', result);
            }
            s
        } catch (error) {
            console.log('Error downloading file', error);
        }
    };


    const emaildownloadAndSharePDF = async () => {           // email

        const pdfUrl = route.params?.item || 'https://www.example.com/sample.pdf'; // Fallback URL
        const fileName = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
        const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        try {
            // Download the PDF file
            const download = RNFS.downloadFile({
                fromUrl: pdfUrl,
                toFile: localFile,
            });

            const result = await download.promise;
            if (result) {
                const fileExists = await RNFS.exists(localFile);
                if (fileExists) {
                    // Share the downloaded PDF file via Email
                    Mailer.mail({
                        subject: `PDF: ${fileName}`,
                        recipients: [route.params?.title || 'default@example.com'],
                        body: pdfUrl,
                        isHTML: true,
                        attachment: {
                            path: localFile,  // The absolute path of the file from storage
                            type: 'pdf',      // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                            name: fileName,   // Optional: Custom filename for attachment
                            uri: `file://${localFile}`,
                        },
                    }, (error, event) => {
                        if (error) {
                            console.log('Email Error:', error);
                        } else {
                            console.log('Email Sent:', event);
                        }
                    });
                } else {
                    console.log('File does not exist:', localFile);
                }
            } else {
                console.log('Failed to download file');
                console.log('Result:', result);
            }
        } catch (error) {
            console.log('Error downloading file', error);
        }
    }

    const printFromURL = async () => {
        try {
            await RNPrint.print({
                filePath: route.params?.item,
                orientation: 'landscape',
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (route.params?.number == "1") {
            const backAction = () => {
                navigation.goBack();
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );
            return () => backHandler.remove();
        }

        else if (route.params?.number == "2") {

            const backAction = () => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DrawerNavigator' }],
                });
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );
            return () => backHandler.remove();
        }
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => {
                    if (route.params?.number == "1") {
                        navigation.goBack()
                    }
                    else if (route.params?.number == "2") {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'DrawerNavigator' }],
                        });
                    }
                }}
                leftIcon={require('../assets/backtoback.png')}
                title={"kundli"}
            />
            <View style={{ width: window.width, height: window.height - 150, flexDirection: 'row', justifyContent: 'space-between' }}>

                <Pdf
                    ref={pdfRef}
                    source={{ uri: route.params?.item }}
                    onLoadComplete={(numberOfPages) => setTotalPages(numberOfPages)}
                    onPageChanged={(page) => console.log(`Current page: ${page}`)}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={{
                        flex: 1,
                        width: window.width - 50,
                        height: window.height - 150,
                    }}

                />
                <View  >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.pageNavigatorContainer}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handlePageChange(index + 1)}
                            >
                                <Animated.Text style={[
                                    styles.pageNumber,
                                    selectedPage === index + 1 && styles.selectedPageNumber,
                                    selectedPage === index + 1 && { transform: [{ scale: scaleAnim }] },
                                ]}>
                                    {index + 1}
                                </Animated.Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
                <Button
                    containerStyle={{
                        width: '30%',
                        height: 52,
                        borderRadius: 12,
                        overflow: 'hidden',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFCC80',
                    }}
                    style={{
                        fontSize: 16,
                        color: '#333333',
                        alignSelf: 'center',
                        fontFamily: 'AvenirLTStd-Medium',
                    }}

                    onPress={() => {
                        printFromURL()
                    }}>
                    Print
                </Button>
                <Button
                    containerStyle={{
                        width: '30%',
                        height: 52,
                        borderRadius: 12,
                        overflow: 'hidden',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFCC80',
                    }}
                    style={{
                        fontSize: 16,
                        color: '#333333',
                        alignSelf: 'center',
                        fontFamily: 'AvenirLTStd-Medium',
                    }}

                    onPress={emaildownloadAndSharePDF}>
                    Email
                </Button>
                <Button
                    containerStyle={{
                        width: '30%',
                        height: 52,
                        borderRadius: 12,
                        overflow: 'hidden',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFCC80',
                    }}
                    style={{
                        fontSize: 16,
                        color: '#333333',
                        alignSelf: 'center',
                        fontFamily: 'AvenirLTStd-Medium',
                    }}

                    onPress={downloadAndSharePDF}>
                    Whatsapp
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default KundliGenerate

const styles = StyleSheet.create({

    pageNavigatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        backgroundColor: 'white',
        marginRight: 5,
    },
    pageNumber: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'center',
        color: '#000',
        fontFamily: 'AvenirLTStd-Roman',
        fontSize: 12,
    },
    selectedPageNumber: {
        color: '#FFCC80',
        fontFamily: 'AvenirLTStd-Roman',
        fontSize: 13,
    },


})

