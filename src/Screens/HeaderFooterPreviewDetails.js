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

const HeaderFooterPreviewDetails = ({ navigation, route }) => {
  // alert(JSON.stringify(route.params,null,2))
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
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
        <Header
          menuOption={() => navigation.goBack()}
          leftIcon={require('../assets/backtoback.png')}
          title={route.params?.item?.company_name}
        />
        {state.loading && <Loader />}
        <View style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20, backgroundColor:'#F7F7F7', paddingBottom:20}}>
          <Image style={{height:32, width:32, resizeMode:"contain"}} source={{uri:`${route.params?.imagePath}/${route.params?.item?.image}`}}/>
          <Text style={{color:"#333333", marginLeft:12, fontSize:16, fontFamily: 'AvenirLTStd-Heavy', width:window.width-100,}}>{route.params?.item?.company_name}</Text>
        </View>

        <View style={{borderTopWidth:1, borderTopColor:'#979797',position:'absolute', bottom:0 ,width:"100%" }}>

        
        <View style={{ alignItems:'center', alignSelf:'center', marginVertical:15,  }}>
          <Text style={{color:route.params?.item?.header_color  == null ? "#000" : route.params?.item?.header_color, fontSize:13, fontFamily: 'AvenirLTStd-Heavy', marginTop:3}}>{route.params?.item?.astrologer_name}</Text>
          <Text style={{color:route.params?.item?.header_color  == null ? "#000" : route.params?.item?.header_color, fontSize:13, fontFamily: 'AvenirLTStd-Heavy', marginTop:3}}>{route.params?.item?.mobile}, {route.params?.item?.email}</Text>
          <Text style={{color:route.params?.item?.header_color  == null ? "#000" : route.params?.item?.header_color, fontSize:13, fontFamily: 'AvenirLTStd-Heavy', marginTop:3}}>{route.params?.item?.company_address}</Text>
          <Text style={{color:route.params?.item?.header_color  == null ? "#000" : route.params?.item?.header_color, fontSize:13, fontFamily: 'AvenirLTStd-Heavy', marginTop:3}}>{route.params?.item?.website}</Text>
        </View>
        </View>
      </SafeAreaView>
    );
}

export default HeaderFooterPreviewDetails

const styles = StyleSheet.create({})