import React from "react";
import Header from "components/Header/Header";
import HomeScreen from "pages/home/HomeScreen";
import UserScreen from "pages/user/UserScreen";
import { Route } from "react-router-dom";
import { Switch } from "@material-ui/core";

const GeneralRoutes = () => {
   return (
      <div>
         <Route path="/" render={() => <Header />} />
         <Route path="/" exact={true} render={() => <HomeScreen />} />
         <Route path="/user" exact={true} render={() => <UserScreen />} />
         <Switch></Switch>
      </div>
   );
};

export default GeneralRoutes;
