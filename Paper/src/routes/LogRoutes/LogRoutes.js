import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../../screens/SignIn/SignIn";
import SignUp from "../../screens/SignUp/SignUp";

const LogInStack = createStackNavigator();

export default function LogRoutes() {
  return (
    <LogInStack.Navigator headerMode="none">
      <LogInStack.Screen name="SignIn" component={SignIn} />
      <LogInStack.Screen name="SignUp" component={SignUp} />
    </LogInStack.Navigator>
  );
}
