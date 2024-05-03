import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { FlatList } from 'react-native-gesture-handler';
import Button from 'react-native-button';
import stringsoflanguages from '../language/Language';
import { AsyncStorageSetLanguage } from '../backend/Api';
const SelectLanguage = ({ navigation }) => {
    const [languageSelect] = useState([
        { language: 'English', lang: 'en' },
        { language: 'Hindi', lang: 'hi' },
    ]);
    const { language } = useSelector(store => store);
    const dispatch = useDispatch();
    const { _customlang } = stringsoflanguages;
    const changeLanguageHandler = language => {
        stringsoflanguages.setLanguage(language);
        dispatch(actions.Language(language));
        AsyncStorageSetLanguage(language);
    };
    const languageFunction = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    changeLanguageHandler(item.lang);
                }}
                style={styles.languageViewOffCss}>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <Text style={styles.texted}>{item.language}</Text>
                </View>
                {language == item.lang ? (
                    <View
                        style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                        <Image
                            style={styles.tick}
                            source={require('../assets/check2.png')}
                        />
                    </View>
                ) : null}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <ScrollView style={{ height: '100%' }}>
                <Text style={styles.text}>{_customlang.title}</Text>
                <FlatList
                    data={languageSelect}
                    renderItem={languageFunction}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
            <Button
                containerStyle={{
                    width: '90%',
                    bottom: 20,
                    height: 52,
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
                    navigation.replace('SelectType')
                }}>
                {_customlang.submit}
            </Button>
        </SafeAreaView>
    );
};

export default SelectLanguage;

const styles = StyleSheet.create({
    text: {
        marginHorizontal: 25,
        marginTop: 50,
        fontSize: 30,
        fontFamily: 'AvenirLTStd-Medium',
        color: '#1E1F20',
        letterSpacing: 0.59,
        lineHeight: 40,
        textAlign: 'left',
    },
    languageViewOffCss: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 13,
        borderBottomWidth: 0.8,
        borderBottomColor: '#77869E',
        marginHorizontal: 25,

    },

    texted: {
        marginTop: 40,
        fontSize: 20,
        fontFamily: 'AvenirLTStd-Medium',
        color: '#1E1F2080',
        letterSpacing: 0.5,
        textAlign: 'left',
    },
    tick: {
        height: 20,
        width: 20,
    },
});


