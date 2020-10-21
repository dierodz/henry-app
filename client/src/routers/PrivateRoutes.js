import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

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
  localStorage.setItem("lastPath", rest.path);
  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoutes;
