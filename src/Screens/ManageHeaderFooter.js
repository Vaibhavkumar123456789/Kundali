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
    StatusBar,
    Modal, PermissionsAndroid
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language';
import Button from 'react-native-button';
import axios from 'axios';
import { BASE_URL } from '../backend/Config';
import { validateEmail } from '../utils/utils';
import { useDispatch, useSelector, useStore } from 'react-redux';
import SkipScreen from './component/SkipScreen';
import Toast from 'react-native-simple-toast';
import Loader from '../utils/Loader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { type } from 'react-native-document-picker';
import { AsyncStorageGettoken, HeaderColor } from '../backend/Api';
import { Dropdown } from 'react-native-element-dropdown';

const ManageHeaderFooter = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _drawer } = stringsoflanguages;
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [should1, setShould1] = useState('')
    const [should2, setShould2] = useState('')
    const [should3, setShould3] = useState('')
    const [key, setKey] = useState(0)
    const [cname, setCName] = useState('')
    const [aname, setAName] = useState('')
    const [empty, setEmpty] = useState();
    const [caddress, setCAddress] = useState('')
    const [colorList, setColorList] = useState([])
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const { skip_id } = useSelector(store => store.user);
    const [state1, setState1] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState1({ ...state1, loading: bol });
    const [state, setState] = useState({
        image: '',
    });

    const [acCount, setAcCount] = useState([{
        achivement: '',
    }])

    useEffect(() => {
        headercolorapi()
    }, [])
    const headercolorapi = () => {
        HeaderColor()
            .then(data => {
                if (data.status) {
                    // alert(JSON.stringify(data,null,2))
                    // return
                    let tempCArr = []
                    data?.data.map((i) => {
                        tempCArr.push({
                            label: i.name,
                            value: i.value,
                        })
                        setColorList(tempCArr)
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

    const addInputFieldAc = () => {
        if (acCount.length >= 2) {
            Toast.show('You can only add two Mobile Number.');
            return;
        }
        setAcCount([...acCount, {
            achivement: '',
        }])
    }
    const handleChange = (index, evnt) => {
        const list = [...acCount];
        list[index] = evnt;
        setAcCount(list);
    }

    const deleteAchivement = (index) => {
        if (acCount.length <= 1) {
            Toast.show('You can exist one details');
            return;
        }
        setKey(key + 1)
        acCount.pop(index);
        console.log(acCount)
        setAcCount(acCount)
    }

    const finalSubmit = async () => {
        try {

            if (state.image == '') {
                Toast.show('Please select image');
            }
            else if (cname == '') {
                Toast.show('Please enter Company Name');
            }
            else if (aname == '') {
                Toast.show('Please enter Astrologer Name');
            }
            else if (caddress == '') {
                Toast.show('Please enter Company Address');
            }
            else if (acCount[0] === '' || acCount[0]?.length !== 10) {
                Toast.show('Please enter your valid Mobile number');
            }
            else if (acCount.some((input) => input === '' || input.length !== 10)) {
                Toast.show('Please enter your Add Mobile Number');
            }
            else if (email == '') {
                Toast.show('Please enter Email');
            }
            else if (!validateEmail(email)) {
                Toast.show('Please enter your valid email address');
            }
            else if (website == '') {
                Toast.show('Please enter Website');
            } else if (should1 == '') {
                Toast.show('Please select Color');
            }
            else if (should2 == '') {
                Toast.show('Please select  Company Color');
            }
            else if (should3 == '') {
                Toast.show('Please select Astrologer Color');
            }
            else {
                var array = []
                for (let user of acCount) {
                    if (user.length > 0) {
                        array.push(user)
                    }
                }
                toggleLoading(true)
                let formData = new FormData();
                formData.append('company_address', caddress)
                formData.append('company_name', cname)
                formData.append('astrologer_name', aname)
                formData.append('email', email)
                formData.append('mobile', acCount[0])
                formData.append('alternate_mobile', acCount[1])
                formData.append('website', website)
                formData.append('header_color', should1)
                formData.append('company_color', should2)
                formData.append('astrologer_color', should3)
                formData.append('image', {
                    uri: state.image == '' ? '' : state.image.uri,
                    type: 'image/jpeg',
                    name: 'image.png',
                })
                // alert(JSON.stringify(formData, null, 2))
                // return
                const token = (await AsyncStorageGettoken() || '')
                const btoken = `Bearer ${token}`;

                axios
                    .post(
                        `${BASE_URL}header-manage`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                // Add any additional headers as needed
                                Authorization: btoken,
                            },
                        },
                    )
                    .then(response => {
                        // alert(JSON.stringify(response.data, null, 2))
                        toggleLoading(false);
                        navigation.navigate("HeaderFooterPreview")
                        console.log('Manage Header Footer', response.data)
                    })
                    .catch(error => {
                        toggleLoading(true);
                        axios
                            .post(
                                `${BASE_URL}header-manage`,
                                formData,
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        // Add any additional headers as needed
                                        Authorization: btoken,
                                    },
                                },
                            )
                            .then(response => {
                                toggleLoading(false);
                                navigation.navigate("HeaderFooterPreview")
                                console.log('Manage Header Footer', response.data)
                            })
                            .catch(error => {
                                // Handle errors
                                toggleLoading(false);
                                console.error('Error uploading files', error);
                            });
                        // Handle errors
                        toggleLoading(false);
                        console.error('Error uploading files1', error);
                    });

            }
        } catch (error) {
            toggleLoading(false)
            console.log(error)
        }
    };

    const requestCameraPermission = async launch => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'App Camera Permission',
                    message: 'App needs access to your camera ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission given');
                onImageOptionHandler(launch);
            } else {
                console.log('Camera permission denied');

            }
        } catch (err) {
            console.warn(err);
        }
    };
    const onImageOptionHandler = async launch => {
        setModalVisible(false);
        const options = {
            title: 'Select and Take Profile Picture',
            cameraType: 'front',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 1,
            maxWidth: 300,
            maxHeight: 550,
        };
        await launch(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const { type, fileName, fileSize, uri } = response.assets[0];
                console.log(JSON.stringify(response.assets[0], null, 2));
                // alert(JSON.stringify(response.assets[0], null, 2));
                // setState({...state, uri, type, fileName, modalVisible: false});
                if (empty === 0) {
                    setState({
                        ...state,
                        image: response.assets[0],
                    });
                }
            }
        });
    };

    const getPDF = async () => {
        // alert(setModalVisible);

        try {
            const response = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            //   alert(JSON.stringify(response, null, 2));
            //   return;
            if (response) {
                let tempUri = response[0].uri.replace(
                    'content://',
                    'file:///data/user/0',
                );
                // alert(JSON.stringify(response, null, 2));
                // return;
                setState({
                    ...state,
                    image: response[0],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const ifAvaileble = item => {
        if (item.type.split('/')[1] === 'jpg') {
            return (
                <ImageBackground
                    imageStyle={{ borderRadius: 5 }}
                    style={{
                        width: 110, height: 110, resizeMode: 'contain', alignSelf: 'center', marginTop: 20
                    }}
                    source={{ uri: item }}>
                    <TouchableOpacity
                        style={{
                            marginLeft: 'auto',
                            // marginVertical: 5,
                            // marginHorizontal: 5,
                        }}
                        onPress={() => {
                            setState({ ...state, image: '' });
                        }}>
                        <Image
                            style={{
                                width: 22,
                                height: 22,
                            }}
                            source={require('../assets/close1.png')}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            );
        } else {
            return (
                <ImageBackground
                    imageStyle={{ borderRadius: 70 }}
                    style={{
                        width: 110, height: 110, resizeMode: 'contain', alignSelf: 'center', marginTop: 20
                    }}
                    source={{ uri: item.uri }}>
                    <TouchableOpacity
                        style={{
                            marginLeft: 'auto',
                            // marginVertical: 5,
                            // marginHorizontal: 5,
                        }}
                        onPress={() => {
                            setState({ ...state, image: '' });
                        }}>
                        <Image
                            style={{
                                width: 22,
                                height: 22,
                            }}
                            source={require('../assets/close1.png')}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            );
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_drawer.manage}
            />
            {state1.loading && <Loader />}
            <ScrollView>

                {skip_id == 1 ?
                    <SkipScreen />
                    :
                    <>
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#333333',
                                fontSize: 18,
                                marginLeft: 18,
                                marginTop: 15,
                            }}>
                            {_invoice.add}
                        </Text>


                        <View>
                            {state.image ? (
                                ifAvaileble(state.image)
                            ) : (
                                <View
                                    style={{
                                        width: 110,
                                        height: 110,
                                        alignSelf: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setEmpty(0);
                                            setModalVisible(true);
                                        }
                                        }>
                                        <ImageBackground
                                            imageStyle={{ borderRadius: 70 }}
                                            style={{
                                                width: 110, height: 110, alignSelf: 'center', marginTop: 10
                                            }}
                                            source={
                                                state.image?.uri?.length > 0
                                                    ? { uri: `${state.image.uri}` }
                                                    : require('../assets/defaultimage.png')
                                            }>
                                            <Image
                                                style={{
                                                    width: 22,
                                                    height: 22,
                                                    resizeMode: 'contain',
                                                    marginLeft: 'auto',
                                                }}
                                                source={require('../assets/edit.png')}
                                            />
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Heavy',
                                color: '#333333',
                                fontSize: 18,
                                marginTop: 20,
                                textAlign: 'center',
                            }}>
                            {_invoice.addlogo}
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 19,
                                marginHorizontal: 18,
                            }}>
                            {_invoice.companyname}
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
                            placeholder={_invoice.companyname}
                            value={cname}
                            onChangeText={(text) => setCName(text)}
                        />
                        <View
                            style={{
                                borderBottomColor: '#F7F7F7',
                                borderBottomWidth: 10,
                                paddingVertical: 10,
                            }}></View>
                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#333333',
                                fontSize: 18,
                                marginLeft: 18,
                                marginTop: 15,
                            }}>
                            {_invoice.addfooter}
                        </Text>

                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 19,
                                marginHorizontal: 18,
                            }}>
                            {_invoice.astrologername}
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
                            placeholder={_invoice.astrologername}
                            value={aname}
                            onChangeText={(text) => setAName(text)}
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
                            {_invoice.companyaddress}
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
                            placeholder={_invoice.companyaddress}
                            value={caddress}
                            onChangeText={(text) => setCAddress(text)}
                        />
                        {acCount.map((i, index) => (
                            <>
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
                                    keyboardType="numeric"
                                    maxLength={10}
                                    placeholder={_kundali.mobile}
                                    onChangeText={(evnt) => handleChange(index, evnt)}
                                    value={i.achivement}

                                />
                                <TouchableOpacity onPress={() => { setModalVisible4(true) }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'red',
                                        fontFamily: 'AvenirLTStd-Heavy',
                                        lineHeight: 18,
                                        marginRight: 18,
                                        marginTop: 5,
                                        textAlign: 'right',
                                    }}>Remove
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ))}
                        <Pressable onPress={addInputFieldAc}>
                            <Text
                                style={{
                                    fontFamily: 'AvenirLTStd-Heavy',
                                    color: '#FFCC80',
                                    fontSize: 14,
                                    marginLeft: 18,
                                    marginTop: 8,
                                }}>
                                +{_invoice.addmore}
                            </Text>
                        </Pressable>

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

                        <Text
                            style={{
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#ADADAD',
                                fontSize: 18,
                                letterSpacing: -0.2,
                                marginTop: 19,
                                marginHorizontal: 18,
                            }}>
                            {_invoice.website}
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
                            placeholder={_invoice.website}
                            value={website}
                            onChangeText={(text) => setWebsite(text)}
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
                            {"Select Color"}
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
                            data={colorList}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={"Color"}
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
                            Select Company Color Name
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
                            data={colorList}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={"Select Company Color Name"}
                            value={should2}
                            onChange={(item) => setShould2(item.value)}
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
                            Select Astrologer Color Name
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
                            data={colorList}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={"Select Astrologer Color Name"}
                            value={should3}
                            onChange={(item) => setShould3(item.value)}
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
                            onPress={() => { finalSubmit() }}>
                            {_member.save}
                        </Button>
                    </>
                }
            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.touch}
                            onPress={() => requestCameraPermission(launchCamera)}>
                            <Text style={styles.text}>Click a Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.touch}
                            onPress={() => {
                                state.report_file;

                                setModalVisible(false);
                                if (empty == 0) {
                                    getPDF();
                                }
                            }}>
                            <Text style={styles.text}>Choose Photo from Gallery</Text>
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
                    style={styles.container}>
                    <View style={styles.modalView}>
                        <View style={{ backgroundColor: '#FFCC80', paddingVertical: 13, marginTop: -20, width: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                            <Text style={{
                                fontSize: 16,
                                color: 'black',
                                fontFamily: 'AvenirLTStd-Medium',
                                lineHeight: 18,
                                marginLeft: 15,
                            }}>
                                Confirm Action
                            </Text>

                        </View>
                        <Text style={{
                            fontSize: 16,
                            color: '#323232',
                            fontFamily: 'AvenirLTStd-Medium',
                            lineHeight: 20,
                            textAlign: 'center',
                            marginHorizontal: 15,
                            marginTop: 15,
                        }}>
                            Are You Sure You Want To Delete This Field?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginHorizontal: 15 }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.dx_bookt} onPress={() => { setModalVisible4(false) }} >

                                <Text style={styles.dx_session}>

                                    No
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.dx_title2} onPress={() => { deleteAchivement(), setModalVisible4(false) }}>

                                <Text style={styles.dx_chat}>

                                    Yes
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

export default ManageHeaderFooter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
    },
    modalView: {
        width: Dimensions.get('window').width - 40,
        alignSelf: 'center',
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 16,
    },

    touch: {
        margin: 5,
        padding: 5,
    },
    text: {
        fontFamily: 'AvenirLTStd-Medium',
        fontSize: 18,
        color: '#1E2432',
    },
    modaltext: {
        fontFamily: 'AvenirLTStd-Medium',
        fontSize: 16,
        color: '#363636',
    },

    dx_bookt: {
        backgroundColor: 'red',
        borderRadius: 8,
        width: '47%',
        paddingVertical: 15,
    },
    dx_session: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'AvenirLTStd-Medium',
        textAlign: 'center',
    },
    dx_title2: {
        backgroundColor: '#FFCC80',
        borderRadius: 8,
        width: '47%',
        paddingVertical: 15,
    },
    dx_chat: {
        fontSize: 14,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Medium',
        textAlign: 'center',
    },
});