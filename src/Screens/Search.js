import React, { useEffect, useState, useRef, createRef } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    FlatList,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Share,
    Pressable,
    SafeAreaView,
    StatusBar, Alert
} from 'react-native';
import stringsoflanguages from '../language/Language'
const { height, width } = Dimensions.get('window');
import { useIsFocused } from '@react-navigation/native';
import { astrologermemberlist, deletememberlist } from '../backend/Api';
import Loader from '../utils/Loader';
const Search = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params, null, 2))
    const window = Dimensions.get('window');
    const isFocused = useIsFocused();
    const { width, height } = Dimensions.get('window');
    const [list, setList] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const { _setting, _customlang, _member } = stringsoflanguages
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });

    useEffect(() => {
        membership()
    }, [isFocused])

    const membership = () => {
        let e = {
            "condition": route.params?.selectedTabIndex === 0 ? "free" : route.params?.selectedTabIndex === 1 ? "paid" : route.params?.selectedTabIndex === 2 ? "expire" : "free",
            "upcming_bday": route.params?.checked === false ? '' : route.params?.checked === 0 ? 5 : route.params?.checked === 1 ? 10 : route.params?.checked === 2 ? 15 : null,
            "membership": route.params?.checked1 === false ? '' : route.params?.checked1 === 0 ? 5 : route.params?.checked1 === 1 ? 10 : route.params?.checked1 === 2 ? 15 : null,
            "kaal_sarp_dosh": route.params?.select === null ? '' : route.params?.select === 0 ? "Starting" : null,
            "grah": route.params?.select1 === null ? '' : route.params?.select1 === 0 ? "Shubh" : route.params?.select1 === 1 ? "Ashubh" : null,
            "sadesati_dhaiya": route.params?.select2 === null ? '' : route.params?.select2 === 0 ? "Upcoming" : route.params?.select2 === 1 ? "Ongiong" : null,
            "pitra_dosha": route.params?.select3 === null ? '' : route.params?.select3 === 0 ? "Yes" : route.params?.select3 === 1 ? "No" : null,
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
                    membership()
                } else {
                    alert(data?.msg);
                }
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    const filteredList = list.filter(item =>
        item?.maindetailuser?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <View
                style={{
                    backgroundColor: '#FFCC80',
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Pressable
                    style={{ paddingVertical: 6 }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/backtoback.png')}
                        style={{
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                            marginLeft: 18,
                        }}
                    />
                </Pressable>
                <View style={{ height: 40, zIndex: 6 }}>
                    <View
                        style={{
                            width: window.width - 75,
                            height: 45,
                            marginLeft: 15,
                            backgroundColor: '#FFFFFF',
                            alignSelf: 'center',
                            borderRadius: 8,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ width: 20, height: 20, alignSelf: 'center', marginLeft: 12 }}
                                source={require('../assets/search.png')}
                            />

                            <TextInput
                                placeholderTextColor="#33333370"
                                style={{
                                    width: window.width - 160,
                                    height: 45,
                                    fontSize: 16,
                                    marginLeft: 10,
                                    color: '#33333370',
                                    fontFamily: 'AvenirLTStd-Medium',
                                }}
                                placeholder={_setting.search}
                                value={searchQuery}
                                onChangeText={text => setSearchQuery(text)}

                            />
                        </View>
                        {searchQuery ?
                            <Pressable style={{ alignSelf: 'center' }}
                                onPress={() => {
                                    setSearchQuery('')
                                }}>
                                <Image
                                    style={{ width: 13, height: 13, alignSelf: 'center', marginRight: 12 }}
                                    source={require('../assets/close.png')}
                                />
                            </Pressable>
                            : null}
                    </View>
                </View>
            </View>
            {state.loading && <Loader />}

            {filteredList && filteredList.length > 0 ?
                <FlatList
                    data={filteredList}
                    style={{ marginTop: 10, flexGrow: 0 }}
                    renderItem={({ item, index }) => (
                        // <></>
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


        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({
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
});

