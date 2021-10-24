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
import { Dashboard } from './src/screens/Dashboard';

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
  
      <Dashboard />

    </ThemeProvider>
  )
}
