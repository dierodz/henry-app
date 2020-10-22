import React, { useMemo } from "react";
import { Divider, Drawer, List } from "@material-ui/core";
import {
  AssignmentIndRounded,
  ClassRounded,
  DashboardRounded,
  EmojiPeopleRounded,
  RecordVoiceOverRounded,
} from "@material-ui/icons";

import ViewComfyRoundedIcon from "@material-ui/icons/ViewComfyRounded";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

import "../../styles/components/NavBar.scss";
import useStyles from "./NavBar.styles";
import NavBarItem from "./NavBar.Item";
import { useSelector } from "react-redux";

function NavBar({ show, children }) {
  const classes = useStyles(show);
  const { user } = useSelector((state) => state.auth);

  const classShow = useMemo(
    () => (show ? classes.drawerOpen : classes.drawerClose),
    [show, classes]
  );

  return (
    <Drawer
      open={true}
      variant="persistent"
      anchor="left"
      className={[classes.drawer, classShow].join("")}
      classes={{
        paper: [classShow, classes.drawerPaper].join(" "),
      }}
    >
      <List>
        {user && user.roles.find((role) => role.name !== "student") && (
          <>
            <NavBarItem
              title="Dashboard"
              icon={DashboardRounded}
              to="/"
              exact
            />
            <NavBarItem
              title="Cohortes"
              icon={ClassRounded}
              to="/admin/cohortes"
            />
            <NavBarItem
              title="Instructores"
              icon={AssignmentIndRounded}
              to="/admin/instructors"
            />
            <NavBarItem
              title="PM"
              icon={RecordVoiceOverRounded}
              to="/admin/pm"
            />
            <NavBarItem
              title="Alumnos"
              icon={EmojiPeopleRounded}
              to="/admin/alumns"
            />
            <NavBarItem
              title="Modulos"
              icon={ViewComfyRoundedIcon}
              to="/admin/modules"
            />

            <Divider />
            <Divider />

            {user && user.roles.find((role) => role.name === "student") && (
              <>
                <NavBarItem
                  title="Cohortes"
                  icon={ClassRounded}
                  to={
                    user.cohortes.length > 0 &&
                    `/student/cohorte/${user.cohortes[0].id}`
                  }
                />
                <NavBarItem
                  title="Modulos"
                  icon={AssignmentIndRounded}
                  to="/student/modules"
                />
                <NavBarItem
                  title="Grupos"
                  icon={GroupWorkIcon}
                  to="/student/groups"
                />
              </>
            )}
          </>
        )}
      </List>
    </Drawer>
  );
}

export default NavBar;
