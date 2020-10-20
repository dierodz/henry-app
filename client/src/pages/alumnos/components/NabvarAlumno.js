import React, { useMemo } from "react";
import {useSelector} from "react-redux";
import { Drawer, List } from '@material-ui/core'
import { AssignmentIndRounded, ClassRounded, DashboardRounded, EmojiPeopleRounded, RecordVoiceOverRounded } from '@material-ui/icons';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import "styles/components/NavBar.scss";
import useStyles from "components/NavBar/NavBar.styles";
import NavBarItem from "components/NavBar/NavBar.Item";

function NavBarAlumno({ show, children }) {
   const { authenticated, user } = useSelector((state) => state.auth);
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
         <NavBarItem title="Cohortes" icon={ClassRounded} to={`/student/cohorte/${user.cohortes[0].id}`} />
         <NavBarItem title="Modulos" icon={AssignmentIndRounded} to="/student/modules" />
         <NavBarItem title="Grupos" icon={GroupWorkIcon} to="/student/groups" />
      </List>
   </Drawer>;
}

export default NavBarAlumno;
