/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, Fragment} from 'react';
 import AppNavigation from './src/navigation/MainStackNavigation';
 import { ThingsProvider } from './src/contexts/DetailedItem';

//  import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <Fragment>
      {/* <SafeAreaProvider> */}
      <ThingsProvider>
        <AppNavigation />
      </ThingsProvider>
      {/* </SafeAreaProvider> */}
    </Fragment>
  );
}


export default App;
