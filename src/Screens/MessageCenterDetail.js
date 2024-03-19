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
    StatusBar, Modal
} from 'react-native';
import Header from '../Custom/Header';
import stringsoflanguages from '../language/Language'

const MessageCenterDetail = ({ navigation }) => {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _member } = stringsoflanguages
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
            <Header
                menuOption={() => navigation.goBack()}
                leftIcon={require('../assets/back.png')}
                title={'#12'}
            />
            <ScrollView>

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

                <Text style={{
                    fontSize: 14,
                    color: '#333333',
                    marginTop: 3,
                    fontFamily: 'AvenirLTStd-Heavy',
                    marginHorizontal: 18,
                }}>
                    Deepak Kumar
                </Text>
                <View style={{ borderBottomColor: '#36363610', borderBottomWidth: 1, marginTop: 10, }}></View>

                <Text style={{
                    fontSize: 18,
                    color: '#33333350',
                    marginTop: 10,
                    fontFamily: 'AvenirLTStd-Medium',
                    marginHorizontal: 18,
                }}>
                    Venus (in Uttara Ashada) - Remove a block from your relationship.
                </Text>
            </ScrollView>

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
                <Pressable onPress={() => { navigation.goBack() }} style={{
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