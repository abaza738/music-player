import { io } from "socket.io-client";
import { useLogger } from "../store/logger";

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});

socket.on("new-log", (message) => {
  useLogger().push(message);
});
