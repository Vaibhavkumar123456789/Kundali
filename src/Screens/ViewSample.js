import { View, Text, Image, StyleSheet, Modal, ActivityIndicator, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { useIsFocused } from '@react-navigation/native';
import Header from '../Custom/Header';
import { WebView } from 'react-native-webview';


const ViewSample = ({ navigation, route }) => {
    console.log(JSON.stringify(route.params, null, 2))
    const window = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { width, height } = Dimensions.get('window');
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={route.params?.title}
            />

            <WebView
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
            />


        </SafeAreaView>
    )
}

export default ViewSample

const styles = StyleSheet.create({


})

