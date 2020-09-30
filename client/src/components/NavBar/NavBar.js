import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/NavBar.scss";

function NavBar(props) {
   const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
   };

   return (
      <div className="sidebar">
         <button className="closeButton" onClick={closeMenu}>
            x
         </button>
      </div>
   );
}

export default NavBar;
