// import { View, Text, SafeAreaView, StatusBar, Image, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native'
// import React, { useState } from 'react'
// import Button from 'react-native-button';
// import GLobal, { data } from './GLobal';
// import { BASE_URL } from '../backend/Config';
// import * as actions from '../redux/actions';
// import axios from 'axios';
// import stringsoflanguages from '../language/Language'
// import { AsyncStorageSetUser, AsyncStorageSettoken } from '../backend/Api';
// import Loader from '../utils/Loader';

// const PaymentSuccessfully = ({ navigation, route }) => {
//   const { _astrologerForm } = stringsoflanguages
//   const window = Dimensions.get('window');
//   const { width, height } = Dimensions.get('window');
//   const [field, setField] = useState(GLobal.user)
//   const [state, setState] = useState({
//     loading: false,
//   });
//   const toggleLoading = bol => setState({ ...state, loading: bol });

//   const Freepackage = async () => {
//     try {
//       let formData = new FormData();
//       formData.append('newsignup', 1)
//       formData.append('user_type', field.type)           //astrologer == 2 , user == 1
//       formData.append('name', field.name)
//       formData.append('email', field.email)
//       formData.append('mobile', field.mobile)
//       formData.append('status', 1)
//       formData.append('password', field.password)
//       formData.append('gender', field.gender)
//       formData.append('dob', field.dob)
//       formData.append('create_profile ', 1)
//       formData.append('consultation_id', field.should1)
//       formData.append('skill_id', field.should2)
//       formData.append('specialization_id', field.should3)
//       formData.append('langugae_id', field.should4)
//       formData.append('experience', field.experience)
//       formData.append('contribute_daily', field.hour)
//       formData.append('bank_account_number', field.accountnumber)
//       formData.append('bank_name', field.bankname)
//       formData.append('ifsc_code', field.ifsc)
//       formData.append('address', field.address)
//       formData.append('country', field.should5)
//       formData.append('state', field.should6)
//       formData.append('city', field.should7)
//       formData.append('pincode', field.pincode)
//       formData.append('pancard', field.name)
//       formData.append('pancard', field.pancard)
//       formData.append('aadhar_number', field.aadharcard)
//       formData.append('aadharcard_image', {
//         uri: field.aadharcard_image?.uri,
//         type: field.aadharcard_image?.type,
//         name: field.aadharcard_image?.name,
//       });
//       formData.append('aadharcard_back_image', {
//         uri: field.aadharcard_back_image?.uri,
//         type: field.aadharcard_back_image?.type,
//         name: field.aadharcard_back_image?.name,
//       })
//       formData.append('pancard_image', {
//         uri: field.pancard_image?.uri,
//         type: field.pancard_image?.type,
//         name: field.pancard_image?.name,
//       })
//       formData.append('academic_qualification', field.academicqual)
//       formData.append('astrologer_qualification', field.astroqualification)
//       formData.append('academic_certificate', {
//         uri: field.academic_certificate?.uri,
//         type: field.academic_certificate?.type,
//         name: field.academic_certificate?.name,
//       });

//       formData.append('astrologer_certificate', {
//         uri: field.astrologer_certificate?.uri,
//         type: field.astrologer_certificate?.type,
//         name: field.astrologer_certificate?.name,
//       })

//       formData.append('profile_picture', {
//         uri: field.profile_picture?.uri,
//         type: field.profile_picture?.type,
//         name: field.profile_picture?.name,
//       })
//       formData.append('biography', field.biography)
//       formData.append('package_id', GLobal.id)
//       formData.append('amount', GLobal.amount)

//       toggleLoading(true);
//       axios
//         .post(
//           `${BASE_URL}astrologer/signup`,
//           formData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               // Add any additional headers as needed
//             },
//           },
//         )
//         .then(response => {
//           toggleLoading(false);
//           actions.Login(response.data?.user_detail);
//           actions.Token(response.data?.token);
//           AsyncStorageSettoken(response.data?.token);
//           AsyncStorageSetUser(response.data?.user_detail);
//           navigation.replace('DrawerNavigator')
//         })
//         .catch(error => {
//           toggleLoading(true);
//           axios
//             .post(
//               `${BASE_URL}astrologer/signup`,
//               formData,
//               {
//                 headers: {
//                   'Content-Type': 'multipart/form-data',
//                   // Add any additional headers as needed
//                 },
//               },
//             )
//             .then(response => {
//               toggleLoading(false);
//               actions.Login(response.data?.user_detail);
//               actions.Token(response.data?.token);
//               AsyncStorageSettoken(response.data?.token);
//               AsyncStorageSetUser(response.data?.user_detail);
//               navigation.replace('DrawerNavigator')
//             })
//             .catch(error => {
//               // Handle errors
//               toggleLoading(false);
//               console.error('Error uploading files', error);
//             });
//           // Handle errors
//           toggleLoading(false);
//           console.error('Error uploading files1', error);
//         });

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const nn = async () => {
//     try {

//       let formData = new FormData();
//       formData.append('newsignup', 1)
//       formData.append('user_type', field.type)           //astrologer == 2 , user == 1
//       formData.append('create_profile ', 1)
//       formData.append('name', field.name)
//       formData.append('email', field.email)
//       formData.append('mobile', field.mobile)
//       formData.append('status', 1)
//       formData.append('password', field.password)
//       formData.append('experience', null)

//       toggleLoading(true);
//       axios
//         .post(
//           `${BASE_URL}astrologer/signup`,
//           formData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               // Add any additional headers as needed
//             },
//           },
//         )
//         .then(response => {
//           toggleLoading(false);
//           actions.Login(response.data?.user_detail);
//           actions.Token(response.data?.token);
//           AsyncStorageSettoken(response.data?.token);
//           AsyncStorageSetUser(response.data?.user_detail);
//           navigation.replace('DrawerNavigator')
//         })
//         .catch(error => {
//           toggleLoading(true);
//           axios
//             .post(
//               `${BASE_URL}astrologer/signup`,
//               formData,
//               {
//                 headers: {
//                   'Content-Type': 'multipart/form-data',
//                   // Add any additional headers as needed
//                 },
//               },
//             )
//             .then(response => {
//               toggleLoading(false);
//               actions.Login(response.data?.user_detail);
//               actions.Token(response.data?.token);
//               AsyncStorageSettoken(response.data?.token);
//               AsyncStorageSetUser(response.data?.user_detail);
//               navigation.replace('DrawerNavigator')
//             })
//             .catch(error => {
//               // Handle errors
//               toggleLoading(false);
//               console.error('Error uploading files', error);
//             });
//           // Handle errors
//           toggleLoading(false);
//           console.error('Error uploading files1', error);
//         });


//     } catch (error) {
//       toggleLoading(false)
//       console.log(error)
//     }
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#FFCC80' }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
//       {state.loading && <Loader />}
//       <Image
//         style={{
//           width: 100,
//           height: 100,
//           resizeMode: 'contain',
//           alignSelf: 'center',
//           marginTop: height / 4,
//         }}
//         source={require('../assets/check.png')} />

//       <Text style={{
//         marginHorizontal: 10,
//         fontSize: 18,
//         color: '#333333',
//         fontFamily: 'AvenirLTStd-Roman',
//         letterSpacing: 0.45,
//         marginTop: 13,
//         textAlign: 'center',
//       }}>
//         {_astrologerForm.refid} 12345
//       </Text>

//       <Text style={{
//         marginHorizontal: 10,
//         fontSize: 24,
//         color: '#333333',
//         fontFamily: 'AvenirLTStd-Medium',
//         letterSpacing: 0.6,
//         marginTop: 5,
//         textAlign: 'center',
//       }}>
//         {_astrologerForm.paymentsuccess}
//       </Text>

//       <Text style={{
//         marginHorizontal: 10,
//         fontSize: 16,
//         color: '#333333',
//         fontFamily: 'AvenirLTStd-Roman',
//         letterSpacing: 0.4,
//         marginTop: 8,
//         textAlign: 'center',
//       }}>
//         {_astrologerForm.textaddress}
//       </Text>

//       <Button
//         containerStyle={{
//           paddingHorizontal: 20,
//           height: 40,
//           marginTop: 22,
//           borderRadius: 30,
//           borderColor: '#333333',
//           borderWidth: 1,
//           overflow: 'hidden',
//           alignSelf: 'center',
//           justifyContent: 'center',
//           backgroundColor: '#FFCC80',
//         }}
//         style={{
//           fontSize: 14,
//           color: '#333333',
//           alignSelf: 'center',
//           fontFamily: 'AvenirLTStd-Medium',
//         }}
//         onPress={() => {
//           field.type == 1 ? nn() :
//             Freepackage()
//         }}>
//         {_astrologerForm.gotohomepage}
//       </Button>


//     </SafeAreaView>
//   )
// }

// export default PaymentSuccessfully
// const styles = StyleSheet.create({})



import { View, Text, SafeAreaView, StatusBar, Image, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
import GLobal, { data } from './GLobal';
import { BASE_URL } from '../backend/Config';
import * as actions from '../redux/actions';
import axios from 'axios';
import stringsoflanguages from '../language/Language'
import { AsyncStorageSetUser, AsyncStorageSettoken } from '../backend/Api';
import Loader from '../utils/Loader';

const PaymentSuccessfully = ({ navigation, route }) => {
  const { _astrologerForm } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const [field, setField] = useState(GLobal.user)           
  const [astrodata, setaAstrodata] = useState(GLobal.user)         
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });

  const Freepackage = async () => {
    try {
      let formData = new FormData();
      formData.append('newsignup', 1)
      formData.append('user_type', astrodata.type)             //astrologer == 2 , user == 1
      formData.append('name', astrodata.name)
      formData.append('email', astrodata.email)
      formData.append('mobile', astrodata.number)
      formData.append('institute_centre_name', astrodata.centrename)
      formData.append('country', astrodata.should1)
      formData.append('state', astrodata.should6)
      formData.append('city', astrodata.should7)
      formData.append('status', 1)
      formData.append('create_profile ', 1)
      formData.append('experience', null)

      toggleLoading(true);
      axios
        .post(
          `${BASE_URL}astrologer/signup`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              // Add any additional headers as needed
            },
          },
        )
        .then(response => {
          toggleLoading(false);
          actions.Login(response.data?.user_detail);
          actions.Token(response.data?.token);
          AsyncStorageSettoken(response.data?.token);
          AsyncStorageSetUser(response.data?.user_detail);
          navigation.replace('DrawerNavigator')
        })
        .catch(error => {
          toggleLoading(true);
          axios
            .post(
              `${BASE_URL}astrologer/signup`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  // Add any additional headers as needed
                },
              },
            )
            .then(response => {
              toggleLoading(false);
              actions.Login(response.data?.user_detail);
              actions.Token(response.data?.token);
              AsyncStorageSettoken(response.data?.token);
              AsyncStorageSetUser(response.data?.user_detail);
              navigation.replace('DrawerNavigator')
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

    } catch (error) {
      console.log(error)
    }
  }

  const nn = async () => {
    try {

      let formData = new FormData();
      formData.append('newsignup', 1)
      formData.append('user_type', field.type)           //astrologer == 2 , user == 1
      formData.append('create_profile ', 1)
      formData.append('name', field.name)
      formData.append('email', field.email)
      formData.append('mobile', field.mobile)
      formData.append('status', 1)
      formData.append('password', field.password)
      formData.append('experience', null)

      toggleLoading(true);
      axios
        .post(
          `${BASE_URL}astrologer/signup`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              // Add any additional headers as needed
            },
          },
        )
        .then(response => {
          toggleLoading(false);
          actions.Login(response.data?.user_detail);
          actions.Token(response.data?.token);
          AsyncStorageSettoken(response.data?.token);
          AsyncStorageSetUser(response.data?.user_detail);
          navigation.replace('DrawerNavigator')
        })
        .catch(error => {
          toggleLoading(true);
          axios
            .post(
              `${BASE_URL}astrologer/signup`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  // Add any additional headers as needed
                },
              },
            )
            .then(response => {
              toggleLoading(false);
              actions.Login(response.data?.user_detail);
              actions.Token(response.data?.token);
              AsyncStorageSettoken(response.data?.token);
              AsyncStorageSetUser(response.data?.user_detail);
              navigation.replace('DrawerNavigator')
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


    } catch (error) {
      toggleLoading(false)
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFCC80' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
      {state.loading && <Loader />}
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: height / 4,
        }}
        source={require('../assets/check.png')} />

      <Text style={{
        marginHorizontal: 10,
        fontSize: 18,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Roman',
        letterSpacing: 0.45,
        marginTop: 13,
        textAlign: 'center',
      }}>
        {_astrologerForm.refid} 12345
      </Text>

      <Text style={{
        marginHorizontal: 10,
        fontSize: 24,
        color: '#333333',
        fontFamily: 'AvenirLTStd-Medium',
        letterSpacing: 0.6,
        marginTop: 5,
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
          borderRadius: 30,
          borderColor: '#333333',
          borderWidth: 1,
          overflow: 'hidden',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFCC80',
        }}
        style={{
          fontSize: 14,
          color: '#333333',
          alignSelf: 'center',
          fontFamily: 'AvenirLTStd-Medium',
        }}
        onPress={() => {
          field.type == 1 ? nn() :
            Freepackage()
        }}>
        {_astrologerForm.gotohomepage}
      </Button>


    </SafeAreaView>
  )
}

export default PaymentSuccessfully
const styles = StyleSheet.create({})