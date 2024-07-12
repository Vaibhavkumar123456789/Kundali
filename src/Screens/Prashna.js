import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language';
import { Dropdown } from 'react-native-element-dropdown';
import Button from 'react-native-button';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { type } from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import { AsyncStorageGettoken } from '../backend/Api';
import { BASE_URL } from '../backend/Config';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Loader from '../utils/Loader';

const Prashna = ({ navigation }) => {
  const { _member, _kundali } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const [should3, setShould3] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [question, setQuestion] = useState('')
  const [empty, setEmpty] = useState();
  const { skip_id } = useSelector(store => store.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState({
    image: '',
  });
  const [state1, setState1] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState1({ ...state1, loading: bol });

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
      else if (question == '') {
        Toast.show('Please enter question');
      }
      else {
        toggleLoading(true)
        let formData = new FormData();
        formData.append('mobile', mobile)
        formData.append('name', name)
        formData.append('gender', should3)
        formData.append('ask_question', question)
        formData.append('image', {
          uri: state.image == '' ? '' : state.image.uri,
          type: 'image/jpeg',
          name: 'image.png',
        })
        // alert(JSON.stringify(formData,null, 2))
        // return
        const token = (await AsyncStorageGettoken() || '')
        const btoken = `Bearer ${token}`;

        axios
          .post(
            `${BASE_URL}prashan-lagan`,
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
            navigation.goBack()

            console.log('Prashan Lagan', response.data)
          })
          .catch(error => {
            toggleLoading(true);
            axios
              .post(
                `${BASE_URL}prashan-lagan`,
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
                navigation.goBack()

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
              placeholderTextColor={'gray'}
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
              Whatsapp No.
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
              placeholderTextColor={'gray'}
              maxLength={10}
              keyboardType='numeric'
              onChangeText={text => setMobile(text)}
              placeholder={'Whatsapp No.'}
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
              Ask a Question
            </Text>
            <TextInput
              style={{
                fontSize: 16,
                fontFamily: 'AvenirLTStd-Medium',
                borderRadius: 10,
                borderColor: '#00000020',
                borderWidth: 1.5,
                marginTop: 10,
                lineHeight: 20,
                height: 150,
                marginHorizontal: 18,
                paddingHorizontal: 15,
                paddingVertical: 11,
                color: '#333333',
              }}
              textAlignVertical='top'
              multiline
              placeholderTextColor={'gray'}
              onChangeText={text => setQuestion(text)}
              placeholder={'question ask…'}
            />
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


