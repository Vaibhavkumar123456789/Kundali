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
    StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import stringsoflanguages from '../../../language/Language'
import GLobal from '../../GLobal';
import { LalkitabForm } from '../../../backend/Api';

    function LalKitabKundliChart ({ data }) {
    const window = Dimensions.get('window');
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const { _customlang, _kundali, _onlinejyotish } = stringsoflanguages
    const [field, setField] = useState(GLobal.userDetails)
    const[datainput,setDataInput]=useState()

    useEffect(()=>{
        setsubmit()
    },[])

    const setsubmit = () => {
            let e = {
                "UserDetails": {
                    "Name": field.Name,
                    "Gender": field.Gender,
                    "Day": field.Day,
                    "Month":  field.Month,
                    "Year":  field.Year,
                    "Hours": field.Hours,
                    "Minutes": field.Minutes,
                    "Seconds": field.Seconds,
                    "Latitude": field.Latitude,
                    "Longitude": field.Longitude,
                },
                "AdditionalParams": {
                    "DateFormat": "dd-MM-yyyy"
                }
            };

            LalkitabForm(e)
                .then(data => {
                    // alert(JSON.stringify(data,null,2))
                    if (data) {
                       setDataInput(data?.responseData?.calculation)
                    } else {
                        alert(data.msg);
                    }
                })
                .catch(error => {
                    console.log('error', error);
                });
        }

    return (
        <SafeAreaView >
            {(datainput && 
            <Text style={styles.headerTitle}>{datainput?.chartTitle}</Text>
        )}
                <ImageBackground resizeMode='contain' source={require("../../../assets/kundli.png")} style={{ width: 350, height: 350, alignSelf: 'center', marginTop: 20 }}>
               
                    <View>
                    {(datainput && 
            <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 170, top: 140 }}>{datainput?.zodiacNo[0]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 170, top: 80, color: 'red' }}>{datainput?.planet[0]}</Text>
                        </>
            )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 160, top: 15 }}>{datainput?.zodiacNo[1]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 70, top: 30, color: 'red' }}>{datainput?.planet[1]}</Text>
                        </>
                    )}
                        </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 20, top: 150 }}>{datainput?.zodiacNo[2]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 20, top: 80, color: 'red' }} numberOfLines={1}>{datainput?.planet[2]}</Text>
                        </>
                    )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 140, top: 160 }}>{datainput?.zodiacNo[3]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 60, top: 190, color: 'red' }} numberOfLines={1}>{datainput?.planet[3]}</Text>
                        </>
                    )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 20, top: 180 }}>{datainput?.zodiacNo[4]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 20, top: 250, color: 'red' }} numberOfLines={1}>{datainput?.planet[4]}</Text>
                        </>
                    )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 160, top: 315 }}>{datainput?.zodiacNo[5]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 70, top: 300, color: 'red' }} numberOfLines={1}>{datainput?.planet[5]}</Text>
                        </>
                    )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 170, top: 190 }}>{datainput?.zodiacNo[6]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 170, top: 240, color: 'red' }} numberOfLines={1}>{datainput?.planet[6]}</Text>
                        </>
                    )}
                    </View> 
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 160, top: 315 }}>{datainput?.zodiacNo[7]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 100, top: 300, color: 'red' }} numberOfLines={1}>{datainput?.planet[7]}</Text>
                        </>
                    )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 20, top: 180 }}>{datainput?.zodiacNo[8]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 40, top: 240, color: 'red' }} numberOfLines={1}>{datainput?.planet[8]}</Text>
                        </>
                    )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 140, top: 160 }}>{datainput?.zodiacNo[9]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 110, top: 180, color: 'red' }} numberOfLines={1}>{datainput.planet[9]}</Text>
                        </>
                    )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 20, top: 150 }}>{datainput?.zodiacNo[10]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 20, top: 90, color: 'red' }} numberOfLines={1}>{datainput?.planet[10]}</Text>
                        </>
                    )}
                    </View>
                    <View>
                    {(datainput && 
                    <>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 155, top: 15 }}>{datainput?.zodiacNo[11]}</Text>
                        <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 100, top: 30, color: 'red' }} numberOfLines={1}>{datainput?.planet[11]}</Text>
                        </>
                    )}
                    </View>
              
                </ImageBackground>


           
        </SafeAreaView >
    )
}

export default LalKitabKundliChart

const styles = StyleSheet.create({
    style: {
        backgroundColor: '#FFFFFF',
    },
    labelStyle: {
        fontSize: 16,
        fontFamily: 'AvenirLTStd-Heavy',
        color: '#333333',
        textTransform: 'capitalize',
        marginHorizontal: 15,
    },
    indicatorStyle: {
        backgroundColor: '#FFCC80',
        height: 3,
    },
    container: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    headerRow: {
        backgroundColor: '#f2f2f2',
        borderTopWidth: 1,
    },
    cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
        borderRightWidth: 1, // Add border to the right of each cell
        borderColor: 'gray', // Border color
        color: 'black'
    },
    headerCell: {
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 15,
        fontFamily: 'AvenirLTStd-Heavy',
        color: '#1E1F20',
    }
})

// import {
//     FlatList,
//     Image,
//     Linking,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View, Dimensions,
// } from 'react-native';
// import React from 'react';
// import stringsoflanguages from '../../language/Language'
// import { useNavigation } from '@react-navigation/native';

// function SkipScreen({ data }) {
//     const navigation = useNavigation();
//     const window = Dimensions.get('window');
//     const { width, height } = Dimensions.get('window');
   
//     return (
//         <View>
          

//         </View>
//     );
// }
// export default SkipScreen;
