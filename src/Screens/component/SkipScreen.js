import {
    FlatList,
    Image,
    Linking,
    Text,
    TextInput,
    TouchableOpacity,
    View, Dimensions,
} from 'react-native';
import React from 'react';
import stringsoflanguages from '../../language/Language'
import * as actions from '../../redux/actions';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Button from 'react-native-button';

function SkipScreen({ data }) {
    const navigation = useNavigation();
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const { _astrologerForm } = stringsoflanguages
    return (
        <View>
            <Button
                containerStyle={{
                    width: '90%',
                    height: 52,
                    marginTop: height / 3,
                    borderRadius: 12,
                    overflow: 'hidden',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFCC80',
                }}
                style={{
                    fontSize: 18,
                    color: '#333333',
                    alignSelf: 'center',
                    fontFamily: 'AvenirLTStd-Medium',
                }}
                onPress={() => {
                    actions.Logout({});
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SignIn' }],
                    });
                }}>
                {_astrologerForm.signin}
            </Button>

        </View>
    );
}
export default SkipScreen;
