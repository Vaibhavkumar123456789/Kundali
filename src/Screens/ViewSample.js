

import { View, Text, Image, StyleSheet, Animated, Modal, ActivityIndicator, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import stringsoflanguages from '../language/Language'
import { useIsFocused } from '@react-navigation/native';
import Header from '../Custom/Header';
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';

const ViewSample = ({ navigation, route }) => {
    console.log(JSON.stringify(route.params, null, 2))
    const window = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { width, height } = Dimensions.get('window');
    const [totalPages, setTotalPages] = useState(0);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={route.params?.title}
            />

            {/* <WebView
                // source={{ uri: `https://docs.google.com/viewer?url=${encodeURIComponent(route.params?.item)}` }}
                source={{ uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(route.params?.item)}` }}
                style={{ flex: 1, width: width, height: height }}
                originWhitelist={['*']}
                onError={(error) => console.log('Cannot render PDF', error)}
                renderLoading={() => (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator size="large" color="#FFCC80" />
                    </View>
                )}
                startInLoadingState={true}
            /> */}

            <View style={{ width: window.width, height: window.height, flexDirection: 'row', justifyContent: 'space-between' }}>

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
                        height: window.height,
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



        </SafeAreaView>
    )
}

export default ViewSample

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

