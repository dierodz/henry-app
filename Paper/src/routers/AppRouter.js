/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import DrawerLayout from "../components/drawerLayout/DrawerLayout";
import HomeScreen from "../screens/LoginScreen/LoginScreen";
import SignUp from "../screens/SignUp/SignUp";
import Settings from "../screens/Settings/Settings";
import Cohorte from "../screens/Cohorte/Cohorte";
import Pm from "../screens/Pm/Pm";
import Grupos from "../screens/Grupos/Grupos";

import { signInWithToken, initialize, signOut } from "../dispatchers/auth";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();
const LogInStack = createStackNavigator();

const AppRouter = ({ handleTheme }) => {
  const dispatch = useDispatch();

  const { authenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(signInWithToken(token));
        initialize(token);
      } else {
        dispatch(signOut());
      }
    }, 1000);
  }, []);

  if (loading) {
    return <Text> Loading </Text>;
  }

  return (
    <>
      {authenticated ? (
        <Drawer.Navigator
          drawerContent={(props) => (
            <DrawerLayout {...props} handleTheme={handleTheme} />
          )}
          initialRouteName="Cohorte"
        >
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Cohorte" component={Cohorte} />
          <Drawer.Screen name="Pm" component={Pm} />
          <Drawer.Screen name="Grupos" component={Grupos} />
        </Drawer.Navigator>
      ) : (
        <LogInStack.Navigator headerMode="none">
          <LogInStack.Screen name="Home" component={HomeScreen} />
          <LogInStack.Screen name="SignUp" component={SignUp} />
        </LogInStack.Navigator>
      )}
    </>
  );
};

export default AppRouter;
