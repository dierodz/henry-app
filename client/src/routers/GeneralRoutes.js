import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LoginScreen from "pages/auth/LoginScreen";
import Header from "components/Header/Header";
import NavBar from "components/NavBar/NavBar";
import Dashboard from "pages/Dashboard";
import Cohortes from "pages/admin/Cohortes";
import useStyles from "./GeneralRoutes.styles";
import Alumns from "pages/admin/Alumns";
import Instructors from "pages/admin/Instructors";
import PM from "pages/admin/PM";

const GeneralRoutes = () => {
   const { authenticated, user } = useSelector((state) => state.auth);
   const { push } = useHistory()
   const [show, setShow] = useState(false)
   const isSignInPath = useRouteMatch('/auth/signin')
   const classes = useStyles(show)
   useEffect(() => {
      if (isSignInPath && authenticated) push('/')
      else if (!isSignInPath && authenticated === false) push('/auth/signin')
   }, [authenticated, isSignInPath, push])

   return (
      <>
         {user &&
            <>
               <Header handleShowMenu={() => setShow(!show)} />
               <NavBar show={show} />
            </>
         }
         <div className={classes.content}>
            <Switch>
               <Route exact path="/" component={Dashboard} />
               <Route exact path="/admin/cohortes" component={Cohortes} />
               <Route exact path="/admin/instructors" component={Instructors} />
               <Route exact path="/admin/pm" component={PM} />
               <Route exact path="/admin/alumns" component={Alumns} />
               <Route path="/auth/signin" component={LoginScreen} />
            </Switch>
         </div>
      </>
   );
};

export default GeneralRoutes;
