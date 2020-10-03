import React from "react";
import Header from "components/Header/Header";
import HomeScreen from "pages/home/HomeScreen";
import UserScreen from "pages/user/UserScreen";
import TabCohortes from "../components/TabCohortes/TabCohortes.js";
import { Route } from "react-router-dom";

const GeneralRoutes = () => {
   return (
      <div>
         <Header />
         <Route path="/" exact render={() => <HomeScreen />} />
         <Route path="/user" exact>
            <UserScreen />
         </Route>
         <Route path="/cohortes" exact>
            <TabCohortes />
         </Route>
      </div>
   );
};

export default GeneralRoutes;
