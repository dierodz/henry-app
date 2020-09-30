import { useUser } from "hooks";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
  const { initialize } = useUser()
  initialize()
  return (
    <Router>
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
