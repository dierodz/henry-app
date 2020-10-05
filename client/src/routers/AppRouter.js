import { BrowserRouter as Router, Route } from "react-router-dom";
import { Admin } from "pages/admin";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signInWithToken, initialize } from "dispatchers/auth";

const AppRouter = () => {
   const dispatch = useDispatch();
   const { authenticated } = useSelector((state) => state.auth);
   const [checking, setChecking] = useState(true);
   const localToken = JSON.parse(localStorage.getItem("token"));

   useEffect(() => {
      if (localToken) {
         initialize();
         dispatch(signInWithToken(localToken));
      }
      setChecking(false);
   }, [localToken, dispatch]);

   if (checking) {
      return <h1>Please Wait...</h1>;
   }

   return (
      <Router>
         {/* <Route path="/" render={() => <Header />} />
         <Route path="/" exact={true} render={() => <HomeScreen />} />
         <Route path="/user" exact={true} render={() => <UserScreen />} />
         <Route path="/cohortes" exact={true} render={() => <TabCohortes />} /> */}
         {/* <div>
            <Switch>
               <PublicRoutes
                  component={AuthRouter}
                  isAuthenticated={authenticated}
                  path="/auth"
                  redirectTo="/user"
               />
               <PrivateRoutes
                  component={GeneralRoutes}
                  isAuthenticated={authenticated}
                  path="/"
                  redirectTo="/auth"
               ></PrivateRoutes>
               <Redirect to="/" />
            </Switch>
         </div> */}
         <Route path={'/admin'} component={Admin} />
      </Router>
   );
};

export default AppRouter;
