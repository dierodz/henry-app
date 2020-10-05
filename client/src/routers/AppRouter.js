import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signInWithToken, initialize } from "dispatchers/auth";
import PrivateRoutes from "./PrivateRoutes";
import AuthRouter from "./AuthRouter";
import { Admin } from "pages/admin";
import LoginScreen from "pages/auth/LoginScreen";
import Header from "components/Header/Header";
import NavBar from "components/NavBar/NavBar";
import GeneralRoutes from "./GeneralRoutes";

const AppRouter = () => {
   const dispatch = useDispatch();
   const [checking, setChecking] = useState(true);
   const localToken = JSON.parse(localStorage.getItem("token"));

   useEffect(() => {
      if (localToken) {
         initialize();
         dispatch(signInWithToken(localToken));
      }
      setChecking(false);
   }, [localToken, dispatch]);

   if (checking) {
      return <h1>Please Wait...</h1>;
   }

   return (
      <Router>
         <GeneralRoutes />
      </Router>
   );
};

export default AppRouter;
