import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import GlobalProvider from './src/context/Provider'




const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FFFF01',
      accent: 'yellow',
      background: 'white',
      surface: '#000000',
      backdrop : '#000000',
    },
  };

export default function Main() {
  return (
    <GlobalProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <App/>
          </NavigationContainer>
        </PaperProvider>
    </GlobalProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);