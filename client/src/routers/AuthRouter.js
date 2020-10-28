import LoginScreen from "pages/auth/LoginScreen";
import RegisterScreen from "pages/auth/RegisterScreen";
//import RegisterScreen from "pages/auth/RegisterScreen";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route path="/auth/signin" exact component={LoginScreen}></Route>
          <Route path="/auth/register" exact component={RegisterScreen}></Route>
          <Redirect to="/auth/signin" />
        </Switch>
      </div>
    </div>
  );
};

export default AuthRouter;
