import React, { useEffect, useState } from "react";
import AuthScreen from "./components/AuthScreen";
import ChatScreen from "./components/ChatScreen";
import socket from "./socket";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [allMessages, setAllMessages] = useState({});
  useEffect(() => {
    let tokenObject = localStorage.getItem("chatappToken");
    if (tokenObject !== null) {
      tokenObject = JSON.parse(tokenObject);
      socket.auth = {
        type: "jwt",
        token: tokenObject.token,
      };
      socket.connect();
    }
    let localMessages = localStorage.getItem("chatappMessages");
    if (localMessages !== null) {
      localMessages = JSON.parse(localMessages);
      setAllMessages(localMessages);
    }
  }, []);
  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid user") {
        window.alert("user not in db");
      } else if (err.message === "wrong password") {
        window.alert("password is incorrect");
      } else if (err.message === "duplicate username") {
        window.alert("Username already taken");
      } else if (err.message === "another instace running") {
        window.alert("another instace running");
      }
      socket.disconnect();
    });

    socket.on("successfullUserCreation", () => {
      console.log("User created successfully");
    });

    socket.on("token", (token) => {
      localStorage.setItem(
        "chatappToken",
        JSON.stringify({
          token: token,
        })
      );
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("userInfo", (info) => {
      setUserInfo(info);
    });

    socket.on("userConn", (user) => {
      setOnlineUsers((prevUsers) => {
        return prevUsers.concat(user);
      });
    });
    socket.on("userDisconn", (userID) => {
      setOnlineUsers((prevUsers) => {
        return prevUsers.filter((user) => {
          return user.userID !== userID;
        });
      });
    });

    socket.on("private message", ({ from, content, time }) => {
      const formattedMessage = {
        content: content,
        time: time,
        fromSelf: false,
      };

      setAllMessages((prevMessages) => {
        return {
          ...prevMessages,
          [from]: prevMessages[from]
            ? prevMessages[from].concat(formattedMessage)
            : [formattedMessage],
        };
      });
    });
  }, []);
  useEffect(() => {
    console.log(allMessages);
    localStorage.setItem("chatappMessages", JSON.stringify(allMessages));
  }, [allMessages]);
  return (
    <div className="App">
      {userInfo ? (
        <ChatScreen
          self={userInfo}
          onlineUsers={onlineUsers}
          allMessages={allMessages}
          setAllMessages={setAllMessages}
        />
      ) : (
        <AuthScreen />
      )}
    </div>
  );
}

export default App;
