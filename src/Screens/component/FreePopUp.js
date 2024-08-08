import { View, Text, Image, StyleSheet, Dimensions, FlatList, Modal, Linking, TextInput, StatusBar, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Platform, BackHandler, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'

function FreePopUp({ setShowFreePopUp }) {

    useEffect(() => {

        setModalVisible(true)
    }, [])
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View style={{ flex: 1, }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    setShowFreePopUp(false);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setModalVisible(false);
                        setShowFreePopUp(false);
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: '#00000099',
                        justifyContent: 'center',
                    }}>
                    <View style={{
                        margin: 15,
                        paddingVertical: 20,
                        backgroundColor: 'white',
                        borderRadius: 10,
                    }}>
                        <View style={{ backgroundColor: '#FFCC80', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 13, marginTop: -20, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                            <Text style={{
                                fontSize: 15,
                                color: 'black',
                                fontFamily: 'AvenirLTStd-Medium',
                                marginLeft: 15,
                            }}>
                                Become a Member Today!
                            </Text>
                            <Pressable onPress={() => { setModalVisible(false) }}>
                                <Image
                                    style={{
                                        width: 13,
                                        height: 13,
                                        resizeMode: 'contain',
                                        marginRight: 15,
                                        marginTop: 3,
                                    }}
                                    source={require('../../assets/close.png')}
                                />
                            </Pressable>
                        </View>
                        <Text style={{
                            fontSize: 15,
                            color: 'black',
                            fontFamily: 'AvenirLTStd-Medium',
                            marginHorizontal: 15,
                            textAlign: 'center',
                            marginTop: 10,
                            lineHeight: 20,
                        }}>
                            Become a member today and unlock exclusive benefits.Enjoy special discounts and more.
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{
                                backgroundColor: '#FFCC80',
                                borderRadius: 8,
                                padding: 15,
                                width: '25%',
                                alignSelf: 'center',
                                marginTop: 13,
                            }} onPress={() => { setModalVisible(false), setShowFreePopUp(false) }}>

                            <Text style={{
                                fontSize: 14,
                                color: '#333333',
                                fontFamily: 'AvenirLTStd-Heavy',
                                textAlign: 'center',
                            }}>

                                OK
                            </Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>


        </View>
    )
}

export default FreePopUp

const styles = StyleSheet.create({})

