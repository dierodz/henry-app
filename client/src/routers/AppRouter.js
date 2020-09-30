// import { useUser } from "hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PublicRoutes from "./PublicRoutes";
import { startSignInWithToken } from "dispatchers/authDispatch";

const AppRouter = () => {
   const dispatch = useDispatch();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const { authenticated } = useSelector((state) => state.auth);
   const token = localStorage.getItem("userToken");

   useEffect(() => {
      if (authenticated) {
         setIsLoggedIn(true);
      } else {
         setIsLoggedIn(false);
      }
   }, [authenticated]);

   useEffect(() => {
      if (token) {
         dispatch(startSignInWithToken(token));
      }
   }, [dispatch, token]);

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
