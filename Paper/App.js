import React from "react";
import * as ScreenOrientation from 'expo-screen-orientation';

import {NavigationContainer} from "@react-navigation/native";
import AppRouter from "./src/routes/AppRouter";

import { Provider } from "react-redux";
import store from "./src/store/store";

import {Provider as PaperProvider} from "react-native-paper";
import {CombinedDefaultTheme, CombinedDarkTheme} from "./src/components/themes/themes"
import {StatusBar} from "react-native";

import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/client'


export default function App() {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)

  const handleTheme = () => {
    setIsDarkTheme((isDark) => !isDark);
  };

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <StatusBar 
        backgroundColor={isDarkTheme?"black":"white"} 
        barStyle={isDarkTheme?"light-content":"dark-content"} />
        <Provider store={store}>
          <NavigationContainer theme={theme}>
            <AppRouter handleTheme={handleTheme} />
          </NavigationContainer>
        </Provider>
      </PaperProvider>    
    </ApolloProvider>
  );
}
