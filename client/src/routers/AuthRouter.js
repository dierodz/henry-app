  
import LoginScreen from "pages/auth/LoginScreen";
import RegisterScreen from "pages/auth/RegisterScreen";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container" >
                <Switch>
                  {/* AQUÍ IRIÍAN LAS RUTAS */}
                    <Route path="/auth/login" component={LoginScreen}></Route>
                    <Route
                        path="/auth/register"
                        component={RegisterScreen}
                    ></Route>
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    );
};

export default AuthRouter;