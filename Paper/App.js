import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { View, ActivityIndicator } from 'react-native';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';

import LogRoutes from "./src/routes/LogRoutes/LogRoutes";
import DrawerRoutes from "./src/routes/DrawerRoutes/DrawerRoutes"

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
  function handleTheme() {
    setIsDarkTheme(isDark => !isDark);
  }

  const initialState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (state, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...state,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...state,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...state  ,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialState);

  const authContext = React.useMemo(() => ({
    signIn: async(User) => {    
      try {
        await AsyncStorage.setItem('user', User);
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', user: User, token: User });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('user');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      console.log("out")
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        User = await AsyncStorage.getItem('user');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: User });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme} >
        { loginState.userToken !== null?
          <DrawerRoutes handleTheme={handleTheme}/>
          :
          <LogRoutes/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}