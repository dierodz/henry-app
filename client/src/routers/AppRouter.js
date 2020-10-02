import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PublicRoutes from "./PublicRoutes";
// import { logout } from "actions/auth";
import GeneralRoutes from "./GeneralRoutes";
import { signInWithToken, initialize } from "dispatchers/auth";

const AppRouter = () => {
   const dispatch = useDispatch();
   const { authenticated, token } = useSelector((state) => state.auth);
   const localToken = JSON.parse(localStorage.getItem("token"));

   useEffect(() => {
      if (localToken) {
         initialize();
         dispatch(signInWithToken(localToken));
      }
   }, [localToken, dispatch, token]);

   return (
      <Router>
import HomeScreen from "../pages/home/HomeScreen.js";
import UserScreen from "../pages/user/UserScreen";
import TabCohortes from "../components/TabCohortes/TabCohortes.js";
import Header from "../components/Header/Header.js";

const AppRouter = () => {
   const { initialize } = useUser();
   initialize();
   return (
      <Router>
         <Route path="/" render={() => <Header />} />
         <Route path="/" exact={true} render={() => <HomeScreen />} />
         <Route path="/user" exact={true} render={() => <UserScreen />} />
         <Route path="/cohortes" exact={true} render={() => <TabCohortes />} />
         <div>
            <Switch>
               <PublicRoutes
                  component={AuthRouter}
                  isAuthenticated={authenticated}
                  path="/auth"
                  redirectTo="/"
               />
               <GeneralRoutes path="/" />
            </Switch>
         </div>
      </Router>
   );
};

export default AppRouter;
