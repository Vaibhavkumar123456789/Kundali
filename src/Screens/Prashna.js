import { Dimensions, Image, SafeAreaView, ScrollView, Pressable, FlatList, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language';
import { Dropdown } from 'react-native-element-dropdown';
import Button from 'react-native-button';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { type } from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import { AsyncStorageGettoken, Country } from '../backend/Api';
import { BASE_URL, BASE_URL_EXTERNAL } from '../backend/Config';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Loader from '../utils/Loader';
import moment from 'moment';
import LocationIQ from 'react-native-locationiq';
import DatePicker from 'react-native-date-picker'
import { validateEmail } from '../utils/utils';
import SkipScreen from './component/SkipScreen';

const Prashna = ({ navigation }) => {
  const { _member, _kundali } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const [should3, setShould3] = useState('')
  const [should1, setShould1] = useState('')
  const isFocused = useIsFocused();
  const [selectedcity, setSelectedCity] = useState('')
  const [search, setSearch] = useState('')
  const [cityList, setCityList] = useState([])
  const [clist, setCList] = useState([])
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [question, setQuestion] = useState('')
  const [empty, setEmpty] = useState();
  const { skip_id } = useSelector(store => store.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [checked, setChecked] = React.useState(false
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(true);
  const [location, setLocation] = useState([]);
  const [email, setEmail] = useState('')
  const [type, setType] = useState(false)
  const [date, setDate] = useState('')
  const [pdate, setPDate] = useState('')
  const [open, setOpen] = useState(false)
  const [type1, setType1] = useState(false)
  const [date1, setDate1] = useState('')
  const [pdate1, setPDate1] = useState('')
  const [open1, setOpen1] = useState(false)
  const [rashi, setRashi] = useState('')
  const [state, setState] = useState({
    image: '',
  });
  const [state1, setState1] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState1({ ...state1, loading: bol });

  useEffect(() => {
    Countrysearch()

  }, [isFocused == true])

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

  // useEffect(() => {
  //   if (searchQuery?.length > 1) { // Minimum 3 characters to trigger search
  //     const debounceTimer = setTimeout(() => {
  //       searchLocation();
  //     }, 300); // Debounce time of 300ms

  //     return () => clearTimeout(debounceTimer); // Clear the timer on cleanup
  //   }
  // }, [searchQuery]);

  // const searchLocation = () => {
  //   LocationIQ.init(GLobal.locationiq); // Replace with your LocationIQ token
  //   LocationIQ.search(searchQuery)
  //     .then(response => {
  //       // console.log(response)
  //       // alert(JSON.stringify(response, null, 2))
  //       setLocation(response); // Assuming the first result is the most relevant

  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    console.log(`${BASE_URL_EXTERNAL}Place/GetCity?CountryCode=${should1}&SearchText=${search}&Limit=50`)
    const timeOut = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL_EXTERNAL}Place/GetCity?CountryCode=${should1}&SearchText=${search}&Limit=50`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        const response1 = await res.json()
        // alert(JSON.stringify(response1, null, 2))
        setCityList(response1?.responseData?.data)
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    }, 1500)

    return () => {
      clearTimeout(timeOut)
    }
  }, [search])

  const searchCity = async (value) => {
    setSearch(value)
  }

  const Countrysearch = () => {
    Country()
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        if (data.status) {
          let tempCArr = []
          data?.data.map((i) => {
            tempCArr.push({
              label: i.name,
              value: i.iso2,
            })
            setCList(tempCArr)
          })
        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  }

  const finalSubmit = async () => {
    try {
      if (state.image == '') {
        Toast.show('Please select image');
      }
      else if (name == '') {
        Toast.show('Please enter Name');
      }
      else if (should3 == '') {
        Toast.show('Please Select Gender');
      }
      else if (mobile === '' || mobile.length !== 10) {
        Toast.show('Please enter your valid phone number');
      }
      else if (email == '') {
        Toast.show('Please enter Email');
      }
      else if (!validateEmail(email)) {
        Toast.show('Please enter your valid email address');
      }
      else if (date == '') {
        Toast.show('Please Select Date Of Birth');
      }
      else if (date1 == '') {
        Toast.show('Please Select Time of Birth');
      }
      else if (should1 == '') {
        Toast.show('Please Select Country');
      }
      else if (selectedcity === '') {
        Toast.show('Please Select birth Place');
      }
      else if (checked === false) {
        Toast.show('Please Select What You Want To See');
      }
      else if (checked === 1 && rashi === "") {
        Toast.show('Please Select Rashi/Birth Sign');
      }
      else {
        let formData = new FormData();
        formData.append('mobile', mobile)
        formData.append('email', email)
        formData.append('name', name)
        formData.append('gender', should3)
        formData.append('dob', date == '' ? '' : moment(date).format('YYYY-MM-DD'),)
        formData.append('tob', date1 == '' ? '' : moment(date1).format('hh:mm a'),)
        formData.append('country', should1)
        formData.append('pob', `${selectedcity.cityName}`)
        formData.append('latitude', selectedcity.latitude)
        formData.append('longitude', selectedcity.longitude)
        formData.append('Timezone', selectedcity.timezone)
        formData.append('cityid', selectedcity.cityId)
        formData.append('what_u_want_see', checked === 0 ? "Prashna" : checked === 1 ? "Gochar" : null,)
        formData.append('rash_birthsign', rashi)
        formData.append('image', {
          uri: state.image == '' ? '' : state.image.uri,
          type: 'image/jpeg',
          name: 'image.png',
        })

        toggleLoading(true)

        const token = (await AsyncStorageGettoken() || '')
        const btoken = `Bearer ${token}`;

        axios
          .post(
            `${BASE_URL}astrologer/prashan-lagan`,
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
            toggleLoading(false)
            // alert(JSON.stringify(response.data, null, 2))
            navigation.navigate('KundliGenerate', { item: `${response?.data?.path}${response?.data?.prashan_lagan?.report}`, title: response?.data?.prashan_lagan?.email, number: "2" })
            console.log('Prashan Lagan', response.data)
          })
          .catch(error => {
            toggleLoading(true);
            axios
              .post(
                `${BASE_URL}astrologer/prashan-lagan`,
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
                navigation.navigate('KundliGenerate', { item: `${response?.data?.path}${response?.data?.prashan_lagan?.report}`, title: response?.data?.prashan_lagan?.email, number: "2" })

                console.log('Prashan Lagan', response.data)
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
      <CustomHeader
        title={_kundali.prashanLagan}
        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/backtoback.png')}

      />
      {state1.loading && <Loader />}
      <ScrollView>
        {skip_id == 1 ?
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
                fontFamily: 'AvenirLTStd-Medium',
                color: '#ADADAD',
                fontSize: 18,
                letterSpacing: -0.2,
                marginTop: 30,
                marginHorizontal: 18,
              }}>
              Name
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
              onChangeText={text => setName(text)}
              value={name}
              placeholderTextColor={'#333333'}
              placeholder={'Name'}
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
              Select Gender
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
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Other', value: 'Other' }]
              }
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder="Select"
              value={should3}
              onChange={(item) => setShould3(item.value)}
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
              Mobile Number
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
              onChangeText={text => setMobile(text)}
              value={mobile}
              placeholderTextColor={'#333333'}
              placeholder={'Mobile Number'}
              maxLength={10}
              keyboardType='numeric'
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
              {_kundali.dateofbirth}
            </Text>
            <TouchableOpacity activeOpacity={0.9} style={{
              borderRadius: 10,
              paddingHorizontal: 13,
              marginHorizontal: 18,
              marginTop: 10,
              borderColor: '#00000020',
              borderWidth: 1.5,
              flexDirection: 'row',
              alignItems: 'center',
            }} onPress={() => { setOpen(true), setType(false) }}>
              <TextInput
                style={{
                  fontSize: 16,
                  color: '#333333',
                  fontFamily: 'AvenirLTStd-Medium',
                  width: '90%',
                }}
                editable={false}
                value={date != '' ? moment(date).format('DD-MM-YYYY') : ''}
                placeholder={_kundali.dateofbirth}
                placeholderTextColor={'#333333'}
              />

            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                color: '#ADADAD',
                fontSize: 18,
                letterSpacing: -0.2,
                marginTop: 19,
                marginHorizontal: 18,
              }}>
              {_kundali.timeofbirth}
            </Text>

            <TouchableOpacity activeOpacity={0.9} style={{
              borderRadius: 10,
              paddingHorizontal: 13,
              marginHorizontal: 18,
              marginTop: 10,
              borderColor: '#00000020',
              borderWidth: 1.5,
              flexDirection: 'row',
              alignItems: 'center',
            }} onPress={() => { setOpen1(true), setType1(false) }}>
              <TextInput
                style={{
                  fontSize: 16,
                  color: '#333333',
                  fontFamily: 'AvenirLTStd-Medium',
                  width: '90%',
                }}
                editable={false}
                value={date1 != '' ? moment(date1).format('hh:mm a') : ''}
                placeholder={_kundali.timeofbirth}
                placeholderTextColor={'#333333'}
              />

            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                color: '#ADADAD',
                fontSize: 18,
                letterSpacing: -0.2,
                marginTop: 19,
                marginHorizontal: 18,
              }}>
              {_kundali.country}
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
              maxHeight={250}
              search
              searchPlaceholder={_kundali.country}
              inputSearchStyle={{ fontSize: 16, fontFamily: 'AvenirLTStd-Medium', color: '#333333' }}
              labelField="label"
              valueField="value"
              placeholder={_kundali.country}
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
              {_kundali.birth}
            </Text>
            <Pressable onPress={() => setModalVisible1(true)}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'AvenirLTStd-Medium',
                  borderRadius: 10,
                  borderColor: '#00000020',
                  borderWidth: 1.5,
                  marginTop: 10,
                  marginHorizontal: 18,
                  paddingHorizontal: 15,
                  paddingVertical: 14,
                  color: '#333333',
                }}>
                {selectedcity == '' ? _kundali.birth : `${selectedcity.cityName},${selectedcity.state},${selectedcity.countryCode}`}
              </Text>
            </Pressable>

            {/* <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                color: '#ADADAD',
                fontSize: 18,
                letterSpacing: -0.2,
                marginTop: 19,
                marginHorizontal: 18,
              }}>
              {_kundali.birth}
            </Text> */}

            {/* <TextInput
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
              placeholder={_kundali.birth}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
              onFocus={() => setShowDropdown(true)}
            />

            {showDropdown && location?.length > 0 && searchQuery?.length > 1 && (
              <View style={{
                marginHorizontal: 18,
                paddingHorizontal: 8,
                borderRadius: 10,
                marginTop: 5,
                backgroundColor: 'white',
                elevation: 5,
              }}>
                <ScrollView >
                  {location.map((item, index) => (
                    <Pressable style={{

                    }} onPress={() => { setSelectedCity(item), setShowDropdown(false), setSearchQuery(item.display_name); }}>
                      <View style={{
                        margin: 10,
                      }}>
                        <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
                          {item.display_name}
                        </Text>
                        <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
                          Lat:{item.lat} , Lon:{item.lon}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )} */}

            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                color: '#ADADAD',
                fontSize: 18,
                letterSpacing: -0.2,
                marginTop: 19,
                marginHorizontal: 18,
              }}>
              What You want to see?
            </Text>
            <FlatList
              data={["Prashna", "Gochar"]}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => {
                  setChecked(index)
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 13, marginTop: 5 }}>
                    <RadioButton
                      value={checked}
                      status={checked === index ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(index)
                      }}
                      uncheckedColor='#69707F'
                      color='#FFCC80'
                    />
                    <Text style={{
                      fontSize: 16,
                      color: '#333333',
                      fontFamily: 'AvenirLTStd-Medium',
                    }}>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            {(checked == 1 &&
              <>
                <Text
                  style={{
                    fontFamily: 'AvenirLTStd-Medium',
                    color: '#ADADAD',
                    fontSize: 18,
                    letterSpacing: -0.2,
                    marginTop: 10,
                    marginHorizontal: 18,
                  }}>
                  Rashi/Birth Sign
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
                    { label: 'मेष', value: 'मेष' },
                    { label: 'वृषभ', value: 'वृषभ' },
                    { label: 'मिथुन', value: 'मिथुन' },
                    { label: 'कर्क', value: 'कर्क' },
                    { label: 'सिंह', value: 'सिंह' },
                    { label: 'कन्या', value: 'कन्या' },
                    { label: 'तुला', value: 'तुला' },
                    { label: 'वृश्चिक', value: 'वृश्चिक' },
                    { label: 'धनु', value: 'धनु' },
                    { label: 'मकर', value: 'मकर' },
                    { label: 'कुंभ', value: 'कुंभ' },
                    { label: 'मीन ', value: 'मीन ' },
                  ]}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder="Rashi/Birth Sign"
                  value={rashi}
                  onChange={(item) => setRashi(item.value)}
                />
              </>
            )}

            <Button
              containerStyle={{
                width: '90%',
                marginBottom: 20,
                marginTop: 20,
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
              }}>
              Submit
            </Button>

          </>
        }
      </ScrollView>
      <DatePicker
        modal
        open={open}
        mode={'date'}
        maximumDate={new Date()}
        date={date == '' ? new Date() : date}
        onConfirm={date => {
          setOpen(false);
          type == false ? setDate(date) : setPDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DatePicker
        modal
        mode={"time"}
        open={open1}
        date={date1 == '' ? new Date() : date1}
        onConfirm={(date) => {
          setOpen1(false)
          type1 == false ? setDate1(date) : setPDate1(date);
        }}
        onCancel={() => {
          setOpen1(false)
        }}
      />

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
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setModalVisible1(false);
          }}
          style={{
            flex: 1,
            backgroundColor: '#00000099',
            justifyContent: 'center',
          }}>
          <View style={{
            margin: 15,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {

              }}>
              <View style={{ alignSelf: 'center' }}>

              </View>
              <TextInput
                style={{
                  fontSize: 16,
                  fontFamily: 'AvenirLTStd-Medium',
                  borderRadius: 10,
                  borderColor: '#00000020',
                  borderWidth: 1.5,
                  paddingHorizontal: 15,
                  color: '#333333',
                }}
                placeholderTextColor={'#333333'}
                placeholder={_kundali.birth}
                onChangeText={(text) => { searchCity(text) }}
              />
              {cityList?.length > 0 && (
                <FlatList
                  data={cityList}
                  renderItem={({ item, index }) => (
                    <Pressable style={{}} onPress={() => { setSelectedCity(item), setModalVisible1(false) }}>
                      <View style={{ width: '100%', margin: 10 }}>
                        <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
                          {item.cityName} ,{item.state} ,{item.countryCode},
                        </Text>
                        <Text style={{ color: '#000', fontFamily: 'AvenirLTStd-Medium', }}>
                          Lat:{item.latitude} , Lon:{item.longitude}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                />

              )}

            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

export default Prashna

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



