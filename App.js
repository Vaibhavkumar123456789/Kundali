import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, Linking, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import StackNavigator from './src/Navigator/StackNavigator';
import store from './src/redux/store';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { Provider } from 'react-redux';
LogBox.ignoreAllLogs();

const App = () => {

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
      }
    });

  }, [])

  return (

    <Provider store={store}>
      <StackNavigator />
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({})
