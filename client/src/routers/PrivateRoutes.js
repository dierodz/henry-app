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
  isValid,
  component: Component,
  redirectTo,
  ...rest
}) => {

  localStorage.setItem("lastPath", rest.location.pathname);

  return (
    <Route
      {...rest}
      component={(props) =>
        isValid ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
};

PrivateRoutes.propTypes = {
  isValid: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoutes;
