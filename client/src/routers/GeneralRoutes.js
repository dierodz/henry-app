import React from "react";
import Header from "components/Header/Header";
import HomeScreen from "pages/home/HomeScreen";
import UserScreen from "pages/user/UserScreen";
import TabCohortes from "../components/TabCohortes/TabCohortes.js";
import { Route } from "react-router-dom";
import { Switch } from "@material-ui/core";

const GeneralRoutes = () => {
   return (
      <div>
         <Header />
         <Switch>
            <Route path="/" exact render={() => <HomeScreen />} />
            <Route path="/user" exact render={() => <UserScreen />} />
            <Route path="/cohortes" exact>
               <TabCohortes />
            </Route>
         </Switch>
      </div>
   );
};

export default GeneralRoutes;
