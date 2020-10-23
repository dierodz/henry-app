import { BrowserRouter as Router } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { signInWithToken, initialize } from "dispatchers/auth";
import GeneralRoutes from "./GeneralRoutes";
import Loading from "components/Loading";

const AppRouter = () => {
  const dispatch = useDispatch();
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
    return <Loading></Loading>
  }

  return (
    <Router>
      <GeneralRoutes />
    </Router>
  );
};

export default AppRouter;
