import React from "react";
import { Route } from "react-router-dom";
import { Admin } from "pages/admin";
import LoginScreen from "pages/auth/LoginScreen";

/*
 ! Este un componente de rutas.
 * Recibe un argumento isValid (bool) 
 *  si es true, renderizará el componente, de lo contrario redirige a otro componente
 *  Recibe el componente principal como component
 *  Recibe la el componente de redireccionamiento en redirectTo
*/

const PrivateRoutes = ({
   isAuthenticated,
   component: Component,
   redirectTo,
   ...rest
}) => {
   localStorage.setItem("lastPath", rest.location.pathname);

   if (isAuthenticated) return (
      <>
         <Route path={'/auth/signin'} component={LoginScreen} />
         <Route path={'/admin'} component={Admin} />
      </>
   )
   return <></>
};

export default PrivateRoutes;
