import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
  } from "@react-navigation/native";
  import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
  } from "react-native-paper";

export const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors,
           primary:"#ffff01"
  },
  };
export const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors:{
      ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
        primary:"#0e0e0e",
    }
  };