
import { View, Text, SafeAreaView, StatusBar, Image, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
import stringsoflanguages from '../language/Language'
import Loader from '../utils/Loader';

const PaymentSuccessfully1 = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    const { _astrologerForm } = stringsoflanguages
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {state.loading && <Loader />}
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    marginTop: height / 4,
                }}
                source={require('../assets/check1.png')} />

            {/* <Text style={{
                marginHorizontal: 10,
                fontSize: 18,
                color: '#333333',
                fontFamily: 'AvenirLTStd-Roman',
                letterSpacing: 0.45,
                marginTop: 13,
                textAlign: 'center',
            }}>
                {_astrologerForm.refid}
            </Text> */}

            <Text style={{
                marginHorizontal: 10,
                fontSize: 24,
                color: '#333333',
                fontFamily: 'AvenirLTStd-Medium',
                letterSpacing: 0.6,
                marginTop: 15,
                textAlign: 'center',
            }}>
                {_astrologerForm.paymentsuccess}
            </Text>

            <Text style={{
                marginHorizontal: 10,
                fontSize: 16,
                color: '#333333',
                fontFamily: 'AvenirLTStd-Roman',
                letterSpacing: 0.4,
                marginTop: 8,
                textAlign: 'center',
            }}>
                {_astrologerForm.textaddress}
            </Text>

            <Button
                containerStyle={{
                    paddingHorizontal: 20,
                    height: 40,
                    marginTop: 22,
                    borderRadius: 6,
                    borderColor: '#333333',
                    borderWidth: 2,
                    overflow: 'hidden',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                }}
                style={{
                    fontSize: 14,
                    color: '#333333',
                    alignSelf: 'center',
                    fontFamily: 'AvenirLTStd-Medium',
                }}
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DrawerNavigator' }],
                    });
                }}>
                {_astrologerForm.gotohomepage}
            </Button>


        </SafeAreaView>
    )
}

export default PaymentSuccessfully1
const styles = StyleSheet.create({})