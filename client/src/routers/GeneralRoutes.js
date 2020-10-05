import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LoginScreen from "pages/auth/LoginScreen";
import Header from "components/Header/Header";
import NavBar from "components/NavBar/NavBar";
import Dashboard from "pages/Dashboard";

const GeneralRoutes = () => {
   const { authenticated, user } = useSelector((state) => state.auth);
   const { push } = useHistory()
   const [show, setShow] = useState(false)
   const isSignInPath = useRouteMatch('/auth/signin')
   useEffect(() => {
      if (isSignInPath && authenticated) push('/')
      else if (authenticated === false) push('/auth/signin')
   }, [authenticated, isSignInPath, push])

   return (
      <>
         {user &&
            <>
               <Header handleShowMenu={() => setShow(!show)} />
               <NavBar show={show} />
            </>
         }
         <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/auth/signin" component={LoginScreen} />
         </Switch>
      </>
   );
};

export default GeneralRoutes;
