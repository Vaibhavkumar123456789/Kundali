import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Text,
    Platform,
    StatusBar,
    Dimensions
} from 'react-native';
const window = Dimensions.get('window');
const { width, height } = Dimensions.get('window');
function Header(props) {
    return (
        <SafeAreaView
            style={{
                backgroundColor: '#FFCC80',
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>

            <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity
                    style={{ paddingVertical: 6 }}
                    onPress={() => props.menuOption()}>
                    <Image
                        source={props.leftIcon}
                        style={{
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                            marginLeft: 18,
                        }}
                    />
                </TouchableOpacity>
                <Text numberOfLines={1}
                    style={{
                        fontSize: 18,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Heavy',
                        marginTop: 6,
                        marginLeft: 10,
                        width: Dimensions.get('window').width - 80,
                    }}>
                    {props.title}
                </Text>
            </View>

        </SafeAreaView>

    );
}
export default Header;
const styles = StyleSheet.create({

});

