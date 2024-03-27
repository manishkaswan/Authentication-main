import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext, useState } from "react";
import HeaderContext from "../../store/HeaderContext";
import AuthForm from "../Auth/AuthForm";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const MainNavigation = () => {
 const[logout,setLogout]= useState(false)
  const ctx = useContext(HeaderContext);
  const logoutHandler = () => {
    ctx.removeToken();
    setLogout(true)
    
  };
  return (
    
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!ctx.token?<li>
            <Link to="/auth">Login</Link>
          </li>:""}
          {ctx.token?<li>
            <Link to="/profile">Profile</Link>
          </li>:""}
          
          {ctx.token ? (
          
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          ) : (
            ""
          )}
          {logout?<Redirect to="/auth"></Redirect>:""}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
