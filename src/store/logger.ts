import { ref } from "vue";
import { defineStore } from "pinia";
import { Log } from "./types";
import { socket } from "../core/websocket";

export const useLogger = defineStore("logger", () => {
  const logs = ref<Log[]>([]);

  const log = (event: string) => {
    socket.emit("log", { type: "log", message: event });
  };

  const push = (event: Log) => {
    logs.value.unshift(event);
  };

  const setLogs = (newLogs: Log[]) => {
    logs.value.push(...newLogs);
  };

  return {
    logs,
    log,
    push,
    setLogs,
  };
});
