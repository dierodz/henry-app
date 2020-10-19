import React from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
// import AsyncStorage from "@react-native-community/async-storage";

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
import AppRouter from "./src/routers/AppRouter";

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors },
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
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
      <Provider store={store}>
        <NavigationContainer theme={theme}>
          <AppRouter handleTheme={handleTheme} />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
