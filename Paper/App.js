import React from "react";
import { Provider } from "react-redux";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import AppRouter from "./src/routes/AppRouter";
import store from "./src/store/store";

import {StatusBar} from "react-native";


const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors,
         primary:"#ffff01"
},
};
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors:{
    ...PaperDefaultTheme.colors,
  ...NavigationDefaultTheme.colors,
      primary:"#0e0e0e",
  }
};

export const AuthContext = React.createContext();
export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  const handleTheme = () => {
    setIsDarkTheme((isDark) => !isDark);
  };

  return (
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
  );
}
