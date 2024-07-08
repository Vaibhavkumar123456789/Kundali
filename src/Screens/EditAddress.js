import React, { useState, useEffect, useRef } from 'react';
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
    ScrollView, PermissionsAndroid,
    StatusBar, Animated
} from 'react-native';
import Header from '../Custom/Header';
import Toast from 'react-native-simple-toast';
import stringsoflanguages from '../language/Language'
import Button from 'react-native-button';
import GetLocation from 'react-native-get-location'
import { Dropdown } from 'react-native-element-dropdown';
import MapView, { Marker } from 'react-native-maps';
import { City1, Country, State1, updateaddress } from '../backend/Api';
import Loader from '../utils/Loader';

const EditAddress = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _setting, _customlang, _astrologerForm } = stringsoflanguages
    const [should1, setShould1] = useState('')
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [clist, setCList] = useState([])
    const [statelist1, setStateList] = useState([])
    const [cityname, setCityName] = useState([])
    const [name, setName] = useState(route.params?.name)
    const [mobile, setMobile] = useState(route.params?.mobile)
    const [address, setAddress] = useState(route.params?.address)
    const [pincode, setPincode] = useState(route.params?.pincode)
    const [should5, setShould5] = useState('')
    const [should6, setShould6] = useState('')
    const [should7, setShould7] = useState('')
    const [list, setList] = useState(null);
    const [Lat, setLat] = useState(parseFloat(route.params?.latitude));
    const [Lon, setLon] = useState(
        parseFloat(route.params?.longitude),
    );

    useEffect(() => {
        Countrysearch()

        animateToMarker({
            latitude: Lat,
            longitude: Lon,
        });
    }, [])


    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
                // Get the location here
                toggleLoading(true);
                GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 15000,
                })
                    .then(location => {
                        // alert(JSON.stringify(location, null, 2));
                        setList(location);
                        animateToMarker(location);
                        setLat(location?.latitude);
                        setLon(location?.longitude);

                        toggleLoading(false);
                    })
                    .catch(error => {
                        toggleLoading(false);
                        const { code, message } = error;
                        console.warn(code, message);
                    });
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }

    };
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const placesRef = useRef(null);

    const handleChange = (item) => {
        // alert(JSON.stringify(item,null,2))
        // return
        setList({
            latitude: parseFloat(item?.value?.latitude),
            longitude: parseFloat(item?.value?.longitude)
        });
        animateToMarker({
            latitude: parseFloat(item?.value?.latitude),
            longitude: parseFloat(item?.value?.longitude)
        });
        setLat(parseFloat(item?.value?.latitude));
        setLon(parseFloat(item?.value?.longitude));

    };

    const animateToMarker = vv => {
        if (markerRef.current && mapRef.current) {
            // alert(JSON.stringify(vv, null, 2))
            // return
            const markerCoordinate = markerRef.current.props.coordinate;
            const region = {
                latitude: vv.latitude,
                longitude: vv.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            };
            mapRef.current.animateToRegion(region, 1000); // 1000 is the duration in milliseconds
        }
    };


    const Countrysearch = () => {
        toggleLoading(true)
        Country()
            .then(data => {
                toggleLoading(false)
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.id,
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
    const statelist = (id) => {
        toggleLoading(true);
        let e = {
            "country_id": id
        };
        State1(e)
            .then(data => {
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.id,
                        })
                        setStateList(tempCArr)
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
    const citylist = (id) => {
        toggleLoading(true);
        let e = {
            "state_id": id
        };
        City1(e)
            .then(data => {
                // console.log(data)
                toggleLoading(false);
                if (data.status) {
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i,
                        })
                        setCityName(tempCArr)
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


    const listaddress = () => {
        if (name == '') {
            Toast.show('Please enter Name');
        }
        else if (mobile === '' || mobile.length !== 10) {
            Toast.show('Please enter your valid phone number');
        } else if (address == '') {
            Toast.show('Please enter Address');
        } else if (pincode == '') {
            Toast.show('Please enter Pincode');
        }

        else {
            let e = {
                "name": name,
                "mobile": mobile,
                "address": address,
                "country_id": should5 == '' ? route.params?.country_id : should5,
                "state_id": should6 == '' ? route.params?.state_id : should6,
                "city_name": should7 == '' ? route.params?.city_id : should7?.value?.id,
                "latitude": list != null ? list.latitude : route.params?.latitude,
                "longitude": list != null ? list.longitude : route.params?.longitude,
                "pincode": pincode,
                "default": "1",
                "city_id": should7 == '' ? route.params?.city_id : should7?.value?.id,
                "type": should1 == '' ? route.params?.type : should1,
                "address_id": route.params?.id,
            };
            // alert(JSON.stringify(e, null, 2))
            // return
            toggleLoading(true);
            updateaddress(e)
                .then(data => {
                    // alert(JSON.stringify(data, null, 2))
                    toggleLoading(false);
                    if (data.status) {
                        Toast.show(data?.message)
                        navigation.goBack()
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
                title='Edit Address'
            />
            {state.loading && <Loader />}
            <ScrollView>

                <MapView
                    ref={mapRef}
                    style={{ width: '100%', height: 227 }}
                    initialRegion={{
                        latitude: Lat,
                        longitude: Lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        ref={markerRef}
                        coordinate={{
                            latitude: Lat || 28.6922,
                            longitude: Lon || 77.1507,
                        }}
                        title="Destination"
                    />
                </MapView>


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
                    {_kundali.mobile}
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
                    placeholder={_kundali.mobile}
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
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
                    {_astrologerForm.country}
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
                    searchPlaceholder={_astrologerForm.country}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                    labelField="label"
                    valueField="value"
                    placeholder={should5 == '' ? route.params?.country_name : _astrologerForm.country}
                    value={should5}
                    onChange={(item) => {
                        setShould5(item.value), statelist(item.value)
                    }}
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
                    {_astrologerForm.statename}
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
                    maxHeight={200}
                    search
                    searchPlaceholder={_astrologerForm.statename}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                    data={statelist1}
                    labelField="label"
                    valueField="value"
                    placeholder={should6 == '' ? route.params?.state_name : _astrologerForm.statename}
                    value={should6}
                    onChange={(item) => {
                        setShould6(item.value), citylist(item.value)
                    }}
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
                    {_astrologerForm.city}
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
                    maxHeight={200}
                    search
                    searchPlaceholder={_astrologerForm.city}
                    inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333', }}
                    data={cityname}
                    labelField="label"
                    valueField="value"
                    placeholder={should7 == '' ? route.params?.city_name : _astrologerForm.city}
                    value={should7}
                    onChange={(item) => {
                        // alert(JSON.stringify(item, null, 2))
                        setShould7(item), handleChange(item)
                        //     setList({
                        //         latitude: item?.latitude,
                        //         longitude: item?.longitude,
                        //     });
                        // animateToMarker({
                        //     latitude: item?.latitude,
                        //     longitude: item?.longitude,
                        // });
                    }}
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
                    {_kundali.address}
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
                    placeholder={_kundali.address}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
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
                    {_kundali.pincode}
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
                    maxLength={6}
                    placeholder={_kundali.pincode}
                    value={pincode}
                    onChangeText={(text) => setPincode(text)}
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
                    Type
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
                        { label: 'Office', value: 'Office' },
                        { label: 'Home', value: 'Home' },
                    ]}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    placeholder={should1 == '' ? route.params?.type : 'Type'}
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
                        listaddress()
                    }}>
                    {_customlang.submit}
                </Button>

            </ScrollView>

        </SafeAreaView >
    )
}

export default EditAddress

const styles = StyleSheet.create({})


