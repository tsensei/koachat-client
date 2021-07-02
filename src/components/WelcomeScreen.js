import React from "react";
import { ReactComponent as AppIcon } from "../assets/koala.svg";
import styles from "./WelcomeScreen.module.css";

const WelcomeScreen = () => {
  return (
    <div className={styles.main}>
      <AppIcon className={styles.appIcon} />
      <h1>Welcome to KoaChat!</h1>
      <h2>This is a real-time global chat application</h2>
      <h3>
        Made with React, NodeJS and Socket.io, fully responsive and on the cloud
      </h3>
    </div>
  );
};

export default WelcomeScreen;
