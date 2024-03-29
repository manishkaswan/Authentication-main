import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import HeaderContext from "../../store/HeaderContext";
import ProfileForm from "../Profile/ProfileForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setIsLoading] = useState(true);
  const emailAuthRef = useRef();
  const passwordAuthRef = useRef();
  const ctx = useContext(HeaderContext);
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(false);

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxyZXEovyCOyu5YRjRIy0_-MXNNih-Bg0",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailAuthRef.current.value,
            password: passwordAuthRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Authentication failed.");
          }
        })
        .then((data) => {
          ctx.addToken(data.idToken);
          localStorage.setItem("user",JSON.stringify(data.idToken))

          // Store the token in context
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxyZXEovyCOyu5YRjRIy0_-MXNNih-Bg0",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailAuthRef.current.value,
            password: passwordAuthRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Authentication failed.");
          }
        })
        .then((data) => {
          ctx.addToken(data.idToken); // Store the token in state
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
      {!ctx.token ? (
        <section className={classes.auth}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" required ref={emailAuthRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordAuthRef}
              />
            </div>
            <div className={classes.actions}>
              {!loading ? (
                <p>sending request.....</p>
              ) : (
                <button>{isLogin ? "Login" : "Create  account"}</button>
              )}
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </div>
          </form>
        </section>
      ) : (
        <ProfileForm></ProfileForm>
      )}
    </div>
  );
};

export default AuthForm;
