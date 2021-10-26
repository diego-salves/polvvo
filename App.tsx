import React from 'react';
import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold
} from '@expo-google-fonts/inter';
//import {
//  Nunito_400Regular,
//  Nunito_700Bold,
//} from '@expo-google-fonts/nunito';

import theme, {} from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes'


export default function App() {
  const [fontsLoaded] = useFonts ({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}
