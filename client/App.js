/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const App = () => {
  // console.log("Hey yo")
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* <Navigation /> */}
      <View style={styles.container}>
        <Text>Hey, it's working! </Text>
      </View>
      
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
  
});

export default App;