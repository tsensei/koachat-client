import React from "react";
import { ReactComponent as AppLogo } from "../assets/koala.svg";
import styles from "./StatusNav.module.css";

const StatusNav = ({ onlineUsers, self, setSelectedUser, screen }) => {
  console.log("online users", onlineUsers);
  return (
    <div className={screen ? styles.main : styles.mainMobile}>
      <div className={styles.navHeader}>
        <AppLogo className={styles.appLogo} />
        <p>KoaChat</p>
      </div>
      <div className={styles.navBody}>
        {onlineUsers ? (
          onlineUsers.length ? (
            onlineUsers.map((user) => {
              if (user.username === self.username) return null;
              return (
                <Profile
                  key={user.userID}
                  user={user}
                  setSelectedUser={setSelectedUser}
                />
              );
            })
          ) : (
            <h3>Looks like no one is online</h3>
          )
        ) : (
          "Loading"
        )}
      </div>
      <div className={styles.navFooter}>
        <p>Made with 💖 by tsensei</p>
      </div>
    </div>
  );
};

const Profile = ({ user, setSelectedUser }) => {
  return (
    <div className={styles.profile} onClick={() => setSelectedUser(user)}>
      <p>{user.username}</p>
      <p>Online</p>
    </div>
  );
};

export default StatusNav;
