import React, { useMemo } from "react";
import { Drawer, List } from '@material-ui/core'
import {AssignmentIndRounded, ClassRounded, DashboardRounded, EmojiPeopleRounded, RecordVoiceOverRounded, } from '@material-ui/icons';

import ViewComfyRoundedIcon from '@material-ui/icons/ViewComfyRounded';

import "../../styles/components/NavBar.scss";
import useStyles from "./NavBar.styles";
import NavBarItem from "./NavBar.Item";

function NavBar({ show, children }) {
   const classes = useStyles(show)
   const classShow = useMemo(() => show ? classes.drawerOpen : classes.drawerClose, [show, classes])
   return <Drawer
      open={true}
      variant="persistent"
      anchor="left"
      className={[classes.drawer, classShow].join('')}
      classes={{
         paper: [classShow, classes.drawerPaper].join(' ')
      }}
   >
      <List>
         <NavBarItem title="Dashboard" icon={DashboardRounded} to="/" exact />
         <NavBarItem title="Cohortes" icon={ClassRounded} to="/admin/cohortes" />
         <NavBarItem title="Instructores" icon={AssignmentIndRounded} to="/admin/instructors" />
         <NavBarItem title="PM" icon={RecordVoiceOverRounded} to="/admin/pm" />
         <NavBarItem title="Alumnos" icon={EmojiPeopleRounded} to="/admin/alumns" />
         <NavBarItem title="Modulos" icon={ViewComfyRoundedIcon} to="/admin/modules" />
      </List>
   </Drawer>;
}

export default NavBar;
