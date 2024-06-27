import { View, Text, Image, StyleSheet, Dimensions, FlatList, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Alert, } from 'react-native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import CustomHeader from '../Custom/CustomHeader';
import stringsoflanguages from '../language/Language'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Loader from '../utils/Loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { astrologermemberlist, deletememberlist } from '../backend/Api';
import { RadioButton } from 'react-native-paper';

const Members = ({ navigation }) => {
  const { _member } = stringsoflanguages
  const window = Dimensions.get('window');
  const isFocused = useIsFocused();
  const { width, height } = Dimensions.get('window');
  const [list, setList] = useState([])
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({ ...state, loading: bol });
  const refRBSheet = useRef();
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [select, setSelect] = useState(null)
  const [select1, setSelect1] = useState(null)
  const [select2, setSelect2] = useState(null)
  const [select3, setSelect3] = useState(null)

  const applyFilters = () => {
    membership(getConditionByIndex(index));
    refRBSheet.current.close();
  };

  const resetFilters = () => {
    setChecked(false);
    setChecked1(false);
    setSelect(null);
    setSelect1(null);
    setSelect2(null);
    setSelect3(null);
  };

  useEffect(() => {
    if (isFocused) {
      membership(getConditionByIndex(index));
    }
  }, [isFocused, index]);

  const getConditionByIndex = (index) => {
    switch (index) {
      case 0: return 'free';
      case 1: return 'paid';
      case 2: return "expire";
      default: return 'free';
    }
  };

  const membership = (condition) => {
    let e = {
      "condition": condition,
      "upcming_bday": checked === false ? '' : checked === 0 ? 5 : checked === 1 ? 10 : checked === 2 ? 15 : null,
      "membership": checked1 === false ? '' : checked1 === 0 ? 5 : checked1 === 1 ? 10 : checked1 === 2 ? 15 : null,
      "kaal_sarp_dosh": select === null ? '' : select === 0 ? "Starting" : null,
      "grah": select1 === null ? '' : select1 === 0 ? "Shubh" : select1 === 1 ? "Ashubh" : null,
      "sadesati_dhaiya": select2 === null ? '' : select2 === 0 ? "Upcoming" : select2 === 1 ? "Ongiong" : null,
      "pitra_dosha": select3 === null ? '' : select3 === 0 ? "Yes" : select3 === 1 ? "No" : null,
    };

    toggleLoading(true);
    astrologermemberlist(e)
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        toggleLoading(false);
        if (data.status) {
          setList(data?.list)

        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  }


  const deletemember = (d) => {
    let e = {
      "id": d
    };
    deletememberlist(e)
      .then(data => {
        // alert(JSON.stringify(data, null, 2))
        if (data.status) {
          membership(getConditionByIndex(index));
        } else {
          alert(data?.msg);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
      case 'second':
      case 'third':
        return (
          <View style={{ flex: 1, }}>
            {list && list.length > 0 ?
              <FlatList
                data={list}
                style={{ marginTop: 10, flexGrow: 0 }}
                renderItem={({ item, index }) => (

                  <View style={styles.ex_view}>
                    <View style={styles.ex_proView}>
                      <Image style={{ width: 80, height: 80, resizeMode: 'contain' }}
                        source={require('../assets/defaultimage.png')} />

                    </View>
                    <View style={styles.dt_view}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 2, marginTop: 4 }}>
                        <View style={{ flexDirection: 'row' }}>

                          <Text numberOfLines={1} style={{ color: '#1E1F20', fontFamily: 'AvenirLTStd-Heavy', fontSize: 16, marginLeft: 7, marginTop: 0, width: window.width - 210 }}>
                            {item?.maindetailuser?.name}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: 12 }}>
                          <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('UpdateMember', item) }}>
                            <Image
                              style={{
                                width: 18,
                                height: 18,
                                marginRight: 10,
                                resizeMode: 'contain',
                              }}
                              source={require('../assets/edit1.png')}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                              Alert.alert(
                                'Are you sure want to Delete Member ?',
                                item?.maindetailuser?.name,
                                [
                                  {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                  },

                                  { text: 'Delete', onPress: () => deletemember(item.id) },
                                ],
                                { cancelable: false },
                              )
                            }} >
                            <Image
                              style={{
                                width: 18,
                                height: 18,
                                marginLeft: 5,
                                resizeMode: 'contain',
                              }}
                              source={require('../assets/delete1.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.dt_view_1}>
                        <View style={styles.dt_view_11}>
                          <View
                            style={{
                              flexDirection: 'row', marginTop: 2,
                            }}>
                            <Text numberOfLines={1}
                              style={styles.dt_name}>{item?.maindetailuser?.gender}</Text>
                            {/* <View style={{
                            width: 1.5,
                            backgroundColor: '#A6A7A9',
                            height: 13,
                            marginLeft: 5,
                            marginTop: 5,
                          }}>
                          </View>
                          <Text numberOfLines={1}
                            style={styles.dt_name}>25 yrs</Text> */}
                          </View>

                          <View style={styles.dt_viewOpt}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: 'AvenirLTStd-Medium',
                                color: '#A6A7A9',
                                marginTop: 2,
                                marginLeft: 9,
                              }}>
                              {_member.tob} :{item?.maindetailuser?.tob}
                            </Text>

                          </View>
                        </View>
                      </View>
                      <View style={styles.dt_view_2}>
                        <View style={styles.dt_viewOpt}>
                          <Text numberOfLines={1} style={styles.dt_viewOptText}>
                            {_member.pob} :{item?.maindetailuser?.pob}
                          </Text>
                        </View>
                        <View style={styles.dt_viewOpt}>
                          <Text numberOfLines={1} style={styles.dt_viewOptText}>
                            {_member.whatsapp}:{item?.maindetailuser?.mobile}
                          </Text>
                        </View>

                      </View>
                    </View>
                  </View>
                )
                }
              />
              : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'AvenirLTStd-Medium' }}>No Member List</Text>
              </View>}
          </View >
        )

    }
  }

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    { key: 'first', title: _member.free },
    { key: 'second', title: _member.paid },
    { key: 'third', title: _member.expire },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
      <CustomHeader
        title={_member.freemember}

        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/backtoback.png')}
        secondRightIcon={require('../assets/search.png')}
        thirdRightIcon={require('../assets/filter.png')}
        rightOption={() => {
          navigation.navigate('Search', {
            checked,
            checked1,
            select,
            select1,
            select2,
            select3,
            selectedTabIndex,
          });
        }}
        right3Option={() => {
          refRBSheet.current.open()
        }}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={index => {
          setIndex(index);
          membership(getConditionByIndex(index));
          setSelectedTabIndex(index);
        }}
        renderTabBar={props => (
          <TabBar
            style={styles.style}
            labelStyle={styles.labelStyle}
            // scrollEnabled={true}
            tabStyle={{ height: 50 }}
            activeColor={'#FFCC80'}
            inactiveColor={'#333333'}
            inactiveOpacity={0.5}
            {...props}
            indicatorStyle={styles.indicatorStyle}
          />
        )}
      />
      {state.loading && <Loader />}


      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={700}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <ScrollView style={styles.bottomSheetContainer}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Heavy',
              color: '#333333',
            }}>
            Upcoming Birthday
          </Text>
          <FlatList
            data={['In next 5 days', 'In next 10 days', 'In next 15 days']}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                setChecked(index)

              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <RadioButton
                    value={checked}
                    status={checked === index ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(index)
                    }}
                    uncheckedColor='#69707F90'
                    color='#FFCC80'
                  />
                  <Text style={{
                    fontSize: 16,
                    color: '#33333390',
                    fontFamily: 'AvenirLTStd-Medium',
                  }}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Heavy',
              color: '#333333',
              marginTop: 10,
            }}>
            Membership
          </Text>
          <FlatList
            data={['Expire in 5 days', 'Expire in 10 days', 'Expire in 15 days']}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                setChecked1(index)
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <RadioButton
                    value={checked1}
                    status={checked1 === index ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked1(index)
                    }}
                    uncheckedColor='#69707F90'
                    color='#FFCC80'
                  />
                  <Text style={{
                    fontSize: 16,
                    color: '#33333390',
                    fontFamily: 'AvenirLTStd-Medium',
                  }}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Heavy',
              color: '#333333',
              marginTop: 10,
            }}>
            Kaal Sarp Dosh
          </Text>
          <FlatList
            data={['Starting']}
            renderItem={({ item, index }) => (
              <Pressable style={{
                paddingVertical: 10,
                backgroundColor: index == select ? '#FFCC80' : '#FFFFFF',
                borderRadius: 4,
                borderColor: index == select ? '#FFCC80' : '#828283',
                borderWidth: 1.2,
                marginTop: 13,
                marginHorizontal: 10,
                alignSelf: 'flex-start',
              }} onPress={() => {
                setSelect(index)

              }}>
                <Text style={{
                  fontSize: 14,
                  color: index == select ? '#333333' : '#828283',
                  fontFamily: 'AvenirLTStd-Medium',
                  paddingHorizontal: 10,
                }}>
                  {item}
                </Text>

              </Pressable>

            )}
          />

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Heavy',
              color: '#333333',
              marginTop: 10,
            }}>
            Grah
          </Text>
          <FlatList
            horizontal
            data={['Shubh', 'Ashubh']}
            renderItem={({ item, index }) => (
              <Pressable style={{
                paddingVertical: 10,
                backgroundColor: index == select1 ? '#FFCC80' : '#FFFFFF',
                borderRadius: 4,
                borderColor: index == select1 ? '#FFCC80' : '#828283',
                borderWidth: 1.2,
                marginTop: 13,
                marginHorizontal: 10,
                alignSelf: 'flex-start',
              }} onPress={() => {
                setSelect1(index)

              }}>
                <Text style={{
                  fontSize: 14,
                  color: index == select1 ? '#333333' : '#828283',
                  fontFamily: 'AvenirLTStd-Medium',
                  paddingHorizontal: 10,
                }}>
                  {item}
                </Text>

              </Pressable>

            )}
          />

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Heavy',
              color: '#333333',
              marginTop: 10,
            }}>
            Sadesati/Dhaiyya
          </Text>
          <FlatList
            horizontal
            data={['Upcoming', 'Ongoing']}
            renderItem={({ item, index }) => (
              <Pressable style={{
                paddingVertical: 10,
                backgroundColor: index == select2 ? '#FFCC80' : '#FFFFFF',
                borderRadius: 4,
                borderColor: index == select2 ? '#FFCC80' : '#828283',
                borderWidth: 1.2,
                marginTop: 13,
                marginHorizontal: 10,
                alignSelf: 'flex-start',
              }} onPress={() => {
                setSelect2(index)

              }}>
                <Text style={{
                  fontSize: 14,
                  color: index == select2 ? '#333333' : '#828283',
                  fontFamily: 'AvenirLTStd-Medium',
                  paddingHorizontal: 10,
                }}>
                  {item}
                </Text>

              </Pressable>

            )}
          />

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Heavy',
              color: '#333333',
              marginTop: 10,
            }}>
            Pitra Dosha
          </Text>
          <FlatList
            horizontal
            data={['Yes', 'No']}
            renderItem={({ item, index }) => (
              <Pressable style={{
                paddingVertical: 10,
                backgroundColor: index == select3 ? '#FFCC80' : '#FFFFFF',
                borderRadius: 4,
                borderColor: index == select3 ? '#FFCC80' : '#828283',
                borderWidth: 1.2,
                marginTop: 13,
                marginHorizontal: 10,
                alignSelf: 'flex-start',
              }} onPress={() => {
                setSelect3(index)

              }}>
                <Text style={{
                  fontSize: 14,
                  color: index == select3 ? '#333333' : '#828283',
                  fontFamily: 'AvenirLTStd-Medium',
                  paddingHorizontal: 20,
                }}>
                  {item}
                </Text>

              </Pressable>



            )}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Pressable style={{
              paddingVertical: 11,
              backgroundColor: 'white',
              borderRadius: 4,
              borderColor: '#FFCC80',
              borderWidth: 1,
              width: '45%',
              marginTop: 15,
              marginBottom: 20,
              alignSelf: 'flex-start',
            }} onPress={() => {
              resetFilters()
            }}>
              <Text style={{
                fontSize: 18,
                color: '#FFCC80',
                fontFamily: 'AvenirLTStd-Medium',
                textAlign: 'center',
              }}>
                Reset All
              </Text>
            </Pressable>

            <Pressable style={{
              paddingVertical: 11,
              backgroundColor: '#FFCC80',
              borderRadius: 4,
              marginTop: 15,
              marginBottom: 20,
              width: '45%',
              alignSelf: 'flex-start',
            }} onPress={() => {
              applyFilters()
            }}>
              <Text style={{
                fontSize: 18,
                color: '#333333',
                fontFamily: 'AvenirLTStd-Medium',
                textAlign: 'center',
              }}>
                Apply
              </Text>
            </Pressable>
          </View>

        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  )
}

export default Members

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#FFFFFF',
  },
  labelStyle: {
    fontSize: wp('4.5%'),
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

  bottomSheetContainer: {
    flex: 1,
    padding: 15,
  },


})