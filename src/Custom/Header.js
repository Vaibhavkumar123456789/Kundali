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
                            height: 22,
                            width: 12,
                            resizeMode: 'contain',
                            marginLeft: 18,
                            marginTop: 1,
                        }}
                    />
                </TouchableOpacity>
                <Text numberOfLines={1}
                    style={{
                        fontSize: 17,
                        color: '#333333',
                        fontFamily: 'AvenirLTStd-Heavy',
                        marginTop: 8,
                        marginLeft: 15,
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

