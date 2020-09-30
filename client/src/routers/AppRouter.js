import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PublicRoutes from "./PublicRoutes";
import HomeScreen from "../pages/home/HomeScreen.js";
import Header from "../components/Header/Header.js";

const AppRouter = () => {
   return (
      <Router>
         <Route path="/" render={() => <Header />} />
         <Route path="/" exact={true} render={() => <HomeScreen />} />
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
