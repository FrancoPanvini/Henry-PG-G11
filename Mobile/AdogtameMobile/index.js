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
      fourtyLight: "#5a889b",
      fourty: "#316B83",
      fourtyDark: "#275568",
      thirtyLight: "#8a9bad",
      thirty: "#6D8299",
      thirtyDark: "#57687a",
      primaryLight: "#f7c380",
      primary: "#f5b461",
      primaryDark: "#dca257",
      secondaryLight: "#e1d2d2",
      secondary: "#D5BFBF",
      secondaryDark: "#caabab",
      facebook: '#4267B2',
      donations: '#D4AF37 ',
      instagram: '#405DE6',
      attention: '#C84B31',
      attentionLight: '#de8775',
      accent: 'red',
      background: 'white',
      surface: '#000000',
      backdrop : '#000000',
    },
  };

export default function Main() {
  return (
    <GlobalProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer >
            <App/>
          </NavigationContainer>
        </PaperProvider>
    </GlobalProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);