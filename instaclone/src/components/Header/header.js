import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"
const Header = () => {
   const navigate = useNavigate('/')
   const handleRoute = (path) => {
      switch (path) {
         case "Logout":
            localStorage.clear()
            navigate("/login")
            break;
         case "User":
            navigate("/user")
            break;
         case "Home":
            navigate("/posts")
            break;
         case "Upload":
            navigate("/upload")
            break;
      }
   }

   return (
      <>
         <div class="navigation">
            <div class="logo">
               <a class="no-underline" style={{ cursor: "pointer" }} onClick={() => handleRoute("Home")}>
                  Instagram
               </a>
            </div>
            <div class="navigation-search-container">
               <i class="fa fa-search"></i>
               <input class="search-field" type="text" placeholder="Search" />
               <div class="search-container">
                  <div class="search-container-box">
                     <div class="search-results">
                     </div>
                  </div>
               </div>
            </div>
            <div class="navigation-icons">
               <a class="navigation-link" style={{ cursor: "pointer" }} onClick={() => handleRoute("Upload")}>
                  <i class="far fa-image"></i>
               </a>
               <a class="navigation-link notifica">
                  <i class="far fa-heart">

                  </i>
               </a>
               <a class="navigation-link" style={{ cursor: "pointer" }} onClick={() => handleRoute("User")}>
                  <i class="far fa-user-circle"></i>
               </a>
               <a id="signout" class="navigation-link" style={{ cursor: "pointer" }} onClick={() => handleRoute("Logout")}>
                  <i class="fas fa-sign-out-alt"></i>
               </a>
            </div>
         </div>
      </>
   )
}

export default Header
