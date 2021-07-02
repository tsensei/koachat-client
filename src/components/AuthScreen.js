import React, { useState, useRef } from "react";
import { ReactComponent as AppLogo } from "../assets/koala.svg";
import styles from "./AuthScreen.module.css";
import socket from "../socket";

const AuthScreen = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const authenticateUser = (e) => {
    e.preventDefault();
    socket.auth = {
      type: hasAccount ? "login" : "signup",
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    usernameRef.current.value = "";
    passwordRef.current.value = "";

    socket.connect();
  };

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <AppLogo className={styles.appLogo} />
        <p>KoaChat</p>
      </div>
      <div className={styles.main}>
        <form className={styles.mainForm} onSubmit={authenticateUser}>
          <h1>{hasAccount ? "Login" : "Signup"}</h1>
          <div className={styles.inputBox}>
            <div>Username</div>
            <div>
              <input minLength="3" ref={usernameRef} type="text" />
            </div>
          </div>
          <div className={styles.inputBox}>
            <div>Password</div>
            <div>
              <input minLength="6" ref={passwordRef} type="password" />
            </div>
          </div>
          <button className={styles.mainBtn} type="submit">
            {hasAccount ? "Login" : "Signup"}
          </button>
          {hasAccount && (
            <p>
              Dont have an account?{" "}
              <button
                className={styles.signupBtn}
                onClick={() => setHasAccount(false)}
              >
                Sign up
              </button>
            </p>
          )}
        </form>
      </div>
      <div className={styles.footer}>
        <p>
          Made with 💖 by{" "}
          <a href="https://www.instagram.com/_tsensei_/">tsensei</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
