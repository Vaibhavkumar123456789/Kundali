import React, { useState, useEffect, useRef } from 'react';
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
    StatusBar, Modal
} from 'react-native';
import Header from '../Custom/Header';
import ViewShot from 'react-native-view-shot';
import stringsoflanguages from '../language/Language'
import Loader from '../utils/Loader';
import { HeaderPreviewApi } from '../backend/Api';
import { useIsFocused } from '@react-navigation/native';

const MessageCenterDetail = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member } = stringsoflanguages
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [state, setState] = useState({
        loading: false,
    });
    const toggleLoading = bol => setState({ ...state, loading: bol });
    const [profile, setProfile] = useState()
    const [imagePath, setImagePath] = useState("")
    const viewShotRef = useRef(null);

    const captureViewShot = () => {
        viewShotRef.current.capture({
            format: 'jpg',
            quality: 1.0,
        }).then(uri => {
            navigation.navigate("NaamJane", uri)
            console.log('Full screen captured and saved to', uri);
        });

    };

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
                    setProfile(data?.data[0])
                    setImagePath(data?.path)
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
            <ViewShot ref={viewShotRef} style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'white' }}
                options={{ format: 'jpg', quality: 1.0 }}>
                <Header
                    menuOption={() => navigation.goBack()}
                    leftIcon={require('../assets/backtoback.png')}
                    title={'#5914'}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15, paddingLeft: 20, backgroundColor: '#F7F7F7', paddingBottom: 15 }}>
                    <Image style={{ height: 32, width: 32, resizeMode: "contain", borderRadius: 25 }} source={{ uri: `${imagePath}/${profile?.image}` }} />
                    {(profile &&
                        <Text numberOfLines={1}
                            style={{
                                color: profile?.company_color == null ? "#000" : profile?.company_color,
                                textAlign: 'center',
                                fontSize: 16,
                                fontFamily: 'AvenirLTStd-Heavy',
                                width: window.width - 85,
                            }}>
                            {profile?.company_name}
                        </Text>
                    )}
                </View>
                <ScrollView >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>

                        <Text style={{
                            fontSize: 14,
                            color: '#333333',
                            fontFamily: 'AvenirLTStd-Heavy',
                            marginLeft: 18,
                            width: window.width - 175,
                        }}>
                            {_member.id}: #5914
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#33333340',
                            fontFamily: 'AvenirLTStd-Medium',
                            marginRight: 18,
                        }}>
                            {_member.dob}: 06/02/1980
                        </Text>
                    </View>

                    <Text numberOfLines={2} style={{
                        fontSize: 14,
                        color: '#333333',
                        marginTop: 3,
                        fontFamily: 'AvenirLTStd-Heavy',
                        marginHorizontal: 18,
                    }}>
                        Deepak Kumar
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 6,
                        marginHorizontal: 18,
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: '#333333',
                            marginTop: 10,
                            fontFamily: 'AvenirLTStd-Heavy',
                        }}>
                            Remedy :&nbsp;
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#33333350',
                                    marginTop: 10,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    lineHeight: 20,
                                }}>
                                Venus (in Uttara Ashada) - Remove a block from your relationship.&nbsp;

                            </Text>
                        </Text>
                    </View>

                    <Text style={{
                        fontSize: 14,
                        color: '#33333350',
                        marginTop: 10,
                        fontFamily: 'AvenirLTStd-Medium',
                        marginHorizontal: 18,
                        lineHeight: 20,
                    }}>
                        Venus (in Uttara Ashada) - Remove a block from your relationship.
                    </Text>
                </ScrollView>

                <View style={{ borderTopWidth: 1, borderTopColor: '#97979780', marginBottom: 10, width: "100%" }}>

                    <View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: 13 }}>
                        {(profile &&
                            <>
                                <Text style={{ color: profile?.astrologer_color == null ? "#000" : profile?.astrologer_color, fontSize: 13, fontFamily: 'AvenirLTStd-Heavy', marginTop: 3 }}>{profile?.astrologer_name}</Text>
                                <Text style={{ color: profile?.header_color == null ? "#000" : profile?.header_color, fontSize: 13, fontFamily: 'AvenirLTStd-Heavy', marginTop: 3 }}>{profile?.mobile}, {profile?.email}</Text>
                                <Text style={{ color: profile?.header_color == null ? "#000" : profile?.header_color, fontSize: 13, fontFamily: 'AvenirLTStd-Heavy', marginTop: 3 }}>{profile?.company_address}</Text>
                                <Text style={{ color: profile?.header_color == null ? "#000" : profile?.header_color, fontSize: 13, fontFamily: 'AvenirLTStd-Heavy', marginTop: 3 }}>{profile?.website}</Text>
                            </>
                        )}
                    </View>
                </View>
            </ViewShot>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>

                <Pressable onPress={() => { setModalVisible(true) }} style={{
                    marginLeft: 18, width: '43%',
                    borderRadius: 8, paddingVertical: 14, borderColor: '#FFCC80', borderWidth: 1
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFCC80',
                        fontFamily: 'AvenirLTStd-Medium',
                        textAlign: 'center',
                    }}>
                        {_member.edit}
                    </Text>
                </Pressable>

                <Pressable onPress={captureViewShot} style={{
                    marginRight: 18, width: '43%',
                    borderRadius: 8, paddingVertical: 14, backgroundColor: '#FFCC80',
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Medium',
                        textAlign: 'center',
                    }}>
                        {_member.send}
                    </Text>
                </Pressable>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible(false);
                    }}
                    style={styles.container}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {

                            }}>
                            <View style={{ alignSelf: 'center' }}>

                            </View>
                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                marginHorizontal: 10,
                            }}>
                                {_member.edittext}
                            </Text>

                            <TextInput
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    borderRadius: 10,
                                    borderColor: '#00000020',
                                    borderWidth: 1.5,
                                    marginTop: 10,
                                    marginHorizontal: 10,
                                    paddingHorizontal: 15,
                                    height: 100,
                                    color: '#333333',
                                }}
                                placeholderTextColor={'#333333'}
                                textAlignVertical='top'
                                multiline
                                placeholder={'write somethings...'}
                            />
                            <Pressable onPress={() => { setModalVisible(false) }} style={{
                                alignSelf: 'center', marginTop: 15, width: '38%',
                                borderRadius: 8, paddingVertical: 14, backgroundColor: '#FFCC80',
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#333333',
                                    fontFamily: 'AvenirLTStd-Medium',
                                    textAlign: 'center',
                                }}>
                                    {_member.save}
                                </Text>
                            </Pressable>

                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView >
    )
}

export default MessageCenterDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
    },
    modalView: {
        marginHorizontal: 20,
        paddingVertical: 18,
        backgroundColor: 'white',
        borderRadius: 12,
    },
})



// import React, { useRef } from 'react';
// import { View, Button, Image } from 'react-native';
// import ViewShot from 'react-native-view-shot';

// const MessageCenterDetail = () => {
//     const viewShotRef = useRef(null);
//     const [imageUri, setImageUri] = React.useState(null);

//     const captureViewShot = () => {
//         viewShotRef.current.capture().then(uri => {
//             setImageUri(uri);
//             alert(JSON.stringify(uri, null, 2))
//             console.log("Image saved to", uri);
//         });
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
//                 <View style={{ width: 200, height: 200, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }}>
//                     <Button title="Capture me!" onPress={captureViewShot} />
//                 </View>
//             </ViewShot>
//             {imageUri && (
//                 <Image
//                     source={{ uri: imageUri }}
//                     style={{ width: 200, height: 200, marginTop: 20 }}
//                 />
//             )}
//         </View>
//     );
// };

// export default MessageCenterDetail;
