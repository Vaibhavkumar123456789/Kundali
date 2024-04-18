import { View, Text, SafeAreaView, StatusBar, Image, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Button from 'react-native-button';
import GLobal, { data } from './GLobal';
import { BASE_URL } from '../backend/Config';
import * as actions from '../redux/actions';
import { AsyncStorageSetUser, AsyncStorageSettoken } from '../backend/Api';
const PaymentSuccessfully = ({ navigation, route }) => {

  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const [field, setField] = useState(GLobal.user)


  const Freepackage = async () => {
    try {
      let formData = new FormData();
      formData.append('newsignup', 1)
      formData.append('user_type', 2)           //astrologer
      formData.append('name', field.name)
      formData.append('email', field.email)
      formData.append('mobile', field.mobile)
      formData.append('status', 1)
      formData.append('password', field.password)
      formData.append('gender', field.gender)
      formData.append('dob', field.dob)
      formData.append('create_profile ', 1)
      formData.append('consultation_id', field.should1)
      formData.append('skill_id', field.should2)
      formData.append('specialization_id', field.should3)
      formData.append('langugae_id', field.should4)
      formData.append('experience', field.experience)
      formData.append('contribute_daily', field.hour)
      formData.append('bank_account_number', field.accountnumber)
      formData.append('bank_name', field.bankname)
      formData.append('ifsc_code', field.ifsc)
      formData.append('address', field.address)
      formData.append('country', field.should5)
      formData.append('state', field.should6)
      formData.append('city', field.should7)
      formData.append('pincode', field.pincode)
      formData.append('pancard', field.name)
      formData.append('pancard', field.pancard)
      formData.append('aadhar_number', field.aadharcard)
      formData.append('aadharcard_image', {
        uri: field.aadharcard_image?.uri,
        type: field.aadharcard_image?.type,
        name: field.aadharcard_image?.name,
      });
      formData.append('aadharcard_back_image', {
        uri: field.aadharcard_back_image?.uri,
        type: field.aadharcard_back_image?.type,
        name: field.aadharcard_back_image?.name,
      })
      formData.append('pancard_image', {
        uri: field.pancard_image?.uri,
        type: field.pancard_image?.type,
        name: field.pancard_image?.name,
      })
      formData.append('academic_qualification', field.academicqual)
      formData.append('astrologer_qualification', field.astroqualification)
      formData.append('academic_certificate', {
        uri: field.academic_certificate?.uri,
        type: field.academic_certificate?.type,
        name: field.academic_certificate?.name,
      });

      formData.append('astrologer_certificate', {
        uri: field.astrologer_certificate?.uri,
        type: field.astrologer_certificate?.type,
        name: field.astrologer_certificate?.name,
      })

      formData.append('profile_picture', {
        uri: field.profile_picture?.uri,
        type: field.profile_picture?.type,
        name: field.profile_picture?.name,
      })
      formData.append('biography', field.biography)
      formData.append('package_id', GLobal.id)
      formData.append('amount', GLobal.amount)

      const res = await fetch(`${BASE_URL}astrologer/signup`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
        },
        body: formData,
      });
      const response1 = await res.json()
      console.log('Membership Package', response1)
      if (response1.status) {
        actions.Login(response1.user_detail);
        actions.Token(response1.token);
        AsyncStorageSettoken(response1.token);
        AsyncStorageSetUser(response1.user_detail);
        navigation.replace('DrawerNavigator')
      } else {
        alert(response1.msg);
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFCC80' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />

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
        Ref Id: 12345
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
        Payment Successful !
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
        We are delighted to inform you that
        we received your payments
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
          Freepackage()
        }}>
        Go to Homepage
      </Button>


    </SafeAreaView>
  )
}

export default PaymentSuccessfully
const styles = StyleSheet.create({})