import io from "socket.io-client";

const socket = io("http://localhost:4000");

const configureSocket = dispatch => {
  // make sure our socket is connected to the port
  socket.on("connect", () => {
    console.log("connected");
  });

  // the socket.on method is like an event listener
  // just like how our redux reducer works
  // the different actions that our socket/client will emit
  // is catched by these listeners
  socket.on("PONG", state => {
    console.log(state);
  });

  return socket;
};

// the following are fucntions that our client side uses
// to emit actions to everyone connected to our web socket
export const sendPing = () => {
  socket.emit("PING", "PING");
};

export default configureSocket;
