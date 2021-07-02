import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import StatusNav from "./StatusNav";
import MessageArea from "./MessageArea";
import styles from "./ChatScreen.module.css";

const ChatScreen = ({ onlineUsers, self, allMessages, setAllMessages }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const isDesktop = useMediaQuery({
    query: "(min-width:1020px)",
  });
  useEffect(() => {
    if (!onlineUsers || !selectedUser) return;
    let isUserOnline = onlineUsers.find((user) => {
      return user.userID === selectedUser.userID;
    });
    if (!isUserOnline) {
      setTimeout(() => {
        setSelectedUser(null);
      }, 1000);
    }
  }, [onlineUsers]);
  if (isDesktop) {
    return (
      <div className={styles.main}>
        <StatusNav
          self={self}
          onlineUsers={onlineUsers}
          setSelectedUser={setSelectedUser}
          screen={isDesktop}
        />
        <MessageArea
          selectedUser={selectedUser}
          allMessages={allMessages}
          setAllMessages={setAllMessages}
          screen={isDesktop}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        {selectedUser ? (
          <MessageArea
            screen={isDesktop}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            allMessages={allMessages}
            setAllMessages={setAllMessages}
          />
        ) : (
          <StatusNav
            screen={isDesktop}
            self={self}
            onlineUsers={onlineUsers}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>
    );
  }
};

export default ChatScreen;
