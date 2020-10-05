import { useUser } from "hooks";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Admin } from "pages/admin";

const AppRouter = () => {
   const { initialize } = useUser();
   initialize();
   return (
      <Router>
         {/* <Route path="/" render={() => <Header />} />
         <Route path="/" exact={true} render={() => <HomeScreen />} />
         <Route path="/user" exact={true} render={() => <UserScreen />} />
         <Route path="/cohortes" exact={true} render={() => <TabCohortes />} /> */}
         {/* <div>
            <Switch>
               <PublicRoutes
                  // Cambiar, luego, el false por una variable de autenticación
                  component={AuthRouter}
                  isAuthenticated={false}
                  path="/auth"
                  redirectTo="/"
               />
            </Switch>
         </div> */}
         <Route path={'/admin'} component={Admin} />
      </Router>
   );
};

export default AppRouter;
