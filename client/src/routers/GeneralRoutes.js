import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LoginScreen from "pages/auth/LoginScreen";
import Header from "components/Header/Header";
import NavBar from "components/NavBar/NavBar";
import Dashboard from "pages/Dashboard";
import Cohortes from "pages/admin/Cohortes";
import CohortesDetail from "pages/admin/cohortesDetail";
import CohortesDetailAlumno from "pages/alumnos/cohortesDetailAlumno";
import useStyles from "./GeneralRoutes.styles";
import Alumns from "pages/admin/Alumns";
import Instructors from "pages/admin/Instructors";
import PM from "pages/admin/PM";
import RegisterScreen from "pages/auth/RegisterScreen";
import Profile from "pages/Profile/Profile";
import GroupStudent from "pages/alumnos/components/GroupStudent";
import ModuleScreen from "pages/admin/ModuleScreen";
import ContentsScreen from "pages/admin/ContentsScreen";
import ContentDetail from "pages/admin/ContentDetail";
import InstructorCohortes from "pages/admin/InstructorCohortes";
import GroupStudentPP from "pages/alumnos/components/GroupStudentPP";
import Group from "pages/admin/Group"
import { Post } from "pages/Posts/Post";
import ModuleStudent from "pages/alumnos/components/modules";
import ContentsModule from "pages/alumnos/components/contentModule";
import ContentDetailStudent from "pages/alumnos/components/ContentStudentDetail";


const GeneralRoutes = () => {
  const { authenticated, user } = useSelector((state) => state.auth);
  const { push } = useHistory();
  const [show, setShow] = useState(false);
  const isSignInPath = useRouteMatch("/auth/signin");
  const isSignUpPath = useRouteMatch("/auth/signup");
  const classes = useStyles(show);

  useEffect(() => {
    if (isSignInPath && JSON.parse(localStorage.getItem("token"))) push("/");
    else if (isSignUpPath && JSON.parse(localStorage.getItem("token")))
      push("/");
    else if (
      !JSON.parse(localStorage.getItem("token")) &&
      !(isSignInPath || isSignUpPath)
    )
      push("/auth/signin");
  }, [authenticated, isSignInPath, isSignUpPath, push]);

  return (
    <>
      {user && (
        <>
          <Header handleShowMenu={() => setShow(!show)} />
          <NavBar show={show} />{" "}
        </>
      )}

      <div className={classes.content}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/admin/cohortes" component={Cohortes} />
          <Route exact path="/admin/cohorte/:id" component={CohortesDetail} />
          <Route exact path="/admin/instructors" component={Instructors} />
          <Route exact path="/admin/modules" component={ModuleScreen} />
          <Route exact path="/admin/modules/:id" component={ContentsScreen} />
          <Route exact path="/admin/pm" component={PM} />
          <Route exact path="/admin/alumns" component={Alumns} />
          <Route exact path="/admin/group/:id" component={Group} />
          <Route exact path="/admin/instructor/:id/cohortes" component={InstructorCohortes} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route path="/auth/signin" component={LoginScreen} />
          <Route path="/auth/signup" component={RegisterScreen} />
          <Route
            exact
            path="/student/cohorte/:id"
            component={CohortesDetailAlumno}
          />
          <Route
            exact
            path="/admin/modules/content/:id"
            component={ContentDetail}
          />
          <Route exact path="/student/groups" component={GroupStudent} />
          <Route exact path="/group/:id/posts" component={Post} />
          <Route exact path="/student/modules/" component={ModuleStudent} />
          <Route exact path="/student/modules/:id" component={ContentsModule} />
          <Route exact path="/student/groups/:id" component={GroupStudentPP} />
          <Route exact path="/student/modules/content/:id" component={ContentDetailStudent}/>
        </Switch>
      </div>
    </>
  );
};

export default GeneralRoutes;
