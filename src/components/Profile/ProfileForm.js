import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import HeaderContext from "../../store/HeaderContext";

const ProfileForm = () => {
  const ctx = useContext(HeaderContext);

  const passwordRef = useRef();
  const passwordChangeHandler = (event) => {
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDxyZXEovyCOyu5YRjRIy0_-MXNNih-Bg0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("update failed");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <form className={classes.form} onSubmit={passwordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
