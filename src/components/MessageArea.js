import React, { useEffect, useRef, useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import styles from "./MessageArea.module.css";
import socket from "../socket";

const MessageArea = ({
  selectedUser,
  setSelectedUser,
  allMessages,
  setAllMessages,
  screen,
}) => {
  return (
    <div className={styles.main}>
      {selectedUser ? (
        <>
          <MessageHeader
            name={selectedUser.username}
            setSelectedUser={setSelectedUser}
            screen={screen}
          />
          <MessageBody messagesToRender={allMessages[selectedUser.userID]} />
          <MessageInput
            selectedUser={selectedUser}
            allMessages={allMessages}
            setAllMessages={setAllMessages}
            screen={screen}
          />
        </>
      ) : (
        <WelcomeScreen />
      )}
    </div>
  );
};

const MessageHeader = ({ name, screen, setSelectedUser }) => {
  return (
    <div className={screen ? styles.header : styles.headerMobile}>
      {name}
      {!screen && (
        <button
          className={styles.headerBtn}
          onClick={() => setSelectedUser(null)}
        >
          Online Users
        </button>
      )}
    </div>
  );
};

const MessageBody = ({ messagesToRender }) => {
  const msgEndRef = useRef(null);
  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messagesToRender]);
  return (
    <div className={styles.body}>
      {messagesToRender ? (
        <>
          {messagesToRender.map((message) => {
            return (
              <div
                key={message.time}
                className={
                  message.fromSelf ? styles.fromSelf : styles.fromOther
                }
              >
                {message.content}
              </div>
            );
          })}
          <div ref={msgEndRef} />
        </>
      ) : (
        <p>Start a conversation!</p>
      )}
    </div>
  );
};

const MessageInput = ({
  selectedUser,
  setAllMessages,
  allMessages,
  screen,
}) => {
  const messageRef = useRef();
  const [clearInput, setClearInput] = useState(false);

  //Message sending logic
  const emitMessage = (e) => {
    e.preventDefault();
    const toUser = selectedUser.userID;
    const formattedMessage = {
      content: messageRef.current.value,
      to: toUser,
      time: new Date().getTime().toString(),
    };
    socket.emit("private message", formattedMessage);
    const localMessage = {
      content: formattedMessage.content,
      time: formattedMessage.time,
      fromSelf: true,
    };
    setAllMessages((prevMessages) => {
      return {
        ...prevMessages,
        [toUser]: prevMessages[toUser]
          ? prevMessages[toUser].concat(localMessage)
          : [localMessage],
      };
    });
    setClearInput(true);
  };
  useEffect(() => {
    if (clearInput === false) return;
    messageRef.current.value = "";
    setClearInput(false);
  }, [clearInput]);
  return (
    <form
      className={screen ? styles.input : styles.inputMobile}
      onSubmit={emitMessage}
    >
      <input
        ref={messageRef}
        type="text"
        placeholder="Type something to send..."
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageArea;
