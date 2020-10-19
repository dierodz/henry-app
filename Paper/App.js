import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

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

import DrawerLayout from './src/components/DrawerLayout/DrawerLayout'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import SignUp from './src/screens/SignUp/SignUp'
import Settings from './src/screens/Settings/Settings'
import Cohorte from './src/screens/Cohorte/Cohorte'
import Pm from './src/screens/Pm/Pm'
import Grupos from './src/screens/Grupos/Grupos'


const Drawer = createDrawerNavigator();

const LogInStack = createStackNavigator()



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
          <Drawer.Navigator  drawerContent={props=><DrawerLayout {...props} handleTheme={handleTheme} />} initialRouteName="Cohorte">
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Cohorte" component={Cohorte} />
          <Drawer.Screen name="Pm" component={Pm} />
          <Drawer.Screen name="Grupos" component={Grupos} />
          </Drawer.Navigator>
          :
          <LogInStack.Navigator headerMode='none'>
              <LogInStack.Screen name="Home" component={HomeScreen}/>
              <LogInStack.Screen name="SignUp" component={SignUp}/>
          </LogInStack.Navigator>
        }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}