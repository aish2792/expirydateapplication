/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// Redux
import {Provider} from 'react-redux';
import store from './redux/store';



import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Navigation from './navigation/Navigation'

const App = () => {
  console.log("Hey yo")
  return (
    <>
      {/* <StatusBar barStyle="dark-content" />
      <Navigation /> */}
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Navigation />
    </Provider>
      
      
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