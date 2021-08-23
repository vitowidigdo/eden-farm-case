import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../scenes/Home';
import PokemonDetail from '../scenes/PokemonDetail';

const MainStack = createStackNavigator();

function MainStackNavigation(props) {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
        headerTitleStyle: {
          alignSelf: 'center',
          fontSize: 16,
        },
        headerStyle: {
          shadowOpacity: 0.08,
          shadowRadius: 2,
          elevation: 2,
          shadowOffset: {width: 0, height: -1},
        },
        }}>
        <MainStack.Screen
          name="Pokemon Lists"
          options={() => ({
            title: 'Pokemon',
          })}
          component={Home}
        />
        <MainStack.Screen
          name="Pokemon Detail"
          component={PokemonDetail}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
  }
  
  export default MainStackNavigation;
  