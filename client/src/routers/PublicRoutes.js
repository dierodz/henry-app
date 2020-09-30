import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

/*
 ! Este un componente de rutas - (Especial para auth).
 * Recibe un argumento isValid (bool) 
 *  si es false, renderizará el componente, de lo contrario redirige a otro componente
 *  Recibe el componente principal como component
 *  Recibe la el componente de redireccionamiento en redirectTo
*/

const PublicRoutes = ({
  isAuthenticated,
  component: Component,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

PublicRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PublicRoutes;
