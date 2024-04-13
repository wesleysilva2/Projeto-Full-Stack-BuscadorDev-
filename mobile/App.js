// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import Routes from './src/routes';


function App() {
  {/* Usa o componente Routes como o ponto de entrada das rotas */}
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#f4511e" />
      <Routes />
    </NavigationContainer>
  );
}

export default App;

