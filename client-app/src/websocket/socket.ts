import { Manager } from "socket.io-client";

const manager = new Manager("http://localhost:5000", {
  reconnectionAttempts: 5,
  autoConnect: false
});
export const socket = manager.socket("/");
