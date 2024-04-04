import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TextInput, } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language';
import { Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Button from 'react-native-button';

const Prashna = ({ navigation }) => {
  const { _member, _kundali } = stringsoflanguages
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const [should3, setShould3] = useState('')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
      <CustomHeader
        title={_kundali.prashanLagan}
        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/back.png')}
        // secondRightIcon={require('../assets/search.png')}
        // thirdRightIcon={require('../assets/filter.png')}
        rightOption={() => {
          navigation.navigate('');
        }}
        right3Option={() => {
          navigation.navigate('');
        }}
      />
      <ScrollView>
        <Image
          style={{ alignSelf: 'center', marginTop: 35 }}
          source={require("../assets/user.png")}
        />

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
            marginTop: 20,
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
          placeholder={'+91 8945783345'}
        />

        <Text
          style={{
            fontFamily: 'AvenirLTStd-Medium',
            color: '#ADADAD',
            fontSize: 18,
            letterSpacing: -0.2,
            marginTop: 30,
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
          }}>
          Submit
        </Button>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Prashna

const styles = StyleSheet.create({})