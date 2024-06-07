// import React, { useState, useEffect } from 'react';
// import {
//   Image,
//   StyleSheet,
//   View,
//   ImageBackground,
//   Text,
//   Platform,
//   TouchableOpacity,
//   Pressable,
//   TextInput,
//   Dimensions,
//   Alert,
//   FlatList,
//   SafeAreaView,
//   ScrollView,
//   StatusBar
// } from 'react-native';
// import Header from '../Custom/Header';
// import stringsoflanguages from '../language/Language'

// const LalKitabDetail = ({ navigation, route }) => {
//   alert(JSON.stringify(route.params, null, 2))
//   const window = Dimensions.get('window');
//   const { width, height } = Dimensions.get('window');
//   const { _customlang, _kundali, _onlinejyotish } = stringsoflanguages
//   const [state, setState] = useState({
//     loading: false,
//   });
//   const toggleLoading = bol => setState({ ...state, loading: bol });

//   const calculation = {
//     "chartTitle": "लग्न चार्ट",
//     "zodiacNo": [
//       "1",
//       "2",
//       "3",
//       "4",
//       "5",
//       "6",
//       "7",
//       "8",
//       "9",
//       "10",
//       "11",
//       "12"
//     ],
//     "planet": [
//       "सू के",
//       "बु",
//       "गु",
//       "dd",
//       "चं",
//       "मं",
//       "श रा",
//       "d",
//       "प्लू",
//       "d",
//       "ने",
//       "शु ह"
//     ],
//     "planetDetails": [
//       "<span class=\"sun\">सू</span><span class=\"ketu\">के</span>",
//       "<span class=\"mercury\">बु</span>",
//       "<span class=\"jupiter\">गु</span>",
//       "",
//       "<span class=\"moon\">चं</span>",
//       "<span class=\"mars\">मं</span>",
//       "<span class=\"saturn\">श</span><span class=\"rahu\">रा</span>",
//       "",
//       "<span class=\"pluto\">प्लू</span>",
//       "",
//       "<span class=\"neptune\">ने</span>",
//       "<span class=\"venus\">शु</span><span class=\"uranus\">ह</span>"
//     ],
//     "description": null
//   }


//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
//       <Header
//         menuOption={() => navigation.goBack()}
//         leftIcon={require('../assets/backtoback.png')}
//         title={_onlinejyotish.lal}
//       />
//       <Text style={styles.headerTitle}>{route.params?.responseData?.calculation?.chartTitle}</Text>
//       <View>
//         <ImageBackground resizeMode='contain' source={require("../assets/kundli.png")} style={{ width: 350, height: 350, alignSelf: 'center', marginTop: 30 }}>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 170, top: 140 }}>{route.params?.responseData?.calculation?.zodiacNo[0]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 170, top: 80, color: 'red' }}>{route.params?.responseData?.calculation?.planet[0]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 160, top: 15 }}>{route.params?.responseData?.calculation?.zodiacNo[1]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 70, top: 30, color: 'red' }}>{route.params?.responseData?.calculation?.planet[1]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 20, top: 150 }}>{route.params?.responseData?.calculation?.zodiacNo[2]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 20, top: 80, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[2]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 140, top: 160 }}>{route.params?.responseData?.calculation?.zodiacNo[3]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 60, top: 190, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[3]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 20, top: 180 }}>{route.params?.responseData?.calculation?.zodiacNo[4]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 20, top: 250, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[4]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 160, top: 315 }}>{route.params?.responseData?.calculation?.zodiacNo[5]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', left: 70, top: 300, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[5]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 170, top: 190 }}>{route.params?.responseData?.calculation?.zodiacNo[6]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 170, top: 240, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[6]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 160, top: 315 }}>{route.params?.responseData?.calculation?.zodiacNo[7]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 100, top: 300, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[7]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 20, top: 180 }}>{route.params?.responseData?.calculation?.zodiacNo[8]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 50, top: 240, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[8]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 140, top: 160 }}>{route.params?.responseData?.calculation?.zodiacNo[9]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 110, top: 180, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation.planet[9]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 20, top: 150 }}>{route.params?.responseData?.calculation?.zodiacNo[10]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 50, top: 90, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[10]}</Text>
//           </View>
//           <View>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 155, top: 15 }}>{route.params?.responseData?.calculation?.zodiacNo[11]}</Text>
//             <Text style={{ color: '#000', fontSize: 16, position: 'absolute', right: 100, top: 30, color: 'red' }} numberOfLines={1}>{route.params?.responseData?.calculation?.planet[11]}</Text>
//           </View>
//         </ImageBackground>

//         {/* <ScrollView horizontal >
//           <View style={styles.container}>
//             <View style={[styles.row, styles.headerRow]}>
//               <Text style={[styles.cell, styles.headerCell]}>Column 1</Text>
//               <Text style={[styles.cell, styles.headerCell]}>Column 2</Text>
//               <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>
//               <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>
//               <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>
//               <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>

//               <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>

//               <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>
//               <Text style={[styles.cell, styles.headerCell]}>Column 3</Text>


//             </View>
//             <View style={styles.row}>
//               <Text style={styles.cell}>Data 1</Text>
//               <Text style={styles.cell}>Data 2</Text>
//               <Text style={styles.cell}>Data 3</Text>
//             </View>
//             <View style={styles.row}>
//               <Text style={styles.cell}>Data 4</Text>
//               <Text style={styles.cell}>Data 5</Text>
//               <Text style={styles.cell}>Data 6</Text>
//             </View>
//           </View>
//         </ScrollView> */}
//       </View>
//     </SafeAreaView >
//   )
// }

// export default LalKitabDetail

// const styles = StyleSheet.create({
//   style: {
//     backgroundColor: '#FFFFFF',
//   },
//   labelStyle: {
//     fontSize: 16,
//     fontFamily: 'AvenirLTStd-Heavy',
//     color: '#333333',
//     textTransform: 'capitalize',
//     marginHorizontal: 15,
//   },
//   indicatorStyle: {
//     backgroundColor: '#FFCC80',
//     height: 3,
//   },
//   container: {
//     borderWidth: 1,
//     borderColor: 'black',
//     margin: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: 'gray',
//   },
//   headerRow: {
//     backgroundColor: '#f2f2f2',
//     borderTopWidth: 1,
//   },
//   cell: {
//     flex: 1,
//     padding: 10,
//     textAlign: 'center',
//     borderRightWidth: 1, // Add border to the right of each cell
//     borderColor: 'gray', // Border color
//     color: 'black'
//   },
//   headerCell: {
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 15,
//     fontFamily: 'AvenirLTStd-Heavy',
//     color: '#1E1F20',
//   }
// })


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
import moment from 'moment';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import LalKitabKundliChart from './component/LalKitab/LalKitabKundliChart';

const LalKitabDetail = ({ navigation }) => {
  const window = Dimensions.get('window');
  const { width, height } = Dimensions.get('window');
  const { _customlang, _kundali, _onlinejyotish } = stringsoflanguages

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <View style={{ flex: 1, }}>
            <LalKitabKundliChart />
          </View>
        )
      case 'second':
        return (
          <View style={{ flex: 1, }}>

          </View>
        )

    }
  }

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: "Kundli" },
    { key: 'second', title: "Lal Kitab Chandra Kundli" },

  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFCC80" />
      <Header
        menuOption={() => navigation.goBack()}
        leftIcon={require('../assets/backtoback.png')}
        title={_onlinejyotish.lal}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            style={styles.style}
            labelStyle={styles.labelStyle}
            scrollEnabled={true}
            tabStyle={{ height: 50, width: 'auto' }}
            activeColor={'#FFCC80'}
            inactiveColor={'#333333'}
            inactiveOpacity={0.5}
            {...props}
            indicatorStyle={styles.indicatorStyle}
          />
        )}
      />

    </SafeAreaView >
  )
}

export default LalKitabDetail

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
})


