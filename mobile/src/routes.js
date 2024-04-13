import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="DevRadar" 
        component={Main} />
      <Stack.Screen 
        name="Perfil no GitHub" 
        component={Profile} />
    </Stack.Navigator>
  );
}

export default Routes;

