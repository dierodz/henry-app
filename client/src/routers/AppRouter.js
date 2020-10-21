import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signInWithToken, initialize } from "dispatchers/auth";
import GeneralRoutes from "./GeneralRoutes";
import Loading from "components/Loading/index";
import { finishLoading } from "actions/ui";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const localToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (localToken) {
      initialize();
      dispatch(signInWithToken(localToken));
    } else {
      dispatch(finishLoading());
    }
  }, [localToken, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <GeneralRoutes />
    </Router>
  );
};

export default AppRouter;
