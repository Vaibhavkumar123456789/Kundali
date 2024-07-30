import { View, SafeAreaView, StyleSheet, Text, Modal, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const NoInterner = ({ navigation }) => {
    const [isConnected, setIsConnected] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setIsConnected(state.isConnected);
            !setModalVisible(true)
        });
        return () => {
            unsubscribe();
        };
    }, []);

     // const unsubscribe = NetInfo.addEventListener(state => {
  //   // alert(state.isConnected)
  //   console.log('Connection type', state.type);
  //   console.log('Is connected?', state.isConnected);
  //   if (state.isConnected == false) {
  //     Alert.alert('Kundali', 'Your internet connectivity is low.', [
  //       {
  //         text: 'Ok',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //     ]);
  //   }
  // });
    return (
        <>
            <View style={{ flex: 1 }}>
                {!isConnected && (
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
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                            }}>
                            <View style={{
                                paddingVertical: 18,
                                backgroundColor: '#1E1F2065',
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 30,
                                paddingHorizontal: 20,
                                flexDirection: "row",
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: 'contain',
                                        alignSelf: 'center',

                                    }}
                                    source={require('../assets/no-internet.png')}
                                />
                                <View>
                                    <Text style={{
                                        textAlign: 'left',
                                        fontSize: 14,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: 'white',

                                    }}>
                                        Low Internet
                                    </Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        fontSize: 14,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: 'white',

                                    }}>
                                        Check your network connection
                                    </Text>

                                </View>
                            </View>

                        </TouchableOpacity>
                    </Modal>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    subContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 30,
        paddingHorizontal: 20,
        flexDirection: "row",
        width: "100%",
    },
    bottomText: {
        opacity: 0.6,
        marginTop: 3,
    },
});

export default NoInterner;
