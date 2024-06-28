import { View, Text, Image, StyleSheet, Dimensions, Modal, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Button from 'react-native-button';
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { GetProfile, addwalletapi, walletplan } from '../backend/Api';

const Wallet = ({ navigation }) => {
  const { _member, _home, _drawer } = stringsoflanguages
  const window = Dimensions.get('window');
  const isFocused = useIsFocused();
  const { width, height } = Dimensions.get('window');
  const [select, setSelect] = useState(null)
  const [walletBalance, setWalletBalance] = useState(0);
  const [checked1, setChecked1] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [plandetail, setPlanDetail] = useState([])
  const [amount, setAmount] = useState()
  const [gst, setGST] = useState()
  const [totalamount, setTotalAmount] = useState()
  const [result, setResult] = useState(null);

  const getRandomNumberWithTimestamp = () => {
    const randomInteger = Math.floor(Math.random() * 1001);
    const timestamp = Date.now();
    const combined = `${randomInteger}+${timestamp}`;
    return combined;
  };

  const handlePress = () => {
    const combined = getRandomNumberWithTimestamp();
    const [randomInteger, timestamp] = combined.split('+').map(Number);
    const sum = randomInteger + timestamp;
    setResult(sum);
  };

  useEffect(() => {
    planadd()
    handlePress()
    profile()
  }, [isFocused == true])

  const profile = () => {
    GetProfile()
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        if (data.status) {
          setWalletBalance(data?.user_profile?.wallet)
        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {

        console.log('error', error);
      });
  }

  const planadd = () => {
    walletplan()
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        if (data.status) {
          setPlanDetail(data?.data)

        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  const handledata = async (payment) => {
    // alert(JSON.stringify(payment, null, 2))
    let amount = parseFloat(payment.recharge).toFixed(2);
    let gst = (parseFloat(payment.recharge) * 0.18).toFixed(2);          // 18% gst
    let total = (parseFloat(amount) + parseFloat(gst)).toFixed(2);

    setAmount(amount)
    setGST(gst)
    setTotalAmount(total)

  }

  const recharge = () => {
    if (select == null) {
      Toast.show("Please Select Amount")

    } else {

      let e = {
        "plan_id": plandetail[select]?.id || 1,
        "tax_amt": gst,
        "net_amount": amount,
        "total_mrp": totalamount,
        "payment_mode": "online",
        "booking_txn_id": result,
      };
      addwalletapi(e)
        .then(data => {
          console.log('add walet amount ...', data)
          // alert(JSON.stringify(data, null, 2))
          if (data.status) {
            profile()
            Toast.show(data?.msg);
            navigation.goBack()
          } else {
            Toast.show(data?.msg);
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }


  const list1 = [
    {

    },

  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
      <CustomHeader
        title={_drawer.wallet}

        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/backtoback.png')}
        rightOption={() => {
          navigation.navigate('');
        }}
        right3Option={() => {
          navigation.navigate('');
        }}
      />

      <ScrollView>
        <View style={{ backgroundColor: '#FFF7F0', height: 115, marginHorizontal: 18, marginTop: 10, borderRadius: 20, paddingLeft: 24 }}>
          <Text style={{
            color: 'black',
            fontSize: 18,
            marginTop: 25,
            fontFamily: 'AvenirLTStd-Heavy',
          }}>
            AVAILABLE BALANCE
          </Text>
          <Text style={{
            color: 'black',
            fontSize: 25,
            marginTop: 10,
            fontFamily: 'AvenirLTStd-Heavy',
          }}>
            ₹ {`${parseFloat(walletBalance).toFixed(2)}`}
          </Text>

        </View>

        <Text style={{
          color: '#333333',
          fontSize: 15,
          marginLeft: 18,
          marginTop: 10,
          fontFamily: 'AvenirLTStd-Heavy',
        }}>
          Recharge Wallet
        </Text>

        <FlatList
          numColumns={3}
          data={plandetail}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ width: window.width / 3 - 27, marginLeft: 18, }}
              onPress={() => {
                setSelect(index)
                handledata(item)
              }}>
              <View style={{
                paddingVertical: 15,
                marginTop: 13,
                borderColor: '#00000010',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: index == select ? '#FFCC80' : '#FFFFFF',
              }}>

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'AvenirLTStd-Heavy',
                    color: '#6F6F7B',
                    color: index == select ? '#1E1F20' : '#6F6F7B',
                  }}>
                  ₹{parseFloat(item.recharge).toFixed(0)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {(amount && gst && totalamount &&
          <View style={{
            paddingVertical: 15,
            backgroundColor: '#FFFFFF',
            marginTop: 20,
            borderRadius: 6,
            elevation: 5,
            width: '90%',
            alignSelf: 'center',
            bottom: 7,
          }}>
            <Text style={{
              marginHorizontal: 10,
              color: '#333333',
              fontFamily: 'AvenirLTStd-Heavy',
              fontSize: 14,
              textTransform: 'uppercase'
            }}>
              PAYMENT DETAILS
            </Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', marginTop: 15,
            }}>

              <Text style={{
                marginLeft: 10,
                color: '#333333',
                fontSize: 14,
                fontFamily: 'AvenirLTStd-Roman',
              }}>
                Amount
              </Text>
              {(amount &&
                <Text style={{
                  marginRight: 10,
                  color: '#333333',
                  fontSize: 14,
                  fontFamily: 'AvenirLTStd-Heavy',
                  textAlign: 'right',
                }}>
                  ₹{amount}
                </Text>
              )}
            </View>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', marginTop: 15,
            }}>
              <Text style={{
                marginLeft: 10,
                color: '#333333',
                fontSize: 14,
                fontFamily: 'AvenirLTStd-Roman',
              }}>
                18% Gst Charges
              </Text>
              {(gst &&
                <Text style={{
                  marginRight: 10,
                  color: '#333333',
                  fontSize: 14,
                  textAlign: 'right',
                  fontFamily: 'AvenirLTStd-Heavy',
                }}>
                  ₹{gst}

                </Text>
              )}
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, backgroundColor: '#FFC62925', bottom: -15, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
              <Text style={{
                marginLeft: 10,
                color: '#333333',
                fontSize: 12,
                letterSpacing: 0.2,
                fontFamily: 'AvenirLTStd-Heavy',
              }}>
                TOTAL AMOUNT
              </Text>
              {(totalamount &&
                <Text style={{
                  marginRight: 10,
                  color: '#333333',
                  fontSize: 14,
                  letterSpacing: 0.2,
                  textAlign: 'right',
                  fontFamily: 'AvenirLTStd-Heavy',
                }}>
                  ₹{totalamount}
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      <Button
        containerStyle={{
          width: '90%',
          bottom: 20,
          // position:'absolute',
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
          recharge()
          // setPopupVisible(true)
        }}>
        Proceed
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={popupVisible}
        onRequestClose={() => {
          setPopupVisible(false);
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setPopupVisible(false);
          }}
          style={styles.container}>
          <View style={styles.modalView}>

            <Text style={{
              fontSize: 20,
              color: '#333333',
              fontFamily: 'AvenirLTStd-Medium',
              textAlign: 'center',
            }}>Select Member?</Text>

            <FlatList
              data={list1}
              renderItem={({ item, index }) => (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ flexDirection: 'row', marginTop: 20, }}
                    onPress={() => {
                      setChecked1(index);
                    }}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain',
                        marginLeft: 15,
                        alignSelf: 'center',
                      }}
                      source={require('../assets/add.png')}
                    />
                    <View>
                      <Text numberOfLines={1}
                        style={{
                          fontFamily: 'AvenirLTStd-Medium',
                          fontSize: 18,
                          marginLeft: 10,
                          color: '#333333',
                          marginTop: 13,
                          width: window.width - 170,
                        }}>
                        Deepak
                      </Text>

                    </View>
                    <View
                      style={{
                        marginTop: 6,
                        marginLeft: 'auto',
                        marginHorizontal: 15,
                      }}>
                      <RadioButton
                        value="first"
                        status={checked1 === index ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked1(index);
                        }}
                        uncheckedColor={'grey'}
                        color={'#FFCC80'}
                      />
                    </View>
                  </TouchableOpacity>
                </>
              )}
            />
            <View style={{ borderBottomColor: '#D8D8D8', borderBottomWidth: 1, marginTop: 10, marginHorizontal: 15 }}></View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ flexDirection: 'row', marginTop: 10, }}
              onPress={() => {
                navigation.navigate('AddMember')
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  marginLeft: 15,
                  alignSelf: 'center',
                }}
                source={require('../assets/add.png')}
              />
              <View>
                <Text numberOfLines={1}
                  style={{
                    fontFamily: 'AvenirLTStd-Medium',
                    fontSize: 18,
                    marginLeft: 10,
                    color: '#333333',
                    marginTop: 13,
                    width: window.width - 170,
                  }}>
                  Add Member
                </Text>

              </View>

            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

export default Wallet

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#FFFFFF',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Heavy',
    color: '#333333',
    textTransform: 'capitalize',
    marginHorizontal: 15,
  },
  indicatorStyle: {
    backgroundColor: '#FFCC80',
    height: 3,
  },

  ex_view: {
    flexDirection: 'row',
    margin: 7,
    marginTop: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    elevation: 5,

  },
  ex_proView: {
    padding: 7,

  },
  ex_proImage: {
    width: 95,
    height: 100,
    marginLeft: 0,
    marginTop: 3,
    borderRadius: 8
  },
  ex_starView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 8,
    borderColor: '#DD2476',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  ex_starImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginTop: 5,
    marginLeft: 3,
  },
  ex_starText: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontWeight: '400',
    fontSize: 12,
    color: '#6F6F7B90',
    textAlign: 'center',
    marginLeft: 3,
    marginTop: 2,
  },
  dt_view: {
    flex: 1,
  },
  dt_view_1: {
    flexDirection: 'row',
  },
  dt_view_11: {
    flex: 0.9,
  },

  dt_likeView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dt_likeImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  dt_name: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 14,
    marginTop: 2,
    color: '#A6A7A9',
    marginLeft: 9,
  },
  dt_viewOpt: {
    flexDirection: 'row',
    marginTop: 3,
  },
  dt_viewOptImage: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  dt_viewOptText: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 14,
    color: '#A6A7A9',
    paddingHorizontal: 9,
    marginTop: 2,
    width: Dimensions.get('window').width - 140,
  },
  dt_viewOptTexts: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 15,
    color: '#FCB69F',
    paddingHorizontal: 5,
  },
  dt_view_2: {
    flex: 1,
  },
  dt_view_21: {
    flex: 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
  },
  modalView: {
    marginHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },

})