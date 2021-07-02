import { io } from "socket.io-client";

//Dev
// const url = "http://localhost:3001";

// const socket = io(url, { autoConnect: false });

//Production
const socket = io({ autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
