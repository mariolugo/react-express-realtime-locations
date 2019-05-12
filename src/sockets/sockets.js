import io from "socket.io-client";
import { locationOperations } from "../state/ducks/locations";
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

  /**
   * New locations listeners, dispatch fetchLocations
   */
  socket.on("locations/emit/NEW_LOCATIONS", async state => {
    const { fetchLocations } = locationOperations;
    await dispatch(fetchLocations());
  });

  /**
   * Updated location listener, dispatch fetchLocations
   */
  socket.on("locations/emit/UPDATED_LOCATION", async state => {
    const { fetchLocations } = locationOperations;
    await dispatch(fetchLocations());
  });

  /**
   * Deleted location listener, dispatch fetchLocations
   */
  socket.on("locations/emit/DELETED_LOCATION", async state => {
    const { fetchLocations } = locationOperations;
    await dispatch(fetchLocations());
  });

  return socket;
};

// the following are fucntions that our client side uses
// to emit actions to everyone connected to our web socket
export const sendPing = () => {
  socket.emit("PING", "PING");
};

/**
 * Emit new locations
 */
export const newLocations = () => {
  socket.emit("locations/NEW_LOCATIONS");
};

/**
 * Emit updated location
 */
export const editedLocation = () => {
  socket.emit("locations/UPDATED_LOCATION");
};

/**
 * Emit deleted location
 */
export const deletedLocation = () => {
  socket.emit("locations/DELETED_LOCATION");
};

export default configureSocket;
