import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        height: '90%',
        zIndex: 1,
        top: 100,
      }}>
      <View>
        <ActivityIndicator
          style={{marginTop: 30}}
          animating={true}
          size="large"
          color="#FFCC80"
        />
      </View>
    </View>
  );
};
export default Loader;
