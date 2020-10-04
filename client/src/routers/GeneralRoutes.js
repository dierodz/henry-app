import React from "react";
import Header from "components/Header/Header";
import TabCohortes from "../components/TabCohortes/TabCohortes.js";
import { Redirect, Route, Switch } from "react-router-dom";
import VerticalTabs from "pages/user/UserScreen";
import HomeScreen from "pages/home/HomeScreen.js";

const GeneralRoutes = () => {
   return (
      <div>
         <Header />
         <Switch>
            {/* AQUÍ IRIÍAN LAS RUTAS */}
            <Route path="/" exact component={HomeScreen}></Route>
            <Route path="/user" exact component={VerticalTabs}></Route>
            <Route path="/cohortes" exact component={TabCohortes}></Route>
            <Redirect to="/" />
         </Switch>
      </div>
   );
};

export default GeneralRoutes;
