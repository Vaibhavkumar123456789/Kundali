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
    PermissionsAndroid, Modal
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Header from '../Custom/Header';
import axios from 'axios';
import stringsoflanguages from '../language/Language'
import Button from 'react-native-button';
import { AsyncStorageGettoken, GetProfile, ppapi, UpdateProfile } from '../backend/Api';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { type } from 'react-native-document-picker';
import { validateEmail } from '../utils/utils';
import Loader from '../utils/Loader';
import { BASE_URL } from '../backend/Config';
import { useDispatch, useSelector, useStore } from 'react-redux';
import SkipScreen from './component/SkipScreen';

const Profile = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _setting, _customlang } = stringsoflanguages
    const [userData, setUserData] = useState({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [empty, setEmpty] = useState();
    const { skip_id } = useSelector(store => store.user);
    const [state1, setState1] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState1({ ...state1, loading: bol });
    const [state, setState] = useState({
        image: '',
    });

    useEffect(() => {
        GetProfile()
            .then(data => {
                // alert(JSON.stringify(data, null, 2))
                if (data.status) {
                    setUserData(data)
                    setName(data?.user_profile?.name)
                    setMobile(data?.user_profile?.mobile)
                    setEmail(data?.user_profile?.email)
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {

                console.log('error', error);
            });
    }, [])

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
            quality: .2,
            maxWidth: 400,
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

    const finalSubmit = async () => {
        try {
            if (name == '') {
                Toast.show('Please enter Name');
            }
            else if (email == '') {
                Toast.show('Please enter Email');
            }
            else if (!validateEmail(email)) {
                Toast.show('Please enter your valid email address');
            }
            else if (mobile === '' || mobile.length !== 10) {
                Toast.show('Please enter your valid phone number');
            }
            else {
                toggleLoading(true)
                let formData = new FormData();
                formData.append('mobile', mobile)
                formData.append('name', name)
                formData.append('email', email)
                formData.append('image', {
                    uri: state.image == '' ? `${userData?.path}/${userData?.user_profile?.image}` : state.image.uri,
                    type: 'image/jpeg',
                    name: 'image.png',
                })
                // alert(JSON.stringify(formData,null,2))
                // return

                const token = (await AsyncStorageGettoken() || '')
                const btoken = `Bearer ${token}`;

                // setTimeout(() => {

                axios
                    .post(
                        `${BASE_URL}astrologer/update-profile`,
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
                        // alert(JSON.stringify(response.data, null, 2))
                        Toast.show('Profile Updated')
                        navigation.goBack()

                        console.log('Profile Updated', response.data)
                    })
                    .catch(error => {
                        toggleLoading(true);
                        axios
                            .post(
                                `${BASE_URL}astrologer/update-profile`,
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
                                // alert(JSON.stringify(response.data, null, 2))
                                Toast.show('Profile Updated')
                                navigation.goBack()

                                console.log('Profile Updated', response.data)
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
                // }, 2000);
            }
        } catch (error) {
            toggleLoading(false)
            console.log(error)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_setting.profile}
            />
            {state1.loading && <Loader />}
            <ScrollView>
                {skip_id == '1' ?
                    <SkipScreen />
                    :
                    <>
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
                                                width: 110, height: 110, alignSelf: 'center', marginTop: 20
                                            }}
                                            source={
                                                userData?.user_profile?.image?.length > 0
                                                    ? { uri: `${userData?.path}/${userData?.user_profile?.image}` }
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
                                finalSubmit()
                            }}
                        >
                            {_customlang.submit}
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
        </SafeAreaView >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
    },
    modalView: {
        borderRadius: 8,
        backgroundColor: 'white',
        marginHorizontal: 30,
        padding: 20,
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
})