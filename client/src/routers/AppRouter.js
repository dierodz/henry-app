import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PublicRoutes from "./PublicRoutes";
import GeneralRoutes from "./GeneralRoutes";
import { signInWithToken, initialize } from "dispatchers/auth";
import PrivateRoutes from "./PrivateRoutes";

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
         <div>
            <Switch>
               <PublicRoutes
                  component={AuthRouter}
                  isAuthenticated={authenticated}
                  path="/auth"
                  redirectTo="/user"
               />
               <PrivateRoutes
                  component={GeneralRoutes}
                  isAuthenticated={authenticated}
                  path="/"
                  redirectTo="/auth"
               ></PrivateRoutes>
               <Redirect to="/" />
            </Switch>
         </div>
      </Router>
   );
};

export default AppRouter;
