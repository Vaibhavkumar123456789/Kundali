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
import { useIsFocused } from '@react-navigation/native';
import * as actions from '../redux/actions';
import { Packagelist, AsyncStorageSetUser, AsyncStorageSettoken, loginastrologer } from '../backend/Api';
import Loader from '../utils/Loader';
import GLobal, { data } from './GLobal';
import stringsoflanguages from '../language/Language'
import PayUBizSdk from 'payu-non-seam-less-react';
import { sha512 } from 'js-sha512';
import base64 from 'react-native-base64';
import Toast from 'react-native-simple-toast';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { NativeEventEmitter } from 'react-native';
import { livepaymentkey, merchnatsaltkey } from '../backend/Config';
const systemFonts = [
    ...defaultSystemFonts,
    'AvenirLTStd-Medium',
    'AvenirLTStd-Heavy',
];

const Package = ({ navigation }) => {
    const { _astrologerForm } = stringsoflanguages
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const [select, setSelect] = useState(-1)
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [input, setInput] = useState([])
    const [astrodata, setaAstrodata] = useState(GLobal.user)
    const [indexvalue, setIndexvalue] = useState(-1);
    const [result, setResult] = useState(null);

    const [productInfo, setProductInfo] = useState('wallet');
    const [environment, setEnvironment] = useState('0');
    const [android_surl, setAndroidSurl] = useState(
        'https://payu.herokuapp.com/success',
    );
    const [android_furl, setAndroidFurl] = useState(
        'https://payu.herokuapp.com/failure',
    );

    const [merchantSalt, setMerchantSalt] = useState(merchnatsaltkey)

    const [enableSI, setEnableSI] = useState(false);
    const [merchantName, setMerchantName] = useState('Madhusudan Astroworld Pvt Ltd');
    const [merchantLogo, setMerchantLogo] = useState('Jio');
    const [
        showExitConfirmationOnCheckoutScreen,
        setShowExitConfirmationOnCheckoutScreen,
    ] = useState(true);
    const [
        showExitConfirmationOnPaymentScreen,
        setShowExitConfirmationOnPaymentScreen,
    ] = useState(true);

    const [cartDetails, setCartDetails] = useState([
        { Order: 'Value' },
        { 'Key Name': 'Value1' },
    ]);
    const [paymentModesOrder, setPaymentModesOrder] = useState([
        { UPI: 'TEZ' },
        { Cards: 'PAYTM' },
        { EMI: '' },
    ]);
    const isFocused = useIsFocused();
    const [key, setKey] = useState(livepaymentkey);
    const [surePayCount, setSurePayCount] = useState(1);
    const [merchantResponseTimeout, setMerchantResponseTimeout] = useState(10000);
    const [autoSelectOtp, setAutoSelectOtp] = useState(true);
    const [showCbToolbar, setShowCbToolbar] = useState(true);
    const [autoApprove, setAutoApprove] = useState(false);
    const [merchantSMSPermission, setMerchantSMSPermission] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const displayAlert = (title, value) => {
        if (showAlert == false) {
            console.log('displayAlert ' + title + ' ' + value);
            // setShowAlert(true);
            Alert.alert(title, value);
            //setState({ showAlert: true }, () => Alert.alert(title, value));
        }
        setShowAlert(false);
    };


    const onPaymentSuccess = async e => {
        var c = JSON.parse(e.payuResponse);
        console.log('hello');
        console.log("payment successfull", JSON.stringify(c));
        updateUI(c?.result?.mihpayid);
    };

    const onPaymentFailure = e => {
        console.log(e);
        console.log(e.merchantResponse);
        console.log(e.payuResponse);
        alert('Payment Failed');

    };
    const onPaymentCancel = e => {
        console.log('onPaymentCancel isTxnInitiated -' + e);
        // updateUI('22');
        alert('Payment Cancelled');
        // displayAlert('onPaymentCancel', JSON.stringify(e));
        // updateUI('payu_12234ewkf');
    };
    const onError = e => {
        console.log(e);
        // success1('payu_12234ewkf');
        displayAlert('onError', JSON.stringify(e));
    };
    const generateHash = e => {
        console.log(e.hashName);
        console.log(e.hashString);
        sendBackHash(e.hashName, e.hashString + merchantSalt);
    };
    const createPaymentParams = (item) => {

        let bto = {
            "name": astrodata.name,
            "mobile": astrodata.number,
            "email": astrodata.email,
            "country_code": "+91",
            "device_id": '123',
            "device_token": GLobal.firebaseToken,
            "device_type": Platform.OS,
            "loginTime": "123123",
            "password": astrodata.password,
            "country": astrodata.should1,
            "state": astrodata.should6,
            "city": astrodata.should7,
            "institute_centre_name": astrodata.centrename,
            "package_id": item?.id,
            "tax_amt": item?.tax_amount,
            "net_amount": item?.taxable_amount,
            "total_mrp": item?.total_amount,
            "newsignup": "1",
        };


        console.log(JSON.stringify(bto));
        // let btoaStrsing = JSON.stringify(bto);
        let btoaStrsing = base64.encode(JSON.stringify(bto));
        var txnid = new Date().getTime().toString();

        console.log(
            'AutoSelectOtp: ' +
            autoSelectOtp +
            'MerchantSmsPermission: ' +
            merchantSMSPermission,
        );
        var payUPaymentParams = {
            key: key,
            transactionId: txnid,
            amount: parseFloat(item?.total_amount).toString(),
            productInfo: productInfo,
            firstName: astrodata.name,
            email: astrodata.email,
            phone: astrodata.number,
            android_surl: android_surl,
            android_furl: android_furl,
            environment: environment,
            userCredential: astrodata.name,
            additionalParam: {
                udf1: btoaStrsing,
                udf2: btoaStrsing,
                udf3: btoaStrsing,
                udf4: btoaStrsing,
                udf5: btoaStrsing,
                description: btoaStrsing,
                Addwallet: '',
            },
        };
        var siParamObject = {
            isFreeTrial: true,
            billingAmount: 10,
            billingInterval: 1,
            paymentStartDate: '2024-04-20',
            paymentEndDate: '2025-04-30',
            billingCycle: 'once', //Can be any of 'daily','weekly','yearly','adhoc','once','monthly'
            remarks: 'Test SI transcaction',
            billingCurrency: 'INR',
        };
        if (enableSI) {
            console.log('Inside enableSI');
            payUPaymentParams.payUSIParams = siParamObject;
        }

        var payUCheckoutProConfig = {
            primaryColor: '#FFCC80',
            secondaryColor: '#FFCC80',
            merchantName: merchantName,
            merchantLogo: merchantLogo,
            showExitConfirmationOnCheckoutScreen:
                showExitConfirmationOnCheckoutScreen,
            showExitConfirmationOnPaymentScreen: showExitConfirmationOnPaymentScreen,
            cartDetails: cartDetails,
            paymentModesOrder: paymentModesOrder,
            surePayCount: surePayCount,
            merchantResponseTimeout: merchantResponseTimeout,
            autoSelectOtp: autoSelectOtp,
            // Android specific property
            autoApprove: autoApprove,
            merchantSMSPermission: merchantSMSPermission,
            showCbToolbar: showCbToolbar,
        };

        return {
            payUPaymentParams: payUPaymentParams,
            payUCheckoutProConfig: payUCheckoutProConfig,
        };
    };
    //Used to send back hash generated to SDK
    const sendBackHash = (hashName, hashData) => {
        console.log(hashName);
        var hashValue = calculateHash(hashData);
        var result = { [hashName]: hashValue };
        console.log('hash', result);
        PayUBizSdk.hashGenerated(result);
    };

    const calculateHash = data => {
        console.log(data);
        var result = sha512(data);
        console.log(result);
        return result;
    };

    const launchPayU = (item) => {
        // console.log('Method launched amount =' + amount);
        PayUBizSdk.openCheckoutScreen(createPaymentParams(item));
    };

    const updateUI = id => {
        console.log(JSON.stringify(id, null, 2))
        const r = Math.random() * new Date().getMilliseconds();
        console.log(r);

        // const item = input[select];
        // let updatedItem = {
        //     ...item,
        // };

        let bto = {
            "name": astrodata.name,
            "mobile": astrodata.number,
            "email": astrodata.email,
            "country_code": "+91",
            "device_id": '123',
            "device_token": GLobal.firebaseToken,
            "device_type": Platform.OS,
            "loginTime": "123123",
            "password": astrodata.password,
            "country": astrodata.should1,
            "state": astrodata.should6,
            "city": astrodata.should7,
            "institute_centre_name": astrodata.centrename,
            "package_id": GLobal.payment?.id,
            "tax_amt": GLobal.payment?.tax_amount,
            "net_amount": GLobal.payment?.taxable_amount,
            "total_mrp": GLobal.payment?.total_amount,
            "newsignup": "1",
            "payment_id": id,
        };

        console.log('body send to api', JSON.stringify(bto));
        let btoaStrsing = base64.encode(JSON.stringify(bto));
        bto.description = btoaStrsing;
        bto.payment_id = id;
        console.log(JSON.stringify(bto));
        paidpackage(bto);
    }

    const paidpackage = (ii) => {
        GLobal.kundliformdetail = ii
        toggleLoading(true);
        loginastrologer(ii)
            .then(data => {
                console.log('package detail ...', data)
                toggleLoading(false);
                if (data.status) {
                    // alert(JSON.stringify(data, null, 2))
                    actions.Login(data?.user_detail);
                    actions.Token(data?.token);
                    AsyncStorageSettoken(data?.token);
                    AsyncStorageSetUser(data?.user_detail);
                    navigation.replace('PaymentSuccessfully', data)
                } else {
                    Toast.show(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }


    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(PayUBizSdk);
        const payUOnPaymentSuccess = eventEmitter.addListener(
            'onPaymentSuccess',
            onPaymentSuccess,
        );
        const payUOnPaymentFailure = eventEmitter.addListener(
            'onPaymentFailure',
            onPaymentFailure,
        );
        const payUOnPaymentCancel = eventEmitter.addListener(
            'onPaymentCancel',
            onPaymentCancel,
        );
        const payUOnError = eventEmitter.addListener('onError', onError);
        const payUGenerateHash = eventEmitter.addListener(
            'generateHash',
            generateHash,
        );
        return () => {
            console.log("Unsubscribed!!!!")
            payUOnPaymentSuccess.remove();
            payUOnPaymentFailure.remove();
            payUOnPaymentCancel.remove();
            payUOnError.remove();
            payUGenerateHash.remove();
        }
    }, [isFocused == true])


    useEffect(() => {

        toggleLoading(true);
        Packagelist()
            .then(data => {
                toggleLoading(false);
                // alert(JSON.stringify(data, null, 2))

                if (data.status) {
                    setInput(data?.data)
                    calculateTaxDetails(data?.data)
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }, [isFocused == true])

    const calculateTaxDetails = (listed) => {
        const updatedReport = listed?.map((item) => {
            let amount = item["amount"];
            let discount = item["discount_amount"];
            let taxable_amount = discount > 0 ? discount : amount;


            let tax_amount = 0;
            let total_amount = 0;
            let tax_percentage = 0;

            if (item["tax"] == null) {
                tax_percentage = 0;
                total_amount = taxable_amount;
            } else {
                tax_percentage = item["tax"]["tax_percentage"];
                tax_amount = taxable_amount * tax_percentage / 100;
                total_amount = taxable_amount + tax_amount;
            }
            return {
                ...item,
                tax_amount: parseFloat(tax_amount).toFixed(2),
                taxable_amount: parseFloat(taxable_amount).toFixed(2),
                total_amount: parseFloat(total_amount).toFixed(2),
            };
        })
        setInput(updatedReport);
    }


    const Freepackage = async (item) => {               //astrologer

        let amount = item["amount"]
        discount = item["discount_amount"]
        let taxable_amount = discount > 0 ? discount : amount;

        tax_amount = 0
        if (item.tax == null || item.is_free == 1) {
            tax_percentage = 0
            total_amount = taxable_amount
        } else {
            tax_percentage = item["tax"]["tax_percentage"]
            tax_amount = taxable_amount * tax_percentage / 100
            total_amount = taxable_amount + tax_amount
        }
        var txnid = new Date().getTime().toString();
        let e = {
            "name": astrodata.name,
            "mobile": astrodata.number,
            "email": astrodata.email,
            "country_code": "+91",
            "device_id": '123',
            "device_token": GLobal.firebaseToken,
            "device_type": Platform.OS,
            "loginTime": "123123",
            "password": astrodata.password,
            "country": astrodata.should1,
            "state": astrodata.should6,
            "city": astrodata.should7,
            "institute_centre_name": astrodata.centrename,
            "package_id": item.id,
            "tax_amt": tax_amount,
            "net_amount": taxable_amount,
            "total_mrp": total_amount,
            "newsignup": "1",
            "payment_id": txnid,
        };

        GLobal.kundliformdetail = e
        console.log('package body ...', e)
        toggleLoading(true);
        loginastrologer(e)
            .then(data => {
                console.log('package detail ...', data)
                toggleLoading(false);
                if (data.status) {
                    // alert(JSON.stringify(data, null, 2))
                    actions.Login(data?.user_detail);
                    actions.Token(data?.token);
                    AsyncStorageSettoken(data?.token);
                    AsyncStorageSetUser(data?.user_detail);
                    navigation.replace('DrawerNavigator')
                } else {
                    Toast.show(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_astrologerForm.package}
            />
            {state.loading && <Loader />}

            {input && input?.length > "0" ?
                <FlatList
                    data={input}
                    style={{ flexGrow: 0, marginTop: 10 }}
                    renderItem={({ item, index }) => (
                        <View>
                            <Pressable onPress={() => {
                                if (item.is_free == 1) {
                                    Freepackage(item)
                                    //free

                                } else if (item.is_free == 0) {
                                    launchPayU(item);                   //membership
                                    GLobal.payment = item
                                }
                            }}>
                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 12,
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 12,
                                        borderColor: '#D0D0D0',
                                        borderWidth: 2,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text numberOfLines={1} style={{
                                            fontSize: 18,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginLeft: 10,
                                            width: window.width - 170,
                                        }}>
                                            {item?.package_name}
                                        </Text>
                                        {(item.is_free == 1 &&                 // free
                                            <Text style={{
                                                fontSize: 18,
                                                color: '#333333',
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                marginRight: 10,
                                            }}>
                                                {item?.days} {item?.name}
                                            </Text>
                                        )}
                                        {(item.is_free == 0 &&                       // membership
                                            <Text style={{
                                                fontSize: 18,
                                                color: '#333333',
                                                fontFamily: 'AvenirLTStd-Heavy',
                                                marginRight: 10,
                                            }}>
                                                ₹{item?.total_amount}
                                            </Text>
                                        )}
                                    </View>
                                    {/* {(item.is_free == 0 &&
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#363636',
                                            lineHeight: 17,
                                            marginTop: 5,
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginHorizontal: 10,
                                        }}>
                                            Plan Validity- {item?.days} {item?.name}
                                        </Text>
                                    )} */}
                                    <Text style={{
                                        fontSize: 13,
                                        color: '#36363660',
                                        lineHeight: 17,
                                        marginTop: 5,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        marginHorizontal: 10,
                                    }}>
                                        {item?.title}
                                    </Text>

                                    <Text onPress={() => {
                                        if (index == indexvalue) {
                                            setIndexvalue(-1);
                                        } else {
                                            setIndexvalue(index);
                                        }
                                    }} style={{
                                        fontSize: 12,
                                        color: '#333333',
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        marginHorizontal: 10,
                                        marginTop: 5,
                                        textDecorationLine: 'underline',
                                    }}>
                                        {index === indexvalue ? 'View Less' : 'View More'}
                                    </Text>
                                    {index == indexvalue ? (

                                        <View style={{ marginTop: 5, marginHorizontal: 10 }}>
                                            <RenderHtml
                                                containerStyle={{
                                                    marginTop: 20,
                                                }}
                                                source={{ html: item?.description }}
                                                systemFonts={systemFonts}
                                                tagsStyles={{
                                                    p: {
                                                        fontSize: 13,
                                                        fontFamily: 'AvenirLTStd-Medium',
                                                        lineHeight: 17,
                                                        color: '#36363660',
                                                    },
                                                    a: {
                                                        fontSize: 13,
                                                        fontFamily: 'AvenirLTStd-Medium',
                                                        lineHeight: 17,
                                                        color: '#36363660',
                                                    },
                                                }}
                                            />
                                        </View>
                                    ) : null}
                                </View>
                            </Pressable>

                        </View>
                    )}
                />
                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Package Available</Text>
                </View>}
        </SafeAreaView>
    )
}

export default Package

const styles = StyleSheet.create({})

