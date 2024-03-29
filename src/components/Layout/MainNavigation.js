import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import HeaderContext from "../../store/HeaderContext";

const MainNavigation = () => {
  const ctx = useContext(HeaderContext);
  const logoutHandler = () => {
    ctx.removeToken();
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
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
