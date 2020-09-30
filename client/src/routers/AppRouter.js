import { useUser } from "hooks";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PublicRoutes from "./PublicRoutes";
import HomeScreen from "../pages/home/HomeScreen.js";
import UserScreen from "../pages/user/UserScreen";
import Header from "../components/Header/Header.js";

const AppRouter = () => {
  const { initialize } = useUser()
  initialize()
   return (
      <Router>
         <Route path="/" render={() => <Header />} />
         <Route path="/" exact={true} render={() => <HomeScreen />} />
         <Route path="/user" exact={true} render={() => <UserScreen />} />
         <div>
            <Switch>
               <PublicRoutes
                  // Cambiar, luego, el false por una variable de autenticación
                  component={AuthRouter}
                  isAuthenticated={false}
                  path="/auth"
                  redirectTo="/"
               />
            </Switch>
         </div>
      </Router>
   );
};

export default AppRouter;
