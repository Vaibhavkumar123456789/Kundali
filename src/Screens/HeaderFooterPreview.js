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
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'
import Loader from '../utils/Loader';
import { HeaderPreviewApi } from '../backend/Api';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import SkipScreen from './component/SkipScreen';

const HeaderFooterPreview = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member, _invoice, _kundali, _drawer } = stringsoflanguages
    const isFocused = useIsFocused();
    const { skip_id } = useSelector(store => store.user);
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [profile, setProfile] = useState([])

    useEffect(() => {
        headerapi()
    }, [isFocused == true])


    const headerapi = () => {

        toggleLoading(true)
        HeaderPreviewApi()
            .then(data => {
                toggleLoading(false);
                // alert(JSON.stringify(data, null, 2))
                if (data.status) {
                    setProfile(data.data)
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                toggleLoading(false);
                console.log('error', error);
            });
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/backtoback.png')}
                title={_invoice.preview}
            />
            {state.loading && <Loader />}
            {skip_id == 1 ?
                <SkipScreen />
                :
                <>

                    {profile && profile.length > "0" ?
                        <FlatList
                            data={profile}
                            style={{ flexGrow: 0, marginTop: 10 }}
                            renderItem={({ item, index }) => (

                                <View
                                    style={{
                                        marginHorizontal: 18,
                                        paddingVertical: 10,
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 12,
                                        elevation: 5,
                                        bottom: 10,
                                        marginTop: 15,
                                    }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                        <Text style={{
                                            fontSize: 14,
                                            color: '#ADADAD',
                                            fontFamily: 'AvenirLTStd-Medium',
                                            marginLeft: 10,
                                        }}>
                                            {_invoice.companyname}
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginRight: 10,
                                            width: window.width - 180,
                                            textAlign: 'right',
                                        }}>
                                            {item.company_name}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>

                                        <Text style={{
                                            fontSize: 14,
                                            color: '#ADADAD',
                                            fontFamily: 'AvenirLTStd-Medium',
                                            marginLeft: 10,
                                        }}>
                                            {_invoice.companyaddress}
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginRight: 10,
                                            width: window.width - 180,
                                            textAlign: 'right',
                                        }}>
                                            {item.company_address}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>

                                        <Text style={{
                                            fontSize: 14,
                                            color: '#ADADAD',
                                            fontFamily: 'AvenirLTStd-Medium',
                                            marginLeft: 10,
                                        }}>
                                            {_invoice.astrologername}
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginRight: 10,
                                            width: window.width - 180,
                                            textAlign: 'right',
                                        }}>
                                            {item.astrologer_name}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>

                                        <Text style={{
                                            fontSize: 14,
                                            color: '#ADADAD',
                                            fontFamily: 'AvenirLTStd-Medium',
                                            marginLeft: 10,
                                        }}>
                                            {_kundali.mobile}
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginRight: 10,
                                            width: window.width - 180,
                                            textAlign: 'right',
                                        }}>
                                            {item.mobile}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>

                                        <Text style={{
                                            fontSize: 14,
                                            color: '#ADADAD',
                                            fontFamily: 'AvenirLTStd-Medium',
                                            marginLeft: 10,
                                        }}>
                                            {_kundali.email}
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#333333',
                                            fontFamily: 'AvenirLTStd-Heavy',
                                            marginRight: 10,
                                            width: window.width - 180,
                                            textAlign: 'right',
                                        }}>
                                            {item.email}
                                        </Text>
                                    </View>

                                </View>
                            )
                            }
                        />
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'AvenirLTStd-Medium' }}>No Header Preivew</Text>
                        </View>}

                </>
            }

        </SafeAreaView >
    )
}

export default HeaderFooterPreview

const styles = StyleSheet.create({})