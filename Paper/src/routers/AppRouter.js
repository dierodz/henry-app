/* eslint-disable react/prop-types */
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerLayout from "../components/DrawerLayout/DrawerLayout";
// import DrawerLayout from "./src/components/DrawerLayout/DrawerLayout";
import HomeScreen from "../screens/LoginScreen/LoginScreen";
import SignUp from "../screens/SignUp/SignUp";
import Settings from "../screens/Settings/Settings";
import Cohorte from "../screens/Cohorte/Cohorte";
import Pm from "../screens/Pm/Pm";
import Grupos from "../screens/Grupos/Grupos";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();
const LogInStack = createStackNavigator();

const AppRouter = ({ handleTheme }) => {
  const { authenticated } = useSelector((state) => state.auth);

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
