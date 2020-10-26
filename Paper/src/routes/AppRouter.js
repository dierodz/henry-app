import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import { signInWithToken, initialize, signOut } from "../dispatchers/auth";
import DrawerRoutes from "./DrawerRoutes/DrawerRoutes";
import LogRoutes from "./LogRoutes/LogRoutes";

import LoadingScreen from "../components/Loading/Loading"



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
    return   <LoadingScreen />
    ;
  }

  return (
    <>
      {authenticated ? (
        <DrawerRoutes handleTheme={handleTheme} />
      ) : (
        <LogRoutes />
      )}
    </>
  );
};

export default AppRouter;
