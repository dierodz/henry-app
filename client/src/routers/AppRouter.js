import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signInWithToken, initialize } from "dispatchers/auth";
import PrivateRoutes from "./PrivateRoutes";
import AuthRouter from "./AuthRouter";
import { Admin } from "pages/admin";
import LoginScreen from "pages/auth/LoginScreen";

const AppRouter = () => {
   const dispatch = useDispatch();
   const { authenticated } = useSelector((state) => state.auth);
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
         <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/auth/signin" component={LoginScreen} />
         </Switch>
      </Router>
   );
};

export default AppRouter;
