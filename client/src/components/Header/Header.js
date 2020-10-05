import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import "../../styles/components/Header.scss";
import useStyles from './useStyles';

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "dispatchers/auth";

export default function Header() {
   const dispatch = useDispatch();

   const history = useHistory();
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   const { user } = useSelector((state) => state.auth);

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };

   const menuId = "primary-search-account-menu";
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: "top", horizontal: "right" }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <div className="userMenu">
            <img
               alt="userImg"
               src={user.photoUrl || "/Imagenes/user.png"}
            ></img>
            <p className="userName">
               {user.givenName} {user.familyName}
            </p>
            <button className="perfilBtn" onClick={() => history.push("/user")}>
               Perfil
            </button>
            <button className="logoutBtn" onClick={() => dispatch(signOut())}>
               Cerrar sesión
            </button>
         </div>
      </Menu>
   );

   const mobileMenuId = "primary-search-account-menu-mobile";
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{ vertical: "top", horizontal: "right" }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
               <Badge badgeContent={4} color="secondary">
                  <MailIcon />
               </Badge>
            </IconButton>
            <p>Mensajes</p>
         </MenuItem>
         <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
               <Badge badgeContent={11} color="secondary">
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <p>Notificaciones</p>
         </MenuItem>
         <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
            >
               <AccountCircle />
            </IconButton>
            <p>Perfil</p>
         </MenuItem>
      </Menu>
   );

   return (
      <div className={classes.grow}>
         <AppBar position="static" className={classes.header}>
            <Toolbar>
               <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleShowMenu}
               >
                  <MenuIcon />
               </IconButton>
               <Link to="/">
                  <img alt="logoHenry" src="/Imagenes/logoHenry.png" />
               </Link>
               <div className={classes.grow} />
               <div className={classes.sectionDesktop}>
                  <IconButton aria-label="show 4 new mails" color="inherit">
                     <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                     </Badge>
                  </IconButton>
                  <IconButton
                     aria-label="show 17 new notifications"
                     color="inherit"
                  >
                     <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                     </Badge>
                  </IconButton>
                  <IconButton
                     edge="end"
                     aria-label="account of current user"
                     aria-controls={menuId}
                     aria-haspopup="true"
                     onClick={handleProfileMenuOpen}
                     color="inherit"
                  >
                     <AccountCircle />
                  </IconButton>
               </div>
               <div className={classes.sectionMobile}>
                  <IconButton
                     aria-label="show more"
                     aria-controls={mobileMenuId}
                     aria-haspopup="true"
                     onClick={handleMobileMenuOpen}
                     color="inherit"
                  >
                     <MoreIcon />
                  </IconButton>
               </div>
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
      </div>
   );
}
