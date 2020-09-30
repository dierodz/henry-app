import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PublicRoutes from "./PublicRoutes";
import { useUser } from "hooks";
import { logout } from "actions/auth";

const AppRouter = () => {
   const dispatch = useDispatch();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const { authenticated } = useSelector((state) => state.auth);
   const { initialize, signInWithToken, localUser } = useUser();

   useEffect(() => {
      if (authenticated) {
         setIsLoggedIn(true);
      } else {
         setIsLoggedIn(false);
      }
   }, [authenticated]);

   useEffect(() => {
      if (localUser && localUser.token) {
         initialize(localUser);
         dispatch(signInWithToken(localUser.token));
      } else {
         initialize();
         dispatch(logout());
      }
   }, [dispatch, localUser, signInWithToken, initialize]);

   return (
      <Router>
         <div>
            <Switch>
               <PublicRoutes
                  // Cambiar, luego, el false por una variable de autenticación
                  component={AuthRouter}
                  isAuthenticated={isLoggedIn}
                  path="/auth"
                  redirectTo="/"
               />
            </Switch>
         </div>
      </Router>
   );
};

export default AppRouter;
